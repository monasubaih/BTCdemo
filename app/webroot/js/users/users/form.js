$('#userPic').fileinput({
    uploadUrl: getURL({'controller': 'usersApi', 'action': 'uploadImage'}),
    allowedFileExtensions: ['jpg', 'png', 'gif', 'jpeg'],
    showCaption: false,
    dropZoneEnabled: false,
    maxFileCount: 1,
    autoReplace: true,
    //uploadAsync
});
$('#userPic').on('fileloaded', function (event, params) {
    
    userViewModel.checkUserPic(false);
    $(this).fileinput('upload');
});
$('#userPic').on('fileuploaded', function (event, data, previewId, index) {
    var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader, uploadStatus = false;
    if (response.hasOwnProperty('opStatus')) {
        if (response.opStatus) {
            if (response.hasOwnProperty('fileInfo'))
                if (response.fileInfo.hasOwnProperty('fileName')) {

                    userViewModel.User_Pic(response.fileInfo.fileName);
                    uploadStatus = true;
                }
        }
    }
    if (!uploadStatus)
        alertify.error("there was a problem while trying to upload user image");

});

$('#userPic').on('filesuccessremove', function (event, id) {
    (usersViewModelOperation.removeUserImage(userViewModel.User_Pic()))
    if (deletePicStatus) {
        $('#userPic').fileinput('reset');
        $('#userPic').fileinput('refresh');

        alertify.success("image was successfully deleted");
        deletePicStatus = false;
    }

});

var actionBtn = $('.site-action').actionBtn().data('actionBtn');
var $selectable = $('[data-selectable]');

$('.site-action-toggle', '.site-action').on('click', function (e) {
    var $selected = $selectable.asSelectable('getSelected');

    if ($selected.length === 0) {
        usersViewModelOperation.emptyUserItemViewModel();
        $('#userPic').fileinput('reset');
        $('#addUserForm').modal('show');
        e.stopPropagation();
    }

});

var validationOb = {
    User_FullName: {
        validators: {
            notEmpty: {
                message: 'Please enter name'
            },
            stringLength: {
                min: 6,
                max: 30
            }
        }
    },
    User_Email: {
        validators: {
            notEmpty: {
                message: 'Please enter email'
            },
            emailAddress: {
                message: 'The email address is not valid'
            },
            callback: {
                message: 'email exists or not valid',
                callback: function (value) {
                    if (userViewModel.updateMode())
                        return true;
                    if (value) {
                        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
                        if (pattern.test(value)) {
                            usersViewModelOperation.checkUserExist(value);
                            return !checkEmailExists;
                        }
                        else
                            return false;
                    }
                    else
                        return false;
                }
            }
        }
    },
    User_Password: {
        enabled: false,
        validators: {
            notEmpty: {
                message: 'Please enter Password'
            },
            stringLength: {
                min: 8,
                message: 'The password length must be at least 8 characters'
            }
        }
    },
    User_JobDes: {
        validators: {
            notEmpty: {
                message: 'Please enter user Overview'
            }
        }
    },
};
//$('#exampleFullForm').formValidation().destroy();
(function () {

    $('#exampleFullForm').formValidation({
        framework: "bootstrap",
        button: {
            selector: '#submitBtn',
            disabled: 'disabled'
        },
        icon: null,
        fields: validationOb
    }).on('success.form.fv', function (e) {
        // Prevent form submission
        e.preventDefault();
        usersViewModelOperation.addEditUser();
        if (opStatus) {
            opStatus = false;
            $("#addUserForm").modal('hide');
        }
    });


})();

$("#addUserForm").on('shown.bs.modal', function (e) {
    var formValidation = $('#exampleFullForm').data('formValidation');
    formValidation.resetField('User_FullName');
    formValidation.resetField('User_Email');
    formValidation.resetField('User_Telephone');
    formValidation.resetField('User_JobDes');
    formValidation.resetField('access-level');
    formValidation.resetField('Region');


    $('#userPic').fileinput('refresh');
    $('#userPic').fileinput('reset');
    if (!userViewModel.updateMode()) {
    }
    $('#exampleFullForm').formValidation('enableFieldValidators', 'User_Password', !userViewModel.updateMode())
    //data.element.data('fv.messages').find('.help-block[data-fv-for="' + data.field + '"]').hide();

});
