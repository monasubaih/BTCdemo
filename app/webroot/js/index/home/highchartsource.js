Main_URL="http://localhost/btcApi/app/";
var candleStickView = function () {
    var self = this;
    //Data
    self.broker = ko.observable('');
    self.itemName = ko.observable('');
    self.vendor = ko.observable('');
    self.itemPriceInCurrency = ko.observable('');
    self.TransDate  = ko.observable('');
    self.average = ko.observable('');
    self.startTime = ko.observable('');
    self.closeTime = ko.observable('');

}


var volume, open, close, high, low = 0;
var counterSecond = 0;
var buyChart; // global
var sellChart;
var candleViewModel =null;

/**
 * Post transcation that will post every 1 sec 
 * @returns Operation
 */

function postDataToApi() {
    var dt = new Date();
    var time = dt.getTime();
    var secs = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
    jsonObj = new Object();
    jsonObj.broker = 'AAA' + secs;
    jsonObj.brokerProfitPercent = 20;
    jsonObj.itemName = 'itemName' + secs;
    jsonObj.itemPriceDiscountBrokerProfit = 10;
    jsonObj.itemPriceInCurrency = Math.random() * 100;
    jsonObj.purchaseCurrency = 'USD';
    jsonObj.user = 'AAA' + secs;
    jsonObj.vendor = 'AAA' + secs;
    var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
     // set new request
        candleViewModel.TransDate(datetime);
        candleViewModel.itemName(jsonObj.itemName);
        candleViewModel.itemPriceInCurrency(jsonObj.itemPriceInCurrency);
        candleViewModel.broker(jsonObj.broker);
        candleViewModel.vendor(jsonObj.vendor);
    $.ajax({
        url: Main_URL+'btcApi/storeTransactions',
        type: 'POST',
        contentType: 'application/json',
        Accept: 'application/json',
        data: JSON.stringify(jsonObj),
        success: function (data) {
 
            counterSecond++;
            // after 15 sec call get transactions
            if (counterSecond % 4 == 0) {
                requestData();
            }
            // call it again after one second
            setTimeout(postDataToApi, 1000);
        },
        cache: false
    });
    // ajax for jsfiddle 



}



/**
 * Request data from the server, add it to the graph and set a timeout 
 * to request again
 */
function requestData() {
    $.ajax({
        url: Main_URL+'btcApi/getLatestTransaction',
        type: 'GET',
        contentType: 'application/json',
        Accept: 'application/json',
        success: function (data) {
            //get last 15 transaction
            //data = data.slice(Math.max(data.length - 15, 1));
            // call prepare data for candlestick
            prepareCandleData(data, 15, 15);
        },
        cache: false
    });
    // ajax for jsfiddle 



}
/**
 * 
 * prepare candel data from array of transaction
 */
function prepareCandleData(data, openPercentage, closePercentage) {
    
    
     
    //get number of transaction to get the average for openening price
    var openingTransNumber = Math.ceil(data.length * openPercentage / 100);
    var openPrice = 0;
    var openUSDPrice = 0;

    var closeTransNumber = Math.ceil(data.length * closePercentage / 100);
    var closeTransNumberIndex = Math.max(data.length - closeTransNumber, 1);
    var closePrice = 0;
    var closeUSDPrice = 0;
    
    var highPrice = (data.length != 0) ? data[0].itemPriceInBTC : 0;
    var highUSDPrice = (data.length != 0) ? data[0].itemPriceInUSD : 0;
    var lowPrice = (data.length != 0) ? data[0].itemPriceInBTC : 0;
    var lowUSDPrice = (data.length != 0) ? data[0].itemPriceInUSD : 0;

    for (i = 0; i < data.length; i++) {
         data[i].itemPriceInBTC =parseFloat(data[i].itemPriceInBTC);
         data[i].itemPriceInUSD =parseFloat(data[i].itemPriceInUSD);
         
        if (i < openingTransNumber) {
            openPrice += parseFloat(data[i].itemPriceInBTC);
            openUSDPrice += parseFloat(data[i].itemPriceInUSD);
        }
        // get high price 
        if (data[i].itemPriceInBTC > highPrice) {
            highPrice = parseFloat(data[i].itemPriceInBTC);
            highUSDPrice = parseFloat(data[i].itemPriceInUSD);
        }
        //get low price
        if (data[i].itemPriceInBTC < lowPrice) {
            lowPrice = data[i].itemPriceInBTC;
            lowUSDPrice = data[i].itemPriceInUSD;
        }
        // get close price
        if (i >= closeTransNumberIndex) {
            closePrice += parseFloat(data[i].itemPriceInBTC);
            closeUSDPrice += parseFloat(data[i].itemPriceInUSD);
        }
    }

   
    openPrice = (openPrice!=0)?(openPrice / openingTransNumber):0;
    closePrice = (closePrice!=0)?(closePrice / closeTransNumber):0;
    
    openUSDPrice = (openUSDPrice!=0)?(openUSDPrice / openingTransNumber):0;
    closeUSDPrice = (closeUSDPrice!=0)?(closeUSDPrice / closeTransNumber):0;

    volume = data.length;
    open = openPrice;
    close = closePrice;
    high = highPrice;
    low = lowPrice;
    //Date 
    time = (new Date()).getTime();
    // add the point [x,o,h,l,c]
    buyChart.series[0].addPoint([time, openPrice, highPrice, lowPrice, closePrice], true, true);
   
   
    sellChart.series[0].addPoint([time, openUSDPrice, highUSDPrice, lowUSDPrice, closeUSDPrice], true, true);

}

$(document).ready(function () {

  candleViewModel = new candleStickView();
   ko.applyBindings(candleViewModel, $('.page')[0]);
  
var cou = 0;
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

// Buy chart IN PTC
    buyChart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'candlestick',
            marginRight: 10,
            events: {
                load: postDataToApi()
            }
        },
        title: {
            text: 'Buy Chart (BTC)'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Price ( BTC )'
            },
            plotLines: [{
                    value: 0,
                    width: 0.01,
                    color: '#808080'}]
        },
        tooltip: {
            formatter: function () {
                return '<b>Volume:</b>15<br/><b>Price [BTC]</b>'
                        +'<br/>Open :' + this.point.open
                        +'<br/>Close:' + this.point.close 
                        + '<br/>High :' + this.point.high
                        + '<br/>Low :' + this.point.low;
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
                name: 'Random data',
                type: 'candlestick',
                data: [(new Date()).getTime(), 10.083647516311133, 13, 91.50580372491709, 61.52797946775015]}]
    });


// Sell chart IN USD
    sellChart = new Highcharts.Chart({
        chart: {
            renderTo: 'container1',
            type: 'candlestick',
            marginRight: 10,
            events: {
            }
        },
        title: {
            text: 'Sell Chart (USD)'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Price ( USD )'
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'}]
        },
        tooltip: {
            formatter: function () {
                return '<b>Volume:</b>15<br/><b>Price [USD]</b>'
                        +'<br/>Open :' + this.point.open
                        +'<br/>Close:' + this.point.close 
                        + '<br/>High :' + this.point.high
                        + '<br/>Low :' + this.point.low;
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
                name: 'Random data',
                type: 'candlestick',
                data: [(new Date()).getTime(), 10.083647516311133, 13, 91.50580372491709, 61.52797946775015]}]
    });
  

});

