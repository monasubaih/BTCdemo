<pre><?php

   include_once dirname(__DIR__) .'\autoload.php';
     autoload();
$api_code = null;
if(file_exists('code.txt')) {
    $api_code = trim(file_get_contents('code.txt'));
}

$Blockchain = new \Blockchain\Blockchain($api_code);

$wallet_guid = 'f1c4525a-2296-41dd-b7d2-8b43caa2641c';
$wallet_pass = 'lkn$advdk@536772';

if(is_null($wallet_guid) || is_null($wallet_pass)) {
    echo "Please enter a wallet GUID and password in the source file.<br/>";
    exit;
}

$Blockchain->Wallet->credentials($wallet_guid, $wallet_pass);

//echo "Using wallet " . $Blockchain->Wallet->getIdentifier() . "<br />" ;

//echo "Balance " . $Blockchain->Wallet->getBalance() . "<br />" ;

//var_dump($Blockchain->Wallet->getNewAddress("Programmatically created new address."));

//echo "<p>Addresses</p>";
//var_dump($Blockchain->Wallet->getAddresses());

// Enter recipient address here
$address = '13EHFFWqJz6JGtSAQEzppDeUshSPhhYb5Z';

try {
    // Uncomment to send
    var_dump($Blockchain->Wallet->send($address, "0.005"));
} catch (\Blockchain\Exception\ApiError $e) {
    echo $e->getMessage() . '<br />';
}

// Multi-recipient format
$recipients = array();
$recipients[$address] = "0.001";

try {
    // Uncomment to send
    // var_dump($Blockchain->Wallet->sendMany($recipients));
} catch (Blockchain_ApiError $e) {
    echo $e->getMessage() . '<br />';
}

print_r($Blockchain->log);

?></pre>