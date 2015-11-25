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
define('TIDY_VERSION', 'tidy2014.3');
define('TIDY_APP_PATH', realpath((dirname(APP_PATH))) . DS);
define('APPS_ROOT_PATH', realpath(((APP_PATH))) . DS);

set_include_path(
          TIDY_APP_PATH. 'tidy'. DS . TIDY_VERSION . DS . PATH_SEPARATOR 
        . TIDY_APP_PATH . 'lib' . DS . PATH_SEPARATOR 
        . TIDY_APP_PATH . 'lib' . DS . 'Zend2.1.3' . DS . PATH_SEPARATOR 
        . APPS_ROOT_PATH . 'appFiles' . DS . PATH_SEPARATOR 
        .get_include_path());

define(APPS_ROOT_PATH, dirname(APP_PATH) . DS);

$directoryRootName = basename(APPS_ROOT_PATH);

define('APP_MAIN_PATH', ($directoryRootName != 'public_html' and $directoryRootName != 'www') ? $directoryRootName . '' : '' );

//mAC
//define('HTTP_MAIN_HOST_PATH', 'http://localhost:8888/tdiabCRM/PrimaryEngineer/app/');
//WINDOWS
define('HTTP_MAIN_HOST_PATH', 'http://localhost/btcApi/app/');

define('HTTP_HOST_PATH', HTTP_MAIN_HOST_PATH);