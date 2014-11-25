(function () {
    'use strict';

    angular.module('spCommon')

        .controller('spPeoplePickerController', ['spData', '$window', '$q', '$scope', function (spData, $window, $q, $scope) {
            $scope.$watch('value', function (newValue, oldValue) {
                if (newValue === oldValue) { return; }

                getResolvedUsers().then(function (resolvedUsers) {
                    if (!angular.equals(resolvedUsers, $scope.value))
                        $scope.BindUsersToPeoplePicker($scope.value);
                });
            });

            $scope.BindUsersToPeoplePicker = function (users) {
                var peoplePickerElementId = 'peoplePickerDiv' + $scope.$id;

                var spPeoplePicker = $window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerElementId + '_TopSpan'];
                var peoplePickerEditor = $('#' + spPeoplePicker.EditorElementId);
                if (users) {
                    if ($scope.AllowMultipleValues == 'false' || $scope.AllowMultipleValues == false) {
                        spData.spUser.Get(users)
                            .then(function (data) {
                                peoplePickerEditor.val(data.LoginName);
                                $scope.isInternalChange = true;
                                spPeoplePicker.AddUnresolvedUserFromEditor(true);
                                if ($scope.readonly) $('#' + peoplePickerElementId).find('.sp-peoplepicker-delImage').css('display', 'none');
                            });

                    }
                    else {
                        var promises = new Array();
                        for (var i = 0; i < users.results.length; i++) {
                            promises[i] = spData.spUser.Get(users.results[i])
                                .then(function (data) {
                                    peoplePickerEditor.val(data.d.LoginName);
                                    $scope.isInternalChange = true;
                                    spPeoplePicker.AddUnresolvedUserFromEditor(true);
                                });
                        }
                        $q.all(promises).then(function () {
                            if ($scope.readonly) $('#' + peoplePickerElementId).find('.sp-peoplepicker-delImage').css('display', 'none');
                        });
                    }
                }
            }

            $scope.UserResolved = function () {
                if ($scope.isInternalChange) {
                    $scope.isInternalChange = false;
                    return;
                }

                getResolvedUsers()
                    .then(function (resolvedUsers) {
                        if (!angular.equals(resolvedUsers, $scope.value)) {
                            $scope.value = resolvedUsers;
                        }
                    });
            };

            function getResolvedUsers() {
                var deferred = $q.defer();

                // Get the people picker object from the page.
                var peoplePickerElementId = 'peoplePickerDiv' + $scope.$id;
                var peoplePicker = $window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerElementId + '_TopSpan'];

                // Get information about all users.
                var usersInfo = peoplePicker.GetAllUserInfo();

                if ($scope.AllowMultipleValues == 'false' || $scope.AllowMultipleValues == false) {
                    if (usersInfo.length == 0) {
                        deferred.resolve(null);
                    }
                    else
                        spData.spUser.Get(usersInfo[0].Key)
                            .then(function (data) {
                                deferred.resolve(data.Id);
                            });
                }
                else {
                    var usersArray = { results: new Array() };
                    var promises = new Array();
                    for (var i = 0; i < usersInfo.length; i++) {
                        promises[i] = spData.spUser.Get(usersInfo[i].Key)
                            .then(function (data) {
                                usersArray.results[usersArray.results.length] = data.Id;
                            });
                    }
                    $q.all(promises).then(function () {
                        deferred.resolve(usersArray);
                    });
                }

                return deferred.promise;
            }

        }])

        .directive('spPeoplePicker', ['$window', function ($window) {
          return {
              restrict: 'E',
              scope: { value: '=', AllowMultipleValues: '@allowmultiplevalues' },
              controller: 'spPeoplePickerController',
              template: '<div></div>',
              link: function ($scope, element, attributes) {
                  var controlId = element.children()[0].id = 'peoplePickerDiv' + $scope.$id;

                  //Initialize the people picker control.
                  (function initializePeoplePicker(peoplePickerElementId) {

                      // Create a schema to store picker properties, and set the properties.
                      var schema = {};
                      schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
                      schema['SearchPrincipalSource'] = 15;
                      schema['ResolvePrincipalSource'] = 15;
                      if ($scope.AllowMultipleValues == 'false' || $scope.AllowMultipleValues == false)
                          schema['AllowMultipleValues'] = false;
                      else
                          schema['AllowMultipleValues'] = true;
                      schema['MaximumEntitySuggestions'] = 50;
                      schema['Width'] = '372px';
                      schema["OnUserResolvedClientScript"] = function () {
                          $scope.UserResolved();
                      };

                      // Render and initialize the picker. 
                      // Pass the ID of the DOM element that contains the picker, an array of initial
                      // PickerEntity objects to set the picker value, and a schema that defines
                      // picker properties.
                      $window.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);

                      if ($scope.value) {
                          $scope.BindUsersToPeoplePicker($scope.value);
                      }

                      //Disable if readonly
                      if (attributes.readonly === "true" || attributes.readonly === true) {
                          var spPeoplePicker = $window.SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerElementId + '_TopSpan'];
                          spPeoplePicker.SetEnabledState(false);
                          $scope.readonly = true;
                          $('#' + peoplePickerElementId + '_TopSpan').css("border", "0").find('.sp-peoplepicker-initialHelpText').css('display', 'none');
                      }
                  })(controlId);
              }
          };
      }]);
})();