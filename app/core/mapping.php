<?php

/**
 * Mapping , Tidy PHP 
 * mapping contoller actions with specific url 
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd 
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage AppSetting
 * @filesource
 */
/*
 * defining mapping 
 * @var array
 */
$GLOBALS ['routerMapping'] = array(
    'about/*' => array('controller' => 'index', 'action' => 'about', 'format' => '{1}'),
    'home/*' => array('controller' => 'index', 'action' => 'home', 'format' => '{1}'),
    'ourServices/*' => array('controller' => 'index', 'action' => 'service', 'format' => '{1}'),
    'portfolio/*' => array('controller' => 'index', 'action' => 'portfolio', 'format' => '{1}'),
    'join/*' => array('controller' => 'index', 'action' => 'join', 'format' => '{1}'),
    'clients/*' => array('controller' => 'index', 'action' => 'clients', 'format' => '{1}'),
    'ideas/*' => array('controller' => 'index', 'action' => 'ideaFund', 'format' => '{1}'),
    'career/*' => array('controller' => 'index', 'action' => 'careers', 'format' => '{1}'),
    'events/*' => array('controller' => 'index', 'action' => 'events', 'format' => '{1}'),
    'contact/*' => array('controller' => 'index', 'action' => 'contact', 'format' => '{1}'),
    'apiTest/*' => array('api' => true, 'controller' => 'configurationsApi', 'action' => 'configuration'),
);

/*
 * defining mapping
 * this variable define the order of the authintication API request 
 * @var array
 */

$GLOBALS ['ApiOauthOrder'] = array(
    'userName' => 1,
    'sign' => 2,
    'time' => 3
);




