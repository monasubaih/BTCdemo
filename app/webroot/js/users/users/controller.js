//.extend({ paged: { pageSize: 2 } });
usersViewModelOperation = {
    userItemViewModel: function () {
        var self = this;
        //Data
        self.User_ID = ko.observable('');
        self.User_FullName = ko.observable('');
        self.User_Password = ko.observable('');

        self.User_Pic = ko.observable('');
        self.Region_ID = ko.observable('');
        self.Region_Title = ko.observable('');

        self.User_Email = ko.observable('');
        self.User_Telephone = ko.observable('');
        self.User_JobDes = ko.observable('');
        self.User_Level = ko.observable('');
        self.userRegions = ko.observableArray(regions);
        self.userLevels = ko.observableArray(userLevels);
        //for the logged user
        self.userAllowPermissionLevels = ko.observableArray(permissionHierarchyControlLevels);

        self.Selected = ko.observable('');
        self.updateMode = ko.observable(false);
        //functions 
        self.removeUser = function (userID) {
            usersViewModelOperation.removeUsers([userID]);
        };
        //Computed
        self.getUserGridPic = ko.computed(function () {
            return this.User_Pic();
        }, this);

        self.getLevel = ko.computed(function () {
            var userLevel = getElementByKey(self.User_Level(), userLevels);
            if (userLevel && userLevel.hasOwnProperty('value'))
                return userLevel;
        }, this);



        self.checkUserPic = function (direct) {
            if (userViewModel != null && direct == null) {
                if (userViewModel.User_Pic().length < MAIN_HOST.length)
                    return false;
                else
                    return true;
            }
            else
                return direct;
        };
        //check if the current logged user have permission to made control on other level
        self.checkUserHavePermissionToControll = function (userLevel) {
            var userPermission = getElementByKey(userLevel, self.userAllowPermissionLevels());
            return (userPermission) ? true : false;
        }
        self.getModalPageTitle = ko.computed(function () {
            return (self.updateMode()) ? 'Edit User ' + self.User_FullName() : 'Create User ' + (self.User_FullName());
        }, this);

        self.getModalActionTitle = ko.computed(function () {
            return (self.updateMode()) ? 'Update User' : 'Create User';
        }, this);

    },
    emptyUserItemViewModel: function () {
        userViewModel.User_ID('');
        userViewModel.User_FullName('');
        userViewModel.User_Password('');

        userViewModel.User_Pic('');
        userViewModel.Region_ID('');
        userViewModel.Region_Title('');

        userViewModel.User_Email('');
        userViewModel.User_Telephone('');
        userViewModel.User_JobDes('');
        userViewModel.User_Level('');

        userViewModel.userRegions(regions);
        userViewModel.userLevels(userLevels);
        userViewModel.userAllowPermissionLevels(permissionHierarchyControlLevels);
        userViewModel.Selected('');
        userViewModel.updateMode(false);

    },
    usersViewModel: function () {
        var self = this;
        var filteredUsers = [];
        self.users = ko.observableArray([]);
        self.users.extend({paged: {pageSize: PAGING_ITEMS,
                pageGenerator: 'sliding'}});
        self.associatedItemIds = ko.observableArray();
        self.toggleAssociation = function (item) {
            item.Selected(!(item.Selected()));
            return true;
        };
        self.usersCount = ko.observable(0);

        self.getOriginalUserData = function (item, event) {
            gridOperation.activeCSS(event.target);
            currentDataSet = usersDataSet;
            self.users(usersDataSet);
        };
        self.filterUsersText = ko.observable('');

        self.filterUsersByName = ko.computed(function () {
            var filter = (self.filterUsersText().toLowerCase().trim());
            //self.users(usersDataSet);
            if (!filter) {
                self.users(currentDataSet);
            } else {

                filteredUsers = ko.utils.arrayFilter(currentDataSet, function (item) {
                    return (stringStartsWith(item.User_FullName().toLowerCase(), filter))
                });
                //usersViewModelOperation.reCreaterPager(filteredUsers.length);
                //usersViewModelOperation.pageiningUsers();
                self.users(filteredUsers);
            }
        });

        self.removeUsers = function () {
            usersViewModelOperation.removeUsers(self.associatedItemIds());
            for (var i = 0; i < self.associatedItemIds().length; i++) {
                self.users.remove(function (item) {
                    if (usersViewModelOperation.checkActionPermissiontToDelete(item, false))
                        return item.User_ID() == self.associatedItemIds()[i]
                });
            }
            return true;
        };
        self.getUserItemByID = function (userID) {
            for (var i = 0; i < usersDataSet.length; i++) {
                if (userID == usersDataSet[i].User_ID()) {
                    return usersDataSet[i];
                }
            }
        };
        ////reigons
        self.regions = ko.observableArray(regions);
        self.filterToReigon = function (item, event) {
            if (item.regionUsersCount() > 0) {
                gridOperation.activeCSS(event.target);
                self.users.toFirstPage();
                self.users(item.regionUsers());
                currentDataSet = item.regionUsers();
            }
        };
        self.addNewRegion = function () {
            usersViewModelOperation.addRegionViewItem();
        }

    }
    ,
    ini: function () {
        //get regions
        regions = usersViewModelOperation.getRegions();

        usersViewModel = new usersViewModelOperation.usersViewModel();
        applyBind(usersViewModel, $('#userViews'));
        usersDataSet = (usersViewModelOperation.getUsers());
        currentDataSet = usersDataSet;
        userViewModel = new usersViewModelOperation.userItemViewModel();

        //add empty select option to user regions
        var emptyObjSelect = new usersViewModelOperation.regionsViewModel();
        emptyObjSelect.Region_ID('');
        emptyObjSelect.Region_Title(defaultEmptySelect.value);
        userViewModel.userRegions().unshift(emptyObjSelect);

        applyBind(userViewModel, $('#addUserForm'));
        //set the permission level
        var permissionHierarchyOb = getElementByKey($.cookie('userLevel'), permissionHierarchy);
        var userLevelOb = null;
        if (permissionHierarchyOb.hasOwnProperty('value')) {

            for (var ii in permissionHierarchyOb.value) {
                var userLevelOb = getElementByKey(permissionHierarchyOb.value[ii], userLevels);
                if (userLevelOb)
                    permissionHierarchyControlLevels.push(userLevelOb);
            }
        }
        permissionHierarchyControlLevels.unshift(defaultEmptySelect);
        userViewModel.userAllowPermissionLevels(permissionHierarchyControlLevels);
    },
    checkActionPermissiontToDelete: function (item, withMessages) { // related to view 
        withMessages = (withMessages !== null) ? withMessages : true;
        if (!item.checkUserHavePermissionToControll(item.User_Level())) {
            if (withMessages)
                alertify.error("you don\'t have permission to delete " + item.User_FullName());
            return false;
        }
        if ($.cookie('userID') == item.User_ID()) {
            if (withMessages)
                alertify.error("you can\'t delete yours self !");
            return false;

        }
        return true;
    },
    removeUsers: function (userIDs) {
        jsonObj = new Object();
        jsonObj.usersModel = [];
        if (userIDs) {
            for (var i in userIDs) {
                jsonObj.usersModel.push({'User_ID': userIDs[i]});
            }
            ajaxObj = {
                type: 'POST',
                url: {
                    'controller': 'usersApi',
                    'action': 'deleteUsersModelSet',
                    'mainURL': MAIN_HTTP_URL},
                data: JSON.stringify(jsonObj)
            };
            router.sendRequest(ajaxObj, function (data) {
                data = prepareResponse(data);

                if (data && data.hasOwnProperty('opStatus')) {
                    opStatus = data.opStatus;
                    usersViewModelOperation.getUsers();

                }
            });
        }

    },
    addEditUser: function () {
        jsonObj = new Object();
        jsonObj.usersModel = {};
        if (userViewModel.User_ID() != '')
            jsonObj.usersModel['User_ID'] = userViewModel.User_ID();
        if (userViewModel.User_FullName() != '')
            jsonObj.usersModel['User_FullName'] = userViewModel.User_FullName();
        if (userViewModel.User_Password() != '')
            jsonObj.usersModel['User_Password'] = userViewModel.User_Password();
        if (userViewModel.User_Pic().length < MAIN_HOST.length)
            jsonObj.usersModel['User_Pic'] = userViewModel.User_Pic();
        if (userViewModel.Region_ID() != '')
            jsonObj.usersModel['Region_ID'] = userViewModel.Region_ID();
        if (userViewModel.User_Email() != '')
            jsonObj.usersModel['User_Email'] = userViewModel.User_Email();
        if (userViewModel.User_Telephone() != '')
            jsonObj.usersModel['User_Telephone'] = userViewModel.User_Telephone();
        if (userViewModel.User_JobDes() != '')
            jsonObj.usersModel['User_JobDes'] = userViewModel.User_JobDes();
        if (userViewModel.User_Level() != '')
            jsonObj.usersModel['User_Level'] = userViewModel.User_Level();


        ajaxObj = {
            type: 'POST',
            url: {
                'controller': 'usersApi',
                'action': 'addEditUser',
                'mainURL': MAIN_HTTP_URL},
            data: JSON.stringify(jsonObj)
        };
        router.sendRequest(ajaxObj, function (data) {
            data = prepareResponse(data);

            if (data && data.hasOwnProperty('opStatus')) {
                opStatus = data.opStatus;
                //update the grid information 
                /*
                 if (userViewModel.updateMode()) {
                 //update 
                 for (var i = 0; i < usersDataSet.length; i++) {
                 if (userViewModel.User_ID() == usersDataSet[i].User_ID()) {
                 usersDataSet[i] = userViewModel;
                 break;
                 }
                 }
                 }
                 else {
                 usersDataSet.push(userViewModel);
                 }
                 */
                $.slidePanel.hide();
                usersViewModelOperation.getUsers();
                // usersViewModel.users(usersDataSet);

            }
        });


    },
    checkUserExist: function (email) {
        checkEmailExists = false;
        ajaxObj = {
            type: 'GET',
            url: {
                'controller': 'usersApi',
                'action': 'checkUserExistsByEmail',
                'params': {'email': email},
                'mainURL': MAIN_HTTP_URL},
        };
        router.sendRequest(ajaxObj, function (data) {
            data = prepareResponse(data);
            if (data.hasOwnProperty('exists')) {
                checkEmailExists = data.exists;
                return checkEmailExists;
            }
            else
                checkEmailExists = false;
        });

    },
    getUsers: function () {
        //get all users from server 
        usersViewModel.users([]);
        usersDataSet = [];
        ajaxObj = new Object();

        ajaxObj = {
            type: 'GET',
            url: {
                'controller': 'usersApi',
                'action': 'viewUsers',
                'mainURL': MAIN_HTTP_URL},
        };
        router.sendRequest(ajaxObj, function (data) {
            data = prepareResponse(data);

            usersObj = data.usersModels;

            for (var key in usersObj) {
                if (usersObj.hasOwnProperty(key)) {
                    if (usersObj[key]['User_ID']) {

                        var userItemViewModel = new usersViewModelOperation.userItemViewModel();
                        userItemViewModel.User_ID(usersObj[key]['User_ID']);
                        userItemViewModel.User_FullName(usersObj[key]['User_FullName']);
                        userItemViewModel.User_Pic(usersObj[key]['User_Pic']);
                        userItemViewModel.Region_ID(usersObj[key]['Region_ID']);
                        userItemViewModel.Region_Title(usersObj[key]['Region_Title']);
                        userItemViewModel.User_Email(usersObj[key]['User_Email']);
                        userItemViewModel.User_Level(usersObj[key]['User_Level']);
                        userItemViewModel.User_Telephone(usersObj[key]['User_Telephone']);
                        userItemViewModel.User_JobDes(usersObj[key]['User_JobDes']);

                        usersDataSet.push(userItemViewModel);
                    }
                }
            }

            //usersViewModelOperation.reCreaterPager(usersObj.length);
            //usersViewModelOperation.pageiningUsers();
        }
        );
        usersViewModel.users(usersDataSet);
        usersViewModel.regions(usersViewModelOperation.prepareRegionsContnet(usersDataSet));
        currentDataSet = usersDataSet;
        usersViewModel.usersCount(usersDataSet.length);
        return usersDataSet;

    },
    removeUserImage: function (image) {

        ajaxObj = {
            type: 'GET',
            url: {
                'controller': 'usersApi',
                'action': 'uploadImage',
                'params': {'image': image},
                'mainURL': MAIN_HTTP_URL},
        };
        router.sendRequest(ajaxObj, function (data) {
            data = prepareResponse(data);
            if (data && data.hasOwnProperty('opStatus')) {
                deletePicStatus = data.opStatus;
            }
        });


    },
    ///////////////////////////////////////////////////////////////////////regions
    getRegions: function () {

        regions = [];
        ajaxObj = new Object();

        ajaxObj = {
            type: 'GET',
            url: {
                'controller': 'usersApi',
                'action': 'getRegions',
                'mainURL': MAIN_HTTP_URL},
        };
        router.sendRequest(ajaxObj, function (data) {
            data = prepareResponse(data);
            regionsObj = data.reponseModels;

            for (var key in regionsObj) {
                if (regionsObj[key]['Region_ID']) {

                    var regionsViewModel = new usersViewModelOperation.regionsViewModel();
                    regionsViewModel.Region_ID(regionsObj[key]['Region_ID']);
                    regionsViewModel.Region_Title(regionsObj[key]['Region_Title']);

                    regions.push(regionsViewModel);
                }
            }
        });
        return regions;

    },
    regionsViewModel: function () {
        var self = this;
        //Data
        self.Region_ID = ko.observable('');
        self.Region_Title = ko.observable('');
        self.regionUsersCount = ko.observable('');
        self.regionUsers = ko.observableArray([]);

        self.deleteRegionConfirm = function (item, event) {
            //grid confirmation to delete the region
            if (self.Region_ID() > 0)
                gridOperation.deleteRegionConfirm(self);
            else
                gridOperation.removeRegionHtml($(event.target));


        };
        self.deleteRegion = function () {
            ajaxObj = {
                type: 'GET',
                url: {
                    'controller': 'usersApi',
                    'action': 'deleteRegion',
                    'params': {'id': self.Region_ID()},
                    'mainURL': MAIN_HTTP_URL},
            };
            router.sendRequest(ajaxObj, function (data) {
                data = prepareResponse(data);
                if (data && data.hasOwnProperty('opStatus')) {
                    for (var key in usersViewModel.regions()) {
                        if (usersViewModel.regions()[key].Region_ID() == self.Region_ID()) {
                            usersViewModel.regions().splice(key, 1);
                            break;
                        }
                    }
                    regionDeleteStatus = data.opStatus;
                }
            });

        };
    },
    restRegions: function () {
        var filtredRegionsArray = [];
        for (var key in usersViewModel.regions()) {
            if (usersViewModel.regions()[key].Region_ID() > 0) {
                filtredRegionsArray.push(usersViewModel.regions()[key]);
            }
        }
        regions = filtredRegionsArray;
        usersViewModel.regions(filtredRegionsArray);
        userViewModel.userRegions(filtredRegionsArray);
    },
    //prepare the regoins and connect it to the view
    prepareRegionsContnet: function (usersDataSet) {
        var regionsContent = [];
        for (var key in regions) {
            var regionObInfo = new usersViewModelOperation.regionsViewModel();

            if (regions[key].Region_ID() > 0) {
                regionObInfo.Region_ID(regions[key].Region_ID());
                regionObInfo.Region_Title(regions[key].Region_Title());

                for (var keyUser in usersDataSet) { //users
                    if (usersDataSet[keyUser].Region_ID() == regions[key].Region_ID()) { //add users to the region
                        regionObInfo.regionUsers().push(usersDataSet[keyUser]);
                    }
                }
                if (regionObInfo.regionUsers().length > 0)
                    regionObInfo.regionUsersCount(regionObInfo.regionUsers().length);
                regionsContent.push(regionObInfo);
            }
        }
        return regionsContent;

    },
    addRegionViewItem: function (Region_ID, Region_Title, regionUsersCount, regionUsers) {
        var lastElement = $('.list-group').children().last();
        if (lastElement.attr('data-id') != '') {
            var emptyField = new usersViewModelOperation.regionsViewModel();

            emptyField.Region_ID(((Region_ID != null) ? Region_ID : ''));
            emptyField.Region_Title(((Region_Title != null) ? Region_Title : '(Empty)'));
            emptyField.regionUsersCount(((regionUsersCount != null) ? regionUsersCount : ''));
            emptyField.regionUsers(((regionUsers != null) ? regionUsers : []));
            usersViewModel.regions().push(emptyField);
            usersViewModel.regions(usersViewModel.regions());
        }
        $('[data-toggle="list-editable"]', $('.list-group').children().last()).trigger('click');
    },
    addEditRegion: function (id, newTitle) {
        opStatus = false;
        jsonObj = new Object();
        jsonObj.regionModel = {};
        if (id != '')
            jsonObj.regionModel['Region_ID'] = id;
        if (newTitle != '')
            jsonObj.regionModel['Region_Title'] = newTitle;

        ajaxObj = {
            type: 'POST',
            url: {
                'controller': 'usersApi',
                'action': 'addEditRegion',
                'mainURL': MAIN_HTTP_URL},
            data: JSON.stringify(jsonObj)
        };
        router.sendRequest(ajaxObj, function (data) {
            data = prepareResponse(data);

            if (data && data.hasOwnProperty('opStatus')) {
                opStatus = data.opStatus;
                    if (id != '') { //update
                    for (var key in usersViewModel.regions()) {
                        if (usersViewModel.regions()[key].Region_ID() == id) {
                            usersViewModel.regions()[key].Region_Title(newTitle);
                            break;
                        }
                    }      }          
                if (data.hasOwnProperty('updatedID'))
                    updatedID = data.updatedID;
             

               
            }
        });

    }


}



