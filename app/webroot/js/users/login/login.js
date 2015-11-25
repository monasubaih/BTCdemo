/*********/
// Users //
/*********/

var FormEventINI = {
    // Form event initial variable	
    signinRowINI: function() {

        //event.preventDefault();
        var serverStatus = null;
        var passVal = $('#User_Password').val();
        var email = $('#User_Email').val();

        usersModel.User_Password(passVal);
        usersModel.User_Email(email);
        serverStatus = usersModelOperation.login();
        if (serverStatus.status == "Authrized")
        {
            if (!serverStatus.sessionStatus) {
                alertify.alert("You are already signed in with another device, this session will now be ended", function(e) {
                    if (e) {
                        var URL = router.getURL({'controller': 'users', 'action': 'viewUsers'});
                        router.redirectTo(URL);
                    }
                });

            } else {

                var URL = router.getURL({'controller': 'users', 'action': 'viewUsers'});
                router.redirectTo(URL);
            }
        }

        else {
            //usersModelOperation.empty();
            alertify.error("Sorry, your login details are incorrect. Please contact a system administrator to help you to access your account.");

        }


    }

};

var FormOperation = {
    // Form operations
    ini: function() {
        // call all the events in the start
        usersModelOperation.ini();

    }
};
$(document).ready(function() {

    FormOperation.ini();
    $('#login_form')
            .formValidation({
                framework: "bootstrap",
                button: {
                    selector: '#SignIn',
                    disabled: 'disabled'
                },
                icon: null,
                fields: {
                    User_Email: {
                        validators: {
                            notEmpty: {
                                message: 'The username is required'
                            },
                            emailAddress: {
                                message: 'The email address is not valid'
                            }
                        }
                    },
                    User_Password: {
                        validators: {
                            notEmpty: {
                                message: 'The password is required'
                            },
                            stringLength: {
                                min: 8
                            }
                        }
                    }
                }
            })
            .on('success.form.fv', function(e) {
                // Prevent form submission
                e.preventDefault();

                var $form = $(e.target),
                        fv = $form.data('formValidation');

                // Use Ajax to submit form data
                FormEventINI.signinRowINI();

            });


});


