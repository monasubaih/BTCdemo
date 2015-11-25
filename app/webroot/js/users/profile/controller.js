/************************/
//User Profile //
/************************/
// user Profile Model Declreation 
var jsonObj = userProfileModelDataSet = null;

userProfileModelsOperations = {
    //System Configrations Model initial function	

    ini: function() {

        //set contants values
        $('#maleSex').val(GENDER_CONSTANT.MALE);
        $('#femaleSex').val(GENDER_CONSTANT.FEMALE);


        ko.extenders.formInputChange = function(target, option) {

            var formInputsLength = $('#UserProfile').find('input,select').length;

            target.subscribe(function(newValue) {
                var emptyFormInput = 0;
                if (newValue != '') {

                    $('#clear_input').removeClass('disabled');
                }
                else {
                    $('#UserProfile').find('input,select').each(function() {
                        if ($(this).val() == '') {
                            emptyFormInput++;
                        }
                    });
                    if (emptyFormInput == formInputsLength) {
                        $('#clear_input').addClass('disabled');
                    }
                }
            }
            // console.log(option + ": " + newValue);
            );

            return target;
        };
        function getCountries() {
            var countriesArray = [];
            ajaxObj = new Object();
            ajaxObj = {
                type: 'GET',
                url: {'controller': 'configurationApi',
                    'action': 'getCountry',
                    'mainURL': appsMainURLS.configuration},
            };
            router.sendRequest(ajaxObj, function(data) {

                countriesObj = jQuery.parseJSON(JSON.stringify(data.countries));

                for (var key in countriesObj) {
                    if (countriesObj.hasOwnProperty(key)) {
                        countriesArray.push({key: countriesObj[key]["Country_ID"],
                            value: setInputLanguage(countriesObj[key]["Country_Name"])

                        });


                    }
                }
            }
            );
            countriesArray.unshift({key: '', value: _tl('-- Select --')});

            return countriesArray;


        }

        function getCountryCities($countryId) {
            if ($countryId != null) {
                var citiesArray = [];
                ajaxObj = new Object();
                ajaxObj = {
                    type: 'GET',
                    url: {'controller': 'configurationApi',
                        'action': 'getCountryCities',
                        'mainURL': appsMainURLS.configuration,
                        'params': {'Country_ID': $countryId}},
                };
                router.sendRequest(ajaxObj, function(data) {

                    citiesObj = jQuery.parseJSON(JSON.stringify(data.cities));

                    for (var key in citiesObj) {
                        if (citiesObj.hasOwnProperty(key)) {
                            citiesArray.push({key: citiesObj[key]["City_ID"],
                                value: setInputLanguage(citiesObj[key]["City_Name"])});
                        }
                    }
                }
                );
                citiesArray.unshift({key: '', value: _tl('-- Select --')});
                return citiesArray;
            }

        }
        //initial view models
        function userProfileViewModel() {
            var self = this;
            empInfo = getStorageVar('emplpoyeeInfo' + parent.userInfo.consumerKey + CURRENT_LANG+ tenentStoreVar, true).employeeInfo;
            if (empInfo) {
                self.Employee_Name = ko.observable(setInputLanguage(empInfo['Employee_Name'])).extend({formInputChange: ""}),
                self.Employee_Nik_Name = ko.observable(empInfo['Employee_Nik_Name']),
                        self.Employee_ID = ko.observable(empInfo['Employee_ID']),
                        self.Employee_Email = ko.observable(empInfo['Employee_Email']),
                        self.Employee_Mobile = ko.observable(empInfo['Employee_Mobile']),
                        self.Employee_Address = ko.observable(empInfo['Employee_Address']),
                        self.Employee_Birthday = ko.observable(empInfo['Employee_Birthday']),
                        self.Employee_Country_ID = ko.observable(empInfo['Employee_Country_ID']),
                        self.Employee_City_ID = ko.observable(empInfo['Employee_City_ID']),
                        self.Employee_Avatar = ko.observable(empInfo['Employee_Avatar']),
                        self.Employee_Gender = ko.observable(empInfo['Employee_Gender']),
                        self.Employee_Countires = ko.observableArray(getCountries()),
                        self.Employee_Country_Cities = ko.computed(function() {
                            if (self.Employee_Country_ID() != '')
                                return  getCountryCities(self.Employee_Country_ID());
                            else
                                return [defaultEmptySelect];

                        }),
                        //user

                        self.User_Password = ko.observable(''),
                        self.User_ID = ko.observable(empInfo['User_ID']);
            }
        }
        ;
        userProfileModels = new userProfileViewModel();

        applyBind(userProfileModels, $('#UserProfile'));

        $('#Employee_Avatar').val(empInfo['Employee_Avatar']);

        if (empInfo['Employee_Avatar'] != null)
            $('#thumbImg').attr("src", empInfo['Employee_SmallAvatar']);
        else
            $('#thumbImg').attr("src", DEFUALT_MEDIUM_THUMB);

    }
    ,
    //empty function for clear the configurations Model variables
    empty: function() {

        $('#maleSex').val(GENDER_CONSTANT.MALE);
        $('#femaleSex').val(GENDER_CONSTANT.FEMALE);

        userProfileModels.Employee_ID('');
        userProfileModels.Employee_Name(''),
                userProfileModels.Employee_Nik_Name(''),
                userProfileModels.Employee_Mobile('');
        userProfileModels.Employee_Email('');
        userProfileModels.Employee_Country_ID('');
        userProfileModels.Employee_City_ID('');
        userProfileModels.Employee_Address('');
        userProfileModels.Employee_Birthday('');
        userProfileModels.Employee_Avatar('');
        userProfileModels.Employee_Gender(GENDER_CONSTANT.MALE);

        userProfileModels.User_ID('');
        userProfileModels.User_Password('');
        $('#password_confirm').val('');
        $("#Employee_Country_ID").trigger("liszt:updated");
        $("#Employee_Country_ID").trigger("change");
    }

    ,
    //update user profile function for update Configurations 
    updateUserProfile: function(jsonCheck) {

        jsonObj = new Object();
        jsonObj.Employee_ID = userProfileModels.Employee_ID();
        jsonObj.Employee_Name = jQuery.parseJSON('{"' + CURRENT_LANG + '":"'
                + userProfileModels.Employee_Name() + '"}');// userProfileModels.Employee_Name()
        jsonObj.Employee_Nik_Name = userProfileModels.Employee_Nik_Name();												// ;
        jsonObj.Employee_Mobile = userProfileModels.Employee_Mobile();
        jsonObj.Employee_Address = userProfileModels.Employee_Address();
        jsonObj.Employee_Avatar = userProfileModels.Employee_Avatar();
        jsonObj.Employee_Birthday = userProfileModels.Employee_Birthday();
        jsonObj.Employee_Gender = userProfileModels.Employee_Gender();
        jsonObj.Employee_Country_ID = userProfileModels.Employee_Country_ID();
        jsonObj.Employee_City_ID = userProfileModels.Employee_City_ID();


        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {
                'controller': 'managementApi',
                'action': 'updateEmployeeProfileInfo',
                'mainURL': appsMainURLS.management
            },
            data: JSON.stringify(jsonObj),
        };

        router.sendRequest(ajaxObj, function(data) {

            if (data.updatedID != null) {
                opStatus = true;
                setStorageVar('emplpoyeeInfo' + parent.userInfo.consumerKey + CURRENT_LANG+ tenentStoreVar, null, true);
            }
            unnotify();
            notify(listMassages(data));

        });

    }



};
userInfoModelsOperations = {
    ini: function() {
        function getUserInfo() {

            var ajaxObj = new Object();
            ajaxObj = {
                type: 'GET',
                url: {'controller': 'clientUserConfigurationsApi',
                    'action': 'getUserPermission',
                    'mainURL': appsMainURLS.users},
                //	async:true	
            };
            router.sendRequest(ajaxObj, function(data) {
                if (data != null) {
                    if (data.userInfo != null) {
                        userInfo = data.userInfo;

                    }
                }
            });
        }
        //initial view models
        function userInfoViewModel() {
            getUserInfo();
            var self = this;
            self.User_Email = ko.observable(userInfo.User_Email),
                    self.User_OldPassword = ko.observable(''),
                    self.User_Password = ko.observable(''),
                    self.User_ID = ko.observable(userInfo.User_ID),
                    self.Sys_Langs = ko.observableArray(getSystemLanguagesDataSet()),
                    self.User_Lang = ko.observable((userInfo.hasOwnProperty('User_ConfigInfo') &&
                            userInfo.User_ConfigInfo != null) ? userInfo.User_ConfigInfo['currentLang'] : '');
        }
        ;
        userInfoModels = new userInfoViewModel();


        applyBind(userInfoModels, $('#UserLoginInfo'));


    }
    ,
    //empty function for clear the configurations Model variables
    empty: function() {

        userInfoModels.User_ID('');
        userInfoModels.User_OldPassword('');
        userInfoModels.User_Password('');
        userInfoModels.User_Email('');
        userInfoModels.User_Lang('');
        $('#password_confirm').val('');

    }

    , checkExistPassword: function() {
        jsonObj = new Object();
        jsonObj.User_ID = userInfoModels.User_ID();
        jsonObj.User_Password = userInfoModels.User_OldPassword();

        userInfoModelsOperations.pauseContinueActions(true);
        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'checkExistPassword',
                'mainURL': appsMainURLS.users},
            data: JSON.stringify(jsonObj),
        };

        router.sendRequest(ajaxObj, function(data) {
            ExistPassword = data.available;
            userInfoModelsOperations.pauseContinueActions(false);

        });

    }
    ,
    pauseContinueActions: function(action) {
        if (action)
            $('#save,#cancel').attr('disabled', true);
        else
            $('#save,#cancel').attr('disabled', false);


    }
    ,
    //update user profile function for update Configurations 
    updateUserInfo: function() {

        jsonObj = new Object();
        jsonObj.User_ID = userInfoModels.User_ID();
        jsonObj.User_Password = userInfoModels.User_Password();
        jsonObj.User_Email = userInfoModels.User_Email();
        jsonObj.User_ConfigInfo = {"currentLang": userInfoModels.User_Lang()};

        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {
                'controller': 'usersPortApi',
                'action': 'updateUser',
                'mainURL': appsMainURLS.users
            },
            data: JSON.stringify(jsonObj),
        };

        router.sendRequest(ajaxObj, function(data) {

            if (data.updatedID != null && data.opStatus) {
                opStatus = true;
                setStorageVar('userInfo' + userInfo.consumerKey + CURRENT_LANG+ tenentStoreVar, null, true);
            }
            unnotify();
            notify(listMassages(data));

        });

    }





};
