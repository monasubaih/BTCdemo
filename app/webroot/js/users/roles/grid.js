var responsiveHelper;
var breakpointDefinition = {
    tablet: 1024,
    phone: 480
};
var gridEventINI = {
    deleteRowsINI: function() {
        //delete row operation 
        var deleteIndex = 0;
        $(".delete_rows_dt").live('click', function(e) {
            opStatus = false;
            e.preventDefault();
            var tableid = $(this).data('tableid'),
                    oTable = $('#' + tableid).dataTable();
            var anSelected = oTable.$('tr.row_selected');

            if ($('input[name="row_sel[]"]:checked', '#' + tableid).length > 0 || anSelected.length !== 0) {

                messageDialog.dangerConfirmMsg(_tl('are you sure you want to remove roles?'), function() {
                    var aPos = aData = null;
                    if ($('input[name="row_sel[]"]:checked', '#' + tableid).length > 0)
                    {//multi selection
                        gridOperation.prepareRolesModelForOperation();
                        $('input[name="row_sel[]"]:checked', oTable.fnGetNodes()).closest('tr').fadeTo(300, 0, function() {
                            aPos = oTable.fnGetPosition(this);
                            aData = oTable.fnGetData(aPos);
                            oTable.fnDeleteRow(aPos);
                            //  var childNum = ((parseInt(aPos) - 0) + 1) - (parseInt(deleteIndex) - 0);
                            // $('#dt_grid > tbody tr:nth-child(' + childNum + ')').remove();
                            // deleteIndex++;
                        });
                        $('input[name="row_sel[]"]', '#' + tableid).attr('checked', false);
                        
                    }
                    else if (anSelected != 0) {//select one row
                        rolesModelOperations.empty();
                        aData = oTable.fnGetData(anSelected[0]);
                        aPos = oTable.fnGetPosition(anSelected[0]);
                        rolesModelsOperationsObjects['rolesSet'][0] = aData[ROLES_ID_GRID_PO];
                        oTable.fnDeleteRow(aPos);
                    
                    } 
                    opStatus=false;
                    rolesModelOperations.deleteRolesSet(rolesModelsOperationsObjects);
                    if (opStatus) {
                       
                        messageDialog.actionMsg(_tl('roles has been deleted successfully'), function() {
                            gridEventINI.clearRowSelection();
                            messageDialog.hide();
                        });
                    }
                    else{
                        
                           notify(['error', _tl('error in delete role')]);
                    }
                });
            }
            else {
                notify(['error', _tl('you must select one row in order to delete')]);
            }
        });

    }
    ,
    //refresh Grid
    refreshINI: function() {
        $('#refreshGrid').live('click', function() {
            maskBody(true, '#dt_grid');
            if (oTable) {

                oTable.fnClearTable(0);
                oTable.fnDestroy();
            }
            var oTable = gridOperation.buildGridTable();
            gridGeneralOpertion.gridClearFilters();
            maskBody(false, '#dt_grid');
            //employeeModelOperation.empty();
        });
    },
    // clear row selection
    clearRowSelection: function() {
        $(oTable.fnSettings().aoData).each(function() {
            $(this.nTr).removeClass('row_selected');
        });
    },
    // row selection 
    rowSelectionINI: function() {
        $('#dt_grid tbody tr').live('click', function(event) {        //not check box					
            if (!$(event.target).is("input")) {
                $(event.target.parentNode).addClass('row_selected');
                //gridEventINI.fillEmployeeModel(this);
            }
        });
        //* select all rows
        $('.select_rows').click(function() {
            var tableid = $(this).data('tableid');
            $('#' + tableid).find('input[name="row_sel[]"]').attr('checked', this.checked);
        });
    },
    addRoleRedirect: function() {
        $('#addBtn').live('click', function() {
            router.redirectTo(router.getURL({'controller': 'users', 'action': 'addEditRole'}), getGlobalVar('mainRotationTarget'));
        });
    }
,
    reportExport: function() {
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
          

            var URL = router.getURL({'controller': 'report', 'action': 'rolesExportReport'});
            var data = new Object();
            data.filters = filterOb;
            data.reportType = reportType;
            data = JSON.stringify(data);

            $().redirect(URL, {data: data}, 'POST');


        });
    }

};

// grid operations	
var gridOperation = {
    ini: function() {
        // call all the events in the start
        rolesModelOperations.ini();
        rolesGrid = $('#dt_grid');
        oTable = this.buildGridTable();
        gridGeneralOpertion.gridFilterINI();
        gridEventINI.rowSelectionINI();
        gridEventINI.refreshINI();
        gridEventINI.addRoleRedirect();
        gridEventINI.deleteRowsINI();
gridEventINI.reportExport();
    },
    prepareRolesModelForOperation: function() {
        var i = 0;
        var aPos = aData = null;
        rolesModelsOperationsObjects['rolesSet'] = [];

        $('input[name="row_sel[]"]:checked', oTable.fnGetNodes()).closest('tr').each(function() {
            aPos = oTable.fnGetPosition(this);
            aData = oTable.fnGetData(aPos);
            rolesModelsOperationsObjects['rolesSet'][i] = $(this).children().find('input').val();
            i++;
        });
    }
    ,
    buildGridTable: function() {
        //build the table 
        maskBody(true, '#dt_grid');
        // $('#addBtn').html(_tl('Add Role1'));
        $("#addBtn").text(_tl('Add Role'));

        var rolesSet = rolesModelOperations.getRoles();
        var oTable = rolesGrid.dataTable({
            "sDom": "<'row-fluid'<'span9'<'dt_add'><'dt_actions'>l<'dt_fillters'><'dt_refresh'>><'span3'<'dt_export'><'clear'>>><'row-fluid margin10'rt><'row-fluid margin10'<'span4'i><'span8'p>>",
           /* "oTableTools": {
                "sSwfPath": SWF_LINK,
                "aButtons": [
                    {"sExtends": "pdf", "sButtonText": "<i class='splashy-pdf'></i> PDF", "mColumns": [4, 5, 6], "adminstartion": "Stores"},
                    {"sExtends": "xls", "sButtonText": "<i class='splashy-xls'></i> Excel", "mColumns": [4, 5, 6]}]
            },*/
            "sPaginationType": "bootstrap",
            "aaSorting": [[ROLES_COUNTER_GRID_PO, "asc"]],
            "bLengthChange": false,
            "iDisplayLength": GRIDS_RECORDS_NUMBER,
            "oLanguage": gridsLangs,
            //"oLanguage": {"sLengthMenu": "_MENU_ records per page"},
            "aaData": rolesSet,
            "bDeferRender": false,
            "bProcessing": false,
            "bScrollCollapse": true,
            "bStateSave": false, "bAutoWidth": false, // to become responsive
            "fnPreDrawCallback": function() {
                // Initialize the responsive datatables helper once.
                if (!responsiveHelper) {
                    responsiveHelper = new ResponsiveDatatablesHelper(rolesGrid, breakpointDefinition);
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
            "fnInitComplete": function(oSettings, json) {
                $('.dt_fillters').html($('.dt_grid_fillters').html());
                $('.dt_refresh').html($('.dt_grid_refresh').html());
                $('.dt_actions').html($('.dt_grid_action_delete').html());
                $('.dt_add').html($('.dt_grid_add').html());
                $('.dt_export').html($('.dt_grid_action_export').html());
                //$('.dt_add').html($('.dt_grid_add_category').html());
                maskBody(false, '#dt_grid');
            },
            "aoColumns": [
                {"aTargets": [ROLES_ID_GRID_PO], 			"bVisible": false, 'sWidth': '0%'}, // Role id
                {"aTargets": [ROLES_APP_GRID_PO], 			"bVisible": false, 'sWidth': '0%'}, // Role App
                {"aTargets": [ROLES_COUNTER_GRID_PO], 		"bSortable": true, 'sWidth': '1%'}, // counter
                {"aTargets": [ROLES_ID_VIEW_GRID_PO], 		"bSortable": false, 'sWidth': '3%'}, // checkbox
                {"aTargets": [ROLES_APP_VIEW_GRID_PO], 		"bSortable": true, 'sWidth': '7%'}, // Administration
                {"aTargets": [ROLES_TITLE_VIEW_GRID_PO], 	"bSortable": true, 'sWidth': '12%'}, // Role Name
                {"aTargets": [ROLES_MODUELS_VIEW_GRID_PO], 	"bSortable": true, 'sWidth': '20%'}, // Modules
                {"aTargets": [ROLES_EDIT_HTML_GRID_PO], 	"bSortable": false, 'sWidth': '2%'}   // Edit
            ]
        });
        if (oTable.length > 0) {
            oTable.fnAdjustColumnSizing();
        }
        oTable.fnAdjustColumnSizing();

        return oTable;
    }
};
$(document).ready(function() {
    gridOperation.ini();

});
