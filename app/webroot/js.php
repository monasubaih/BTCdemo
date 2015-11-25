<?php

/**
 * css, Tidy PHP 
 * generate cash for js files
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd 
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage Webroot
 * @filesource
 */
/**
 * include the initiator
 */
error_reporting(0);

define('DS', strstr(PHP_OS, 'WIN') ? '\\' : '/');

define('APP_PATH', realpath(dirname(dirname(__FILE__))) . DS);
include_once (APP_PATH . 'core' . DS . 'ini.php');

/**
 * check the request contain cash for process
 */
if ($requestReg->getGet('cash') != NULL) {

    $cashArray = explode('|', base64url_decode($requestReg->getGet('cash')));

    /**
     * cash the file content
     * @see Apps
     */
    if (is_array($cashArray)) {
        $newfunc = create_function('$a', '
		if(strstr($a,"Controller-") and strstr($a,"-Action"))
	{
		$jsActionController=explode("-",$a);
		return JS_PATH.$jsActionController[1].DS.(isset($jsActionController[4])?$jsActionController[4].DS:"").$jsActionController[2].".js";
	}
	elseif(strstr($a,"http"))
	return $a;
	else
	return JS_PATH.$a.".js";');

        $cashArray = array_map($newfunc, $cashArray);

        cashFiles('text/javascript', $cashArray, false);
    }
}
?>