<?php

/**
 * database , Tidy PHP 
 * permissions useing acl control
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
$acl = new Zend_Acl ();
$acl->addRole(new Zend_Acl_Role(TIDY_CONSTANTS::DEBUG_NO_MODE))->addRole(new Zend_Acl_Role(TIDY_CONSTANTS::DEBUG_QUERY_MODE))->addRole(new Zend_Acl_Role(TIDY_CONSTANTS::DEBUG_VALUE_MODE))->addRole(new Zend_Acl_Role(TIDY_CONSTANTS::DEBUG_RETURN_MODE))->addRole(new Zend_Acl_Role(TIDY_CONSTANTS::DEBUG_FULL_MODE));

$acl->allow(TIDY_CONSTANTS::DEBUG_FULL_MODE);
$acl->deny(TIDY_CONSTANTS::DEBUG_NO_MODE);

$acl->allow(TIDY_CONSTANTS::DEBUG_QUERY_MODE, null, TIDY_CONSTANTS::DEBUG_QUERY_MODE);
$acl->allow(TIDY_CONSTANTS::DEBUG_RETURN_MODE, null, TIDY_CONSTANTS::DEBUG_RETURN_MODE);
$acl->allow(TIDY_CONSTANTS::DEBUG_VALUE_MODE, null, TIDY_CONSTANTS::DEBUG_VALUE_MODE);

$GLOBALS ['registry']->aclDatabaseDebug = $acl;

