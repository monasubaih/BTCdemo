/*
 * messages for confirmation
 * @author Hussam El-Kurd
 * */

function unnotify() {
    //$.pnotify_remove_all();	
    if ($('#fallr-wrapper').length > 0) {
        //messageDialog.hide();
        $('#fallr-wrapper').remove();

    }
    $(document).unbind('keydown', messageDialog.moveBtns);
    $(document).unbind('keydown', messageDialog.enterKeyAction);
}

function notify(msgArray) {
    if (jQuery.isArray(msgArray)) {

        var type = msgArray[0];
        var msg = msgArray [1];
        var obProp = {};
        /*(
         var opts = {
         title: "Massage",
         text: msg,
         addclass: "stack-bottomright",
         stack: {"dir1": "right", "dir2": "down", "push": "down"},
         icon:true,
         history:false,
         styling: "bootstrap",
         shadow: false,
         hide : true
         
         };
         */
        switch (type) {
            case "loading":
                /*
                 opts.title = false;
                 opts.icon=false;
                 opts.text = '<img src = "'+MAIN_CLINET_HOST+'css/img/filter-load.gif"/>  working on your request...';
                 opts.closer = false ;
                 opts.sticker - false ;
                 */
                // messageDialog
                break;
            case "error":
                /*
                 opts.title = "Error";
                 opts.type = "error";
                 */
                obProp.icon = 'modal-error';
                break;
            case "info":
                /*
                 opts.title = "info";
                 opts.type = "info";
                 */
                obProp.icon = 'modal-info';
                break;
            case "success":
                /*
                 opts.title = "Success";
                 opts.type = "success";
                 */
                obProp.icon = 'modal-check';

                break;
            default:
                ;
        }
        messageDialog.notify(msg, obProp);
        //   $.pnotify(opts);
    }
}
if (!String.prototype.trim) {
    // trim implmentation
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
function listMassages(data) {

    var massagesObj = jQuery.parseJSON(JSON.stringify(data));
    var msgs = new Array(2);
    var msgtext = '';
    if (massagesObj.messages != null) {
        for (var i = 0; i < massagesObj.messages.length; i++) {
            if (massagesObj.messages[i] != null) {
                msgs[0] = getMsgType(massagesObj.messages[i].type);
                msgtext += '- ' + massagesObj.messages[i].message + '<br>';
            }
        }
        msgs[1] = msgtext;

        return msgs;
    }
}

function getMsgType(flag) {
    var msgType = '';

    switch (flag) {

        case ERROR_MSG :
            msgType = 'error';
            break;

        case SUCC_MSG :
            msgType = 'success';
            break;

        case ERROR_VALIDATE_MSG :
            msgType = 'error';
            break;

    }
    return msgType;
}


var currentBtnEvent;
var messageDialog = {
    deleteConfirm:function(message, elements){
        var alertHtml = '<div class="example-wrap">';  
        alertHtml += '<h4 class="example-title">Confirm Dialog</h4>';
        alertHtml += '<p>'+message+'</p>';
        alertHtml += '<ul>';
        if(elements.length>0)
            for(var i=0;i< elements.length; i++){
                alertHtml += '<li>'+elements[i]+'</li>';
            }
        alertHtml += '</ul>';
        alertHtml += '<div class="example">';
        alertHtml += '<button type="button" class="btn btn-primary" id="confirm" data-plugin="alertify"';
        alertHtml += 'data-type="confirm" data-confirm-title="This is a confirm dialog"';
        alertHtml += 'data-success-message="Youve clicked OK" data-error-message="Youve clicked Cancel">Generate</button>';
        alertHtml += '</div></div>';

        return $(alertHtml).fadeIn('slow') ;
    },
    closeAlerts:function(){
        
        $('.alert').alert("close");
    },
    iniMessage: function(){
       $(document , window.top.document).find('body').scrollTop();
        messageDialog.destroy();
    },
    confirmMsg: function(title, yesCallBack, noCallBack, obProp, afterHideCallBack) {
        messageDialog.iniMessage();
        var confirmTitle = (title != '') ? title : _tl('are you sure');
        var confirmIcon = (obProp != null && obProp.hasOwnProperty('icon')) ? obProp.icon : 'modal-help';
        var position = (obProp != null && obProp.hasOwnProperty('position') != '') ? obProp.position : 'top';
       
        $(document).bind('keydown', messageDialog.moveBtns);

        $.fallr('show', {
            closeKey: false,
 	    position: position,           
            //  closeOverlay    : true,			
            afterShow: function() {
                $('#fallr-buttons').children().eq(0).focus();
                $(window.parent.document).scrollTop(0);
                        //$(document , window.top.document).animate({scrollTop:$(window.top.document).height() - $(window.top).height()}, 'slow');
                       // $(document , window.top.document).scrollTop($(window.top.document).height() - $(window.top).height());
                //console.log($(document , window.top.document).scrollTop());

            },
            afterHide: function() {
                unnotify();
                if (afterHideCallBack)
                    afterHideCallBack();
                $(document).unbind('keydown', messageDialog.moveBtns);

            },
            buttons: {
                button1: {text: _tl('Yes'), onclick: yesCallBack},
                button2: {text: _tl('Cancel'), onclick: noCallBack}
            },
            //    position    : 'center',
            content: '<p><h6>' + title + '</h6></p>',
            icon: confirmIcon
        });


    },
    dangerConfirmMsg: function(title, yesCallBack, noCallBack, obProp, afterHideCallBack) {
        messageDialog.iniMessage();
        var confirmTitle = (title != '') ? title : _tl('are you sure');
        var confirmIcon = (obProp != null && obProp.hasOwnProperty('icon')) ? obProp.icon : 'modal-error';
        var position = (obProp != null && obProp.hasOwnProperty('position') != '') ? obProp.position : 'top';

        $.fallr('show', {
            closeKey: false,
 	    position: position,                       
            // closeOverlay    : true,
            afterShow: function() {
                $('#fallr-buttons').children().eq(1).focus();
                $(document).bind('keydown', messageDialog.moveBtns);
                $(window.parent.document).scrollTop(0);
            },
            afterHide: function() {
                if (afterHideCallBack)
                    afterHideCallBack();
                $(document).unbind('keydown', messageDialog.moveBtns);

            },
            buttons: {
                button1: {text: _tl('Yes'), danger: true, onclick: yesCallBack},
                button2: {text: _tl('Cancel'), onclick: noCallBack}
            },
            //	    position    : 'center',
            content: '<p><h6>' + title + '</h6></p>',
            icon: confirmIcon
        });

    },
    actionMsg: function(title, callBack, obProp, afterHideCallBack) {
        messageDialog.iniMessage();
        var confirmTitle = (title != '') ? title : _tl('are you sure');
        var confirmIcon = (obProp != null && obProp.hasOwnProperty('icon')) ? obProp.icon : 'modal-check';
        var buttonTitle = (obProp != null && obProp.hasOwnProperty('btnTitle')) ? obProp.btnTitle : _tl('OK');
        var position = (obProp != null && obProp.hasOwnProperty('position') != '') ? obProp.position : 'top';


        $.fallr('show', {
            closeKey: false,
 	    position: position,            
            //  closeOverlay    : true,			
            afterShow: function() {
                $('#fallr-buttons').children().eq(0).focus();
                $(document).bind('keydown', messageDialog.enterKeyAction);
                $(window.parent.document).scrollTop(0);
            },
            afterHide: function() {
                if (afterHideCallBack)
                    afterHideCallBack();
                $(document).unbind('keydown', messageDialog.enterKeyAction);

            },
            buttons: {
                button1: {text: buttonTitle, onclick: callBack}
            },
            //    position    : 'center',
            content: '<p><h6>' + title + '</h6></p>',
            icon: confirmIcon
        });

    },
    multiBtnsMsg: function(title, btns, obProp) {
        messageDialog.iniMessage();
        var confirmTitle = (title != '') ? title : _tl('what would you like');
        var confirmIcon = (obProp != null && obProp.hasOwnProperty('icon')) ? obProp.icon : 'modal-check';
        var width = (obProp != null && obProp.hasOwnProperty('width')) ? obProp.width : '320px';
        var position = (obProp != null && obProp.hasOwnProperty('position') != '') ? obProp.position : 'top';
        var counter = 1;
        var buttonsOb = {};
        var focus = null;
        if (btns)
            for (var x in btns) {
                eval('buttonsOb.button' + counter + '= {text: \'' + btns[x].title + '\', danger: ' + ((btns[x].danager != null) ? btns[x].danager : false) + ', onclick: ' + btns[x].callback + '};');
                if (btns[x].focus == true)
                    focus = parseInt(counter - 1);
                counter++;
            }


        $.fallr('show', {
            buttons: buttonsOb,
            closeKey: false,
            afterShow: function() {
                $(window.parent.document).scrollTop(0);                
                if (focus != null) {
                    $('#fallr-buttons').children().eq(focus).focus();
                    $(document).bind('keydown', messageDialog.moveBtns);
                }
            },
            afterHide: function() {
                unnotify();
                $(document).unbind('keydown', messageDialog.moveBtns);

            },
            position: position,
            content: '<p><h6>' + confirmTitle + '</h6></p>',
            width: width,
            icon: confirmIcon
        });

    },
    multiMsgs: function(msgs) {
        var msgCounter = 0;
        messageDialog.iniMessage();
        if (msgs.hasOwnProperty(msgCounter) && msgs[msgCounter].length != 0) {
            showMsgWithNextContent(msgCounter)
        }
        function showMsgWithNextContent(key) {
            confirmTitle = (msgs[key].title != '') ? msgs[key].title
                    : _tl('what would you like');
            confirmIcon = (msgs[key].obProp != null && msgs[key].obProp
                    .hasOwnProperty('icon')) ? msgs[key].obProp.icon
                    : 'modal-check';
            width = (msgs[key].obProp != null && msgs[key].obProp
                    .hasOwnProperty('width')) ? msgs[key].obProp.width
                    : '320px';
            position = (msgs[key].obProp != null && msgs[key].obProp
                    .hasOwnProperty('position') != '') ? msgs[key].obProp.position
                    : null;
            value = (msgs[key].hasOwnProperty('val')) ? msgs[key].val : '';
            counter = 1;
            buttonsOb = {};
            focus = null;
            btns = msgs[key].btns;
            var allActionCheckBox = '';
            if (msgs[key].hasOwnProperty('rel') != '')
                allActionCheckBox = '<form><label class="checkbox checkbox-Fallr">'
                        + '<input id="doActionToAll"  type="checkbox"  name="doActionToAll" value="' + value + '"/ >'
                        + _tl(' Aplly To All')
                        + '</label></form>';
            if (btns)
                for (var x in btns) {

                    eval('buttonsOb.button'
                            + counter
                            + '= {text: \''
                            + btns[x].title
                            + '\', danger: '
                            + ((btns[x].danger != null) ? btns[x].danger
                                    : false) + ', onclick: ' + btns[x].callback
                            + '};');
                    if (btns[x].focus == true)
                        focus = parseInt(counter - 1);
                    counter++;
                }


            $.fallr('show', {
                closeKey: false,
                buttons: buttonsOb,
                afterShow: function() {
                    if (focus != null) {
                        $('#fallr-buttons').children().eq(focus).focus();
                        $(document).bind('keydown', messageDialog.moveBtns);
                        $(window.parent.document).scrollTop(0);
                    }
                },
                afterHide: function() {

                    if (fallrStatus) {
                        fallrStatus = false;
                        for (var i = msgCounter; i < getLength(msgs); i++) {

                            if (msgs[i].hasOwnProperty('rel') != ''
                                    && msgs.hasOwnProperty(i + 1) != '') {
                                if (msgs[i].rel == msgs[i + 1].rel)
                                    msgCounter = i + 1;

                            } else {
                                msgCounter++;
                                break;
                            }
                        }

                    } else {
                        msgCounter++;
                    }
                    if (msgs.hasOwnProperty(msgCounter)
                            && msgs[msgCounter].length != 0) {
                        if ($('#overlay').length > 0) {
                            //messageDialog.hide();
                            $('#overlay').remove();
                        }
                        showMsgWithNextContent(msgCounter)
                    }

                },
                position: position,
                content: '<p><h6>' + confirmTitle + '</h6></p>'
                        + allActionCheckBox,
                width: width,
                icon: confirmIcon
            });
        }

    },
    contentDialog: function(selector, obProp, afterHideCallBack) {
        messageDialog.iniMessage();
        var width = (obProp != null && obProp.hasOwnProperty('width')) ? obProp.width : '320px';
        var icon = (obProp != null && obProp.hasOwnProperty('icon') != '') ? obProp.icon : 'modal-at';
        var position = (obProp != null && obProp.hasOwnProperty('position') != '') ? obProp.position : 'top';

        $.fallr('show', {
            closeKey: false,
 	    position: position,            
            afterShow: function() {
                $('#fallr-buttons').children().eq(0).focus();
                $(window.parent.document).scrollTop(0);
            },
            afterHide: function() {
                unnotify();
                if (afterHideCallBack)
                    afterHideCallBack();
            },
            icon: icon,
            width: width,
            bound: selector,
            buttons: {}
        });

    }
    ,
    notify: function(title, obProp, afterHideCallBack) {
        messageDialog.iniMessage();
        var width = (obProp != null && obProp.hasOwnProperty('width')) ? obProp.width : '320px';
        var icon = (obProp != null && obProp.hasOwnProperty('icon') != '') ? obProp.icon : 'modal-check';
        var position = (obProp != null && obProp.hasOwnProperty('position') != '') ? obProp.position : 'top';        
;


        $.fallr('show', {
            afterShow: function() {
                //	sleep(3000);
                $('#fallr-buttons').children().eq(0).focus();
                $(document).bind('keydown', messageDialog.enterKeyAction);
                $(window.parent.document).scrollTop(0);
            },
            afterHide: function() {
                if (afterHideCallBack)
                    afterHideCallBack();
                $(document).unbind('keydown', messageDialog.enterKeyAction);

                //unnotify();		    	
            },
            closeKey: false,
            icon: icon,
            width: width,
            //  autoclose   : 3000,
            position: position,
            // useOverlay      : true, 
            buttons: {button1: {text: _tl('OK'), onclick: function() {
                        messageDialog.hide();
                    }}},
            content: '<p><h6>' + title + '</h6></p>'
        });
    },
    hide: function() {
        if ($('#fallr-wrapper').length > 0)
            $.fallr('hide');
        $(document).unbind('keydown', messageDialog.moveBtns);
        $(document).unbind('keydown', messageDialog.enterKeyAction);
        //$(document).bind('keydown', messageDialog.moveBtns);
    },
    destroy: function() {
        //$(document).unbind('keydown', messageDialog.moveBtns);
        //$(document).unbind('keydown', messageDialog.enterKeyAction);

        unnotify();
    },
    //actions
    enterKeyAction: function(event) {

        if (event.keyCode == 13) {
            event.preventDefault();
            $(document.activeElement).trigger('click');
            $(document.activeElement).blur();
            $(document).unbind('keydown', messageDialog.enterKeyAction);
        }
    },
    focusNext: function() {
        if (parseInt($(document.activeElement).index() + 1) <= $('#fallr-buttons').children().length)
        {
            var element = $(document.activeElement);
            //	$( document.activeElement ).blur();
            element.next().focus();
        }
    },
    focusPrev: function() {
        if (parseInt($(document.activeElement).index() - 1) >= 0)
        {
            var element = $(document.activeElement);
            //	$( document.activeElement ).blur();
            element.prev().focus();
        }
    },
    moveBtns: function(event) {
        event.preventDefault();
        var index = 0;
        var increment = parseInt($(document.activeElement).index() + 1);
        var minus = parseInt($(document.activeElement).index() - 1);

        $(document).bind('keydown', messageDialog.enterKeyAction);

        var currentFocus = null;
        if (event.keyCode == 37) {// left arrow
            if ($(document.activeElement).prev() != null)
                messageDialog.focusPrev();
            else //for rtl langs
                messageDialog.focusNext();
        }
        if (event.keyCode == 39) {  // right arrow

            if ($(document.activeElement).next() != null)
                messageDialog.focusNext();
            else
                messageDialog.focusPrev();
        }
        if (event.keyCode == 13) {
            $(document).unbind('keydown', messageDialog.moveBtns);

        }
    },
    triggerEnter: function() {
        var e = jQuery.Event("keydown");
        e.which = 13; // # Some key code value
        $(document).trigger(e);
    }
};


