var updatePassOpStatus = false;
var navigationViewModel = null
var layoutOperation = {
    navigationViewModel: function() {
        var self = this;
        //user password information
        self.oldPassword = ko.observable('');
        self.password = ko.observable('');
        self.confirmPassword = ko.observable('');
        self.updatePasswordModal = function() {
            $('#updatePasswordFormModal').modal('show');
        };
        self.emptyPasswordsInfo = function() {
            self.oldPassword('');
            self.password('');
            self.confirmPassword('');

        };

        getNavUserImage = ko.computed(function() {
            if ($.cookie('userThumb') != null)
                return $.cookie('userThumb');
        }, this);


    },
    updateUserPassowrd: function() {
        jsonObj = new Object();
        jsonObj.oldPassword = navigationViewModel.oldPassword();
        jsonObj.password = navigationViewModel.password();
        jsonObj.confirmPassword = navigationViewModel.confirmPassword();

        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'updateUserPassword',
                'mainURL': MAIN_HOST},
            data: JSON.stringify(jsonObj)
        };
        router.sendRequest(ajaxObj, function(data) {
            data = prepareResponse(data);

            if (data.opStatus) {
                updatePassOpStatus = true;
                navigationViewModel.emptyPasswordsInfo();
                $("#updatePasswordFormModal").modal('hide');
                alertify.success("Your password has been successfully updated");

            }
            else {
                alertify.error("Error - your password could not be updated");
            }
        });
    },
    sideBarViewModel: function() {



    },
    ini: function() {

        navigationViewModel = new layoutOperation.navigationViewModel();
        applyBind(navigationViewModel, $('#navigator'));
        sideBarViewModel = new layoutOperation.sideBarViewModel();
        applyBind(sideBarViewModel, $('#sideBar'));

    }
}



$(document).ready(function() {
    if ($('#navigator').length && $('#sideBar').length) {
        layoutOperation.ini();

    }
    $('#updatePasswordForm').formValidation({
        framework: "bootstrap",
        button: {
            selector: '#updatePasswordSubmitBtn',
            disabled: 'disabled'
        },
        icon: null,
        fields: {
            oldPassword: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your old Password'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password length must be at least 8 characters'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Please enter the new Password'
                    },
                    identical: {
                        field: 'confirmPassword',
                        message: 'Passwords do not match. Please enter the same password twice'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password length must be at least 8 characters'
                    }
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'Please enter the confirm Password'
                    },
                    identical: {
                        field: 'password',
                        message: 'Passwords do not match. Please enter the same password twice'
                    }
                },
                stringLength: {
                    min: 8,
                    message: 'The password length must be at least 8 characters'
                }
            }
        }
    }).on('success.form.fv', function(e) {
        // Prevent form submission
        e.preventDefault();
        layoutOperation.updateUserPassowrd();
        if (updatePassOpStatus) {
            updatePassOpStatus = false;
            $("#updatePasswordFormModal").modal('hide');
        }
    });

});

