userProfileFormEventINI = {
    // form event initial variable
    saveRowINI: function() {
        // save row operation

        $('#save').live('click', function() {

            if (ttip_validator.form()) {

                opStatus = false;
                userProfileModelsOperations.updateUserProfile();

                if (opStatus) {
                    var filePath = empInfo['Employee_MinimumAvatar'].substring(0, empInfo['Employee_MinimumAvatar'].lastIndexOf('/') + 1);
                    filePath += userProfileModels.Employee_Avatar();
                    $('#user_Avatar').attr("src", filePath);

                    navModel.userNavTitle((userProfileModels.Employee_Nik_Name() != null) ? userProfileModels.Employee_Nik_Name() : setInputLanguage(userProfileModels.Employee_Name()));

                    messageDialog.notify('" ' + userProfileModels.Employee_Name() + ' "' + _tl(' your profile was was successfully updated '));

                }
            }

        });
    },
}
$(document).ready(function() {
    //* bootstrap datepicker
    $("#cities").fadeOut();
    userProfileModelsOperations.ini();
    userProfileFormEventINI.saveRowINI();
    $('.date').datepicker();
    gebo_validation.ttip();

    gebo_chosen = {
        init: function() {
            $(".chzn-select").chosen();
            $(".chzn-select-deselect").chosen({allow_single_deselect: true});
        }
    };
    $("#Employee_Country_ID").chosen().focus(function() {
        // Store the current value on focus, before it changes
        previous = $(this).val();
    }).live('change', function() {
        if ($('#Employee_Country_ID').val() != '') {
            $("#cities").fadeIn();
        }
        $("#Employee_Country_Cities_ID").trigger("liszt:updated");

    });
    if ($('#Employee_Country_ID').val() != '') {
        $("#cities").fadeIn();
    }
    gebo_chosen.init();

});

// validation function 
gebo_validation = {
    ttip: function() {
        var rules = {
            Employee_Name: {required: true},
            Employee_Address: {required: true},
            Employee_Mobile: {digits: true, minlength: 7, maxlength: 15},
            Employee_Birthday: {date: false, isdate: true},
        };

        var messages = {
            Employee_Name: {required: _tl("Employee name is required")},
            Employee_Address: {required: _tl("Employee address is required")},
            Employee_Mobile: { minlength: _tl('Please enter at least 7 characters'),
                maxlength: _tl('Please enter maximum 15 characters'),digits: _tl("Mobile must be in numbers")},
            Employee_Birthday: {isdate: _tl("Enter a valid date.")},
        };
        cpanelValidator.validate('.form_validation_ttip', rules, messages);
        ttip_validator = cpanelValidator.validator;
    }
};

/*
 * Upload Section
 * */
$(function() {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var param = {};
    var token = '';
    if (getCookie("userInfo") != null) {
        token = JSON.parse(getCookie("userInfo"))['token'];
        param.token = token;
    }
    var url = router.getURL({
        'controller': 'managementApi',
        'action': 'uploadImage',
        'params': param
    }, appsMainURLS.management);
    /*
     (window.location.hostname === 'blueimp.github.io' ||
     window.location.hostname === 'blueimp.github.io') ?
     '//jquery-file-upload.appspot.com/' : 'server/php/';.
     */
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        always: function(e, data) {

            notify(listMassages(data.result));
            messageDialog.actionMsg(_tl('Image was successfully uploaded'), function() {
                messageDialog.hide();
            });
        },
        done: function(e, data) {
            if (data) {
                if (data.result.opStatus) {
                    $('#deleteImage').fadeIn();
                    $('#newFile').fadeOut();
                    $('#changFile').fadeIn();
                    param.token = token;
                    param.file = data.result.fileInfo.fileName;
                    $('#thumbImg').attr("src", data.result.fileInfo.fileUrl);
                    $('#Employee_Avatar').val(data.result.fileInfo.fileName);
                    $('#deleteImage').removeClass('disabled');
                    $('#deleteImage').attr('url', router.getURL({
                        'controller': 'managementApi',
                        'action': 'uploadImage',
                        'params': param
                    }, appsMainURLS.management));
                    userProfileModels.Employee_Avatar(data.result.fileInfo.fileName);

                }
                else {
                    $('#deleteImage').addClass('disabled');
                }
            }
            /*
             $.each(data.result.files, function (index, file) {
             $('<p/>').text(file.name).appendTo('#files');
             });
             */
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                    'width',
                    progress + '%'
                    );
        }
    });
    $('#fileupload').bind('fileuploadstart', function(e) {
        $('#deleteImage').addClass('disabled');
    });
    $('#fileupload').bind('fileuploadstop', function(e) {
        $('#deleteImage').removeClass('disabled');
    });

    $('#deleteImage').click(function() {
        $('#newFile').fadeIn();
        $('#changFile').fadeOut();
        $('#deleteImage').addClass('disabled');
        if ($(this).attr('url') != '') {
            var defaultImage = $('#thumbImg').attr('default');
            $.ajax({
                url: $(this).attr('url'),
                type: "GET",
                async: false,
                success: function(data) {
                    // $('#save,#save_and_add').removeClass('disabled');
                    $('#thumbImg').attr("src", defaultImage);
                },
                error: function() {
                    //   $('#save,#save_and_add').removeClass('disabled');
                    unnotify();
                    notify(['error',
                        _tl('something went wrong, please try again later')]);
                }
            });
        }
        $('#progress .bar').css(
                'width',
                '0%'
                );
    });
});