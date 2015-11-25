<?php

//error_reporting(1);
define('DS', strstr(PHP_OS, 'WIN') ? '\\' : '/');
define('APP_PATH', realpath(dirname(dirname(dirname(__FILE__)))) . DS);

include_once (APP_PATH . 'core' . DS . 'ini.php');
include_once (APP_PATH . 'core' . DS . 'appController.php');
include_once (APP_PATH . 'helper' . DS . 'cpanelLayout.php');
define('AJAX_LOADER_PATH_IMAGE_INDEX', mapFile2URL(CSS_PATH . 'images' . DS . 'ajax-loader.gif'));
define('AJAX_LOADER_IMAGE_INDEX', '<img class="ajaxLoader" src="' . AJAX_LOADER_PATH_IMAGE_INDEX . '"/>');

$requestInfo = (is_object($GLOBALS['registry']->session) ? json_decode($GLOBALS['registry']->session->getSession('requestSession'), true) : '');
$controller = ($GLOBALS['registry']->request->getGet('co') != '') ? base64url_decode($GLOBALS['registry']->request->getGet('co')) : $requestInfo['controller'];
$action = ($GLOBALS['registry']->request->getGet('ac') != '') ? base64url_decode($GLOBALS['registry']->request->getGet('ac')) : $requestInfo['action'];
//$ttag = ($GLOBALS['registry']->request->getGet('ttag') != '') ? base64url_decode($GLOBALS['registry']->request->getGet('ttag')) : $requestInfo['ttag'];
$tenantName = $GLOBALS ['registry']->tenantName;
$strJS = <<<JS

		
function setPagingHash(pageID){
setGlobalVar('pageID',pageID);
window.location.hash='pageID'+getGlobalVar('GET_PARAM_PATTERN')+pageID;
}
setGlobalVar('GET_PARAM_PATTERN', '%s');
setGlobalVar('currentController','%s');
setGlobalVar('currentAction','%s');
setGlobalVar('HTTP_HOST_PATH','%s');
setGlobalVar('HTTP_HOST_MASTER_PATH','%s');
        
setGlobalVar('AJAX_LOADER_IMAGE','%s');
setGlobalVar('AJAX_LOADER_IMAGE_PATH','%s');
		
setGlobalVar('CALENDER_FORMAT','%s');	
setGlobalVar('DEFAULT_THUMB','%s');	
setGlobalVar('WEB_ROOT','%s');
setGlobalVar('currentLangKey','%s');
setGlobalVar('currentLang','%s');	
setGlobalVar('currentViewLangKey','%s');
setGlobalVar('currentViewLang','%s');	
setGlobalVar('activeAction','%s');	
setGlobalVar('inActiveAction','%s');	
setGlobalVar('deleteAction','%s');	
setGlobalVar('sysLang',"%s");	
setGlobalVar('E_KEY','%s');
setGlobalVar('AJAX_LOADER_IMAGE_INDEX','%s');
setGlobalVar('AJAX_LOADER_IMAGE_INDEX_PATH','%s');
JS;

$strJS = sprintf($strJS, GET_PARAM_PATTERN, $controller, $action, HTTP_HOST_PATH, HTTP_HOST_PATH , AJAX_LOADER_IMAGE, AJAX_LOADER_IMAGE_PATH, CALENDER_FORMAT, DEFAULT_THUMB, ROOT, $requestInfo['currentLangKey'], $requestInfo['currentLang'], $requestInfo['currentViewLangKey'], $requestInfo['currentViewLang'], $requestInfo['activeAction'], $requestInfo['inActiveAction'], $requestInfo['deleteAction'], jsonInputEncode($GLOBALS ['sysLang']), SECURE_KEY, AJAX_LOADER_IMAGE_INDEX, AJAX_LOADER_PATH_IMAGE_INDEX, $timeZoneInSec
);

$strJS.='var mapArray=new Array();';

//write js mapping array
if (is_array($GLOBALS ['routerMapping']) and sizeof($GLOBALS ['routerMapping']) > 0)
    foreach ($GLOBALS ['routerMapping'] as $pattern => $linkArr) {

        $strJS.='mapArray[\'' . $pattern . '\']={\'controller\':\'' . $linkArr ['controller'] . '\',\'action\':\'' . $linkArr ['action'] . '\'' . (isset($linkArr ['format']) ? ',\'format\':\'' . $linkArr ['format'] . '\'' : '');
        if (isset($linkArr ['params']) and is_array($linkArr ['params'])) {
            $strJS.=',params:{';
            foreach ($linkArr ['params'] as $key => $val)
                $strJS.='\'' . $key . '\':\'' . $val . '\'';
            $strJS.='}';
        }
        $strJS.='};';
    }

$strJS.='setGlobalVar(\'mapArray\',mapArray);';
$strJS.='var pagesArray=new Array();';

//write js mapping array
if (is_array($GLOBALS ['registry']->menuSitePagesArray) and sizeof($GLOBALS ['registry']->menuSitePagesArray) > 0)
    foreach ($GLOBALS ['registry']->menuSitePagesArray as $key => $value) {
        $appPermission = $value ['permission'];
        if (is_array($value ['referTo'])) {
            foreach ($value ['referTo'] as $childArray) {

                if ($childArray ['permission'] != null) {
                    $modulePermission = $childArray ['permission'];
                }
                if (is_array($childArray ['referTo'])) {
                    $i = 0;
                    foreach ($childArray ['referTo'] as $child) {
                        if ($child ['permission'] != null) {
                            $operationPermision = $child ['permission'];
                            $permission = $GLOBALS ['registry']->constantResources ['applicationsPermissions'] [$appPermission] ['modules'] [$modulePermission] ['operations'] [$operationPermision] ['relate'];
                        } else {
                            $permission = "";
                        }

                        $strJS.='pagesArray[\'' . $child['title'] . '\']={\'link\':{\'controller\':\'' . $child ['link']['controller'] . '\',\'action\':\'' . $child['link'] ['action'] . '\'},\'shortCut\':\'' . $child['shortCut'] . '\',\'permission\':\'' . $permission . '\'};';
                    }
                }
            }
        }
    }

$strJS.='setGlobalVar(\'pagesArray\',pagesArray);';


$generatedMinfiedJS = $strJS;
//$generatedMinfiedJSSize= strlen ( $generatedMinfiedJS );
//ob_start ();
header('Content-Type: text/javascript');
//header ( 'Content-Length: ' . $generatedMinfiedJSSize );
header("Cache-Control: no-cash, must-revalidate");
die($generatedMinfiedJS);
