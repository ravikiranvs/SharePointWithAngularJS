var commonModule = angular.module('spCommon');
commonModule.directive('ngSpModal', function () {
    link = function (scope, element, attrs, controller) {
        var dialog,
            defaults = { html: element.get(0), showClose: true },
            //getoptions from controller
            getOptions = function () {
                var options = scope.$eval(attrs.ngSpModal);
                return angular.extend(defaults, options);
            };
        fireSpModal = function (value) {
            if (value) {
                var opts = getOptions();
                //Open SharePoint dialog with options
                dialog = SP.UI.ModalDialog.showModalDialog(opts);
                //Set ngShow attribute value
                var closeBtn = angular.element(document.querySelector(".ms-dlgCloseBtn"));
                closeBtn.on('click', function () {
                    scope[attrs.ngShow] = false;
                    scope.$apply();
                });
            } else {
                dialog && dialog.close();
            }
        };
        // Watch for changes to the directives options
        scope.$watch(attrs.ngShow, fireSpModal, true);
    }
    return {
        require: '?ngShow',
        link: link
    };
});
