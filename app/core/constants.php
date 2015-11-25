<?php
/**
 * define system constants
 * Constants , Tidy PHP
 * @version       $Revision$
 * @modifiedby    $
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage AppSetting
 * @filesource
 */
///////////////////////////////////////////////////////////////////////System Constants

class TIDY_CONSTANTS {

    //Debug Constatns
    const DEBUG_NO_MODE = 1;
    const DEBUG_QUERY_MODE = 2;
    const DEBUG_VALUE_MODE = 3;
    const DEBUG_RETURN_MODE = 4;
    const DEBUG_FULL_MODE = 5;
    ////Language Constatns
    const AR_LANG = 1;
    const EN_LANG = 2;

    //////Log Constants
}

///////////////////////////////////////////////////////////////////////User Define Constants

/**
 * Flags
 */
define('ACTIVE_STATUS', 1);
define('IN_ACTIVE_STATUS', 2);
define('DELETE_STATUS', 50);


/**
 * Messagse Types
 */
//External
define('SUCC_MSG', 6);
define('ERROR_VALIDATE_MSG', 3);
define('ERROR_MSG', 2);
define('WARNING_MSG', 4);
//Internal
define('INTER_SUCC_MSG', 10);
define('INTER_ERROR_VALIDATE_MSG', 11);
define('INTER_ERROR_MSG', 12);
define('INTER_WARNING_MSG', 13);

$levelsCounter = 1;
//User level
define('SYSTEM_LEVEL', 1);
define('SUPER_LEVEL', 2);

define('ADMIN_LEVEL', 2);
define('MANAGER_LEVEL', 3);
define('REGULAR_USER_LEVEL', 4);



//Gender
define('MALE_GENDER', 1);
define('FEMALE_GENDER', 2);

//Organization Type
define('MISCELLANEOUS_ORG', 1);
define('SCHOOL_ORG', 2);
define('FUNDER_ORG', 3);

/**
 * Tables Constants 
 */
define('USERS_TABLE', 'sys_users');
define('FORGET_CODES_TABLE','sys_forget_codes'); 
define('ORGANISATION_TABLE','mg_organisation'); 
define('INDIVIDUALS_TABLE','mg_individuals'); 
define('CONTRACTS_TABLE','mg_contracts'); 
define('CONTRACTS_DELIVERABLES_TABLE','mg_contracts_deliverables'); 
define('CONTRACTS_INTERNALMANAGERS_TABLE','mg_contracts_internalmanagers'); 
define('DELIVERABLES_RESPONSIBLES_TABLE','mg_deliverables_responsibles'); 
define('ORGANISATION_CONTRACTS_TABLE','mg_organisation_contracts'); 
define('REGIONS_TABLE','sys_regions');
define('SESSION_TABLE','sys_session');