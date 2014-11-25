<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    SharePoint Angular Demo Page
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <!-- Update AppManifest.xml to use this file for the Start Page -->

    <!-- Change the app name in the ng-app attribute and the MainAppName JS variable  -->
    <div ng-app="YourAppName">
        <div ng-view>
            <p id="message">
                <!-- The following content will be replaced when you run the app -->
                initializing...
            </p>
        </div>
    </div>

    <!-- Change the app name in the ng-app attribute and the MainAppName JS variable  -->
    <script type="text/javascript">
        var MainAppName = 'YourAppName';
    </script>

    <!-- SharePoint JS Libs used for notifications  -->
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/core.js"></script>

    <!-- SharePoint JS Libs used for modal dialogs  -->
    <script type="text/javascript" src="/_layouts/15/sp.ui.dialog.js"></script>

    <!-- SharePoint JS Libs used for people picker  -->
    <SharePoint:ScriptLink name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />

    <!-- AngularJS Libs  -->
    <script type="text/javascript" src="../Scripts/angular.js"></script>
    <script type="text/javascript" src="../Scripts/angular-route.js"></script>
    <script type="text/javascript" src="../Scripts/angular-resource.js"></script>

    <!-- The Common Angular Module for intracting with SharePoint  -->
    <script type="text/javascript" src="../SPCommon/sp-common.js"></script>
    <script type="text/javascript" src="../SPCommon/sp-notification.js"></script>
    <script type="text/javascript" src="../SPCommon/sp-modal.js"></script>
    <script type="text/javascript" src="../SPCommon/sp-resource.js"></script>
    <script type="text/javascript" src="../SPCommon/sp-data.js"></script>
    <script type="text/javascript" src="../SPCommon/SPControls/SPPeoplePicker/sp-people-picker.js"></script>
    <script type="text/javascript" src="../SPCommon/SPControls/SPList/sp-list-view.js"></script>
    <script type="text/javascript" src="../SPCommon/SPControls/SPList/sp-list-form.js"></script>

    <!-- The Main Angular Application Files  -->
    <script type="text/javascript" src="../app/app.js"></script>
    <script type="text/javascript" src="../app/route.js"></script>

    <!-- The Angular Application Controller Files  -->
    <script type="text/javascript" src="../app/pages/HomePageController.js"></script>
</asp:Content>
