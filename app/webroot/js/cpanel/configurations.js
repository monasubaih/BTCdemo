var PAGING_ITEMS = 5;

var CURRENT_LANG = 2;
var GENDER_CONSTANT = {'MALE': '', 'FEMALE': ''};
var defaultEmptySelect = {key: '', value: ('-- Select --')};
var async = false;

var ACTIVE_STATUS = '';
var IN_ACTIVE_STATUS = '';
var DELETE_STATUS = '';

var navigationViewModel = sideBarViewModel = null;

month = [];
month[1] = "January";
month[2] = "February";
month[3] = "March";
month[4] = "April";
month[5] = "May";
month[6] = "June";
month[7] = "July";
month[8] = "August";
month[9] = "September";
month[10] = "October";
month[11] = "November";
month[12] = "December";
//general data grid object 
var oTable = null;
var oTableConf = {
    responsive: true,
    "iDisplayLength": PAGING_ITEMS,
    "bPaginate": true,
    "sPaginationType": "full_numbers",
    "sDom": "<<f>><rt><<i><p>>",
    "bDeferRender": false,
    "bProcessing": false,
    "bInfo": true,
    "bRetrieve": true,
    "autoWidth": false
};
var oSpecialTableConf = {
    responsive: true,
    "iDisplayLength": PAGING_ITEMS,
    "bPaginate": true,
    "sPaginationType": "full_numbers",
    "sDom": "<rt><<p>>",
    "bDeferRender": false,
    "bProcessing": false,
    "bInfo": true,
    "bRetrieve": true,
    "autoWidth": false
};
//constants
var userLevels = [];
var permissionHierarchy = [];
var regions = [];
var orgsTypes = [];
var SCHOOL_ORG_TYPE = MISCELANIOUS_ORG_TYPE = FUNDER_ORG_TYPE = '';

var idleTime = 0;




