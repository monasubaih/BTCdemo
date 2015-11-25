/*********/
// Users //
/*********/
//Global Variables

var APP_HOST = "http://localhost/CRMApplicationsDropBox/";
var users = [];
var usersArray = [];
var usersObject = [];
var usersClasses = [];
var mainURL = APP_HOST + 'usersCRMSync/api/usersApi/';
// var mainURL='http://eng-hussam/CRMApplicationsDropBox/configurationCRMSync/api/configurationApi/';
var usersModelsOperationsObjects = {};
usersModelsOperationsObjects['usersModel'] = [];

var usersModelOperation = usersModel = resetPasswordViewModel = null;
var opStatus = false;
var serverStatus = {'messages': null, 'status': null, 'sessionStatus':null};
var forgetStatus = {'messages': null};
var resetPassOpStatus = false;
var ttip_validator = null;


