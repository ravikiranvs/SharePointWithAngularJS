(function () {
    'use strict';

    angular.module('spCommon')

        .directive('spListView', [function () {
            return {
                restrict: 'A',
                transclude: true,
                //template: '<ng-transclude></ng-transclude>',
                link: function (scope, element, attributes, controller, transclude) {
                    element.addClass('ms-listviewtable');
                    element.attr('border', '0');
                    element.attr('cellspacing', '0');
                    element.attr('cellpadding', '1');
                    transclude(scope, function (clone) {
                        element.append(clone);
                    });
                }
            };
        }])


        .directive('spListViewHeader', [function () {
            return {
                restrict: 'A',
                transclude: true,
                //template: '<ng-transclude></ng-transclude>',
                link: function (scope, element, attributes, controller, transclude) {
                    element.addClass('ms-viewheadertr ms-vhltr');
                    element.attr('valign', 'top');
                    transclude(scope, function (clone) {
                        element.append(clone);
                    });
                }
            };
        }])


        .directive('spListViewHeaderCell', [function () {
            return {
                restrict: 'A',
                transclude: true,
                scope: { displayname: '@' },
                template: '<div displayname="{{displayname}}" class="ms-vh-div">' +
                    '<a class="ms-headerSortTitleLink" ng-transclude></a>' +
                    '</div>',
                link: function (scope, element, attributes) {
                    element.addClass('ms-vh2');
                    element.attr('scope', 'col');
                    element.css('max-width', '500px');
                }
            };
        }])


        .directive('spListViewItem', [function () {
            return {
                restrict: 'A',
                transclude: true,
                //template: '<ng-transclude></ng-transclude>',
                link: function (scope, element, attributes, controller, transclude) {
                    element.addClass('ms-itmHoverEnabled ms-itmhover');
                    transclude(scope, function (clone) {
                        element.append(clone);
                    });
                }
            };
        }])


        .directive('spListViewItemCell', [function () {
            return {
                restrict: 'A',
                transclude: true,
                template: '<div class="ms-rtestate-field" ng-transclude></div>',
                link: function (scope, element, attributes) {
                    element.addClass('ms-vb-lastCell ms-cellstyle ms-vb2 ms-vb-lastCell');
                }
            };
        }])


        .directive('spListViewItemLinkcell', [function () {
            return {
                restrict: 'A',
                transclude: true,
                scope: { click: '&' },
                template: '<div class="ms-vb  ms-vb-menuPadding itx">' +
                    '<a class="ms-listlink" style="cursor: pointer" ng-click="click()" ng-transclude></a>' +
                    '</div>',
                link: function (scope, element, attributes) {
                    element.addClass('ms-cellstyle ms-vb-title ms-positionRelative');
                    element.attr('height', '100%');
                }
            };
        }]);

})();