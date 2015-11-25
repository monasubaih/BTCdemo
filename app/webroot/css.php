<?php

/**
 * css, Tidy PHP 
 * generate cash for css files
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
		$cssActionController=explode("-",$a);
		return CSS_PATH.$cssActionController[1].DS.(isset($cssActionController[4])?$cssActionController[4].DS:"").$cssActionController[2].".css";
	}
	elseif(strstr($a,"http"))
	return $a;
	else
	return CSS_PATH.$a.".css";');

        $cashArray = array_map($newfunc, $cashArray);

        cashFiles('text/css', $cashArray);
    }
}
?>