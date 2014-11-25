#SharePoint with AngularJS

##How to use
I have created a sample SharePoint Hosted App project that uses the created Angular directives and factories.

The actual JS code that you can use in present in SharePointWithAngularJS/TestAppSharePointApp/SPCommon you have to include the spCommon Module.
Or you can use the NuGet package https://www.nuget.org/packages/AngularJsAndSharePoint/

##What is available:

//REST Calls

//Query List Items<br>
spCommon.data.spListItem.Query('List Name')

//Create List Item<br>
spCommon.data.spListItem.Create('List Name')

//Read List Item<br>
spCommon.data.spListItem.Get('List Name', ItemId)

//Update List Item<br>
spCommon.data.spListItem.Update('List Name', Item)

//Delete List Items<br>
spCommon.data.spListItem.Delete('List Name', ItemId)

//Get User<br>
spCommon.data.spUser.Get(IdOrName)

```html
<!--People Picker-->
<sp-people-picker value="Item.AuthoredId" allowmultiplevalues="false"></sp-people-picker>
```

![alt People Picker](https://github.com/ravikiranvs/SharePointWithAngularJS/blob/master/ReadmeImages/PeoplePicker.png)

```html
<!--List View-->
<table sp-list-view>
    <tr sp-list-view-header>
        <th sp-list-view-header-cell>Title</th>
        <th sp-list-view-header-cell>Another Column</th>
    </tr>
    <tr sp-list-view-item>
        <td sp-list-view-item-linkcell click="ItemClick(item)">Item Title</td>
        <td sp-list-view-item-cell>Another Column's Value</td>
    </tr>
</table>
```

![alt List View](https://github.com/ravikiranvs/SharePointWithAngularJS/blob/master/ReadmeImages/ListView.png)

```html
<!--List Form-->
<sp-list-form ng-form="spListForm">
    <sp-list-form-fields>
        <sp-list-form-field title=" Title">
            <input type="text" name="Title" ng-model="ItemTitle" class="ms-usereditor" required />
            <span ng-show="spListForm.Title.$dirty && spListForm.Title.$invalid" class="ms-formvalidation ms-csrformvalidation">
                <span ng-show="spListForm.Title.$error.required">You can't leave this blank.</span>
            </span>
        </sp-list-form-field>
        <sp-list-form-field title="Another Column">
            <textarea rows="4" cols="50" ng-model="ItemAnotherColumnValue" class="ms-usereditor" />
        </sp-list-form-field>
    </sp-list-form-fields>
    <sp-list-form-footer>
        <sp-list-form-buttons>
            <sp-list-form-button value="Save" sp-click="Submit()"></sp-list-form-button>
            <sp-list-form-button value="Cancel" sp-click="Cancel()"></sp-list-form-button>
        </sp-list-form-buttons>
    </sp-list-form-footer>
</sp-list-form>
```

![alt List Form](https://github.com/ravikiranvs/SharePointWithAngularJS/blob/master/ReadmeImages/ListForm.png)

##More to come!
