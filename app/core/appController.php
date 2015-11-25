<?php

/**
 * ApiController, Tidy PHP
 * controller for the main appBase controller (overwrite Methods , params...etc)
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage Setting
 * @filesource
 * @abstract
 */
class Controller extends BaseController {

    public $helpers = array(
        'functions',
        'cpanelLayout',
        'session'
    );
    public $enableAPIOauth = true;
    public $jsOrdering = array();
    public $cssOrdering = array();
    public $model = '';
    public $allowPages = array();



    /**
     * getUserPermission get user array of permission
     */
    public function getUserPermission() {
        $userInfo = $GLOBALS ['registry']->request->getCookie("userInfo");
        $userInfo = json_decode($userInfo, true);
        $appRPC = new appRPC ();
        $responseBody = $appRPC->getUserPermission($userInfo ['token']);
        $GLOBALS ['registry']->userInfo = $responseBody ['userInfo'];
        $consumerKey = $userInfo ['consumerKey'];
        $this->customizeMenuArray($consumerKey);
    }

    /**
     * customize menu array using user counsumer key and user array of permossion
     *
     * @param unknown $consumerKey
     */
    public function customizeMenuArray($consumerKey) {
        $per = md5(serialize(array(
                    $GLOBALS ['registry']->userInfo ['User_Permissions'],
                    $GLOBALS ['registry']->userInfo ['User_Level'],
                    $this->allowPages
                )) . $GLOBALS ['registry']->currentViewLang);

        $userDir = CASH_PATH . $GLOBALS ['registry']->tenantName . DS . 'Users' . DS . $consumerKey . DS;
        if (!file_exists($userDir)) {
            mkdir($userDir, 0777, true);
        }
        $pagesArray = array();
        $permissionMenuSitePagesArrayCash = 'cash' . $consumerKey . $per;
        $permissionMenuSitePagesArrayCashPath = $permissionMenuSitePagesArrayCash;
        $GLOBALS ['registry']->cache = App::getCash(CASH_VAR_INTERVAL, CASH_PATH . $GLOBALS ['registry']->tenantName . DS . 'Users' . DS . $consumerKey . DS);
        $GLOBALS ['registry']->permission = $GLOBALS ['registry']->cache->load($permissionMenuSitePagesArrayCashPath);
        if ($GLOBALS ['registry']->permission == false || $GLOBALS ['registry']->permission['menuSitePagesArray'] == false || sizeof($GLOBALS ['registry']->permission['menuSitePagesArray']) <= 1) {

            foreach ($GLOBALS ['registry']->menuSitePagesArray as $key => $value) {
                $newChildArray = [];
                $newValue = $value;
                $appPermission = $value ['permission'];

                if ($value ['level'] != null && in_array($GLOBALS ['registry']->userInfo ['User_Level'], $value ['level'])) {

                    if ($GLOBALS ['registry']->userInfo ['User_Level'] == ADMIN_LEVEL || $GLOBALS ['registry']->userInfo ['User_Level'] == SUPER_LEVEL || $value['app'] == "HelpCenter") {
                        $newPagesMenuArrays [$key] = $newValue;
                        if (is_array($value ['referTo'])) {
                            foreach ($value ['referTo'] as $childArray) {
                                if (is_array($childArray ['link'])) {
                                    $pagesArray [] = array(
                                        'controller' => $childArray ['link'] ['controller'],
                                        'action' => $childArray ['link'] ['action']
                                    );
                                } elseif (is_array($childArray ['referTo'])) {
                                    foreach ($childArray ['referTo'] as $child) {
                                        if (is_array($child ['link'])) {
                                            $pagesArray [] = array(
                                                'controller' => $child ['link'] ['controller'],
                                                'action' => $child ['link'] ['action']
                                            );
                                        }
                                    }
                                }
                            }
                        }
                        continue;
                    } else {

                        if ($value ['permission'] != null && $GLOBALS ['registry']->userInfo ['User_Permissions'] != null) {

                            $j = 0;
                            if (is_array($value ['referTo'])) {
                                foreach ($value ['referTo'] as $childArray) {
                                    $modulePermission = $childArray ['permission'];
                                    if ($childArray ['permission'] != null) {
                                        if (is_array($childArray ['referTo'])) {
                                            $i = 0;
                                            foreach ($childArray ['referTo'] as $child) {
                                                if ($child ['permission'] != null) {
                                                    $operationPermision = $child ['permission'];
                                                    $permission = $GLOBALS ['registry']->constantResources ['applicationsPermissions'] [$appPermission] ['modules'] [$modulePermission] ['operations'] [$operationPermision] ['relate'];
                                                    if (in_array($permission, $GLOBALS ['registry']->userInfo ['User_Permissions'])) {
                                                        $pagesArray [] = array(
                                                            'controller' => $child ['link'] ['controller'],
                                                            'action' => $child ['link'] ['action'],
                                                        );
                                                        $newChaild [$i] = $child;
                                                    }
                                                }
                                                $i ++;
                                            }
                                        }
                                        if (sizeof($newChaild) > 0) {
                                            $newChildArray [$j] = $childArray;
                                            $newChildArray [$j] ['referTo'] = $newChaild;
                                        }
                                        unset($newChaild);
                                    }
                                    $j ++;
                                }
                                if (sizeof($newChildArray) > 0) {
                                    $newValue ['referTo'] = $newChildArray;
                                } else
                                    unset($newValue);
                            }
                            if (sizeof($newValue) > 0) {
                                $newPagesMenuArrays [$key] = $newValue;
                            }


                            unset($newValue);
                        }
                    }
                }
            }

            $pagesArray = array_merge($this->allowPages, $pagesArray);
            $GLOBALS ['registry']->permission = array(
                'menuSitePagesArray' => $newPagesMenuArrays,
                'pagesArray' => $pagesArray
            );
            deleteAllDirFiles(CASH_PATH . $GLOBALS ['registry']->tenantName . DS . 'Users' . DS . $consumerKey . DS);
            $GLOBALS ['registry']->cache->save($GLOBALS ['registry']->permission, $permissionMenuSitePagesArrayCashPath);
        }
        $GLOBALS ['registry']->cache = App::getCash(CASH_VAR_INTERVAL, CASH_PATH . $GLOBALS ['registry']->tenantName . DS);
    }

    public function ini() {
        Model::setCondition(array());
        $this->layout = 'index';
        $this->authSetting->loginAction = array(
            'controller' => 'users',
            'action' => 'login',
            'mainURL' => HTTP_MAIN_HOST_PATH
        );
        $this->authSetting->redirectAction = array(
            'controller' => 'users',
            'action' => 'viewUsers',
            'mainURL' => HTTP_MAIN_HOST_PATH
        );
        $this->authSetting->allow = array(
            'users:login',
            'users:logOut',
            'error:error404',
            'error:notExists',
            'users:forgetPassword',
            'users:resetPassword'
                )
        ; // , 'users:doLogin', 'users:forgetPassword','users:removeSession' ,'portfolios:getAjaxPortfolio','services:getAjaxService'
        $this->allowPages = array(
            array(
                'controller' => 'users',
                'action' => 'editProfile'
            )
        );

        /*
          //$this->getUserPermission();
          $this->verifyAccess();
          $current = array(
          'controller' => $this->controller,
          'action' => $this->action
          );
          if (!in_array($current, $GLOBALS ['registry']->permission ['pagesArray'])) {
          redirectTo($this->authSetting->redirectAction);
          }

         */
    }

    public function beforeLoad() {
        if ($this->layout == 'index') {

            $cssPathsCash = md5('cssPathsCash-cpanel' . $GLOBALS ['registry']->currentViewLangKey);

            $this->css = $GLOBALS ['registry']->cache->load($cssPathsCash);
            if ($this->css == false) {
                $dir = $GLOBALS ['sysLangProp'] [$GLOBALS ['sysLang'] [$GLOBALS ['registry']->currentViewLangKey]] ['dir'];

                // direction files
                $this->css = array(
                    // array('links'=>array(getURL(array('controller'=>'index','action'=>'indexCSS'))),'cash'=>false ,'justLinks'=>false,'outSource'=>true),
                    array(
                        'links' => array(
                            mapFile2URL(CSS_PATH . 'main.css'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'formvalidation' . DS . 'formValidation.css'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'examples' . DS . 'css' . DS . 'forms' . DS . 'validation.css'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-bootstrap' . DS . 'dataTables.bootstrap.css'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-fixedheader' . DS . 'dataTables.fixedHeader.css'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-responsive' . DS . 'dataTables.responsive.css'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'examples' . DS . 'css' . DS . 'tables' . DS . 'datatable.css'),
                        )
                        ,
                        'cash' => false,
                        'justLinks' => false,
                        'outSource' => true
                    )
                        )
                ;

                $GLOBALS ['registry']->cache->save($this->css, $cssPathsCash);
            }

            $jsPathsCash = md5('jsPathsCash-cpanel' . $GLOBALS ['registry']->currentViewLangKey);
            $this->js = $GLOBALS ['registry']->cache->load($jsPathsCash);

            if ($this->js == false) {
                $this->js = array(
                    array(
                        'links' => array(
                            mapFile2URL(JS_PATH . 'lib' . DS . 'primary.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'urlFunctionsJS.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'jquery.cookie.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'cookie.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'knockout-3.3.0.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'jquery.redirect.min.js'),
                            mapFile2URL(JS_PATH . 'cpanel' . DS . 'logOut.js'),
                            mapFile2URL(JS_PATH . 'layout' . DS . 'cpanel.js'),
                            //extra plugins
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'js' . DS . 'components' . DS . 'selectable.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'js' . DS . 'components' . DS . 'selectable.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'formvalidation' . DS . 'formValidation.min.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'formvalidation' . DS . 'framework' . DS . 'bootstrap.min.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables' . DS . 'jquery.dataTables.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-fixedheader' . DS . 'dataTables.fixedHeader.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-bootstrap' . DS . 'dataTables.bootstrap.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-responsive' . DS . 'dataTables.responsive.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'vendor' . DS . 'datatables-tabletools' . DS . 'dataTables.tableTools.js'),
                            mapFile2URL(VENDOR_PATH . 'assets' . DS . 'js' . DS . 'components' . DS . 'datatables.js'),
                        )
                        ,
                        'cash' => false,
                        'justLinks' => false,
                        'outSource' => true
                    )
                        )
                ;

                $GLOBALS ['registry']->cache->save($this->js, $jsPathsCash);
            }
        } elseif ($this->layout == 'empty') {
            $cssPathsCash = md5('cssPathsCash-cpanel' . $GLOBALS ['registry']->currentViewLangKey);

            $this->css = $GLOBALS ['registry']->cache->load($cssPathsCash);
            if ($this->css == false) {

                $this->css = array(
                    // array('links'=>array(getURL(array('controller'=>'index','action'=>'indexCSS'))),'cash'=>false ,'justLinks'=>false,'outSource'=>true),
                    array(
                        'links' => array(
                            mapFile2URL(VENDOR_PATH . 'bootstrap' . DS . 'css' . DS . 'bootstrap.min.css'),
                            mapFile2URL(VENDOR_PATH . 'bootstrap' . DS . 'css' . DS . 'bootstrap-responsive.min.css'),
                            mapFile2URL(VENDOR_PATH . 'css' . DS . 'style.css'),
                            mapFile2URL('//fonts.googleapis.com/css?family=Jockey+One')
                        )
                        ,
                        'cash' => false,
                        'justLinks' => false,
                        'outSource' => true
                    )
                        )
                ;

                $GLOBALS ['registry']->cache->save($this->css, $cssPathsCash);
            }
        } elseif ($this->layout == 'loginPanel') {
            $cssPathsCash = md5('cssPathsCash-login' . $GLOBALS ['registry']->currentViewLangKey);

            $this->css = $GLOBALS ['registry']->cache->load($cssPathsCash);
            if ($this->css == false) {
                $dir = $GLOBALS ['sysLangProp'] [$GLOBALS ['sysLang'] [$GLOBALS ['registry']->currentViewLangKey]] ['dir'];

                // direction files
                $this->css = array(
                    // array('links'=>array(getURL(array('controller'=>'index','action'=>'indexCSS'))),'cash'=>false ,'justLinks'=>false,'outSource'=>true),
                    array(
                        'links' => array(
                        // mapFile2URL(VENDOR_PATH.'bootstrap'.DS.'css'.DS.'bootstrap.min.css'),
                        // mapFile2URL(VENDOR_PATH.'bootstrap'.DS.'css'.DS.'bootstrap-responsive.min.css'),
                        )
                        ,
                        'cash' => false,
                        'justLinks' => false,
                        'outSource' => true
                    )
                        )
                ;

                $GLOBALS ['registry']->cache->save($this->css, $cssPathsCash);
            }

            $jsPathsCash = md5('jsPathsCash-login' . $GLOBALS ['registry']->currentViewLangKey);
            $this->js = $GLOBALS ['registry']->cache->load($jsPathsCash);

            if ($this->js == false) {
                $this->js = array(
                    array(
                        'links' => array(
                            mapFile2URL(JS_PATH . 'lib' . DS . 'primary.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'urlFunctionsJS.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'jquery.cookie.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'cookie.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'knockout-3.3.0.js'),
                            mapFile2URL(JS_PATH . 'lib' . DS . 'jquery.redirect.min.js'),
                            mapFile2URL(JS_PATH . 'cpanel' . DS . 'logOut.js')
                        )
                        ,
                        'cash' => false,
                        'justLinks' => false,
                        'outSource' => true
                    )
                        )
                ;

                $GLOBALS ['registry']->cache->save($this->js, $jsPathsCash);
            }
        }
    }

    public function afterLoad() {

        if (is_array($this->jsOrdering) and sizeof($this->jsOrdering)) {

            foreach ($this->jsOrdering as $jsFile) {

                if (file_exists($jsFile)) {
                    $this->js = array_merge($this->js, array(
                        array(
                            'links' => array(
                                mapFile2URL($jsFile)
                            ),
                            'cash' => false,
                            'justLinks' => false,
                            'outSource' => true
                        )
                    ));
                } else {

                    $this->js = array_merge($this->js, array(
                        array(
                            'links' => array(
                                mapFile2URL(JS_PATH . $this->controller . DS . $this->model . DS . $jsFile . '.js')
                            ),
                            'cash' => false,
                            'justLinks' => false,
                            'outSource' => true
                        )
                    ));
                }
            }
        }

        if (is_array($this->cssOrdering) and sizeof($this->cssOrdering)) {

            foreach ($this->cssOrdering as $jsFile) {

                if (file_exists($jsFile)) {

                    $this->css = array_merge($this->css, array(
                        array(
                            'links' => array(
                                mapFile2URL($jsFile)
                            ),
                            'cash' => false,
                            'justLinks' => false,
                            'outSource' => true
                        )
                    ));
                } else {

                    $this->css = array_merge($this->css, array(
                        array(
                            'links' => array(
                                mapFile2URL(CSS_PATH . $this->controller . DS . $this->model . DS . $jsFile . '.css')
                            ),
                            'cash' => false,
                            'justLinks' => false,
                            'outSource' => true
                        )
                    ));
                }
            }
        }
    }

}
