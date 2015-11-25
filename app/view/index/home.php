<div class="page"><div class="page-content padding-30 container-fluid">
        <div class="row" data-plugin="matchHeight" data-by-row="true">

            <div class="col-xlg-7 col-md-7">
                <div style="width: 1010px; height: 100%; overflow: hidden; margin: 0 auto;">
     <div id="container" style="width:500px; height: 300px; margin: 0 auto;border: 1px #CCCCCC solid; float: right;"></div>
 <div id="container1" style="width:500px; height: 300px; margin: 0 auto;border: 1px #CCCCCC solid; float: left; "></div>
            </div>
                <div id="container2" style="width:500px; height: 300px; margin: 10px auto;border: 1px #CCCCCC solid;">
                    <div style="margin: 7px; line-height: 30px;">
                    <h2 >Latest Transaction</h2>
                    <label> Date : <span data-bind="text: candleViewModel.TransDate()"></span></label></br>
                   <label>Item Name : <span data-bind="text: candleViewModel.itemName()"></span></label></br>
                    <label>Price[USD] : <span data-bind="text: candleViewModel.itemPriceInCurrency()"></span></label></br>
                   <label> Broker : <span data-bind="text: candleViewModel.broker()"></span></label></br>
                   <label> Vendor : <span data-bind="text: candleViewModel.vendor()"></span></label></br>
         
                    </div>
                </div>

            </div>
        </div></div></div>