(function () {
    'use strict';

    angular.module('spCommon')

    .directive('spListForm', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<div style="padding-left:5px;">' +
                '<table class="ms-core-tableNoSpace">' +
                '<tr>' +
                '<td>' +
                '<div class="ms-webpart-zone ms-fullWidth">' +
                '<div class="s4-wpcell-plain ms-webpartzone-cell ms-webpart-cell-vertical ms-fullWidth">' +
                '<div class="ms-webpart-chrome ms-webpart-chrome-vertical ms-webpart-chrome-fullWidth">' +
                '<div width="100%" class="noindex">' +
                '<table>' +
                '<tr>' +
                '<td ng-transclude>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</div>'
        };
    }])

    .directive('spListFormFields', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<table class="ms-formtable" style="margin-top:8px;" border="0" cellpadding="0" cellspacing="0" width="100%" ng-transclude></table>'
        };
    }])

    .directive('spListFormField', [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            replace: true,
            template: '<tr>'+
                '<td nowrap="true" valign="top" width="113px" class="ms-formlabel">'+
                '<h3 class="ms-standardheader"><nobr>{{title}}</nobr></h3>' +
                '</td>'+
                '<td valign="top" width="350px" class="ms-formbody">'+
                '<span dir="none" ng-transclude>' +
                '</span>'+
                '</td>'+
                '</tr>'
        };
    }])

    .directive('spListFormFooter', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<table cellpadding="0" cellspacing="0" width="100%" style="padding-top:7px">'+
                '<tr>'+
                '<td width="100%">'+
                '<table class="ms-formtoolbar" cellpadding="2" cellspacing="0" border="0" width="100%">'+
                '<tr ng-transclude>'+
                '</tr>'+
                '</table>'+
                '</td>'+
                '</tr>'+
                '</table>'
        };
    }])

    .directive('spListFormMetadata', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<td class="ms-toolbar" nowrap="nowrap"><table cellpadding="0" cellspacing="0" ng-transclude></table></td>'//+
                //'<td width="99%" class="ms-toolbar" nowrap="nowrap"><img src="/_layouts/15/images/blank.gif" width="1" height="18" alt=""></td>'
        };
    }])

    .directive('spListFormMetadataField', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: '<tr>'+
                '<td nowrap="nowrap" class="ms-descriptiontext">'+
                '<span><nobr ng-transclude></nobr></span>' +
                '</td>' +
                '</tr>'
        };
    }])

    .directive('spListFormButtons', [function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            link: function (scope, element, attributes, controller, transclude) {
                transclude(scope, function (clone) {
                    element.before('<td width="99%" class="ms-toolbar" nowrap="nowrap"><img src="/_layouts/15/images/blank.gif" width="1" height="18" alt=""></td>');
                    element.replaceWith(clone);
                });
            }
        };
    }])

    .directive('spListFormButton', [function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: { click: '&spClick', value: '@' },
            replace: true,
            template: '<td class="ms-toolbar" nowrap="nowrap">'+
                '<table cellpadding="0" cellspacing="0" width="100%">'+
                '<tbody>'+
                '<tr>'+
                '<td align="right" width="100%" nowrap="nowrap">'+
                '<input type="button" ng-value="value" class="ms-ButtonHeightWidth" ng-click="click()">' +
                '</td>'+
                '</tr>'+
                '</tbody>'+
                '</table>'+
                '</td>'//+
                //'<td class="ms-separator">&nbsp;</td>'
        };
    }])
})();