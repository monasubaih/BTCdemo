$(document).ready(function() {
    rolesModelOperations.ini();
    formEventINI.autoComplete();
    var params = router.getURLParam();
    if (params['role'] != '' && params['role'] != null) {
        if (getElementByKey(params['role'], roles) != null) {
            roleViewModel.Role_ID(params['role']);
            rolesModelOperations.getRole();
        }
    }
    var mainFormValidator = null;//inite validators

    $('#role_name').live('keyup', function(e) {
        e.preventDefault();
        var p = e.which;
        if (p == 13) {
            $(this).blur();
                $('#save').click();
        }
    });
    
    formEventINI.permissionVisablity();
    formEventINI.saveRowINI();
    formEventINI.clearInputs();
    gebo_validation.ttip();
});

formEventINI = {
    autoComplete: function() {
        // Show/Hide selected administration's permissions for the employee:
        roles = rolesModelOperations.getLookUpRoles();

        'use strict';
        // Initialize ajax autocomplete:
        $('.autocomplete-ajax').autocomplete({
            lookup: roles,
            lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
                var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
                return re.test(suggestion.value);
            },
            onSelect: function(suggestion) {
                roleViewModel.Role_ID(suggestion.key);
                roleViewModel.Role_Title(suggestion.value);
                roleViewModel.Role_App(suggestion.app);
                rolesModelOperations.getRole();
            }
        });


    },
    saveRowINI: function() {

        $('#save').live('click', function() {
            if (mainFormValidator.form()) {
                //Save Desicions	
                var btnAddAnother = {'title': _tl('add another role'), 'focus': true, 'callback': function() {
                        rolesModelOperations.empty();
                        messageDialog.hide();
                    }};
                var btnViewEmoployees = {'title': _tl('view roles'), 'callback': function() {
                        router.redirectTo({'controller': 'users', 'action': 'viewRoles'}, getGlobalVar('mainRotationTarget'));
                        messageDialog.hide();
                    }};
                opStatus = false;
                rolesModelOperations.addEditRole();
                var messageOperation = ((roleViewModel.Role_ID() == '') ? _tl('added') : _tl('updated'));

                if (opStatus) {
                   if (roleViewModel.Role_ID() != ''){
                        
                         rolesModelOperations.deleteCache();
                    }
                    messageDialog.multiBtnsMsg(roleViewModel.Role_Title() + _tl(' was ') + messageOperation + _tl(' successfully , what would you like to do next?'), [btnAddAnother, btnViewEmoployees], {width: '530px'});
                }
            }


        });
    },
    clearInputs: function() {
        $('#clear_input').click(function() {
            messageDialog.confirmMsg(_tl('are you sure you want to clear inputs?'),
                    function() {
                        $('.form_validation_ttip').find('input[name!=\'userPermissions[]\']').each(function() {
                            $(this).attr('value', '');
                        });
                        rolesModelOperations.empty();
                        mainFormValidator.resetForm();
                        messageDialog.hide();
                    });
        });
        $('#cancel').live('click', function(e) {
            messageDialog.confirmMsg(_tl('are you sure you want to cancel contrl roles'),
                    function() {
                        redirectTo(getURL({'controller': 'users', 'action': 'viewRoles'}), getGlobalVar('mainRotationTarget'));
                    }
            );
        });
    },
    changeAdministration: function() {
        rolesModelOperations.emptyPermissions();
        if (roleViewModel.Role_App() == '') {
            $('.permissions').hide();
            $('.permission-note').fadeIn();
        } else {
            $('.permissions, .permission-note').hide();
            $('#permession-' + roleViewModel.Role_App()).fadeIn();
        }
    }
    ,
    permissionVisablity: function() {
        $('#administration').focus(function()
        {
            $(this).data('oldValue', $(this).val());
        }
        );
        $('#administration').live('change', function() {
            if ($.isArray(roleViewModel.SelectedPermissions()) && roleViewModel.SelectedPermissions().length > 0)
                messageDialog.dangerConfirmMsg(_tl('are you sure you want to change adminsitration , this will uncheck all the selected permissions!'),
                        function() {
                            formEventINI.changeAdministration();
                            messageDialog.hide();
                        }, function() {
                    $('#administration').val($('#administration').data('oldValue'));
                    messageDialog.hide();
                });
            else {
                formEventINI.changeAdministration();
            }
        });

    }

};
// validation function 
gebo_validation = {
    ttip: function() {
        var rules = {
            role_name: {required: true},
            administration: {required: true}
        };

        var messages = {
            role_name: {required: _tl("Please select role name.")},
            administration: {required: _tl("Roles Administration is required.")}
        };

        cpanelValidator.validate('.form_validation_ttip', rules, messages);
        mainFormValidator = cpanelValidator.validator;
    }
};