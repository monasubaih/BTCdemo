<?php

class btcApiController extends abstractAppApi {

    /**
     * define validation rules (conditions) before action executed
     * @access public
     * @var array
     */
    public $validateActions = array();

    /**
     * first method called before any thing executed
     */
    public function ini() {
        parent::ini();
    }

    /**
     * Store transaction and converte BTC TO USD
     */
    public function storeTransactions() {
        
        //convert USD TO BTC
        $price_in_btc = file_get_contents(BLOCKCHAIN_URL . "tobtc?currency=USD&value=" . $GLOBALS ['registry']->data['itemPriceInCurrency']);
//Add the transaction to the database
        $result = mysql_query("INSERT INTO transactions(`broker`, `brokerProfitPercent`, `itemName`, `itemPriceDiscountBrokerProfit`, `itemPriceInUSD`, `itemPriceInBTC`, `user`, `vendor`) values('" . $GLOBALS['registry']->data['broker'] . "',"
                . $GLOBALS['registry']->data['brokerProfitPercent'] . ","
                . "'" . $GLOBALS['registry']->data['itemName'] . "',"
                . $GLOBALS['registry']->data['itemPriceDiscountBrokerProfit'] . ","
                . $GLOBALS['registry']->data['itemPriceInCurrency'] . ","
                . $price_in_btc . ","
                . "'" . $GLOBALS['registry']->data['user'] . "',"
                . "'" . $GLOBALS['registry']->data['vendor'] . "' )");

        if (!$result) {
            die(__LINE__ . ' Invalid query: ' . mysql_error());
        }
    }

    //get transaction in last 15 second
    public function getLatestTransaction() {

        $sql = "SELECT * FROM transactions WHERE  TransDate > (now() - INTERVAL 2 MINUTE)";
        $result = mysql_query($sql);
        $responseArray = array();
        while ($row = mysql_fetch_assoc($result)) {
            $responseArray[] = array(
                'itemName' => $row['itemName'],
                'itemPriceInUSD' => $row['itemPriceInUSD'],
                'user' => $row['user'],
                'vendor' => $row['vendor'],
                'broker' => $row['broker'],
                'itemPriceDiscountBrokerProfit' => $row['itemPriceDiscountBrokerProfit'],
                'itemPriceInBTC' => $row['itemPriceInBTC']);
        }
        $this->sendResponse($responseArray);
    }

}
