<?php
session_start();
/**
 * initiator, Tidy PHP 
 * iniate the system according to request
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd 
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage Setting
 * @filesource
 */
error_reporting(/* E_ALL & ~ E_NOTICE & ~ E_WARNING  */0);
ob_start('ob_gzhandler');

include_once (APP_PATH . 'core' . DS . 'bind.php');

/**
 * include the required files
 */
include_once ('tidy.compress.php');

/**
 * @var object registry
 * @see AppRegistry
 */
$GLOBALS ['registry'] = \Registry::createRegistry();
$GLOBALS ['registry']->startLoadTime = $startTime;



include_once (APP_PATH . 'core' . DS . 'constants.php');
include_once (APP_PATH . 'core' . DS . 'config.php'); //for application

include_once (APP_PATH . 'core' . DS . 'database.php');

/*
 * set the loader configuration for zend library
 */
include_once ( 'Zend' . DS . 'Loader.php' );

require_once 'Zend' . DS . 'Loader' . DS . 'StandardAutoloader.php';

$autoLoader = new \Zend\Loader\StandardAutoloader(array(
    'fallback_autoloader' => true
        ));
$autoLoader->register();
$GLOBALS ['registry']->autoLoader = $autoLoader;


/**
 * auto load model and controllers classes
 */
function __autoload($className) {
    $modelClassFile = MODEL_PATH . $className . MODEL_EXT;

    if (file_exists($modelClassFile) == false) {
        ;
    } else
        include ($modelClassFile);
}



/**
 * @var object session
 * @see AppSession
 */
include_once (APP_PATH . 'core' . DS . 'permissions.php');

/**
 * @var messages
 * @see message
 */
$GLOBALS ['registry']->msg = new \Message ();


/**
 * include the required files
 */
include_once (APP_PATH . 'core' . DS . 'appApiController.php');

include_once (APP_PATH . 'core' . DS . 'appController.php');

include_once (APP_PATH . 'controller' . DS . 'abstractAppApi.php');


//include_once (APP_PATH . 'controller' . DS . 'appRPC.php');

foreach (glob(MODEL_PATH . "*.php") as $filename) {
    include $filename;
}



/**
 * @var object cleaner for cleaning string and request
 * @GLOBAL 
 * @see Cleaner
 */
$GLOBALS ['registry']->cleaner = new \Cleaner ();

/**
 * @var object request
 * @see Request
 */
$requestReg = \Request::createRequestRegistry();
/**
 * @var object restRequest
 * @see restRequest
 */
$restRequest = new \restRequest();

/**
 * @var object response
 * @see Response
 */
$responseReg = \Response::createResponseRegistry();

/**
 * @var object session
 * @GLOBAL  
 * @see Session

  if (!session_id()) {

  try {
  Zend_Session::start();
  } catch(Zend_Session_Exception $e) {
  session_start();
  }
  }
  $GLOBALS ['registry']->sessionZendOb=new Zend_Session_Namespace (SITE_NAME);
  $GLOBALS ['registry']->session = new Session ();
 */
/**
 * @var object Request
 * @GLOBAL
 * @see Request
 * define request in registry
 */
$GLOBALS ['registry']->request = $requestReg;


/*
  $GLOBALS['registry']->tenantDB = App::dbconnect($databaseTenantsConnectionConfig);
  //$GLOBALS['registry']->tenantDB->query('USE FEDERATION TenantsFederation (tid=1) WITH RESET, FILTERING=ON');
  $model = new model();
  $modelOb = $GLOBALS['registry']->tenantDB->quickFetchModelQuery('SELECT * FROM TENANTS' , $model);
 */
/**
 * @var object Rest Request to connect apis
 * @GLOBAL
 * @see restRequest
 * define restRequest in registry
 */
$GLOBALS ['registry']->restRequest = $restRequest;
//SSL configuration
/*
/* SSL config
$GLOBALS ['registry']->restRequest->setCustomeCurlParams(
        array(
            'CURLOPT_SSL_VERIFYPEER' => false,
            'CURLOPT_SSL_VERIFYHOST' => 2
        ));
*/
/**
 * @var object Request
 * @GLOBAL
 * @see Request
 * define response in registry
 */
$GLOBALS ['registry']->response = $responseReg;
/*
 * API Autountication Object
 * 
  $GLOBALS ['registry']->apiOauth=new ApiOauthServer('ripemd160',API_USER_NAME,API_USER_PASS,API_USER_KEY);
 */
$GLOBALS ['registry']->apiAuth = new \apiAuth();

/**
 * load up the template
 */
$GLOBALS ['registry']->template = new \View ();

/**
 * load up the router
 */

if (strpos(($GLOBALS ['registry']->request->server['QUERY_STRING']), 'Api') !== false) {
    $GLOBALS ['registry']->router = new RouterApi ();
} else {
    $GLOBALS ['registry']->router = new RouterMVC ();
}

$GLOBALS ['registry']->router->iniLoader();

/**
 * load up the router

$router = new \Router ();
$router->iniLoader();

if(strstr(strtolower($router->controller),'api')){
    $GLOBALS ['registry']->router = new \RouterApi ();
}
else{    
    $GLOBALS ['registry']->router = new \RouterMVC ();
}
 $GLOBALS ['registry']->router->iniLoader();
 * 
 */


/**
 * @var object cache
 * @GLOBAL
 * @see cash
 * define cash in registry
 */
if (!file_exists(CASH_PATH)) {
    mkdir(CASH_PATH, 0777, true);
}
$GLOBALS ['registry']->cache = \App::getCash(CASH_VAR_INTERVAL, CASH_PATH);

include_once (APP_PATH . 'core' . DS . 'langSettings.php');
include_once (LANG_PATH . DS . 'systemMessages.php');

/**
 * @var object cache
 * @GLOBAL
 * @see cash
 * define cash in registry
 */
$GLOBALS ['registry']->todayDate = date(CALENDER_DATE_FORMAT, time());
/**
 * @var object cache
 * @GLOBAL
 * @see Validate
 * define validator
 */
$GLOBALS ['registry']->validate = new \Validate($requestReg);

$writerErr = new \Zend_Log_Writer_Stream(LOG_PATH . 'errLog.log');
$writerLang = new \Zend_Log_Writer_Stream(LOG_PATH . 'langLog.log');
$GLOBALS ['registry']->logger = array('err' => new \Zend_Log($writerErr), 'user' => new \Zend_Log($writerUser), 'language' => new \Zend_Log($writerLang));
// log options
$GLOBALS ['registry']->logger ['err']->setTimestampFormat("d-M-Y H:i:s");
$GLOBALS ['registry']->logger ['user']->setTimestampFormat("d-M-Y H:i:s");


/*
 * constnats Arrays
 */
include_once (APP_PATH . 'core' . DS . 'constantResources.php');

/*
 * auth actions setting can be changed in ini()
 * */
$GLOBALS ['registry']->apiAuth = new apiAuth();
$GLOBALS ['registry']->apiAuth->tokenVerifyInfoArray['enableTenant'] = false;
//Clear the system App::clear();
//App::clear();
//deleteAllDirFiles ( CASH_PATH );				
\App::authenticateUser();


