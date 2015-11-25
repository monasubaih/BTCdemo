/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


rolesModelOperations = {
    setIniVariables: function() {
        //iniate view models
        userAppPermissionsView = userConfigOb.userApplicationsPermissionsView;
        userAppPermissionsView.unshift({key: '', value: _tl('-- Select --')});
    },
    ini: function() {
        rolesModelOperations.setIniVariables();
        var selectedPermissionArray = [];

        var operationPermissionView = function(appkey, moduleKey, opKey, enable, operationObject) {
            var self = this;

            self.operationLabel = operationObject.label;
            self.operationRelateString = operationObject.relate;
            self.operationSubPermission = operationObject.subOperation;

            self.operationKey = opKey;
            self.moduleKey = moduleKey;
            self.appkey = appkey;

            self.enablePermission = ko.observable(enable);

            self.permissionClick = function(element, event) {
                var $this = $(event.target);
                var childElement = permissionInclude = "";
                permissionInclude = "<ul>";
                if (event.originalEvent !== undefined)
                    if (element.enablePermission()) {
                        if (element.operationSubPermission.length > 0) {
                            for (var xl in element.operationSubPermission) {
                                childElement = $('#' + element.operationSubPermission[xl].relate);
                                permissionInclude += '<li>' + childElement.html() + "</li>";

                            }
                            permissionInclude += "</ul>";
                            messageDialog.notify(element.operationLabel + _tl(' permission will include <br>') + permissionInclude,
                                    {'position': 'center', 'icon': 'modal-plus'});
                        }
                    }
                roleViewModel.SelectedPermissions([]);
                $('input[name=\'userPermissions[]\']').filter(':checked').each(function() {
                    roleViewModel.SelectedPermissions().push($(this).val());
                });
                return true;
            };
        };

        var modulePermissionView = function(appkey, moduleLabel, moduleKey) {
            var self = this;
            var moduleOperation = [];
            self.moduleLabel = moduleLabel;
            for (var indexOpPermission in userConfigOb.userApplicationsModulesOperationsPermissionsView) {
                //	console.log(userConfigOb.userApplicationsModulesOperationsPermissionsView[keyOP].mainKeyModule+'  '+keyModule);

                if (userConfigOb.userApplicationsModulesOperationsPermissionsView[indexOpPermission].mainKeyModule == moduleKey) {
                    if (userConfigOb.userApplicationsModulesOperationsPermissionsView[indexOpPermission].keyOP != '')
                        moduleOperation.push(new operationPermissionView(appkey, moduleKey, userConfigOb.userApplicationsModulesOperationsPermissionsView[indexOpPermission].keyOP, false,
                                userConfigOb.userApplicationsModulesOperationsPermissionsView[indexOpPermission].value));
                }

            }
            self.operations = ko.observableArray(moduleOperation);
        };

        var applicationsPermissionsView = function(mainLabel, appkey) {
            var self = this;
            self.mainLabel = mainLabel;
            self.mainkey = appkey;
            var appModules = [];

            for (var indexModulePermission in userConfigOb.userApplicationsModulesPermissionsView) {
//    			console.log(' Module '+userConfigOb.userApplicationsModulesPermissionsView[keyModule].mainKey+'  '+key);

                if (userConfigOb.userApplicationsModulesPermissionsView[indexModulePermission].mainKey == appkey) {
                    if (userConfigOb.userApplicationsModulesPermissionsView[indexModulePermission].keyModule != '')
                        appModules.push(new modulePermissionView(appkey, userConfigOb.userApplicationsModulesPermissionsView[indexModulePermission].value, userConfigOb.userApplicationsModulesPermissionsView[indexModulePermission].keyModule));
                }

            }
            self.modules = ko.observableArray(appModules);
        };
        var appPermissionsArray = [];

        for (var indexAppPermission in userConfigOb.userApplicationsPermissionsView) {
            if (userConfigOb.userApplicationsPermissionsView[indexAppPermission].key != '')
                appPermissionsArray.push(new applicationsPermissionsView(userConfigOb.userApplicationsPermissionsView[indexAppPermission].value, userConfigOb.userApplicationsPermissionsView[indexAppPermission].key));
        }

        function roleViewModelView() {
            var self = this;
            self.Role_ID = ko.observable(''),
                    self.Role_Title = ko.observable(''),
                    self.Role_App = ko.observable(''),
                    self.roleViewHead = ko.computed(function() {
                        var pageTitle = (self.Role_ID() != '') ? _tl('update') + ' "' + self.Role_Title() + '" ' + _tl('Role') : _tl('Add new Role');
                        return pageTitle;

                    }, self);
            self.Role_AppPermissions = ko.observableArray(appPermissionsArray),
                    self.SelectedPermissions = ko.observableArray(selectedPermissionArray),
                    self.Role_AppPermissionsView = ko.observableArray(userAppPermissionsView)
        }
        ;

        roleViewModel = new roleViewModelView();
        applyBind(roleViewModel);
    }
    ,
    empty: function() {
        roleViewModel.Role_ID('');
        roleViewModel.Role_Title('');
        roleViewModel.Role_App(''),
                rolesModelOperations.emptyPermissions();
    }
    ,
    emptyPermissions: function() {
        $('input[name=\'userPermissions[]\']').each(function() {
            //var value=$(this);
            if (this.checked) {
                this.checked = false;
                // var koObj = ko.dataFor(this);
                //$('#' + 'app' + koObj.appkey + '-mo' + koObj.moduleKey + '-op' + koObj.operationKey).trigger('click');
            }

        });
        roleViewModel.SelectedPermissions([]);
        $('.permissions').hide();
        $('.permission-note').fadeIn();
    }
    ,
    getFormatedPermissions: function() {
        var permissions = [];
        var selectedPerArray = roleViewModel.SelectedPermissions();
        var permission = '';
        var avaliableAppPermissions = roleViewModel.Role_AppPermissions();
        var applicationPermissionOb, moduleApplicaionPermissionOb, operationsPermissionOb;
        if (selectedPerArray != null) {
            selectedPerArray = selectedPerArray.sort();
            var counter = 0;
            for (appPer in selectedPerArray) { //for applicarions permissions
                var perLevels = selectedPerArray[appPer].split('-');
                var operationPermissionForAPPSelected = perLevels[2].substr(2); // operation
                var modulePermissionForAPPSelected = perLevels[1].substr(2); // module
                var applicationPermissionForAPPSelected = perLevels[0].substr(3); // application

                if (applicationPermissionOb != null) {
                    if (applicationPermissionOb.applicationPermission != applicationPermissionForAPPSelected) {//new app
                        permissions.push(applicationPermissionOb);
                        applicationPermissionOb = {'applicationPermission': applicationPermissionForAPPSelected, 'applicationModulesPermissions': []};
                    }
                }
                else {
                    applicationPermissionOb = {'applicationPermission': applicationPermissionForAPPSelected, 'applicationModulesPermissions': []};

                }

                if (moduleApplicaionPermissionOb != null) {
                    if (moduleApplicaionPermissionOb.applicationModulePermission != modulePermissionForAPPSelected) {//new app
                        applicationPermissionOb.applicationModulesPermissions.push(moduleApplicaionPermissionOb);
                        moduleApplicaionPermissionOb = {'applicationModulePermission': modulePermissionForAPPSelected, 'moduleOperationsPermissions': []};
                    }
                }
                else {
                    moduleApplicaionPermissionOb = {'applicationModulePermission': modulePermissionForAPPSelected, 'moduleOperationsPermissions': []};
                }

                if ($.inArray(operationPermissionForAPPSelected, moduleApplicaionPermissionOb.moduleOperationsPermissions) < 0) {
                    moduleApplicaionPermissionOb.moduleOperationsPermissions.push(operationPermissionForAPPSelected);
                }

                if (counter == (selectedPerArray.length - 1)) {
                    if ($.inArray(moduleApplicaionPermissionOb, applicationPermissionOb.applicationModulesPermissions) < 0) {
                        applicationPermissionOb.applicationModulesPermissions.push(moduleApplicaionPermissionOb);
                    }
                    if ($.inArray(applicationPermissionOb, permissions) < 0) {
                        permissions.push(applicationPermissionOb);
                    }
                }
                counter++;

            }

            return permissions;
        }

    },
    pauseContinueActions: function(action) {
        if (action)
            $('#save').attr('disabled', true);
        else
            $('#save').attr('disabled', false);
    }
    ,
    getRole: function() {
        var roleID = roleViewModel.Role_ID();
        rolesModelOperations.pauseContinueActions(true);
        ajaxObj = new Object();
        ajaxObj = {
            type: 'GET',
            url: {'controller': 'usersApi',
                'action': 'getRolePermissions',
                'mainURL': appsMainURLS.users,
                'params': {'roleID': roleID}}
        };
        router.sendRequest(ajaxObj, function(data) {
            //empty objects for each time 
            var Obj = jQuery.parseJSON(JSON.stringify(data));
            opStatus = Obj.opStatus;
            if (Obj.opStatus) {
                roleViewModel.Role_ID(Obj.rolesPermissions.Role_ID);
                roleViewModel.Role_Title(Obj.rolesPermissions.Role_Title);
                roleViewModel.Role_App(Obj.rolesPermissions.Role_App);
                $('.permissions, .permission-note').hide();
                $('#permession-' + roleViewModel.Role_App()).fadeIn();
                var arraySelected = Obj.rolesPermissions.permissions;
                for (var j in arraySelected) {
                    $('#' + arraySelected[j]).trigger('click');
                }
                roleViewModel.SelectedPermissions(arraySelected);
            }
            if (Obj.messages != null) {
                notify(listMassages(data));
            }
            rolesModelOperations.pauseContinueActions(false);
        });

    }
    ,
    addEditRole: function() {
        jsonObj = new Object();
        jsonObj.Role_ID = roleViewModel.Role_ID();
        jsonObj.Role_Title = roleViewModel.Role_Title();
        jsonObj.Role_App = roleViewModel.Role_App();
        jsonObj.applicationsPermissions = this.getFormatedPermissions();
        rolesModelOperations.pauseContinueActions(true);

        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'addEditRolePermissions',
                'mainURL': appsMainURLS.users},
            data: JSON.stringify(jsonObj),
        };
        router.sendRequest(ajaxObj, function(data) {
            if (data.opStatus) {
                opStatus = true;
            }
            rolesModelOperations.pauseContinueActions(false);
            unnotify();
            notify(listMassages(data));
        });
    },
    getRoles: function() {
        rolesSetArray = [];
        ajaxObj = new Object();
        ajaxObj = {
            type: 'GET',
            url: {'controller': 'usersApi',
                'action': 'getRolePermissions',
                'async': false,
                'mainURL': appsMainURLS.users}
        };
        router.sendRequest(ajaxObj, function(data) {
            //empty objects for each time 
            var Obj = jQuery.parseJSON(JSON.stringify(data));
            opStatus = Obj.opStatus;
            var i = 0;

            if (Obj.opStatus) {
                var perLevels = [];
                var modulePermissionForAPPSelected = null;
                var counter = 0;

                var Role_ID, Role_Title, Role_App, Role_Modules = null;
                for (var key in Obj.rolesPermissions) {
                    if (Obj.rolesPermissions[key] != null) {
                        Role_ID = Obj.rolesPermissions[key].Role_ID;
                        Role_Title = Obj.rolesPermissions[key].Role_Title;
                        Role_App = Obj.rolesPermissions[key].Role_App;
                        Role_Modules = '';
                        counter = 0;
                        var moduleOb = null;
                        var modulesRoles = [];
                        if (Obj.rolesPermissions[key].hasOwnProperty('permissions') && $.isArray(Obj.rolesPermissions[key].permissions))
                            for (appPer in Obj.rolesPermissions[key].permissions) {
                                moduleOb = null;
                                perLevels = Obj.rolesPermissions[key].permissions[appPer].split('-');
                                modulePermissionForAPPSelected = perLevels[1].substr(2); // module
                                moduleOb = getElementByKey(modulePermissionForAPPSelected, userConfigOb.userApplicationsModulesPermissionsView, 'keyModule');

                                if (moduleOb != null) {
                                    if (getElementByKey(moduleOb.value, modulesRoles) == null) { // not inserted before
                                        modulesRoles.push({'key': moduleOb.value});
                                        Role_Modules += moduleOb.value + (counter == (Obj.rolesPermissions[key].permissions.length - 1) ? '' : ',');

                                    }

                                }
                                counter++;
                            }
                        if (Role_Modules.substr(Role_Modules.length - 1) == ',')
                            Role_Modules = Role_Modules.slice(0, -1);

                        rolesSetArray.push([
                            Role_ID,
                            Role_App,
                            (i + 1),
                            getDrowCheckBoxId(Role_ID),
                            setDefaultNullValue(userAppPermissionsView[Role_App].value),
                            setDefaultNullValue(Role_Title),
                            setDefaultNullValue(Role_Modules),
                            getEditIcon(
                                    router.getURL({'controller': 'users',
                                        'action': 'addEditRole',
                                        'params': {'role': Role_ID}

                                    })
                                    )
                        ]);
                        i++;
                    }
                }
            }
        });
        return (rolesSetArray.length > 0) ? rolesSetArray : [];
    }
    ,
    getLookUpRoles: function() {
        var lookUpRolesArray = [];
        ajaxObj = new Object();
        ajaxObj = {
            type: 'GET',
            url: {'controller': 'usersApi',
                'action': 'getRoles',
                'mainURL': appsMainURLS.users}
        };
        router.sendRequest(ajaxObj, function(data) {
            var Obj = jQuery.parseJSON(JSON.stringify(data));
            var Role_ID, Role_Title, Role_App = null;

            for (var key in Obj.roles) {
                if (Obj.roles[key] != null) {
                    Role_App = Obj.roles[key].Role_App;
                    Role_ID = Obj.roles[key].Role_ID;
                    Role_Title = Obj.roles[key].Role_Title;
                    lookUpRolesArray.push({key: Role_ID, value: setDefaultNullValue(Role_Title), app: Role_App});
                }
            }
        });
        return lookUpRolesArray;
    },
    deleteRolesSet: function(data) {

        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'removeRolesSet',
                'mainURL': appsMainURLS.users},
            data: JSON.stringify(data),
        };

        router.sendRequest(ajaxObj, function(data) {
            opStatus=data.opStatus;
            unnotify();
            notify(listMassages(data));

        });
    },
    deleteCache: function() {
        url = router
                .getURL({
                    'controller': 'users',
                    'action': 'deleteCache'

                });

        ajaxObj = new Object();
        ajaxObj = {
            type: 'GET',
            url: {
                'controller': 'users',
                'action': 'deleteCache'

            },
        };
        router.sendRequest(ajaxObj, function() {
            unnotify();

        });
    }
};