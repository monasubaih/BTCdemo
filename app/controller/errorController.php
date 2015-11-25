<?php

/**
 *  
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
class errorController extends Controller {

    /**
     * define validation rules (condition) before action load in (ini , before load , before action load)
     * @access public
     * @var array
     */
    public $validateRules = array();

    /**
     * define validation action that require a validation
     * @access public
     * @var array
     */
    public $layout = 'empty';
    public $model = '';
    public $enableAPIOauth = false;

    /*
     * first method called before any thing executed
     * */

    public function ini() {
        
    }

    /*
     * before action load called directly
     * */

    public function beforeLoad() {
        parent::beforeLoad();
        // define the validation rules and there is error messages		
    }

    public function error404() {
         $this->cssOrdering = array(
            CSS_PATH . 'cpanel' . DS . 'style.css'
        );           
        $this->pageTitle = _tr("Error Page - 404");
    }
    public function notExists() {
        $this->cssOrdering = array(
            CSS_PATH . 'cpanel' . DS . 'style.css'
        );        
        $this->pageTitle = _tr("Not Exists");
    }
}
