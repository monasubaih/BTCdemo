var transactionObj, json;
transactionModelOperation = {
    ini: function() {
        function requestViewModel(data) {

            var self = this;
            self.transID = ko.observable(data.transID);
            self.transNumber = ko.observable(data.transNumber);
            self.Sender = ko.observable(data.Sender);
            self.date = ko.observable(data.date);
            self.Reason = ko.observable(data.Reason);
            self.Related = ko.observable(data.Related);
            self.requestLink = function() {
                url = (data.isConfirm == NOT_CONFIRMED_STATUS) ? router.getURL({'controller': 'stores', 'action': 'cancelRequestDetails', params: {'transId': self.transID()}}) : '';
                return url;
            };
        }
        ;
        //view model
        function dashbordViewModel() {
            var self = this;

            self.showReportSection = ko.observable((parent.navModel.employeeLevel() == MANAGER_LEVEL) ? true : false);
            self.Product_ID = ko.observable("");
            self.Product_Name = ko.observableArray(transactionModelOperation.getProducts());
            self.report_date = ko.observable("");

            self.userNewRequestsCount = ko.observable(0);
            self.briefRequests = ko.observableArray([]);
            self.userNewRequestsCount = ko.observable(0);
            self.briefRequestsTitleHead = ko.computed(function() {
                return _tl('Cancel Requests') + ((this.userNewRequestsCount() > 0) ? _tl(' New') + ' (' + this.userNewRequestsCount() + ') ' : '');
            }, self);
            self.addBreifRequests = function(data) {
                if (data != null && data.length > 0) {
                    $.each(data, function(index) {

                        self.briefRequests.push(new requestViewModel(data[index]));
                    });
                }
            };
        }

        var dashbordViewModel = new dashbordViewModel();
        //applyBind(parent.navModel , $('#dash-board-messagesSection'));
        applyBind(dashbordViewModel, $('#dash-board-report'));
        getCancelRequest();
        function getCancelRequest() {
            aoData = {
                iDisplayStart: 0,
                iDisplayLength: 20
            };

            ajaxObj = new Object();
            ajaxObj = {
                type: 'POST',
                url: {
                    'controller': 'transactionsDecisionsApi',
                    'action': 'getCancelRequestsTransactions',
                    'mainURL': appsMainURLS.stores
                }, data: aoData,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8'

            };

            router.sendRequest(ajaxObj, function(json) {
                prepareRequests(json);

            });

        }
        function prepareRequests(json) {

            requestsArray = [];
            var Obj = jQuery.parseJSON(JSON.stringify(json));
            if (typeof Obj.requestTransactionData == "undefined")
                return [];
            else
            if (typeof Obj.requestTransactionData.requestTransAction == "undefined") {
                return [];
            } else {
                count = 0;
                for (var i in Obj.requestTransactionData.requestTransAction) {
                    if (Obj.requestTransactionData.requestTransAction[i] != null && count < NUMBER_REQUEST_VIEW) {
                        if (Obj.requestTransactionData.requestTransAction[i].transactionsDetails) {
                            var RETR_AddDate = Obj.requestTransactionData.requestTransAction[i].RETR_AddDate,
                                    RETR_IsConfirmed = Obj.requestTransactionData.requestTransAction[i].RETR_IsConfirmed,
                                    RETR_RequestBy_Name = setInputLanguage(Obj.requestTransactionData.requestTransAction[i].RETR_RequestBy_Name),
                                    RETR_Reson = Obj.requestTransactionData.requestTransAction[i].RETR_Reson;
                            var related = 0;
                            for (var key in Obj.requestTransactionData.requestTransAction[i].transactionsDetails) {
                                TRANS_ID = key;
                                TRANS_Number = Obj.requestTransactionData.requestTransAction[i].transactionsDetails[key].details.TRANS_Number;
                                related++;
                            }
                            relatedIcon = (related > 1) ? '<i class="related-transactions"></i>' : '';
                            if (RETR_IsConfirmed == NOT_CONFIRMED_STATUS) {
                                requestsArray = {
                                    transID: key,
                                    transNumber: TRANS_Number,
                                    Sender: RETR_RequestBy_Name,
                                    date: RETR_AddDate,
                                    Related: related - 1,
                                    Reason: RETR_Reson,
                                    isConfirm: RETR_IsConfirmed

                                };

                                dashbordViewModel.briefRequests.push(new requestViewModel(requestsArray));
                                count++;
                            }
                        }
                    }

                }
                dashbordViewModel.userNewRequestsCount(Obj.requestTransactionData.New_Messages_Count);
            }
        }

    },
    getProducts: function() {
        var products;
        ajaxObj = new Object();
        ajaxObj = {
            type: 'GET',
            url: {'controller': 'storesApi',
                'action': 'getAllProducts',
                'mainURL': appsMainURLS.stores},
        };
        router.sendRequest(ajaxObj, function(data) {

            var productName = '';
            products = [{'key': '', 'value': _tl('-- Select --')}];

            for (var x in data.products) {
                productName = '';
                if ('Product_Name' in data.products[x])
                    productName = setInputLanguage(data.products[x].Product_Name);

                products.push({
                    'value': productName,
                    'key': data.products[x].Product_ID
                });

            }

        });
        return products;
    },
    getTransactionChart: function(filterOb) {
        var dataToChart = [];

        dataToChart[IMPORT_TRANS_TYPE] = [];
        dataToChart[EXPORT_TRANS_TYPE] = [];
        dataToChart[TERMINATION_TRANS_TYPE] = [];

        ajaxObj = new Object();
        ajaxObj = {
            type: 'POST',
            url: {'controller': 'storesApi',
                'action': 'getTransactionsModelsForChart',
                'mainURL': appsMainURLS.stores,
            },
            data: JSON.stringify(filterOb),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'

        };

        router.sendRequest(ajaxObj, function(data) {



            transactionObj = jQuery.parseJSON(JSON.stringify(data.transactionModels));
            dataToChart['totalCount'] = [];
            for (var key in transactionObj) {
                if (transactionObj.hasOwnProperty(key)) {
                    var totalCount = 0;
                    dataToChart[key] = [];
                    for (var index in transactionObj[key]) {
                        var tempIndex = (index < 10) ? '0' + index : index;
                        var temp = transactionObj[key][index];
                        totalCount = totalCount + parseInt(temp.count);
                        dataToChart[key].push([new Date(tempIndex + '/1/' + temp.year).getTime(), parseInt(temp.count)]);
                        dataToChart['year'] = temp.year;
                        dataToChart['totalCount'][key] = totalCount;

                    }

                }
            }

        }



        );
        dataToChart['importLabel'] = _tl('Import: ') + dataToChart['totalCount'][IMPORT_TRANS_TYPE];
        dataToChart['exportLabel'] = _tl('Export: ') + dataToChart['totalCount'][EXPORT_TRANS_TYPE];
        dataToChart['terminationLabel'] = _tl('Termination: ') + dataToChart['totalCount'][TERMINATION_TRANS_TYPE];

        return dataToChart;
    },
    getReportProduct: function() {
        var productsArray = [];
        ajaxObj = new Object();

        ajaxObj = {
            type: 'GET',
            url: {
                'controller': 'reportApi',
                'action': 'dailyReport',
                'mainURL': appsMainURLS.stores},
        };
        router.sendRequest(ajaxObj, function(data) {
            if (data.opStatus) {

                productsPackagingObj = jQuery.parseJSON(JSON.stringify(data.productPackagesModel));

                for (var key in productsPackagingObj) {
                    if (productsPackagingObj.hasOwnProperty(key)) {

                        productsArray['Product_ID'] = key;
                        for (var value in productsPackagingObj[key]) {
                            if (productsPackagingObj[key].hasOwnProperty(value)) {
                                for (var level in productsPackagingObj[key][value]) {
                                    if (productsPackagingObj[key][value].hasOwnProperty(level)) {
                                        productsArray['PKG_ID'] = value;

                                        productsArray.push([
                                            key,
                                            value,
                                            (productsPackagingObj[key][value][level]['Product_Name']) + '<span class="blue-info">( ' + (productsPackagingObj[key][value][level]['PKG_Unit_Title']) + ' )</span>',
                                            (productsPackagingObj[key][value][level]['Product_Name']) + '<span class="blue-info">( ' + (productsPackagingObj[key][value][level]['PKG_Unit_Title']) + ' )</span>' + '</br><span class="blue-info">' + (productsPackagingObj[key][value][level]['PATR_Concatenated_Title']) + '</span>',
                                           (productsPackagingObj[key][value][level][IMPORT_TRANS_TYPE] != null && productsPackagingObj[key][value][level][IMPORT_TRANS_TYPE] !== undefined) ? productsPackagingObj[key][value][level][IMPORT_TRANS_TYPE] : 0,
                                            (productsPackagingObj[key][value][level][EXPORT_TRANS_TYPE] != null && productsPackagingObj[key][value][level][EXPORT_TRANS_TYPE] !== undefined) ? productsPackagingObj[key][value][level][EXPORT_TRANS_TYPE] : 0,
                                            (productsPackagingObj[key][value][level][RETURN_TRANS_TYPE] != null && productsPackagingObj[key][value][level][RETURN_TRANS_TYPE] !== undefined) ? productsPackagingObj[key][value][level][RETURN_TRANS_TYPE] : 0,
                                            (productsPackagingObj[key][value][level][TERMINATION_TRANS_TYPE] != null && productsPackagingObj[key][value][level][TERMINATION_TRANS_TYPE] !== undefined) ? productsPackagingObj[key][value][level][TERMINATION_TRANS_TYPE] : 0,
                                        ]);

                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return 	(productsArray.length > 0) ? productsArray : null;

    },
}

