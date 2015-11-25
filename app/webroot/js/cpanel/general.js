//Global variabls





///////////////////////////////////////////ICONS
var stringStartsWith = function(string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};
var _tr = function(string) {
    return string.toLocaleString();
};

// Global Functions
function unnotify() {
    $.pnotify_remove_all();
}

function notify(msgArray) {
    if (jQuery.isArray(msgArray)) {
        var type = msgArray[0];
        var msg = msgArray [1];
        var opts = {
            title: "Massage",
            text: msg,
            addclass: "stack-bottomright",
            stack: {"dir1": "right", "dir2": "down", "push": "down"},
            icon: true,
            history: false,
            styling: "bootstrap",
            shadow: false,
            hide: true

        };
        switch (type) {
            case "loading":
                opts.title = false;
                opts.icon = false;
                opts.text = '<img src = "' + MAIN_CLINET_HOST + 'css/img/filter-load.gif"/>  working on your request...';
                opts.closer = false;
                opts.sticker - false;
                break;
            case "error":
                opts.title = "Error";
                opts.type = "error";
                break;
            case "info":
                opts.title = "info";
                opts.type = "info";
                break;
            case "success":
                opts.title = "Success";
                opts.type = "success";
                break;
            default:
                ;
        }
        $.pnotify(opts);
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


function getInsertedId(data) {
    var Obj = jQuery.parseJSON(JSON.stringify(data));
    if (Obj.updatedID != null) {
        return Obj.updatedID;
    }
}

function getActiveIcon(flag) {
    if (flag == ACTIVE_STATUS) {
        return '<i flag = "' + flag + '" class="splashy-thumb_up"></i>';
    }
    else {
        return  '<i flag = "' + flag + '"  class="splashy-thumb_down"></i>';
    }
}

function getIsMasterIcon(flag) {
    if (flag == ACTIVE_STATUS) {
        return '<i flag = "' + flag + '"  class="splashy-star_full"></i>';
    } else {
        return  '<i flag = "' + flag + '" class="splashy-star_empty"></i>';
    }
}

function getChoosenIcon(flag) {
    if (flag == ACTIVE_STATUS) {
        return '<i flag = "' + flag + '" class="splashy-star_boxed_full"></i>';

    }
    else {
        return  '<i flag = "' + flag + '"  class="splashy-star_boxed_empty"></i>';
    }
}
function drawIcon(url, IconClass) {
    var icon = '<i class="' + IconClass + '"></i>';
    return ((url != '') ? '<a href="' + url + '" onclick="moveTo(event,$(this))">' + icon + '</a>' : icon);
}

function getTableActionIconTemplate(url, urlClass, iconClass, title, otherLinkOption, otherIconOption) {
    var url = (url != null) ? url : '';
    var urlClass = (urlClass != null) ? urlClass : '';
    var iconClass = (iconClass != null) ? iconClass : '';
    var title = (title != null) ? title : '';
    var otherLinkOption = (otherLinkOption != null) ? otherLinkOption : '';
    var otherIconOption = (otherIconOption != null) ? otherIconOption : '';

    return  '<a href="' + url + '" class="btn btn-sm btn-icon btn-pure btn-default on-default ' + urlClass + '" data-toggle="tooltip" data-original-title="' + title + '" ' + otherLinkOption + '><i class="icon ' + iconClass + '" aria-hidden="true" ' + otherIconOption + '></i></a>';
}
function getEditIcon(url) {
    return getTableActionIconTemplate(url, 'edit-row', 'wb-edit', 'Edit');
}
function getDeleteIcon(url) {
    return getTableActionIconTemplate(url, 'remove-row', 'wb-trash', 'Remove');
}

function actionsIcon(id) {
    return '<a class="deleteRow" data-tableid="dt_grid" title="Remove" href="#" value = "' + id + '"><i class="icon-trash"></i></a>';
}
function moreInfoIcon(id, type) {

    return '<a class="moreInfo " data-tableid="dt_grid"  href="#" value = "' + id + '" type=' + type + '><i class="' + MORE_INFORMATION_ICON + '"></i></a>';
}

function getModalIcon(url, icon, id, relModal, width, height) {
    var mq = window.matchMedia("(min-width: 500px)");
    if (mq.matches) {
        return '<a modal="' + url + '" class="openModalClass" id="' + id + '" relModal="' + relModal + '" modalWidth="' + width + '" modalHeight="' + height + '"> <i class="' + icon + '"></i> </a>';
    }
    else {
        return '<a modal="' + url + '" class="openModalClass" id="' + id + '" relModal="' + relModal + '" modalWidth="90" modalHeight="' + height + '"> <i class="' + icon + '"></i> </a>';
    }

}
function getModalText(url, text, id, relModal, width, height) {
    var mq = window.matchMedia("(min-width: 500px)");
    if (mq.matches) {
        return '<a modal="' + url + '" class="openModalClass" id="' + id + '" relModal="' + relModal + '" modalWidth="' + width + '" modalHeight="' + height + '"> ' + text + ' </a>';
    }
    else {
        return '<a modal="' + url + '" class="openModalClass" id="' + id + '" relModal="' + relModal + '" modalWidth="90" modalHeight="' + height + '"> ' + text + ' </a>';
    }

}


function getDrowCheckBoxId(id, checkedFlag, className) {
    var checked = '';
    if (parseInt(checkedFlag) == ACTIVE_STATUS)
        checked = "checked";
    return '<input type="checkbox" name="row_sel[]" value = "' + id + '" id = "' + id + '" class="row_sel ' + className + '" ' + checked + ' />';
}

function getDrowEditButton(id) {

    return		'<button class="btn editPropertyBtn " type="button" id="editPropertyBtn" value = "' + id + '" >' + _tl('Edit') + '</button>'
            ;
}

function getDrowCheckBox(name, checkedFlag) {
    var checked = '';
    if (parseInt(checkedFlag))
        checked = "checked";

    return '<input type="checkbox" name="' + name + '" value = "' + checkedFlag + '" class="row_sel" ' + checked + ' />';
}

function getDrowRadioButton(name, className, checkedFlag, value) {

    var checked = '';
    if (checkedFlag == ACTIVE_STATUS) {
        checked = 'checked="checked"';
    }
    return '<label class="radio"><input type="radio" name="' + name + '" value="' + value + '"  class="' + className + '" ' + checked + ' /></label>';
}


function GetURLParameter(sParam) {
    var url = window.location.hash;
    var sPageURL = url.substring(1);

    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('*');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}


// genrate multi language fields

function generateMltiLangFeilds(forFieldName, forFeildLabel, forFeildType, forFeildTabIndex, ModelName) {
    var multiLangFeilds = '';
    var tabIndex = forFeildTabIndex;

    for (key in SYS_LANG) {
        if (SYS_LANG[key]['ID'] != CURRENT_LANG) {
            tabIndex++;

            multiLangFeilds += ' <input type = "text" placeholder = "' + forFeildLabel + ' (' + SYS_LANG[key]['LABEL'] + ')" tabindex= ' + tabIndex + ' relto = "' + forFieldName + '" relid =  "' + SYS_LANG[key]['ID'] + '"  /> ';


        }
    }
    $('#' + forFieldName + '_lang').addClass("ttip_trans");
    $('#' + forFieldName + '_lang').attr('title', multiLangFeilds);
}

function collectMultiLangFeilds(FieldName) {

    $('[relid="' + FieldName + '"]').attr('relid', DEFAULT_LANG);
    var counter = 0;
    var temp = "{";
    $('[relto="' + FieldName + '"]').each(function() {
        temp += '"' + $(this).attr('relid') + '":"' + $.trim($(this).attr('value')) + '"';
        temp += (counter == ($('[relto="' + FieldName + '"]').length - 1)) ? '' : ',';
        counter++;
    });
    temp += '}';
    temp = jQuery.parseJSON(temp);
    return temp;

}

//add validation rules



function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}



/*
 * update jquery datatable cell 
 * @param string value will be inter in the cell
 * @param int row index (datatable row index)
 * @param int cell index(datatable cell index)
 * @param boolean flag if is counter index (datatable counter row index)
 * @param object datatable if need custom datatable 
 * @author Hussam El-Kurd
 * */
function updateDataTableCell(value, row, cell, counter, dataTable) {
    if (dataTable == null) {
        dataTable = oTable;
    }
    if (dataTable != null) {
        if (counter == true) {
            var pageInfo = dataTable.fnPagingInfo();
            row = ((parseInt(row) - 0) + 1) - (parseInt(pageInfo.iStart) - 0);
        }
        var columns = dataTable.fnSettings().aoColumns;
        var inVisableCounter = 0;
        for (var x in columns) {
            if (!columns[x].bVisible)
                inVisableCounter++;
        }
        cell = ((parseInt(cell) - 0) + 1) - (parseInt(inVisableCounter) - 0);
        $('#dt_grid > tbody tr:nth-child(' + row + ') > td:nth-child(' + cell + ')').html(value);
    }
}

/*
 * get element by key object
 * @param mixed key value
 * @param array contain objects {key:'',value:''}
 * @return mixed element value
 * @author Hussam El-Kurd
 * */
function getElementByKey(key, elements, keyName) {
    if (keyName == null)
        keyName = 'key';
    if (key != '' && key != null) {
        for (var i in elements) {
            if (elements[i][keyName] == key)
                return elements[i];
        }
    }
}

/*
 * add/remove mask to page
 * @param boolean mask
 * @param div to fade in fade out
 * @author Hussam El-Kurd
 */

function maskBody(mask, divID) {
    if (mask) {
        var docHeight = $(document).height();
        $("body").append("<div id='overlay'></div>");
        $(divID).hide();
        $("#overlay")
                .height(docHeight)
                .css({
                    'opacity': 0.6,
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'background': 'black url("' + MAIN_CLINET_HOST + 'css/img/filter-load.gif") 50% 50% no-repeat',
                    'width': '100%',
                    'z-index': 5000
                });
    }
    else {
        $(divID).fadeIn();
        var div = document.getElementById("overlay");
        if (div != null)
            div.parentNode.removeChild(div);
    }
}


function maskMainContainer(mask, divID) {
    if (mask) {
        var docHeight = $(document).height();
        $("body").append("<div id='overlay'></div>");
        $(divID).hide();
        $("#overlay")
                .height(docHeight)
                .css({
                    'opacity': 0.6,
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'margin-left': 'auto',
                    'margin-right': 'auto',
                    'background': 'white url("' + MAIN_CLINET_HOST + 'css/img/e-Lid-loader.gif") 50% 50% no-repeat',
                    'width': '100%',
                    'z-index': 5
                });
    }
    else {
        $(divID).fadeIn();
        var div = document.getElementById("overlay");
        if (div != null)
            div.parentNode.removeChild(div);
    }
}
/*
 * add/remove mask to page
 * @param boolean mask
 
 * @author Abeer Eldadah
 */

function maskAllBody(mask) {
    if (mask) {
        var docHeight = $(document).height();
        $("body").append("<div id='overlay'></div>");
        $("#overlay")
                .height(docHeight)
                .css({
                    'opacity': 0.3,
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'background': 'black url("' + MAIN_CLINET_HOST + 'css/img/filter-load.gif") 50% 20% no-repeat',
                    'width': '100%',
                    'z-index': 5000
                });
    }
    else {
        var div = document.getElementById("overlay");
        if (div != null)
            div.parentNode.removeChild(div);
    }
}

/*
 * cut words with specific length
 * @param string words
 * @param int words number
 * @param boolean add points at the end of string
 * @param int the total length words
 * @return string cutted string 
 * @author Hussam El-Kurd
 * */
function cutwords($words, $len, $addPoints, $totalLength) {
    if ($words.indexOf(" ") != -1) {
        var $x = $words.split(" ");
        var cutStr = '';
        if ($x.length > $len) {
            for (var $i = 0; $i < $len; $i ++)
                cutStr += $x [$i] + (($i == ($len - 1)) ? "" : " ");

        } else
            cutStr = $words;
        $totalLength = ($totalLength != null) ? ($totalLength - 1) : cutStr.length;
        cutStr = cutStr.substr(0, $totalLength) + (($addPoints) && ($totalLength < ($words.length - 1)) ? "..." : "");
        return cutStr;
    } else {
        return $words;
    }
}



/*
 * set value if null or empty
 * @author Hussam El-Kurd
 */
function setDefaultNullValue(value, defaultNull) {
    var defaultNullValue = (defaultNull != null) ? defaultNull : '--';
    return (value == '' || value == undefined || value == null) ? defaultNullValue : value;
}

/*
 * make clone of object 
 * @author Abeer Eldadah
 */
function clone(obj) {
    if (null == obj || "object" != typeof obj)
        return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr))
            copy[attr] = obj[attr];
    }
    return copy;
}
/*
 * knouckOut apply bindings
 * @author Hussam El-kurd
 * */
function applyBind(model, section) {
    if (!section)
        ko.applyBindings(model, $('.page')[0]);
    else
        ko.applyBindings(model, section[0]);
}

function cleanBind(section) {
    var element = '';
    if (!section)
        element = $('.page')[0];
    else
        element = section[0];
    ko.cleanNode(element);
}

function dropDraftConfirmation()
{

    var input = document.getElementsByTagName("input");
    btn = document.getElementsByClassName("btn");
    date = document.getElementsByClassName("date");
    var returnArr = [];

    for (var i = 0; i < input.length; i++) {
        if ((input[i].value == "" || input[i].value == 0 && input[i].class != 'btn' && (input[i].type == 'text' || input[i].type == 'email'))
                || (input[i].checked == false && input[i].type != 'text') || input[i].type == 'radio'
                || $.inArray(input[i], btn) != -1 || $.inArray(input[i], date) != -1
                ) {
            returnArr.push(false);
        }
        else {
            returnArr.push(true);
        }
    }
    ;
    returnArr = sort_unique(returnArr);
    if (returnArr[0] == false && returnArr[1] == true)
        return "You have to fill the whole form.";
}
function sort_unique(arr) {
    arr = arr.sort(function(a, b) {
        return a * 1 - b * 1;
    });
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
        if (arr[i - 1] !== arr[i]) {
            ret.push(arr[i]);
        }
    }
    return ret;
}
function printSelection(node, htmlNode) {
    if (node != null)
        var content = document.getElementById(node).innerHTML;
    else {
        var content = htmlNode;
    }
    var pwin = window.open('', 'print_content', 'width=800,height=1000');

    pwin.document.open();

    header = '<header class="container" style="font-family:Titillium;"><div class="row top-row"><img src="' + CSS_PATH + 'report/images/head.jpg">\n\
</div><div class="row top-info"><div class="col-sm-8 col-xs-8"></div>	<div class="col-sm-4 col-xs-4 print-info"></div> </div>	</header>';
    footer = '<footer class="container blue-info"><div class="row notes"><h4>' + _tl('Notes:') + '</h4><ul><li class="col-sm-12 col-xs-12"></li>\n\
					<li class="col-sm-12 col-xs-12"></li>\n\
					<li class="col-sm-12 col-xs-12"></li>\n\
				</ul>\n\
			</div>\n\
			<div class="row bottom-foot">\n\
				<span class="col-sm-3 col-xs-3">E-Mail: info@elid.com</span>\n\
				<span class="col-sm-1 col-xs-1">.</span>\n\
				<span class="col-sm-4 col-xs-4">Web: www.elidclient.com</span>\n\
				<span class="col-sm-1 col-xs-1">.</span>\n\
				<span class="col-sm-3 col-xs-3">Tel:08-28-0000</span>\n\
			</div>\n\
		</footer>';

    pwin.document.write('<html align="center">   <head>\n\
                     <meta charset="utf-8" /> <link rel="stylesheet" href="' + CSS_PATH + '/cpanel/style.css" />\n\
                        <link rel="stylesheet" href="' + VENDOR_PATH + '/bootstrap/css/bootstrap.min.css" />\n\
                        <style type="text/css">  body{font-size:16px; font-weight:bold;font-family:"Times New Roman", Times, serif; width:800px; min-height: 250px }\n\
                                 img{width:800px;} .table{width: 80% !important;}.container{width:800px !important;}\n\
                                    </style> </head> <body onLoad="window.print();" dir="rtl">\n\
                                            ' + header + '<div align="center">\n\
                                <hr /><div class="container content"> <div class="row">' + content + '</div>\n\
                                                            </div></div></body></html>');
}

function getFirstLastDateInMonth() {
    var dates = [];
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();
// Find last day in month
    var lastDayRaw = new Date(year, month, 0);
    var dLast = lastDayRaw.getDate();

// Format your date
    if (month < 10)
        month = "0" + month;
    var First = "01" + "/" + month + "/" + year; // First day in month
    var Last = dLast + "/" + month + "/" + year; // Last day in month
    dates['first'] = First;
    dates['last'] = Last;
    return dates;
}
function getFirstLastDateInYear() {
    var dates = [];
    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();
// Find last day in month
    var lastDayRaw = new Date(year, month, 0);
    var dLast = lastDayRaw.getDate();

// Format your date

    var First = "01" + "/" + '01' + "/" + year; // First day in month
    var Last = '31' + "/" + '12' + "/" + year; // Last day in month
    dates['first'] = First;
    dates['last'] = Last;
    return dates;
}

function datatableFixedHeader(table) {
    //oTableConf.aoColumns

    // initialize FixedHeader
    var offsetTop = 0;
    if ($('.site-navbar').length > 0) {
        offsetTop = $('.site-navbar').eq(0).innerHeight();
    }
    var fixedHeader = new FixedHeader(table, {
        offsetTop: offsetTop
    });

    // redraw fixedHeaders as necessary
    $(window).resize(function() {
        fixedHeader._fnUpdateClones(true);
        fixedHeader._fnUpdatePositions();

    });

}



function imageExists(url)
{
    var img = new Image();
    img.src = url;
    return img.height != 0;
}

function getTableActionWordTemplate(url, urlClass, title, otherLinkOption) {
    var otherLinkOption = (otherLinkOption != null) ? otherLinkOption : '';
    return  '<a href="' + url + '" class="clear_underline ' + urlClass + '" ' + otherLinkOption + '>' + title + '</a>';

}