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
        usersModelOperation.ini();

    }
};
$(document).ready(function() {

    FormOperation.ini();
    $('#forgetPasswordForm')
            .formValidation({
                framework: "bootstrap",
                button: {
                    selector: '#submitBtn',
                    disabled: 'disabled'
                },
                icon: null,
                fields: {
                    User_Email: {
                        validators: {
                            notEmpty: {
                                message: 'The email can\'t be empty'
                            },
                            emailAddress: {
                                message: 'The email address is not valid'
                            }
                        }
                    }
                }
            })
            .on('success.form.fv', function(e) {
                // Prevent form submission
                e.preventDefault();

                usersModelOperation.forgetPassword();
                if (opStatus) {
                    alertify.success("please follow the instruction sent to your email to reset paasword");

                } else {
                    alertify.error(forgetStatus.messages);
                }

                var $form = $(e.target),
                        fv = $form.data('formValidation');


            });


});


