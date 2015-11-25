/*********/
// Users //
/*********/
// Users Model Declreation 
var jsonObj = usersModelDataSet = null;

usersModelOperation = {
    ini: function() {

        //iniate view models
        function usersViewModel() {
            var self = this;
            self.User_Email = ko.observable('');
            self.User_Password = ko.observable('');
        }

        usersModel = new usersViewModel();
        applyBind(usersModel);

    }
    ,
    resetPasswordViewModel: function() {
        var self = this;
        //user password information
        self.password = ko.observable('');
        self.confirmPassword = ko.observable('');

        self.emptyPasswordsInfo = function() {
            self.oldPassword('');
            self.password('');
            self.confirmPassword('');

        };

    },
    restPassIni: function() {
        resetPasswordViewModel = new usersModelOperation.resetPasswordViewModel();
        applyBind(resetPasswordViewModel);
    },
    empty: function() {
        //empty function for clear the users Model variables	
        usersModel.User_Email('');
        usersModel.User_Password('');

    }

    ,
    login: function() {
        // authorize login user
        jsonObj = new Object();
        jsonObj.User_Email = c2sencrypt(usersModel.User_Email(), getGlobalVar('E_KEY'));
        jsonObj.User_Password = c2sencrypt(usersModel.User_Password(), getGlobalVar('E_KEY'));

        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'loginUser',
                'mainURL': MAIN_HOST},
            data: JSON.stringify(jsonObj),
        };

        router.sendRequest(ajaxObj, function(data) {
            data = prepareResponse(data);
            if (data.operation) {
                if (data.userInfo) {
                    $.cookie('userThumb', data.userPic,{'path':'/'});
                    $.cookie('userID', data.userID,{'path':'/'});
                    $.cookie('userLevel', data.userInfo.userLevel,{'path':'/'});

                }
                serverStatus.status = "Authrized";
            }
            else
                serverStatus.status = "Not Authrized";

            serverStatus.messages = data.messages;
            serverStatus.sessionStatus =data.sessionStatus;
            //unnotify ();

            //	notify (listMassages(data));

        });
        return serverStatus;

    },
    forgetPassword: function() {
        jsonObj = new Object();
        jsonObj.User_Email = usersModel.User_Email();
        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'forgetPassword',
                'params': {'email': usersModel.User_Email()},
                'mainURL': MAIN_HOST},
            data: JSON.stringify(jsonObj),
        };

        router.sendRequest(ajaxObj, function(data) {
            data = prepareResponse(data);
            if (data.opStatus) {
                opStatus = true;
            } else {
                forgetStatus.messages = data.messages[0].message;
            }


        });

    }
    ,
    resetUserPassowrd: function(code) {
        jsonObj = new Object();
        jsonObj.FT_Code = code;
        jsonObj.password = resetPasswordViewModel.password();
        jsonObj.confirmPassword = resetPasswordViewModel.confirmPassword();
        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'resetPassword',
                'mainURL': MAIN_HOST},
            data: JSON.stringify(jsonObj),
        };

        router.sendRequest(ajaxObj, function(data) {
            data = prepareResponse(data);
            if (data.opStatus)
                resetPassOpStatus = true;


        });
    }
};
