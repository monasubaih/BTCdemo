<pre><?php

   include_once dirname(__DIR__) .'\autoload.php';
     autoload();
$api_code = null;
if(file_exists('code.txt')) {
    $api_code = trim(file_get_contents('code.txt'));
}

$Blockchain = new \Blockchain\Blockchain($api_code);

$wallet = $Blockchain->Create->create('weakPassword01!');

var_dump($wallet);

print_r($Blockchain->log);

?></pre>