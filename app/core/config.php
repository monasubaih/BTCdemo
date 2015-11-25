<?php

/**
 * Core , Tidy PHP 
 * define the general setting
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
###################################################### Extentetions & Paths

/**
 * extentetions
 */
define('VIEW_EXT', '.php');
define('LAYOUT_EXT', '.php');

define('CONTROLLER_EXT', '.php');
define('MODEL_EXT', '.php');
define('HELPER_EXT', '.php');
define('ROOT', 'webroot');


/**
 * main paths
 */
//define ( 'APP_PATH', realpath ($directoryPath ) . DS );

define('WEB_ROOT', APP_PATH . ROOT . DS);

define('MODEL_PATH', APP_PATH . 'model' . DS);
define('CONTROLLER_PATH', APP_PATH . 'controller' . DS);
define('CORE_PATH', APP_PATH . 'core' . DS);
define('LANG_PATH', APP_PATH . 'languages' . DS);
define('VIEW_PATH', APP_PATH . 'view' . DS);
define('BP_PATH', APP_PATH . 'bp' . DS);

define('HELPER_PATH', APP_PATH . 'helper' . DS);
define('IMPORT_PATH', APP_PATH . 'imports' . DS);
define('ELEMENTS_PATH', VIEW_PATH . 'elements' . DS);
define('CASH_PATH', APPS_ROOT_PATH . 'appFiles' . DS . 'tmp' . DS);
define('LOG_PATH', APPS_ROOT_PATH . 'appFiles' . DS . 'logs' . DS);


define('CSS_PATH', WEB_ROOT . 'css' . DS);
define('JS_PATH', WEB_ROOT . 'js' . DS);
define('VENDOR_PATH', WEB_ROOT . 'vendor' . DS);
define('UPLOAD_PATH', WEB_ROOT . 'uploads' . DS);
define('CHART_PATH', WEB_ROOT . 'charts' . DS);

###################################################### 
/*
  Pageing
 */
define('POP_UP_DEFAULT_PAGEING_NUM', 3);




/**
 * Defaults
 */
define('DEFAULT_CONTROLLER', 'index');
define('DEFAULT_ACTION', 'error404');

define('MAIN_CONTROLLER', 'index');
define('MAIN_ACTION', 'home');


define('DEFAULT_DEBUG_MODE', TIDY_CONSTANTS::DEBUG_NO_MODE);
define('CALENDER_FORMAT', 'yy-mm-dd');
define('DATE_FORMAT', 'Y-m-d');
define('INDEX_DATE_FORMAT', 'D d M. Y');
define('CALENDER_DATE_FORMAT', 'm/d/Y');
define('DATE_CASH', 'Y_m_d_H_i_s');

define('DATE_DB', 'Y-m-d h:i:s');
define('NUMBER_FORMAT_PRECISION', 2);




/**
 * Cash Cores
 */
/**
 * js, css cash settings
 */
define('CASH_ARCHIVE_FOLDER', 'cash');
define('CACHE_FILES_LENGTH', '+5 days');
/**
 * variables , pages setting
 */
define('CASH_VAR_INTERVAL', 7200); //seconds
/*
 * pattern for get request Params
 */
define('GET_PARAM_PATTERN', '*');


//RSA Keys
/*
  P = 9990454949
  Q = 9990450271
  N = 99809143352650341179 - modulo
  M = 99809143332669435960
  E = 7 - public key
  D = 85550694285145230823 - private key

 */
define('Q_RSA', '9990450271');
define('P_RSA', '9990454949');




//images
define('UPLOAD_IMAGE_PATH', UPLOAD_PATH . 'images' . DS);


define('MAX_IMAGE_UPLOAD_SIZE', /* (int)(ini_get('upload_max_filesize'))*1024*1024in bytes */ 2097152);
define('MAX_ATTACH_UPLOAD_SIZE', (int) (ini_get('upload_max_filesize')) * 1024 * 1024);

//Customize
//Lists
define('MAILING_LIST_TYPE', 1);
define('MOBILE_LIST_TYPE', 2);
define('MEMBER_LIST_TYPE', 3);

define('SECURE_KEY', '7f5738f6d18dd4506c6ee32644282b65');
//API Keys
define('API_USER_NAME', 'hussam');
define('API_USER_PASS', '');
define('API_USER_KEY', SECURE_KEY);

//Mail Setting
define('SYS_EMAIL', 'sys@primaryengineer.com');
define('SYS_EMAIL_PASS', 'T1mDa^3i.y3p');
define('SYS_EMAIL_CLIENT_USER', SYS_EMAIL);
define('SYS_EMAIL_CLIENT_SMTP_SERVER', 'server.primaryengineer.com');
define('SYS_EMAIL_CLIENT_SMTP_PORT', '465');