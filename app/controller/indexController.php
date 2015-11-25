<?php

/**
 * redirection pages like (404)
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
class indexController extends Controller {

    /**
     * define validation action that require a validation
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

    /**
     * main processes Model Object
     * @access public
     * @var Object
     */
    public $layout = 'empty';

    /*
     * first method called before any thing executed
     * */

    public function ini() {

        if ($this->action != 'error404')
            parent::ini();
    }

    /*
     * before action load called directly
     * */

    public function beforeLoad() {

        parent::beforeLoad();
        self::$rendered = true;

        // define the validation rules and there is error messages		
    }

    
    public function home() {
        $this->pageTitle = _tr("Welcome To BitCoin Transaction");
        $this->model = "home";
           $this->jsOrdering = array(
        //  <!-- Plugins For This Page -->
           'highchartsource.js',
           
        );
   


    }

}
