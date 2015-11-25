gridOperation = {
    deleteConfirm: function (id) {
        var $selected = [];
        if (id) {
            $selected.push({'value': id});
        }
        else
            $selected = $('[data-selectable]').asSelectable('getSelected');
        var alertHtml = gridOperation._prepareTheActionUserList($selected);

        alertify.confirm("Are you sure you want to delete the following users? " + alertHtml + "", function (e) {
            if (e) {
                for (var i = 0; i < $selected.length; i++) {
                    var userModel = usersViewModel.getUserItemByID($selected[i].value);

                    if (usersViewModelOperation.checkActionPermissiontToDelete(userModel, true)) {
                        usersViewModel.associatedItemIds.push($selected[i].value);
                    }
                    else {

                    }
                }
                if (usersViewModel.associatedItemIds().length > 0) {
                    usersViewModel.removeUsers();
                    if (opStatus) {
                        var actionBtn = $('.site-action').actionBtn().data('actionBtn');
                        $('[data-selectable]').asSelectable('getSelected');
                        if ($('[data-selectable]').asSelectable('getSelected').length === 0) {

                            $('.site-action').actionBtn().data('actionBtn').hide();
                        }
                        $.slidePanel.hide();
                        alertify.success("User(s) deleted successfully");
                    }
                    else
                        alertify.error("there was a problem while trying to delete users, please re delete the users");
                } else {
                    alertify.error("please select users to delete");

                }
            } else {

            }
        });


    },
    activeCSS: function (element) {
        $('.activeList').removeClass('activeList');
        $(element).addClass('activeList');

    },
    refreshEvent: function () {

        $('[data-action="refresh"]', '.site-action').on('click', function () {
            usersViewModel.filterUsersText('');
            usersViewModel.associatedItemIds([]);
            usersViewModelOperation.restRegions();            
            usersViewModelOperation.getUsers();
            gridOperation.activeCSS($('#allUsersLink'));

        });
    },
    deleteUserEvent: function () {

        $('[data-action="trash"]', '.site-action').on('click', function () {
            gridOperation.deleteConfirm();
        });
    },
    clearUserEvent: function () {

        $('[data-action="clearAction"]', '.site-action').on('click', function () {
            var $selected = $('[data-selectable]').asSelectable('getSelected');
            usersViewModel.associatedItemIds([]);
            $('#select_all').attr('checked', false);
            $('.animation-fade').removeClass('active');

        });
    },
    _prepareTheActionUserList: function ($selected) {
        var listText = '<ul>';
        for (var i = 0; i < $selected.length; i++) {
            item = usersViewModel.getUserItemByID($selected[i].value);

            //list.push(item.getUserFullName());
            listText += '<li>' + item.User_FullName() + '</li>';
        }
        listText += '</ul>';
        return listText;
    },
    //regions actions 
    removeRegionHtml: function (element) {
        element.parents('.list-group-item').remove();

    },
    regionsEventControl: function () {
        $(document).on('click', '[data-toggle="list-delete"]', function () {
            var $btn = $(this),
                    $list = $btn.parents('.list-group-item'),
                    $content = $list.find('.list-content'),
                    $editable = $list.find('.list-editable');

            $content.hide();
            $editable.show();
            $editable.find('input:first-child').focus().select();
        });
        $(document).on('click', '[data-toggle="list-delete"]', function () {
            var $btn = $(this),
                    $list = $btn.parents('.list-group-item'),
                    $content = $list.find('.list-content'),
                    $editable = $list.find('.list-editable');

            $content.hide();
            $editable.show();
            $editable.find('input:first-child').focus().select();
        });
        $(document).on('click', '[data-toggle="list-editable"]', function () {
            var $btn = $(this),
                    $list = $btn.parents('.list-group-item'),
                    $content = $list.find('.list-content'),
                    $editable = $list.find('.list-editable');

            $content.hide();
            $editable.show();
            $editable.find('input:first-child').focus().select();
        });

        $(document).on('keydown', '.list-editable [data-bind-editable]', function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);

            if (keycode == 13 || keycode == 27) {
                var $input = $(this),
                        bind = $input.data('bind-editable'),
                        $list = $input.parents('.list-group-item'),
                        $content = $list.find('.list-content'),
                        $editable = $list.find('.list-editable'),
                        $update = bind ? $list.find(bind) : $list.find('.list-text');

                if (keycode == 13) {
                    //update the value to remote 
                    var regionID = $input.data('id');

                    usersViewModelOperation.addEditRegion(((regionID) ? regionID : null), $input.val());
                    if (opStatus) {
                        alertify.success($input.val() + ' ' + ((regionID) ? 'Updated' : 'Added') + "  successfully");
                        if (updatedID) {
                            gridOperation.removeRegionHtml($input);
                            $input.data('id', updatedID);
                            usersViewModelOperation.addRegionViewItem(updatedID, $input.val());
                        }
                        $update.html($input.val());
                        $('[data-action="refresh"]', '.site-action').trigger('click');
                    }
                    else {
                        //$update.html($input.val());
                        alertify.error("there was a problem while trying to add/update Region, please contact to support");

                    }
                } else {
                    $input.val($update.text());
                }

                $content.show();
                $editable.hide();
            }
        });

        $(document).on('click', '[data-toggle="list-editable-close"]', function () {
            var $btn = $(this),
                    $list = $btn.parents('.list-group-item'),
                    $content = $list.find('.list-content'),
                    $editable = $list.find('.list-editable'),
                    $input = $list.children().find("input");                    

                    $content.show();
                    $editable.hide();
                    if($input.data('id') == ''){
                        gridOperation.removeRegionHtml($input);
                    }
        });

    },
    deleteRegionConfirm: function (regionItemView) {
        alertify.confirm("Are you sure you want to delete " + regionItemView.Region_Title() + " Region ?", function (e) {
            if (e) {
                regionItemView.deleteRegion();
                if (regionDeleteStatus) {
                    alertify.success("Region deleted successfully");
                    regionDeleteStatus = false;
                    $('[data-action="refresh"]', '.site-action').trigger('click');

                } else
                    alertify.error("there was a problem while trying to delete Region, please contact to support");
            }

        });

    }
};


$(document).ready(function () {
    usersViewModelOperation.ini();
    //usersViewModelOperation.getUsers();
    gridOperation.deleteUserEvent();
    gridOperation.clearUserEvent();
    gridOperation.refreshEvent();
    gridOperation.regionsEventControl();
});

/*
 * Validation form 
 */
(function (document, window, $) {
    'use strict';
    var Site = window.Site;
    $(document).ready(function ($) {
        Site.run();
    });


})
        (document, window, jQuery);
