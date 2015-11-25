<?php

/**
 * cpanel Layout helper, Tidy PHP
 * provide helper for cpanel Layout view
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage Helpers
 * @filesource
 */
/*
 * @constant Icon Paths
 */

/*
 * @constant
 * Icon Paths
 */
define('ICON_PATH', CSS_PATH . 'cpanel' . DS . 'images' . DS . 'icons' . DS . 'fugue' . DS);
define('ADMICA_ICON_PATH', CSS_PATH . 'cpanelAdminica' . DS . 'images' . DS . 'icons' . DS);

define('ACTIVE_STATUS_ICON', mapFile2URL(ICON_PATH . 'tick-circle.png'));
define('IN_ACTIVE_STATUS_ICON', mapFile2URL(ICON_PATH . 'inactive.png'));
define('DELETE_ACTION_ICON', mapFile2URL(ICON_PATH . 'cross-circle.png'));
define('ADD_ACTION_ICON', mapFile2URL(ICON_PATH . 'plus-circle.png'));
define('DELETE_ACTION_ICON', mapFile2URL(ICON_PATH . 'cross-circle.png'));
define('EDIT_ACTION_ICON', mapFile2URL(ICON_PATH . 'pencil.png'));
define('IMAGE_ICON', mapFile2URL(ICON_PATH . 'image.png'));
define('CALENDER_ICON', mapFile2URL(ICON_PATH . 'calendar-month.png'));
define('SEND_MESSAGE_ICON', mapFile2URL(ICON_PATH . 'mail.png'));
define('AJAX_LOADER_IMAGE', '<img class="ajaxLoader" src="' . mapFile2URL(CSS_PATH . 'cpanel' . DS . 'images' . DS . 'info-loader.gif') . '"/>');
define('ORDERS_ICON', mapFile2URL(ICON_PATH . 'order.png'));
define('STAR_ICON', mapFile2URL(ICON_PATH . 'star.png'));
define('EMPTY_STAR_ICON', mapFile2URL(ICON_PATH . 'star-empty.png'));
define('CUSTOMER_SERVICE_ICON', mapFile2URL(ICON_PATH . 'users.png'));
define('MODAL_ICON', mapFile2URL(ICON_PATH . 'modal.png'));
define('MORE_INFO_ICON', mapFile2URL(ICON_PATH . 'information-blue.png'));
define('LOGO_ICON', mapFile2URL(CSS_PATH . 'images' . DS . 'dallat.jpg'));
define('STORE_ICON', mapFile2URL(CSS_PATH . 'images' . DS . 'store.png'));

/*
 * @menu pages Icon Paths
 */

// ------------------------------------------------------------------menues Array
//for each user
$menuSitePagesArrayCashPath = md5('menuSitePagesArray' . $GLOBALS ['registry']->currentViewLang);
$GLOBALS ['registry']->menuSitePagesArray = $GLOBALS ['registry']->cache->load($menuSitePagesArrayCashPath);
if ($GLOBALS ['registry']->menuSitePagesArray == false) {
    $counter = 0;
    $storesSectionCounter = 1;
    $GLOBALS ['registry']->menuSitePagesArray = array(
        $counter ++ => array(
            'title' => _tr('System Configurations'),
            'class' => 'dropdown',
            'level' => array(ADMIN_LEVEL, SUPER_LEVEL),
            'referTo' => array(
                /*  array(
                  'title' => _tr('Configurations'),
                  'class' => 'dropdown',
                  'referTo' => array(
                  array(
                  'title' => _tr('Control Configurations'),
                  'class' => '',
                  'shortCut' => 'SYS-CS',
                  'link' => array(
                  'controller' => 'configuration',
                  'action' => 'editConfiurations',
                  'target' => 'viewPlaceHolder',
                  'mainURL' => HTTP_HOST_PATH
                  )
                  )
                  ),
                  'slideClass' => ' dropdown-menu',
                  'linkClass' => 'dropdown-toggle',
                  'iconClass' => 'icon-cog'/* dropdown, dropdown dropdown_right */
                /*   ), */
                array(
                    'title' => _tr('Countries & Cities'),
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Add/Edit Countries'),
                            'class' => '',
                            'shortCut' => 'SYS-CC',
                            'link' => array(
                                'controller' => 'configuration',
                                'action' => 'addEditViewCountry',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-globe'/* dropdown, dropdown dropdown_right */
                ),
                /*
                  array(
                  'title' => _tr('Currencies'),
                  'class' => 'dropdown',
                  'referTo' => array(
                  array(
                  'title' => _tr('Add/Edit Currencies'),
                  'class' => '',
                  'link' => array(
                  'controller' => 'configuration',
                  'action' => 'addEditViewCurrency'
                  )
                  )
                  ),
                  'slideClass' => ' dropdown-menu',
                  'linkClass' => 'dropdown-toggle',
                  'iconClass' => 'icon-certificate'/* dropdown, dropdown dropdown_right
                  ), */
                array(
                    'title' => _tr('Definitions'),
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Add/Edit Definitions'),
                            'class' => '',
                            'shortCut' => 'SYS-CD',
                            'link' => array(
                                'controller' => 'configuration',
                                'action' => 'addEditViewDefinitions',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-th-list'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Roles'),
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Add/Edit Roles'),
                            'class' => '',
                            'shortCut' => 'SYS-CR',
                            'link' => array(
                                'controller' => 'users',
                                'action' => 'addEditRole',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Roles'),
                            'class' => '',
                            'shortCut' => 'SYS-VR',
                            'link' => array(
                                'controller' => 'users',
                                'action' => 'viewRoles',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-certificate'
                ),
                array(
                    'title' => _tr('Employees'),
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Add/Edit Employees'),
                            'class' => '',
                            'shortCut' => 'SYS-CE',
                            'link' => array(
                                'controller' => 'configuration',
                                'action' => 'addEditEmployees',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Employees'),
                            'class' => '',
                            'shortCut' => 'SYS-VE',
                            'link' => array(
                                'controller' => 'configuration',
                                'action' => 'viewEmployees',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-user'/* dropdown, dropdown dropdown_right */
                )
            ),
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-cog'/* dropdown, dropdown dropdown_right */
        ),
        $counter ++ => array(
            'title' => _tr('Stores'),
            'class' => 'dropdown',
            'permission' => STORES_APP_PERMISSION,
            'level' => array(ADMIN_LEVEL, USER_LEVEL, SUPER_LEVEL),
            'referTo' => array(
                array(
                    'title' => _tr('Stores'),
                    'permission' => STORES_CONTROL_MODULE_PERMISSION,
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Stores'),
                            'class' => '',
                            'shortCut' => 'WH-CW',
                            'permission' => STORES_CONTROL_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'addEditStores',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Stores'),
                            'class' => '',
                            'shortCut' => 'WH-VW',
                            'permission' => STORES_VIEW_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewStores',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-shopping-cart'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Categories'),
                    'class' => 'dropdown',
                    'permission' => CATEGORIES_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Categories'),
                            'class' => '',
                            'shortCut' => 'WH-CC',
                            'permission' => STORES_CATEGORIES_CONTROL_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'addEditCategories',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Categories'),
                            'class' => '',
                            'shortCut' => 'WH-VC',
                            'permission' => STORES_CATEGORIES_VIEW_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewCategories',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-book'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Models'),
                    'class' => 'dropdown',
                    'permission' => MODELS_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Models'),
                            'class' => '',
                            'shortCut' => 'WH-CM',
                            'permission' => STORES_MODELS_CONTROL_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'addEditModels',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Models'),
                            'class' => '',
                            'shortCut' => 'WH-VM',
                            'permission' => STORES_MODELS_VIEW_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewModels',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-th'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Packages'),
                    'permission' => STORES_PACKAGES_MODULE_PERMISSION,
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Packages'),
                            'class' => '',
                            'shortCut' => 'WH-CP',
                            'permission' => STORES_PACKAGES_CONTROL_PERMISSION,
                            'link' => array(
                                'controller' => 'packaging',
                                'action' => 'addEditPackaging',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Packages'),
                            'class' => '',
                            'shortCut' => 'WH-VP',
                            'permission' => STORES_PACKAGES_VIEW_PERMISSION,
                            'link' => array(
                                'controller' => 'packaging',
                                'action' => 'viewPackaging',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-gift'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Products'),
                    'permission' => PRODUCTS_CONTROL_MODULE_PERMISSION,
                    'class' => 'dropdown',
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Products'),
                            'class' => '',
                            'shortCut' => 'WH-CPR',
                            'permission' => STORES_PRODUCTS_CONTROL_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'addEditProducts',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        /*  array(
                          'title' => _tr('Control Products Categories'),
                          'class' => '',
                          'shortCut' => 'WH-CPC',
                          'permission' => STORES_PRODUCTS_CONTROL_PERMISSION,
                          'link' => array(
                          'controller' => 'stores',
                          'action' => 'addProductsCategory',
                          'target' => 'viewPlaceHolder',
                          'mainURL' => HTTP_HOST_PATH
                          )
                          ), */
                        array(
                            'title' => _tr('View Products'),
                            'class' => '',
                            'shortCut' => 'WH-VPR',
                            'permission' => STORES_PRODUCTS_VIEW_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewProducts',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-gift'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Transactions'),
                    'class' => 'dropdown',
                    'permission' => STORES_TRANSACTION_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Add Import Transaction'),
                            'class' => '',
                            'shortCut' => 'WH-IT',
                            'permission' => STORES_IMPORT_TRANSACTION_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'import',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('Add Export Transaction'),
                            'class' => '',
                            'shortCut' => 'WH-ET',
                            'permission' => STORES_EXPORT_TRANSACTION_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'addExportTransaction',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('Export from store Transaction'),
                            'class' => '',
                            'shortCut' => 'WH-EST',
                            'permission' => STORES_EXPORT_STORES_TRANSACTION_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'exportFromStore',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        /*
                          array(
                          'title' => _tr('Add Exchange Transaction'),
                          'class' => '',
                          'shortCut'=>'WH-'.$storesSectionCounter++,
                          'permission' => STORES_EXCHANGE_TRANSACTION_PERMISSION,
                          'link' => array(
                          'controller' => 'stores',
                          'action' => 'addExchangeTransaction'
                          )
                          ),
                         */
                        array(
                            'title' => _tr('Salesman Returns'),
                            'class' => '',
                            'shortCut' => 'WH-CSR',
                            'permission' => STORES_RETURNS_TRANSACTION_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'returns',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('Customer Transactions'),
                            'class' => '',
                            'shortCut' => 'WH-VCT',
                            'permission' => STORES_VIEW_CUSTOMER_TRANSACTION_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewCustomerTransactions',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('Salesman Transactions'),
                            'class' => '',
                            'shortCut' => 'WH-VSRT',
                            'permission' => STORES_VIEW_SALESMAN_TRANSACTION_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewSalesmanTransactions',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        /*
                          array(
                          'title' => _tr('Termination Transaction'),
                          'class' => '',
                          'shortCut'=>'WH-'.$storesSectionCounter++,
                          'permission' => STORES_TERMINATION_TRANSACTION_PERMISSION,
                          'link' => array(
                          'controller' => 'stores',
                          'action' => 'termination'
                          )
                          ),
                         */
                        array(
                            'title' => _tr('View Transactions'),
                            'class' => '',
                            'shortCut' => 'WH-VT',
                            'permission' => STORES_VIEW_TRANSACTIONS_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'viewTransactions',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-plane'/* dropdown, dropdown dropdown_right */
                ),
                array(
                    'title' => _tr('Transactions Decisions'),
                    'class' => 'dropdown',
                    'permission' => STORES_TRANSACTION_DECISIONS_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Customer Returns'),
                            'class' => '',
                            'shortCut' => 'WH-CCR',
                            'permission' => STORES_CUSTOMERS_RETURN_TRANSACTIONS_DECISIONS_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'customerReturns',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Cancel Transactions Requests'),
                            'class' => '',
                            'shortCut' => 'WH-VCRT',
                            'permission' => STORES_CANCEL_TRANSACTIONS_DECISIONS_PERMISSION,
                            'link' => array(
                                'controller' => 'stores',
                                'action' => 'cancelRequest',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-plane'/* dropdown, dropdown dropdown_right */
                )
            ),
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-qrcode'/* dropdown, dropdown dropdown_right */
        ),
        $counter ++ => array(
            'title' => _tr('Customers'),
            'class' => 'dropdown',
            'level' => array(ADMIN_LEVEL, USER_LEVEL, SUPER_LEVEL),
            'permission' => STORES_APP_PERMISSION,
            'referTo' => array(
                array(
                    'title' => _tr('Customers'),
                    'class' => 'dropdown',
                    'permission' => CUSTOMERS_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Customers'),
                            'class' => '',
                            'shortCut' => 'CS-CC',
                            'permission' => CUSTOMERS_CONTROL_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'customer',
                                'action' => 'addEditCustomers',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Customers'),
                            'class' => '',
                            'shortCut' => 'CS-VC',
                            'permission' => CUSTOMERS_VIEW_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'customer',
                                'action' => 'viewCustomers',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-user'/* dropdown, dropdown dropdown_right */
                ),
            ),
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-user'/* dropdown, dropdown dropdown_right */
        ), $counter ++ => array(
            'title' => _tr('Reports'),
            'class' => 'dropdown',
            'permission' => STORES_APP_PERMISSION,
            'level' => array(ADMIN_LEVEL, USER_LEVEL, SUPER_LEVEL),
            'referTo' => array(
                array(
                    'title' => _tr('Reports'),
                    'class' => 'dropdown',
                    'permission' => REPORTS_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Report Products'),
                            'class' => '',
                            'shortCut' => 'R-PR',
                            'permission' => PRODUCT_REPORT_PERMISSION,
                            'link' => array(
                                'controller' => 'report',
                                'action' => 'reportProducts',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('Report Products Transactions'),
                            'class' => '',
                            'shortCut' => 'R-PRT',
                            'permission' => PRODUCT_TRANSACTION_REPORT_PERMISSION,
                            'link' => array(
                                'controller' => 'report',
                                'action' => 'reportProductsTransaction',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                        ,
                        array(
                            'title' => _tr('Report Products Pakages'),
                            'class' => '',
                            'shortCut' => 'R-PRP',
                            'permission' => PRODUCT_PACKAGE_REPORT_PERMISSION,
                            'link' => array(
                                'controller' => 'report',
                                'action' => 'reportProductsPKG',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                        ,
                        array(
                            'title' => _tr('Report Customers'),
                            'class' => '',
                            'permission' => CUSTOMER_REPORT_PERMISSION,
                            'shortCut' => 'R-C',
                            'link' => array(
                                'controller' => 'customer',
                                'action' => 'viewCustomers',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                        ,
                        array(
                            'title' => _tr('Report Salesman'),
                            'class' => '',
                            'shortCut' => 'R-SR',
                            'permission' => SALESMAN_REPORT_PERMISSION,
                            'link' => array(
                                'controller' => 'report',
                                'action' => 'reportSalesman',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                    ),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-list-alt'/* dropdown, dropdown dropdown_right */
                ),
            ),
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-list-alt'/* dropdown, dropdown dropdown_right */
        ), $counter ++ => array(
            'title' => _tr('Orders'),
            'class' => 'dropdown',
            'permission' => ORDERS_APP_PERMISSION,
            'level' => array(ADMIN_LEVEL, USER_LEVEL, SUPER_LEVEL),
            'referTo' => array(
                array(
                    'title' => _tr('Orders'),
                    'class' => 'dropdown',
                    'permission' => ORDERS_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Order'),
                            'class' => '',
                            'shortCut' => 'ORD-AO',
                            'permission' => ORDERS_CONTROL_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'addOrder',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Orders'),
                            'class' => '',
                            'shortCut' => 'WH-VC',
                            'permission' => ORDERS_VIEW_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'viewOrder',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                        ,
                        array(
                            'title' => _tr('upload order files'),
                            'class' => '',
                            'shortCut' => 'WH-VC',
                            'permission' => ORDERS_UPLOADS_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'uploadFiles',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_HOLDER_PATH
                            )
                        )),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-list-alt'/* dropdown, dropdown dropdown_right */),
                array(
                    'title' => _tr('Export Order'),
                    'class' => 'dropdown',
                    'permission' => EXPORT_ORDERS_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Export Order'),
                            'class' => '',
                            'shortCut' => 'ORD-AO',
                            'permission' => EXPORT_ORDERS_CONTROL_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'addExportOrder',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )
                        ,
                        array(
                            'title' => _tr('View Export Orders'),
                            'class' => '',
                            'shortCut' => 'WH-VC',
                            'permission' => EXPORT_ORDERS_VIEW_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'viewExportOrder',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-list-alt'/* dropdown, dropdown dropdown_right */)
                , array(
                    'title' => _tr('Cars'),
                    'class' => 'dropdown',
                    'permission' => CAR_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Cars'),
                            'class' => '',
                            'shortCut' => 'ORD-AO',
                            'permission' => CAR_CONTROL_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'addEditCars',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_PATH
                            )
                        )),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-list-alt'/* dropdown, dropdown dropdown_right */),
                array(
                    'title' => _tr('Drivers'),
                    'class' => 'dropdown',
                    'permission' => DRIVER_CONTROL_MODULE_PERMISSION,
                    'referTo' => array(
                        array(
                            'title' => _tr('Control Driver'),
                            'class' => '',
                            'shortCut' => 'ORD-AO',
                            'permission' => DRIVER_CONTROL_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'addEditdriver',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_HOLDER_PATH
                            )
                        ),
                        array(
                            'title' => _tr('View Drivers'),
                            'class' => '',
                            'shortCut' => 'WH-VC',
                            'permission' => DRIVER_VIEW_STORE_PERMISSION,
                            'link' => array(
                                'controller' => 'order',
                                'action' => 'viewDrivers',
                                'target' => 'viewPlaceHolder',
                                'mainURL' => HTTP_HOST_HOLDER_PATH
                            )
                        )),
                    'slideClass' => ' dropdown-menu',
                    'linkClass' => 'dropdown-toggle',
                    'iconClass' => 'icon-list-alt'/* dropdown, dropdown dropdown_right */),
            ),
            'options' => '',
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-book'
        ), $counter ++ => array(
            'title' => _tr('Help Center'),
            'class' => 'dropdown',
            'link' => array(
                'controller' => 'helpCenter',
                'action' => 'hc_gettingStarted',
                'target' => '_top',
                'mainURL' => HTTP_HOST_PATH
            ),
            'options' => '',
            'level' => array(ADMIN_LEVEL, USER_LEVEL, SUPER_LEVEL),
            'app' => 'HelpCenter',
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-white icon-book'
        ), $counter ++ => array(
            'title' => _tr('Report issues'),
            'class' => 'dropdown',
            'link' => array(
                'controller' => 'index',
                'action' => 'reportNewIssue',
                'target' => '_top',
                'mainURL' => HTTP_HOST_PATH
            ),
            'options' => '',
            'level' => array(ADMIN_LEVEL, USER_LEVEL, SUPER_LEVEL),
            'slideClass' => ' dropdown-menu',
            'linkClass' => 'dropdown-toggle',
            'iconClass' => 'icon-book'
        )
            /* ,
              $counter ++ => array(
              'title' => _tr('Help Center'),
              'class' => 'dropdown',
              'link' => array(
              'controller' => 'helpCenter',
              'action' => 'hc_gettingStarted'
              ),
              'level' => array(ADMIN_LEVEL, USER_LEVEL),
              'app' => 'HelpCenter',
              'slideClass' => ' dropdown-menu',
              'linkClass' => 'dropdown-toggle',
              'iconClass' => 'icon-book'
              ),
              $counter ++ => array(
              'title' => _tr('Report issues'),
              'class' => 'dropdown',
              'link' => array(
              'controller' => 'index',
              'action' => 'reportNewIssue'
              ),
              'level' => array(ADMIN_LEVEL, USER_LEVEL),
              //'app' => 'HelpCenter',
              'slideClass' => ' dropdown-menu',
              'linkClass' => 'dropdown-toggle',
              'iconClass' => 'icon-warning-sign'
              ) */
            /* example: $counter++=>array ('title' =>_tr('Careers'), 'class' => 'dropdown' ,'referTo' => array (

              array ('title' => _tr('Add Career'), 'class' => 'dropdown','slideClass'=>' dropdown-menu','referTo'=> array(
              array('title' => _tr('View Careers'), 'class' => '','link'=>array ('controller' => 'careers', 'action' => 'updateCareers' ))) ),
              array ('title' => _tr('View Careers'), 'class' => '','link'=>  array ('controller' => 'careers', 'action' => 'manageCareers'  ))
              )
              ,'slideClass'=>' dropdown-menu','linkClass'=>'dropdown-toggle','iconClass'=>'icon-globe'/*dropdown, dropdown dropdown_right
              ), */
    );

    $GLOBALS ['registry']->cache->save($GLOBALS ['registry']->menuSitePagesArray, $menuSitePagesArrayCashPath);
}


$navsArrayCashPath = md5('navsArray' . $GLOBALS ['registry']->currentViewLang);
$GLOBALS ['registry']->navsArray = $GLOBALS ['registry']->cache->load($navsArrayCashPath);

if ($GLOBALS ['registry']->navsArray == false) {
    $counter = 0;

    $GLOBALS ['registry']->navsArray = array(
        //////////////////////////////////////////individuals
        $counter ++ => array(
            'title' => _tr('Control Individuals'),
            'class' => '',
            'link' => array(
                'controller' => 'people',
                'action' => 'addEditIndividual',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            ),
            'referTo' => array(array(
                    'title' => _tr('Individuals'),
                    'class' => '',
                    'link' => array(
                        'controller' => 'people',
                        'action' => 'viewIndividuals',
                        'target' => '',
                        'mainURL' => HTTP_HOST_PATH
                    )
                )
            )
        ),
        $counter ++ => array(
            'title' => _tr('Individuals'),
            'class' => '',
            'link' => array(
                'controller' => 'people',
                'action' => 'viewIndividuals',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            )
        ),
        //////////////////////////////////////////organisations
        
        $counter ++ => array(
            'title' => _tr('Control Organisations'),
            'class' => '',
            'link' => array(
                'controller' => 'organisations',
                'action' => 'addEditOrganisation',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            ),
            'referTo' => array(array(
                    'title' => _tr('Organisations'),
                    'class' => '',
                    'link' => array(
                        'controller' => 'organisations',
                        'action' => 'viewOrganisations',
                        'target' => '',
                        'mainURL' => HTTP_HOST_PATH
                    )
                )
            )
        ),
        $counter ++ => array(
            'title' => _tr('view Organisation'),
            'class' => '',
            'link' => array(
                'controller' => 'organisations',
                'action' => 'viewOrganisation',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            ),
            'referTo' => array(array(
                    'title' => _tr('Organisations'),
                    'class' => '',
                    'link' => array(
                        'controller' => 'organisations',
                        'action' => 'viewOrganisations',
                        'target' => '',
                        'mainURL' => HTTP_HOST_PATH
                    )
                )
            )
        ),        
        $counter ++ => array(
            'title' => _tr('Organisations'),
            'class' => '',
            'link' => array(
                'controller' => 'organisations',
                'action' => 'viewOrganisations',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            )
        ),
        //////////////////////////////////////////contracts
        
        $counter ++ => array(
            'title' => _tr('Control Contracts'),
            'class' => '',
            'link' => array(
                'controller' => 'contracts',
                'action' => 'addEditContract',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            ),
            'referTo' => array(array(
                    'title' => _tr('Contracts'),
                    'class' => '',
                    'link' => array(
                        'controller' => 'contracts',
                        'action' => 'viewContracts',
                        'target' => '',
                        'mainURL' => HTTP_HOST_PATH
                    )
                )
            )
        ),
        $counter ++ => array(
            'title' => _tr('Contracts'),
            'class' => '',
            'link' => array(
                'controller' => 'contracts',
                'action' => 'viewContracts',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            )
        ),
        //////////////////////////////////////////users
        $counter ++ => array(
            'title' => _tr('Users'),
            'class' => '',
            'link' => array(
                'controller' => 'users',
                'action' => 'viewUsers',
                'target' => '',
                'mainURL' => HTTP_HOST_PATH
            )
        ),
    );
    $GLOBALS ['registry']->cache->save($GLOBALS ['registry']->navsArray, $navsArrayCashPath);
}

/**
 * get array of url elements contain target , link
 * @param array element
 * @return array url
 */
function _getURLMainElements($element) {
    $elementURL = array();
    $elementURL['target'] = (array_key_exists('target', $element ['link'])) ? 'target="' . $element ['link']['target'] . '"' : '';
    $mainURL = (array_key_exists('mainURL', $element ['link'])) ? $element ['link']['mainURL'] : NULL;
    $elementURL['URL'] = checkArrayContainElements($element ['link']) ? getURL($element ['link'], $mainURL) : $element ['link'];
    $elementURL['options'] = (array_key_exists('options', $element)) ? $element ['options'] : '';
    return $elementURL;
}

function drawSideBarMenu($pagesMenuArrays, &$html = '', $generalOption = array()) {
    $referTo = '';
    $collapseNo = 0;
    $activeAcorHead = '';
    $currentController = App::$controller;
    foreach ($pagesMenuArrays as $index => $options) {
        $activeAcorHead = 'accordion-body';
        $referTo = $options ['referTo'];
        $collapseNo ++;
        if (is_array($options ['referTo'])) {
            foreach ($options ['referTo'] as $menuElement) {
                if ($menuElement ['link'] == '') {
                    if (is_array($menuElement ['referTo'])) {
                        foreach ($menuElement ['referTo'] as $key => $childMenuElement) {

                            if ($childMenuElement ['link'] ['controller'] == $currentController->controller && $childMenuElement ['link'] ['action'] == $currentController->action) {

                                $activeAcorHead .= ' in';
                                break;
                            }
                        }
                    }
                } else {
                    if ($menuElement ['link'] ['controller'] == $currentController->controller && $menuElement ['link'] ['action'] == $currentController->action) {

                        $activeAcorHead .= ' in';
                        break;
                    }
                }
            }
        }
        if ($options['referTo'] != '') {
            $html .= '	<div class="accordion-heading ">';
            $linkURL = _getURLMainElements($options);
            $collapse = (is_array($options ['referTo'])) ? '#collapse' . $collapseNo : $linkURL['URL'];
            $html .= '<a tabindex=-1 href="' . $collapse . '"	data-parent="#side_accordion" data-toggle="collapse"
													class="accordion-toggle"><i
													class="' . $options ['iconClass'] . '"></i>' . $options ['title'] . '</a></div>';
            if (is_array($options ['referTo'])) {
                $html .= '<div class="' . $activeAcorHead . ' collapse"
												id="collapse' . $collapseNo . '">
												<div class="accordion-inner">
													<ul class="nav nav-list">';
                foreach ($referTo as $key => $optionsVal) {

                    if ($optionsVal ['link'] == '') {

                        $html .= '<li class="nav-header nav-header-sideBar ">' . $optionsVal ['title'] . '</li>';
                        if (is_array($optionsVal ['referTo'])) {
                            foreach ($optionsVal ['referTo'] as $key => $childOptionsVal) {

                                $linkURLInfoArray = _getURLMainElements($childOptionsVal);

                                if ($childOptionsVal ['link'] ['controller'] == $currentController->controller && $childOptionsVal ['link'] ['action'] == $currentController->action) {
                                    $html .= '<li class="active"><a tabindex=-1 href="' . $linkURLInfoArray['URL'] . '" ' . $linkURLInfoArray['target'] . ' ' . $linkURLInfoArray['options'] . '>(' . $childOptionsVal ['shortCut'] . "):" . $childOptionsVal ['title'] . '</a></li>';
                                } else {
                                    $html .= '<li><a tabindex=-1 href="' . $linkURLInfoArray['URL'] . '" ' . $linkURLInfoArray['target'] . ' ' . $linkURLInfoArray['options'] . '>(' . $childOptionsVal ['shortCut'] . "):" . $childOptionsVal ['title'] . '</a>';
                                }
                            }
                        }
                    } else {
                        $linkURLInfoArray = _getURLMainElements($optionsVal);
                        if ($optionsVal ['link'] ['controller'] == $currentController->controller && $optionsVal ['link'] ['action'] == $currentController->action) {
                            $html .= '<li class="active"><a tabindex=-1 href="' . $linkURLInfoArray['URL'] . '" ' . $linkURLInfoArray['target'] . ' ' . $linkURLInfoArray['options'] . '>' . $optionsVal ['title'] . '</a></li>';
                        } else {
                            $html .= '<li><a tabindex=-1 href="' . $linkURLInfoArray['URL'] . '" ' . $linkURLInfoArray['target'] . ' ' . $linkURLInfoArray['options'] . '>' . $optionsVal ['title'] . '</a>';
                        }
                    }
                }
                $html .= '</ul></div></div>';
            }
        }
    }

    return $html;
    /*
     * $counter = 0; $current = ''; $currentController = App::$controller; $propertiesString = ''; if (sizeof ( $generalOption ) > 0) { foreach ( $generalOption as $optionKey => $optionValue ) $propertiesString .= ' ' . $optionKey . '="' . $optionValue . '"'; } if ($html == '') $html .= '<ul ' . $propertiesString . '>'; $arraySize = sizeof ( $pagesMenuArrays ); $counter = 0; foreach ( $pagesMenuArrays as $key => $value ) { if (is_array ( $value ['referTo'] )) { foreach ( $value ['referTo'] as $childArray ) { if (is_array ( $childArray ['link'] )) if ($currentController->controller == $childArray ['link'] ['controller'] && $currentController->action == $childArray ['link'] ['action']) $value ['class'] .= ' current'; } $html .= '<li ' . (($value ['class'] != '') ? 'class="' . $value ['class'] . '"' : "") . '><a href="#" data-toggle="dropdown" ' . (($value ['linkClass'] != '') ? 'class="' . $value ['linkClass'] . '"' : "") . '><i class="' . $value ['iconClass'] . (($childArray ['referTo'] != null) ? ' icon-white"' : '"') . ' ></i> ' . $value ['title'] . '<b class="caret' . (($childArray ['referTo'] != null) ? '"' : '-right"') . '></b></a>'; $html .= '<ul ' . (($value ['slideClass'] != '') ? 'class="' . $value ['slideClass'] . '"' : "") . ' >'; drawCpanelPagesMenu ( $value ['referTo'], $html ); } else { if (is_array ( $value ['link'] )) { $link = getURL ( $value ['link'] ); if ($currentController->controller == $value ['link'] ['controller'] && $currentController->action == $value ['link'] ['action']) $value ['class'] .= ' current'; } else $link = $value ['link']; $html .= '<li ' . (($value ['class'] != '') ? 'class="' . $value ['class'] . '"' : "") . '><a ' . (($link != '') ? 'href="' . $link . '"' : "") . (($value ['linkClass'] != '') ? 'class="' . $value ['linkClass'] . '"' : "") . '>' . $value ['title'] . '</a></li>'; } if ($counter == $arraySize - 1) { $html .= '</ul>'; } $counter ++; } return $html;
     */
}

function drawCpanelPagesMenu($pagesMenuArrays, &$html = '', $generalOption = array()) {
    $counter = 0;
    $current = '';
    $currentController = App::$controller;
    $propertiesString = '';

    if (sizeof($generalOption) > 0) {
        foreach ($generalOption as $optionKey => $optionValue)
            $propertiesString .= ' ' . $optionKey . '="' . $optionValue . '"';
    }
    if ($html == '')
        $html .= '<ul ' . $propertiesString . '>';
    $arraySize = sizeof($pagesMenuArrays);
    $counter = 0;
    foreach ($pagesMenuArrays as $key => $value) {
        if (is_array($value ['referTo'])) {
            foreach ($value ['referTo'] as $childArray) {
                if (is_array($childArray ['link']))
                    if ($currentController->controller == $childArray ['link'] ['controller'] && $currentController->action == $childArray ['link'] ['action'])
                        $value ['class'] .= ' current';
            }
            $linkURLInfoArray = _getURLMainElements($value);

            $html .= '<li ' . (($value ['class'] != '') ? 'class="' . $value ['class'] . '"' : "") . '><a tabindex=-1 href="' . $linkURLInfoArray['URL'] . '" ' . $linkURLInfoArray['target'] . ' data-toggle="dropdown"  ' . (($value ['linkClass'] != '') ? 'class="' . $value ['linkClass'] . '"' : "") . '><i class="' . $value ['iconClass'] . (($childArray ['referTo'] != null) ? '  icon-white"' : '"') . ' ></i> ' . $value ['title'] . '<b class="caret' . (($childArray ['referTo'] != null) ? '"' : '-right"') . '></b></a>';
            $html .= '<ul ' . (($value ['slideClass'] != '') ? 'class="' . $value ['slideClass'] . '"' : "") . ' >';

            drawCpanelPagesMenu($value ['referTo'], $html);
        } else {
            if (is_array($value ['link'])) {
                if ($currentController->controller == $value ['link'] ['controller'] && $currentController->action == $value ['link'] ['action'])
                    $value ['class'] .= ' current';
            }
            $linkURLInfoArray = _getURLMainElements($value);

            $html .= '<li ' . (($value ['class'] != '') ? 'class="' . $value ['class'] . '"' : "") . '><a tabindex=-1 ' . (($linkURLInfoArray['URL'] != '') ? 'href="' . $linkURLInfoArray['URL'] . '"' : "") . (($value ['linkClass'] != '') ? 'class="' . $value ['linkClass'] . '"' : "") . ' ' . $linkURLInfoArray['target'] . ' ' . $linkURLInfoArray['options'] . '>' . $value ['title'] . '</a></li>';
        }
        if ($counter == $arraySize - 1) {
            $html .= '</ul>';
        }
        $counter ++;
    }
    return $html;
}

/*
 * draw Cpanel Layout @param int language Key @return string HTML
 */

function drawCPanelLayoutLanguageLinks($currentKey) {
    global $currentController;
    $i = 0;
    $size = sizeof($GLOBALS ['sysLangLabels']) - 1;
    foreach ($GLOBALS ['sysLangLabels'] as $key => $label) {
        $params = (is_array($GLOBALS ['registry']->args) ? array_merge($GLOBALS ['registry']->args, array(
                            'viewLang' => $GLOBALS ['sysLang'] [$key]
                        )) : array(
                    'viewLang' => $GLOBALS ['sysLang'] [$key]
        ));
        echo (($currentKey != $key) ? $GLOBALS ['registry']->drawer->createCustomTag('a', array(
                    'href' => getURL(array(
                        'controller' => $GLOBALS ['registry']->controller,
                        'action' => $GLOBALS ['registry']->action,
                        'params' => $params
                    )),
                    'class' => 'langURL'
                        ), false, $label) : $label) . (($i == $size) ? '' : ' | ');

        $i ++;
    }
}

function getStyleSwitch($styleName = '', $cookieName = 'colorStyle', $path = '') {
    $path = CSS_PATH . 'cpanel' . DS;

    $fileName = $GLOBALS ['registry']->request->getCookie($cookieName);
    if (isset($fileName) & $fileName != '') {
        $filePath = $path . $fileName . '.css';
    } else
        $filePath = $path . 'blue.css';
    return mapFile2URL($filePath);
}

/**
 *
 * drawCpanelNav
 * @param unknown $navArrays
 * @param string $html
 * @param string target url
 * @param string custom controller
 * @param string custom action
 * @return string
 */
function drawCpanelNav($navArrays, &$html = '', $target = '', $controller = '', $action = '') {
    $counter = 0;
    $currentController = App::$controller;
    $controller = ($controller != '') ? $controller : $currentController->controller;
    $action = ($action != '') ? $action : $currentController->action;


    $target = ($target != '') ? 'target="' . $target . '"' : '';

    if ($html == '')
        $html .= '<ol class="breadcrumb">';
    $link = getURL(array('controller' => MAIN_CONTROLLER, 'action' => MAIN_ACTION, 'mainURL' => HTTP_HOST_PATH));
    $html .= '<li><a tabindex=-1  href="' . $link . '" ' . $target . '>	<i></i> ' . _tr('Home') . ' </a></li>';
    $arraySize = sizeof($navArrays);


    foreach ($navArrays as $key => $value) {

        if (is_array($value ['link'])) {
            $linkURLInfoArray = _getURLMainElements($value);

            if ($controller == $value ['link'] ['controller'] && $action == $value ['link'] ['action']) {

                if (is_array($value ['referTo'])) {
                    foreach ($value ['referTo'] as $childArray) {
                        if (is_array($childArray ['link'])) {
                            $linkURLIChildnfoArray = _getURLMainElements($childArray);
                            $html .= '<li><a  tabindex=-1 href="' . $linkURLIChildnfoArray['URL'] . '" ' . $linkURLIChildnfoArray['target'] . ' ' . $linkURLIChildnfoArray['options'] . '>' . $childArray ['title'] . '</a></li>';
                        }
                    }
                }
                $html .= '<li ' . (($value ['class'] != '') ? 'class="' . $value ['class'] . '"' : "") . '>' . $value ['title'] . '</li>';
            }
        }

        if ($counter == $arraySize - 1) {
            $html .= '</ol>';
        }
        $counter ++;
    }

    return $html;
}
