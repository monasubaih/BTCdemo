function oc(a)
{
    var o = {};
    for (var i = 0; i < a.length; i++)
    {
        o[a[i]] = '';
    }
    return o;

}



function clear_form_elements(ele) {
    $(ele).find(':input').each(function() {

        switch (this.type) {
            case 'password':
                $(this).val('');
                break;
            case 'select-multiple':
                $(this).val('');
                break;
            case 'select-one':
                $(this).val('');
                break;
            case 'text':
                $(this).val('');
                break;
            case 'textarea':
                $(this).val('');
                break;
            case 'hidden':
                $(this).val('');
                break;
            case 'checkbox':
                this.checked = false;
                break;
            case 'radio':
                this.checked = false;
                break;
        }

    });

}



function jqCheckAll(name, flag)

{
    var elem = $("form" + formID + " INPUT[@name=" + name + "][type='checkbox']");
    if (flag == 0)
    {
        elem.attr('checked', false);
        //for Admica
        elem.parent().removeClass('checked');
        elem.parent().parent().parent().parent().removeClass('DTTT_selected');
    }
    else
    {
        elem.attr('checked', true);
        //for Admica
        elem.parent().addClass('checked');
        elem.parent().parent().parent().parent().addClass('DTTT_selected');
    }
}

function removeNL(s) {
    return s.replace(/[\n]/g, '');

}

function getLength(thing) {

    var count = 0;
    for (var test in thing) {
        count++;
    }
    return count;

}






function modalWindow(url, parentParms) {
    deleteCookie("requestInfo");
    var jsonString = '{"controller":"' + getGlobalVar('currentController') + '","action":"' + getGlobalVar('currentAction') + '","currentLangKey":"' + getGlobalVar('currentLangKey') + '","currentLang":"' + getGlobalVar('currentLang') + '","activeAction":"' + getGlobalVar('activeAction') + '","inActiveAction":"' + getGlobalVar('inActiveAction') + '","deleteAction":"' + getGlobalVar('deleteAction') + '"}';
    setCookie("requestInfo", jsonString);
    $.colorbox({iframe: true, href: url, width: '70%', height: '60%',
        onClosed: function() {
            //reset Globals
            var parentReqObj = jQuery.parseJSON(getCookie("requestInfo"));
            setGlobalVar('currentController', parentReqObj.controller);
            setGlobalVar('currentAction', parentReqObj.action);
            setGlobalVar('currentLangKey', parentReqObj.currentLangKey);
            setGlobalVar('currentLang', parentReqObj.currentLang);
            setGlobalVar('activeAction', parentReqObj.activeAction);
            setGlobalVar('inActiveAction', parentReqObj.inActiveAction);
            setGlobalVar('deleteAction', parentReqObj.deleteAction);
            deleteCookie("requestInfo");
        }
    });

//    $.colorbox.resize();
}

function isInteger(s) {
    return (s.toString().search(/^-?[0-9]+$/) != 0);
}

function isDecimal(str) {
    return !(/^[-+]?[0-9]+(\.[0-9]+)?$/.test(str));
}
/*
 * check if the variable is number
 * @param int variable
 * @return boolean 
 * */
function isNumber(s) {
    var intRegex = /^\d+$/;
    var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
    return (intRegex.test(s) || floatRegex.test(s)) ? true : false;

}
function parseInputJsonString(stringJSON) {
    if (stringJSON != null) {
        var str = stringJSON.replace(new RegExp(/'/g), "\"");
        str = str.replace(new RegExp(/\\\\/g), "%");
        str = str.replace(new RegExp(/\\/g), "");
        str = str.replace(new RegExp(/%/g), "\\");
    }
    return str;
}
function prepareResponse(data) {
    if (data instanceof Object)
        return data;
    else if(data != null)
    return  $.parseJSON(data);
}



/************************************************************
 
 *  //////View Operations
 
 */