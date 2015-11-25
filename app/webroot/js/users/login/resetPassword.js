/*********/
// Users //
/*********/

var FormEventINI = {
    // Form event initial variable	

};

var FormOperation = {
    // Form operations
    ini: function() {
        // call all the events in the start
        usersModelOperation.restPassIni();

    }
};
$(document).ready(function() {

    FormOperation.ini();
    var params = router.getURLParam();

    if (params['code'] != '' && params['code'] != null) {
    }
    ;


    $('#resetPasswordForm').formValidation({
        framework: "bootstrap",
        button: {
            selector: '#resetPasswordSubmitBtn',
            disabled: 'disabled'
        },
        icon: null,
        fields: {
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

        usersModelOperation.resetUserPassowrd(params['code']);
        if (resetPassOpStatus) {
            resetPassOpStatus = false;
            alertify.success("password successfuly reset, you will redirect to login page after 4 sec");
            setTimeout(function() {
                var URL = router.getURL({'controller': 'users', 'action': 'login'});
                router.redirectTo(URL);
            }, 4000);


        } else {
            alertify.error("Sorry, error in reset password please try again");

        }
    });


});
