var FIXED_SHORT_PAGE_TITLE = 'Elid - ';
//CSS_PATH
//VENDOR_PATH
//JS_PATH
var mainController = {
    basicJSLoadFiles: [
        {'path': JS_PATH + 'cpanel/gebo_container.js', 'callBack': ''},
        {'path': VENDOR_PATH + 'datatables/jquery.dataTables.min.js', 'callBack': ''}        
    ],                         

    basicCSSLoadFiles: [
        
    ],
    mapURLS: [
        {
            'controller':'stores',
            'action':'addEditStores',
            
            'key': 'stores/addEditStores',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE +  _tl('Add/Edit WareHouse')},
            'cssFiles': [                
            ],
            'jsFiles': [
                {'path': JS_PATH + 'stores/stores/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/form.js', 'callBack': ''}
            ]
        },
        {
            'controller':'stores',
            'action':'viewStores',       
            
            'key': 'stores/viewStores',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('WareHouses')},
            'cssFiles': [   
               
            ],
            'jsFiles': [
                 //{'path': VENDOR_PATH + 'datatables/extras/TableTools/media/js/TableTools.js', 'callBack': ''},
                 //{'path': VENDOR_PATH + 'datatables/extras/TableTools/media/js/ZeroClipboard.js', 'callBack': ''},
                 //{'path': VENDOR_PATH + 'responsiveDatatables/js/DT_bootstrap.js', 'callBack': ''},
                 //{'path': VENDOR_PATH + 'responsiveDatatables/js/datatables.responsive.js', 'callBack': ''},
                 //{'path': VENDOR_PATH + 'responsiveDatatables/js/lodash.min.js', 'callBack': ''},
             
                {'path': JS_PATH + 'stores/stores/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/grid.js', 'callBack': ''}
            ]
        },
        
 
        {
            'controller':'stores',
            'action':'addEditCategories',       
            
            'key': 'stores/addEditCategories',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Category')},
            'cssFiles': [   
               
            ],
            'jsFiles': [
                {'path': JS_PATH + 'stores/stores/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/form.js', 'callBack': ''}
            ]
        },
        {
            'controller':'stores',
            'action':'viewCategories',       
            
            'key': 'stores/viewCategories',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Categories')},
            'cssFiles': [   
               
            ],
            'jsFiles': [
                {'path': JS_PATH + 'stores/stores/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/grid.js', 'callBack': ''}
            ]
        },                
        {

            'controller':'stores',
            'action':'addEditModels',       
            
            'key': 'stores/addEditModels',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Model')},
            'cssFiles': [   

            ],
            'jsFiles': [
                {'path': JS_PATH + 'stores/models/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/models/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/models/propertiesController.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/models/form.js', 'callBack': ''}

                
            ]
        },   
        {
            'controller':'stores',
            'action':'viewModels',       
            
            'key': 'stores/viewModels',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Models')},
            'cssFiles': [   
               
            ],
            'jsFiles': [
                {'path': JS_PATH + 'stores/models/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/models/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/models/grid.js', 'callBack': ''}
            ]
        },     
    {'key': 'stores/viewProducts', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Products')}}, // aproxematly
    {'key': 'stores/import', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add Import Transaction')}},
    {'key': 'stores/addExportTransaction', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add Export Transaction')}},
    {'key': 'stores/exportFromStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add Export Transaction')}},
    {'key': 'stores/returns', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Return Transaction')}},
    {'key': 'stores/customerReturns', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer Return Transaction')}},
    {'key': 'stores/viewCustomerTransactions', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer Transactions')}},
    {'key': 'stores/viewSalesmanTransactions', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Salesman Transactions')}}, // aproxematly
    {'key': 'stores/viewTransactions', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transactions')}},  
    
        {
            'controller':'stores',
            'action':'addEditProducts',       
            
            'key': 'stores/addEditProducts',
            'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Products')},
            'cssFiles': [   
               
            ],
            'jsFiles': [
                {'path': JS_PATH + 'stores/stores/global.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/controller.js', 'callBack': ''},
                {'path': JS_PATH + 'stores/stores/form.js', 'callBack': ''}
            ]
        },         
    ],
    loadNavigator: function(controller,action){
        
        $('#navBreadCrumb').remove();
        URL = router.getURL({'controller': 'interfaceClient',
                   'action': 'getNavigator',
                   'params': {'controller':controller,'action':action}
               });        
        
          jQuery.ajax({
            url: URL,
            dataType: "html",
            cache: false
        }).done(function(data){
            if(!$('#navBreadCrumb').length){
                $("#viewPlaceHolder").prepend(data);
            }
        });
        
    },
    
    loadBasicJSFiles: function () {
        mainController.loadJSFiles(mainController.basicJSLoadFiles).delay( 800 );
    },
    loadJSFiles: function (files, loadAllFilesCallBack) {
        var file = files.shift();
        var path = file.path;
        
      
        jQuery.ajax({
            url: path,
            dataType: "script",
            cache: false
        }).done(function () {
            if (Object.prototype.toString.call(files) === '[object Array]' && files.length > 0) {
                mainController.loadJSFiles(files);


            }
        }).fail(function () {
            if (Object.prototype.toString.call(files) === '[object Array]' && files.length > 0) {
                mainController.loadJSFiles(files);


            }
        });
        if(loadAllFilesCallBack != '')
            eval(loadAllFilesCallBack);
          /*
         $.getScript(path, Object.prototype.toString.call(files) === '[object Array]' && files.length > 0 ? function () {
         //call back the file
         if (file.hasOwnProperty('callBack') && file.callBack != '') {
         file.callBack;
         }
         mainController.loadJSFiles(files);
         } : loadAllFilesCallBack).fail(function () {
         
         if (Object.prototype.toString.call(files) === '[object Array]' && files.length > 0)
         {
         //call back the file
         if (file.hasOwnProperty('callBack') && file.callBack != '') {
         file.callBack;
         }
         mainController.loadJSFiles(files);
         } else {
         eval(loadAllFilesCallBack);
         }
         
         });
        ;

         $.getScript(path).done(function () {
         
         if (Object.prototype.toString.call(files) === '[object Array]' && files.length > 0)
         {
         //call back the file
         if (file.hasOwnProperty('callBack') && file.callBack != '') {
         file.callBack;
         }
         mainController.loadJSFiles(files);
         } else {
         eval(loadAllFilesCallBack);
         }
         
         });*/
    },
    loadCSSFiles: function (files, loadAllFilesCallBack) {

        while (Object.prototype.toString.call(files) === '[object Array]' && files.length > 0) {
            var file = files.shift();
            var path = file.path;
            mainController.loadCSSFiles(path, file.hasOwnProperty('callBack') ? file.callBack : '');
        }
        if (loadAllFilesCallBack != '') {
            eval(loadAllFilesCallBack);
        }
    }
    ,
    loadStyleSheet: function (path, fn, scope) {
        var head = document.getElementsByTagName('head')[0], // reference to document.head for appending/ removing link nodes
                link = document.createElement('link');           // create the link node
        link.setAttribute('href', path);
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');

        var sheet, cssRules;
// get the correct properties to check for depending on the browser
        if ('sheet' in link) {
            sheet = 'sheet';
            cssRules = 'cssRules';
        }
        else {
            sheet = 'styleSheet';
            cssRules = 'rules';
        }

        var timeout_id = setInterval(function () {                     // start checking whether the style sheet has successfully loaded
            try {
                if (link[sheet] && link[sheet][cssRules].length) { // SUCCESS! our style sheet has loaded
                    clearInterval(timeout_id);                      // clear the counters
                    clearTimeout(timeout_id);
                    fn.call(scope || window, true, link);           // fire the callback with success == true
                }
            } catch (e) {
            } finally {
            }
        }, 10), // how often to check if the stylesheet is loaded
                timeout_id = setTimeout(function () {       // start counting down till fail
                    clearInterval(timeout_id);             // clear the counters
                    clearTimeout(timeout_id);
                    head.removeChild(link);                // since the style sheet didn't load, remove the link node from the DOM
                    fn.call(scope || window, false, link); // fire the callback with success == false
                }, 15000);                                 // how long to wait before failing

        head.appendChild(link);  // insert the link node into the DOM and start loading the style sheet

        return link; // return the link node;
    }

};

var mapURLS = [
    {'key': 'index/home', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Welcome in')}},
    {'key': 'configuration/editConfiurations', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('System Settings')}},
    {'key': 'configuration/addEditViewCountry', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Control Countries')}},
    {'key': 'configuration/addEditViewDefinitions', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definitions Control')}},
    {'key': 'users/addEditRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Role')}},
    {'key': 'users/viewRoles', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Roles')}},
    {'key': 'configuration/addEditEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Employee')}},
    {'key': 'configuration/viewEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employees')}},

    {'key': 'packaging/addEditPackaging', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Packaging')}},
    {'key': 'packaging/viewPackaging', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Packaging')}},

    {'key': 'customer/addEditCustomers', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Add/Edit Customer')}},
    {'key': 'customer/viewCustomers', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customers')}}, //780

    {'key': 'report/reportProducts', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Products Report')}},
    {'key': 'report/reportProductsPKG', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Products Packaging Report')}},
    {'key': 'report/reportProductsTransaction', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Products Transactions Report')}},
    {'key': 'report/reportSalesman', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('SalesMan Report')}},
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////// helpcenter /////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    {'key': 'helpCenter/hc_gettingStarted', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_dashboard', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_ControlSetting', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_loginInfo', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_userInfo', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_sendMessageEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_mailBox', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_notifications', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_exportReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Getting started')}},
    {'key': 'helpCenter/hc_addCountries', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Countries')}},
    {'key': 'helpCenter/hc_editCountries', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Countries'), 'height': {'desk': 1370, 'tablet': 2030}}},
    {'key': 'helpCenter/hc_deleteCountries', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Countries'), 'height': {'desk': 2900, 'tablet': 3100}}},
    {'key': 'helpCenter/hc_filterCountries', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Countries'), 'height': {'desk': 1600, 'tablet': 1700}}},
    {'key': 'helpCenter/hc_aboutDefinition', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definition'), 'height': {'desk': 1030, 'tablet': 850}}},
    {'key': 'helpCenter/hc_addDefinition', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definition'), 'height': {'desk': 2150, 'tablet': 2200}}},
    {'key': 'helpCenter/hc_viewDefinition', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definition'), 'height': {'desk': 1220, 'tablet': 1700}}},
    {'key': 'helpCenter/hc_editDefinition', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definition'), 'height': {'desk': 1780, 'tablet': 1750}}},
    {'key': 'helpCenter/hc_deleteDefinition', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definition'), 'height': {'desk': 1500, 'tablet': 1800}}},
    {'key': 'helpCenter/hc_filterDefinition', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Definition'), 'height': {'desk': 1730, 'tablet': 1800}}},
    {'key': 'helpCenter/hc_aboutRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Role'), 'height': {'desk': 900, 'tablet': 840}}},
    {'key': 'helpCenter/hc_addRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Role'), 'height': {'desk': 2320, 'tablet': 2340}}},
    {'key': 'helpCenter/hc_viewRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Role'), 'height': {'desk': 1200, 'tablet': 1980}}},
    {'key': 'helpCenter/hc_editRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Role'), 'height': {'desk': 1280, 'tablet': 1630}}},
    {'key': 'helpCenter/hc_deleteRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Role'), 'height': {'desk': 1250, 'tablet': 1650}}},
    {'key': 'helpCenter/hc_filterRole', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Role'), 'height': {'desk': 1430, 'tablet': 1700}}},
    {'key': 'helpCenter/hc_aboutEmployee', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 800, 'tablet': 680}}},
    {'key': 'helpCenter/hc_addEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 3700, 'tablet': 3330}}},
    {'key': 'helpCenter/hc_viewEmployee', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 1330, 'tablet': 2150}}},
    {'key': 'helpCenter/hc_editEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 1440, 'tablet': 1880}}},
    {'key': 'helpCenter/hc_deleteEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 1640, 'tablet': 1860}}},
    {'key': 'helpCenter/hc_ActiveEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 1660, 'tablet': 1840}}},
    {'key': 'helpCenter/hc_filterEmployees', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Employee'), 'height': {'desk': 1650, 'tablet': 1700}}},
    {'key': 'helpCenter/hc_aboutStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Store'), 'height': {'desk': 750, 'tablet': 750}}},
    {'key': 'helpCenter/hc_addStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Store'), 'height': {'desk': 3150, 'tablet': 3400}}},
    {'key': 'helpCenter/hc_viewStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Store'), 'height': {'desk': 1200, 'tablet': 2150}}},
    {'key': 'helpCenter/hc_editStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Store'), 'height': {'desk': 1130, 'tablet': 1330}}},
    {'key': 'helpCenter/hc_deleteStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Store'), 'height': {'desk': 1580, 'tablet': 1900}}},
    {'key': 'helpCenter/hc_filterStore', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Store'), 'height': {'desk': 900, 'tablet': 1270}}},
    {'key': 'helpCenter/hc_aboutCategory', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Category'), 'height': {'desk': 750, 'tablet': 750}}},
    {'key': 'helpCenter/hc_addCategory', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Category'), 'height': {'desk': 2750, 'tablet': 3100}}},
    {'key': 'helpCenter/hc_viewCategory', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Category'), 'height': {'desk': 1240, 'tablet': 2100}}},
    {'key': 'helpCenter/hc_editCategory', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Category'), 'height': {'desk': 1120, 'tablet': 1380}}},
    {'key': 'helpCenter/hc_deleteCategory', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Category'), 'height': {'desk': 2000, 'tablet': 1900}}},
    {'key': 'helpCenter/hc_filterCategory', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Category'), 'height': {'desk': 1000, 'tablet': 1350}}},
    {'key': 'helpCenter/hc_aboutModel', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Model'), 'height': {'desk': 1130, 'tablet': 870}}},
    {'key': 'helpCenter/hc_addModel', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Model'), 'height': {'desk': 3190, 'tablet': 3350}}},
    {'key': 'helpCenter/hc_manageProperties', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Model'), 'height': {'desk': 2860, 'tablet': 3250}}},
    {'key': 'helpCenter/hc_viewModel', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Model'), 'height': {'desk': 2180, 'tablet': 2920}}},
    {'key': 'helpCenter/hc_editModel', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Model'), 'height': {'desk': 1400, 'tablet': 1980}}},
    {'key': 'helpCenter/hc_filterModel', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Model'), 'height': {'desk': 1000, 'tablet': 1360}}},
    {'key': 'helpCenter/hc_aboutPackage', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Package'), 'height': {'desk': 750, 'tablet': 1030}}},
    {'key': 'helpCenter/hc_addPackage', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Package'), 'height': {'desk': 3720, 'tablet': 4120}}},
    {'key': 'helpCenter/hc_viewPackage', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Package'), 'height': {'desk': 1700, 'tablet': 2670}}},
    {'key': 'helpCenter/hc_editPackage', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Package'), 'height': {'desk': 800, 'tablet': 980}}},
    {'key': 'helpCenter/hc_deletePackage', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Package'), 'height': {'desk': 1100, 'tablet': 1190}}},
    {'key': 'helpCenter/hc_filterPackage', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Package'), 'height': {'desk': 625, 'tablet': 800}}},
    {'key': 'helpCenter/hc_aboutProduct', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Product'), 'height': {'desk': 800, 'tablet': 625}}},
    {'key': 'helpCenter/hc_addProduct', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Product'), 'height': {'desk': 3190, 'tablet': 3330}}},
    {'key': 'helpCenter/hc_viewProducts', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Product'), 'height': {'desk': 3620, 'tablet': 4230}}},
    {'key': 'helpCenter/hc_manageBrand', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Product'), 'height': {'desk': 3140, 'tablet': 3900}}},
    {'key': 'helpCenter/hc_editProduct', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Product'), 'height': {'desk': 900, 'tablet': 1280}}},
    {'key': 'helpCenter/hc_filterProduct', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Product'), 'height': {'desk': 950, 'tablet': 1300}}},
    {'key': 'helpCenter/hc_aboutTransaction', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 1510, 'tablet': 2800}}},
    {'key': 'helpCenter/hc_importItem', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 3840, 'tablet': 4450}}},
    {'key': 'helpCenter/hc_exportItem', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 3280, 'tablet': 3360}}},
    {'key': 'helpCenter/hc_customerReturns', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 5620, 'tablet': 5500}}},
    {'key': 'helpCenter/hc_returns', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 5020, 'tablet': 4770}}},
    {'key': 'helpCenter/hc_customerTransaction', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 2930, 'tablet': 3560}}},
    {'key': 'helpCenter/hc_salesmanTransaction', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 3200, 'tablet': 3700}}},
    {'key': 'helpCenter/hc_viewTransaction', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Transaction'), 'height': {'desk': 2930, 'tablet': 3300}}},
    {'key': 'helpCenter/hc_aboutCustomer', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 1040, 'tablet': 1640}}},
    {'key': 'helpCenter/hc_addCustomer', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 2880, 'tablet': 3250}}},
    {'key': 'helpCenter/hc_viewCustomers', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 2030, 'tablet': 3070}}},
    {'key': 'helpCenter/hc_editCustomer', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 1140, 'tablet': 1220}}},
    {'key': 'helpCenter/hc_deleteCustomer', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 1350, 'tablet': 1590}}},
    {'key': 'helpCenter/hc_ActiveCustomer', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 950, 'tablet': 1330}}},
    {'key': 'helpCenter/hc_filterCustomers', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Customer'), 'height': {'desk': 1250, 'tablet': 1250}}},
    {'key': 'helpCenter/hc_aboutReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Report'), 'height': {'desk': 1620, 'tablet': 2720}}},
    {'key': 'helpCenter/hc_productReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Report'), 'height': {'desk': 2200, 'tablet': 3460}}},
    {'key': 'helpCenter/hc_productPkgReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Report'), 'height': {'desk': 2360, 'tablet': 3770}}},
    {'key': 'helpCenter/hc_productTransactionReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Report'), 'height': {'desk': 2670, 'tablet': 3600}}},
    {'key': 'helpCenter/hc_customerTransReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Report'), 'height': {'desk': 2480, 'tablet': 3870}}},
    {'key': 'helpCenter/hc_salesmanTransReport', 'prop': {'title': FIXED_SHORT_PAGE_TITLE + _tl('Report'), 'height': {'desk': 2520, 'tablet': 4100}}},
];