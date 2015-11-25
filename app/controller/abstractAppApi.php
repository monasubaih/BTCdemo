<?php

/**
 * abstractAppApi
 * contain shared apis functions , must defined function for override
 * @version       $Revision$
 * @modifiedby    $
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage controller
 * @filesource
 */

class abstractAppApi extends ApiController {

    /**
     * define validation rules (conditions) before action executed
     *
     * @access public
     * @var array
     */
    public $validateActions = array();


 

    /**
     * define validation rules (condition) before action load in (ini , before load , before action load)
     * @access public
     * @var array
     */
    public $validateRules = array();

    public function ini() {
        parent::ini();
   
    }

    public function beforeLoad() {
        parent::beforeLoad();
    }

  




}
