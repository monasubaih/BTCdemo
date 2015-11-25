$(document).ready(function() {
    transactionModelOperation.ini();
// start the tour:
    /*
     if (parent.navModel.employeeLevel() == MANAGER_LEVEL)
     $('#w_sort03').addClass('bootstro');
     */


    $('#startTour').live('click', function() {
// start the tour:
        parent.startTour();
    });
    $(".bootstro-finish-btn").live('click', function() {

        updateUserTour = {
            type: 'POST',
            url: {'controller': 'usersApi',
                'action': 'updateUserLang',
                'mainURL': appsMainURLS.users},
            async: false,
            data: JSON.stringify({'userModel': {'User_ConfigInfo': {"userTour": "Done"}}}),
        };
        router.sendRequest(updateUserTour, function(data) {
        });

    });

    //draw initial Charts
    json = transactionModelOperation.getTransactionChart(null);
    gebo_charts.fl_c(json);


    //get chart with year/product filter
    $('#getReport').live('click', function() {

        var date = new Date();
        var year = ($('input[name="report_date"]').val() != '') ? $('input[name="report_date"]').val() : date.getFullYear();
        var firstDay = new Date(year, 0, 1);
        var lastDay = new Date((new Date(year, 12, 1)) - 1);

        firstDay = firstDay.getDate() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getFullYear();
        lastDay = lastDay.getDate() + "/" + (lastDay.getMonth() + 1) + "/" + lastDay.getFullYear();

        filterOb = {'filters': {
                //tr filter
                'startDate': firstDay,
                //Direct Filter
                'endDate': lastDay,
                'productID': $('select[name="Product_Name"]').val()
            }
        }

        json = transactionModelOperation.getTransactionChart(filterOb);
        if (json[IMPORT_TRANS_TYPE].length != 0 || json[EXPORT_TRANS_TYPE].length != 0 || json[TERMINATION_TRANS_TYPE].length != 0)
            gebo_charts.fl_c(json);
        else {
            $('#fl_c').html($(".noChart"))
        }
    });


    //Date with select year
    $("#dp2").datepicker({
        format: " yyyy",
        startView: "year",
        minViewMode: "years",
        autoclose: true,
        endDate: new Date()
    });
    gridOperation.ini();
});
var responsiveHelper;
var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};
var tableContainer = $('#dt_grid');
var filterOb = {};
var gridEventINI = {
    gridColumns: function() {
        return [
            {"aTargets": [PRODUCTS_ID_GRID_PO], "bVisible": false, 'sWidth': '0%'}, // Product ID
            {"aTargets": [PRODUCTS_PACKAGE_ID_GRID_PO], "bVisible": false, 'sWidth': '0%'}, // Model ID
            {"aTargets": [PRODUCTS_NAME_WITH_UNIT_GRID_PO], "bVisible": false, 'sWidth': '0%'}, // Product Name - Unit
            {"aTargets": [PRODUCTS_PACKAGES_GRID_PO], "bVisible": true, 'sWidth': '37%'}, // Package Name
            {"aTargets": [PRODUCTS_IMPORT_QUANTITY_GRID_PO], "bVisible": true, 'sWidth': '12%'}, // Import
            {"aTargets": [PRODUCTS_EXPORT_QUANTITY_GRID_PO], "bVisible": true, 'sWidth': '12%'}, // Export
            {"aTargets": [PRODUCTS_RETURN_QUANTITY_GRID_PO], "bVisible": true, 'sWidth': '12%'}, // Return
            {"aTargets": [PRODUCTS_TERMINATE_QUANTITY_GRID_PO], "bVisible": true, 'sWidth': '12%'}, // Terminate
        ];
    },
    //refresh Grid
    refreshINI: function() {
        $('#refreshGrid').live('click', function() {
            maskBody(true, '#dt_grid');
            if (oTable) {
                oTable.fnClearTable(0);
                oTable.fnDestroy();
            }

            oTable = gridOperation.buildGridTable();
            gridGeneralOpertion.gridClearFilters();

            //employeeModelOperation.empty();
            maskBody(false, '#dt_grid');
        });
    }
    ,reportExport: function() {
        $('.exportReportBtn').live('click', function() {
            var reportType='';
           if($(this).attr('ID')=='pdfBtn'){
           
            reportType=PDF_REPORT_TYPE;
            }
            else{
               if($(this).attr('ID')=='excelBtn'){
           
            reportType=EXCEL_REPORT_TYPE;
            } 
            }
            var filterOb = {};
       
            var URL = router.getURL({'controller': 'report', 'action': 'dailyReportExportReport'});
                    var data = new Object();
            data.filters = filterOb;
            data.reportType = reportType;
            data = JSON.stringify(data);

            $().redirect(URL, {data: data}, 'POST');
        });
    }
}

// grid operations	
var gridOperation = {
    ini: function() {
        // call all the events in the start


        oTable = this.buildGridTable();
        gridGeneralOpertion.gridViewOnlyFilterINI();
        gridEventINI.refreshINI();
         gridEventINI.reportExport();
    }
    ,
    buildGridTable: function() {
        //GET Filters 


        var oTable = tableContainer.dataTable({
            "sDom": "<'row-fluid'<'span9'l<'dt_refresh'>><'span3'<'dt_export'><'clear'>>><'row-fluid margin10'rt><'row-fluid margin10'<'span4'i><'span8'p>>", //"sDom": T<'clear'> for export print,pdf,xls,
           /*
            "oTableTools": {
                "sSwfPath": SWF_LINK,
                "aButtons": [
                    {"sExtends": "pdf", "sButtonText": "<i class='splashy-pdf'></i> PDF", "mColumns": "visible", "sTitle": "Report annual inventory of products - 2014", "adminstartion": "Stores", "duration": "From 1/1/2014 to 31/12/2014"},
                    {"sExtends": "xls", "sButtonText": "<i class='splashy-xls'></i> Excel", "mColumns": "visible"}]
            },*/
            "bLengthChange": false,
            "iDisplayLength": GRIDS_RECORDS_NUMBER, "oLanguage": gridsLangs,
            "sPaginationType": "bootstrap",
            "aaSorting": [[0, "desc"]],
            "aaData": transactionModelOperation.getReportProduct(),
            "bDeferRender": false,
            "bProcessing": true,
            //"bServerSide": true,
            //"fnServerData": fnDataTablesPipeline,
            "bScrollCollapse": true,
            "bStateSave": false, "bAutoWidth": false, // to become responsive
            "fnPreDrawCallback": function() {
                // Initialize the responsive datatables helper once.
                if (!responsiveHelper) {
                    responsiveHelper = new ResponsiveDatatablesHelper(tableContainer, breakpointDefinition);
                }
            },
            "fnRowCallback": function(nRow) {
                // to create expand icon
                responsiveHelper.createExpandIcon(nRow)
            },
            "fnDrawCallback": function(oSettings) {
                // to respond to window resize events
                responsiveHelper.respond();
            },
            "bInfo": true,
            "bRetrieve": true,
            /*"oLanguage": {
             
             "sUrl": dataTableLocalLink
             
             },*/
            "fnCreatedRow": function(nRow, aData, iDataIndex) {
            },
            "fnInitComplete": function(oSettings, json) {
                $('.dt_refresh').html($('.dt_grid_refresh').html());
                $('.dt_export').html($('.dt_grid_action_export').html());
                $('#dt_grid').fadeIn();
                var div = document.getElementById("overlay");
                if (div != null)
                    div.parentNode.removeChild(div);

            },
            "bDistroy": true,
            "aoColumns": gridEventINI.gridColumns()
        });
        if (oTable.length > 0) {
            oTable.fnAdjustColumnSizing();
        }
        oTable.fnAdjustColumnSizing();
        return oTable;
    }
};
