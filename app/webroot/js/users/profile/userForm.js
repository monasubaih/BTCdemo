userInfoFormEventINI = {
    // form event initial variable
    saveRowINI: function() {
        // save row operation

        $('#save')
                .live(
                        'click',
                        function() {

                            if (ttip_validator.form()) {

                                opStatus = false;
                                userInfoModelsOperations.updateUserInfo();

                                if (opStatus) {
                                    CURRENT_LANG = userInfoModels.User_Lang();
                                    userInfo = JSON
                                            .parse(getCookie("userInfo"));
                                    TTL = userInfo['TTL'] / (60 * 60 * 24);
                                    if (TTL < 1) {
                                        TTL = 0;
                                    }
                                    serializeValue = SYS_LANG[userInfoModels
                                            .User_Lang()].SHORT;
                                    setCookie("viewLang", serializeValue, TTL,
                                            '/');
                                    messageDialog
                                            .actionMsg(_tl('your profile was was successfully updated '), function() {
                                                userInfoModelsOperations.empty();
                                                router.redirectTo({
                                                    'controller': 'users',
                                                    'action': 'editUserInfo'
                                                }, getGlobalVar('mainRotationTarget'));
                                            });
                                }
                            }

                        });
    },
}
$(document).ready(function() {

    userInfoModelsOperations.ini();
    $('#User_OldPassword').val("");
    userInfoFormEventINI.saveRowINI();

    gebo_validation.ttip();
    $.validator.addMethod("checkExistPassword",
            function(value, element, params) {
                if (userInfoModels.User_OldPassword() != '') {
                    userInfoModelsOperations.checkExistPassword();
                    return ExistPassword;
                }
                else
                    return true;
            }, _tl("The entered password is wrong")
            );
    $.validator.addMethod("passwordCheck",
            function(value, element, params) {
                if (userInfoModels.User_OldPassword() !== '' && userInfoModels.User_Password() !== '') {
                    return (value != '') ? true : false;
                }
                else
                    return true;
            }, _tl("Please enter password")
            );


});

//* password strength checker
gebo_pass_check = {
    init: function() {
        $("#password_value").complexify({
            minimumChars: '6',
            strengthScaleFactor: '0.5'
        }, function(valid, complexity) {
            if (!valid) {
                $('#pass_progress .bar').css({'width': complexity + '%'}).parent().removeClass('progress-success').addClass('progress-danger');
            } else {
                $('#pass_progress .bar').css({'width': complexity + '%'}).parent().removeClass('progress-danger').addClass('progress-success');
            }
        });
    }
};

// validation function 
gebo_validation = {
    ttip: function() {
        var rules = {
            User_OldPassword: {checkExistPassword: true, minlength: 6},
            User_Email: {email: true},
            password_value: {passwordCheck: true, minlength: 6},
            password_confirm: {passwordCheck: true, minlength: 6, equalTo: "#password_value"},
        };

        var messages = {
            User_OldPassword: {checkExistPassword: _tl("You entered wrong password, please enter your password to change it."), minlength: _tl("Your password must consist of at least 6 characters"),
            },
            User_Email: {email: _tl("Please enter a valid email address.")},
            password_value: {passwordCheck: _tl("Please enter the password."), minlength: _tl("Your password must consist of at least 6 characters")},
            password_confirm: {
                passwordCheck: _tl("Password confirmation is required."),
                minlength: _tl("Your password must consist of at least 6 characters"),
                equalTo: _tl("Please enter the same password as above.")}

        };
        cpanelValidator.validate('.form_validation_ttip', rules, messages);
        ttip_validator = cpanelValidator.validator;
    }
};

	