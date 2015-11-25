<?php 
// 2014.3.11 , Date: 2015/10/12
class App {
public static $controller;public static function import($name, $type) {
if (is_object(self::$controller)) {
$currentController = self::$controller;$currentModel = $currentController->model;}switch ($type) {
case 'controller' : {
(file_exists(CONTROLLER_PATH . $name . CONTROLLER_EXT)) ? include_once (CONTROLLER_PATH . $name . CONTROLLER_EXT) : self::throwExp('controller', CONTROLLER_PATH . $name . CONTROLLER_EXT);}break;case 'view' : {
$variables = $GLOBALS ['registry']->template->getViewVariables();$renderedAjax = $GLOBALS ['registry']->request->getRequest('renderedAjax');if (isset($variables))
foreach ($variables as $key => $value) {
$$key = $value;}if (!$currentController->data ['partAjax'])
if (function_exists('jsBeforeView'))
jsBeforeView();(file_exists(VIEW_PATH . $name . VIEW_EXT)) ? include_once (VIEW_PATH . $name . VIEW_EXT) : self::throwExp('view ', VIEW_PATH . $name . VIEW_EXT);}break;case 'model' : {
(file_exists(MODEL_PATH . $name . MODEL_EXT)) ? include_once (MODEL_PATH . $name . MODEL_EXT) : self::throwExp('model ', MODEL_PATH . $name . MODEL_EXT);}break;case 'layout' : {
(file_exists(VIEW_PATH . 'layout' . DS . $name . LAYOUT_EXT)) ? include_once (VIEW_PATH . 'layout' . DS . $name . LAYOUT_EXT) : self::throwExp('layout ', VIEW_PATH . $name . LAYOUT_EXT);}break;case 'imports' : {
(file_exists(IMPORT_PATH . $name . MODEL_EXT)) ? include_once (IMPORT_PATH . $name . MODEL_EXT) : self::throwExp('imports ', IMPORT_PATH . $name . MODEL_EXT);}break;case 'element' : {
$variables = $GLOBALS ['registry']->template->getViewVariables();$renderedAjax = $GLOBALS ['registry']->request->getRequest('renderedAjax');if (isset($variables))
foreach ($variables as $key => $value) {
$$key = $value;}(file_exists(ELEMENTS_PATH . $name . VIEW_EXT)) ? include (ELEMENTS_PATH . $name . VIEW_EXT) : self::throwExp('element ', ELEMENTS_PATH . $name . VIEW_EXT);}break;}}private static function throwExp($name, $path) {
throw new Exception($name . ' not found in ' . $path);return false;}public static function clear() {
try {
deleteAllDirFiles(CASH_PATH);deleteAllDirFiles(JS_PATH . 'validation' . DS);deleteAllDirFiles(JS_PATH . 'cash' . DS);deleteAllDirFiles(CSS_PATH . 'cash' . DS);$GLOBALS ['registry']->response->destroyCookie();$ourFileName = LOG_PATH . DS . 'langLog.log';$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");fclose($ourFileHandle);} catch (TidyException $e) {
_tr($e->getMessage(), TIDY_CONSTANTS::LOG_CRIT);}//return false;
}public static function dbconnect($databaseConfig, $instanceIndex = 0) {
$db = DB::createBuilder($databaseConfig, $instanceIndex);$db->setDebug(TIDY_CONSTANTS::DEBUG_NO_MODE);if ($databaseConfig['driver'] == 'mysql') {
$db->query("SET CHARACTER SET 'utf8'");$db->query("SET NAMES 'utf8'");}//$db->setNumberOfRowsPerPage ( NAVIGATOR_PAGE_NUM );
//$db->query ( "SET CHARACTER SET 'utf8'" );
//$db->query ( "SET NAMES 'utf8'" );
return $db;}public static function languageDefine() {
$langGetShort = strtolower($GLOBALS ['registry']->request->getGet('lang'));$viewGetLangShort = strtolower($GLOBALS ['registry']->request->getGet('viewLang'));$langShort = defineLanguageVariableCookie($langGetShort, 'lang');$viewLangShort = defineLanguageVariableCookie($viewGetLangShort, 'viewLang');$mainLangKey = array_keys($GLOBALS ['sysLang'], $langShort);$mainLangKey = $mainLangKey [0];$mainViewLangKey = array_keys($GLOBALS ['sysLang'], $viewLangShort);$mainViewLangKey = $mainViewLangKey [0];$GLOBALS ['registry']->currentLangKey = $mainLangKey;$GLOBALS ['registry']->currentLang = $langShort;$GLOBALS ['registry']->currentViewLangKey = $mainViewLangKey;$GLOBALS ['registry']->currentViewLang = $viewLangShort;}public static function setDefaultLanguage($langID) {
if ($langID != null && array_key_exists($langID, $GLOBALS ['sysLang']) &&
$GLOBALS ['registry']->currentViewLangKey != $langID) {
$GLOBALS ['registry']->currentViewLangKey = $GLOBALS ['registry']->currentLangKey = $langID;$langShort = $GLOBALS ['sysLang'][$langID];$GLOBALS ['registry']->currentViewLang = $GLOBALS ['registry']->currentLang = $langShort;$GLOBALS ['registry']->tr->addTranslation(
array(
'content' => LANG_PATH . $langShort . '.mo','locale' => $langShort
)
);$GLOBALS ['registry']->tr->setLocale($langShort);@$GLOBALS ['registry']->response->setCookie('lang', $langShort, TTL_REMEMBER);@$GLOBALS ['registry']->response->setCookie('viewLang', $langShort, TTL_REMEMBER);}}public static function getCash($lifeTime, $path) {
$cash = new Cash($lifeTime, $path);return $cash->getCashOb();}public static function authenticateUser() {
//var_dump($GLOBALS['registry']->session->getSession('formKey'));
$requestInfo = $GLOBALS ['registry']->request->getRequstInfo();$clientIP = (!empty($requestInfo ['REMOTE_ADDR'])) ? $requestInfo['REMOTE_ADDR'] : ((!empty($_ENV ['REMOTE_ADDR'])) ? $_ENV ['REMOTE_ADDR'] : getenv('REMOTE_ADDR'));//$userIP = encodeIP ( $clientIP );
$GLOBALS ['registry']->userIP = $clientIP;//@$GLOBALS ['registry']->msg->writeUserLog ( $userIP );
//$formKey=($GLOBALS ['registry']->request->getCookie('formKey')!=NULL)?$GLOBALS ['registry']->request->getCookie('formKey'):($GLOBALS['registry']->session->getSession('formKey')!=NULL)?$GLOBALS['registry']->session->getSession('formKey'):'';
$GLOBALS ['registry']->authSetting = new AuthSetting(array('autoLogin' => false, 'maxLoginTime' => 5, 'sessionLength' => 10800, 'loginRestTime' => 30, 'maxLoginAttempts' => 5), $cookieOptions = array('cookieName' => 'SMS_2_SQL', 'cookiePath' => '/', 'domain' => NULL, 'secure' => NULL), 1, NULL, $clientIP);}public static function startApp() {
self::languageDefine();}}class Cash {
private $_cash;function __construct($lifeTime, $path) {
$frontendOptions = array('lifetime' => $lifeTime, 'automatic_serialization' => true);$backendOptions = array('cache_dir' => $path);$this->_cash = Zend_Cache::factory('Core', 'File', $frontendOptions, $backendOptions);}public function getCashOb() {
return $this->_cash;}}//namespace Tidy;
abstract class BaseController extends TidyException {
public $relatedModel = '';public $data;public $validateData = array();public $registry;public $pageTitle;public static $rendered = false;public $navigation = false;public $css = array('main');public $js = array('main');public $helpers = array();public $layout = 'default';public $validate = false;public $encode = 'utf-8';function __construct(Registry $registry = NULL) {
if (is_object($registry))
$this->registry = $registry;else
$registry = $GLOBALS['registry'];}public function ini() { //iniate all the controllers
}public function __set($index, $value) {
if (isset($value) and $value != NULL)
@$this->registry->$index = $value;}public function __get($index) {
return $this->registry->$index;}public function set($index, $value) {
$this->registry->template->$index = $value;}public function get($index) {
return $this->registry->template->$index;}public function render($path, $withoutLayout = TRUE) {
App::$controller = $this;if ($withoutLayout) {
$this->rendered = TRUE;App::import($path, 'view');} else
$this->view = $path;}protected function renderJson($array) {
$this->rendered = true;echo json_encode($array);}protected function setMultiVarsInView($values, $camel = true, $debug = false) {
if (is_object($values))
$values = get_object_vars($values);foreach ($values as $valuKey => $value) {
$key = ($camel) ? strtocamel($valuKey) : $valuKey;if ($debug)
echo $key . '-->' . $value . '</br>';$this->set($key, $value);}}protected function changeStatus($model, $actionFunction, $msgs) {
if (!empty($GLOBALS['registry']->data ['selected'])) {
$errCounter = $succCounter = 0;foreach ($GLOBALS['registry']->data ['selected'] as $value) {
$condationArray = array_filter(jsonInputDecode($value));$model->setCondition($condationArray);if (is_array($actionFunction) and array_key_exists('procedure', $actionFunction)) {
$return = call_user_func_array(array($GLOBALS['registry']->db, 'exeProcedure'), array($actionFunction['procedure'], $model));} else
$return = call_user_func_array(array($GLOBALS['registry']->db, $actionFunction), array($model, TRUE));if ($return > 0)
$succCounter ++;else
$errCounter ++;}$msgJson = checkOperationCounters(sizeof($GLOBALS['registry']->data ['selected']), $succCounter, $errCounter, $msgs);} elseif ($GLOBALS['registry']->data ['hdchangeid'] != '') {
$condationArray = jsonInputDecode($GLOBALS['registry']->data ['hdchangeid']);$model->setCondition($condationArray);if (call_user_func_array(array($GLOBALS['registry']->db, $actionFunction), array($model, TRUE)) > 0)
$msgJson = array('msg' => $msgs['succ'], 'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_INFO]);else
$msgJson = array('msg' => $msgs['err'], 'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_ERR]);$msgJson = sprintf($msgJson['msg'], 1);} else
$msgJson = array('msg' => _tr('you must select at least one item'), 'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_ALERT]);$this->renderJson($msgJson);}protected function renderJsonFinalResult($msgs, $succMessageTitle, $jsonMoreData = null, $sessionTitle = null, $sessionValue = null) {
if (empty($msgs) and !is_array($msgs)) {
if ($sessionTitle != '' and $sessionValue != '')
$GLOBALS ['registry']->session->setSession($sessionTitle, $sessionValue);if (is_array($succMessageTitle)) {
foreach ($succMessageTitle as $msg)
$msgJson [] = array(
'msg' => $msg,'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_INFO]
);} else
$msgJson = array(
'msg' => _tr($succMessageTitle),'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_INFO]
);$data ['valid'] = 'true';} else {
foreach ($msgs as $msg)
$msgJson [] = array(
'msg' => $msg,'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_ERR]
);$data ['valid'] = 'false';}$data ['msg'] = $msgJson;if (is_array($jsonMoreData) and !empty($jsonMoreData)) {
$data = array_merge($data, $jsonMoreData);}$this->renderJson($data);return $data ['valid'];}}//namespace Tidy;
class TidyException extends \Exception {
public function __construct($message = null, $code = 0) {
if (!$message) {
throw new $this('Unknown ' . get_class($this));}parent::__construct($message, $code);}public function __toString() {
$msg = get_class($this) . " '{$this->message}' in {$this->file}({$this->line})\n"
. "{$this->getTraceAsString()}";$GLOBALS ['registry']->msg->m($msg, TIDY_CONSTANTS::LOG_CRIT);return $msg;}}function getURL(array $link) {
$url = $formatParams = '';$controller = $link ['controller'];$action = $link ['action'];$mainURL = (array_key_exists('mainURL', $link) && $link ['mainURL'] != '') ? $link ['mainURL'] : HTTP_HOST_PATH;$params = '';if (array_key_exists('params', $link))
if (is_array($link ['params'])) {
foreach ($link ['params'] as $key => $value) {
if (is_string($key))
$link ['params'] [$key] = $key . GET_PARAM_PATTERN . $value;}$params = implode($link ['params'], '/');}if (is_array(@$GLOBALS ['routerMapping']) and !@empty($GLOBALS ['routerMapping']))
foreach ($GLOBALS ['routerMapping'] as $pattern => $linkArr) {
if ($linkArr ['controller'] == $link ['controller'] and $linkArr ['action'] == $link ['action']) {
//formating URL
if ($linkArr ['format'] != '' and array_key_exists('params', $link))
if (preg_match_all("/\{[0-9]\}/", $linkArr['format'], $matches)) {//formating
asort($matches[0]);$counterParts = 0;$formatParams = $linkArr['format'];foreach ($link ['params'] as $key => $value) {
$value = str_replace(GET_PARAM_PATTERN, '', substr($value, strpos($value, GET_PARAM_PATTERN), strlen($value)));$formatParams = str_replace($matches[0][$counterParts], (($value != null) ? $value : ''), $formatParams);$counterParts++;}$formatParams = preg_replace("/\{[0-9]\}/", '', $formatParams);}$url = $mainURL . str_replace('*', (($formatParams != '' and $formatParams != $linkArr['format']) ? $formatParams : $params), $pattern);}}if ($url == '')
$url = $mainURL . $controller . '/' . $action . (((isset($params[0])) && $params[0] != '/') ? '/' : '') . $params;return $url;}function getPrimaryCondition($model) {
$conditionArray = array();$primaryKeys = $model->primaryKeys;if (is_array($primaryKeys))
foreach ($primaryKeys as $key)
$conditionArray [$key] = $model->$key;else
$conditionArray [$primaryKeys] = $model->$primaryKeys;return $conditionArray;}function getParamOrder($model, $column, $custom = NULL) {
$model = $model . 'Model';//$sort = (!$column)? $model::$sortColumns:$column;
$sort = (!$column) ? eval('' . $model . '::$sortColumns;') : $column;if ($custom)
$orderParam = "$sort:$custom";else {
//$sortType = $model::$sortType;
//eval('$sort = $model::$sortColumns;');
eval('$sortType = $model::$sortType;');//eval('$sortType ='.$model.'::'.$sortType.';');
if ($sortType == 'DESC') {
$orderParam = "$sort:ASC";} elseif ($sortType == 'ASC') {
$orderParam = "$sort:DESC";}}$param = array('sort' => $orderParam);return $param;}function sortModel($sort, $model) {
$model = $model . 'Model';if (isset($sort)) {
$sortType = substr(strrchr($sort, ':'), 1);$sort = str_replace(":" . $sortType, "", $sort);//$model::$sortColumns = $sort;
//$model::$sortType = $sortType;
eval('' . $model . '::$sortColumns=$sort;');eval('' . $model . '::$sortType=$sortType;');//eval(''.$model.'::'.$sortColumns.'= $sort;');
//eval(''.$model.'::'.$sortType.'= $sortType;');
if (!is_object($model))
$model = new $model ();$model->$sortColumns = $sort;$model->$sortType = $sortType;}}function apacheVersion() {
if (function_exists('apache_get_version')) {
if (preg_match('|Apache\/(\d+)\.(\d+)\.(\d+)|', apache_get_version(), $version)) {
return $version [1] . '.' . $version [2] . '.' . $version [3];}} elseif (isset($_SERVER ['SERVER_SOFTWARE'])) {
if (preg_match('|Apache\/(\d+)\.(\d+)\.(\d+)|', $_SERVER ['SERVER_SOFTWARE'], $version)) {
return $version [1] . '.' . $version [2] . '.' . $version [3];}}return '(unknown)';}function checkOperationCounters($boxSize, $succCounter, $errCounter, $msgs = NULL) {
if ($msgs == NULL) {
$msgs ['succ'] = _tr('Done');$msgs ['err'] = _tr('Wrong');}$successMSG = array('msg' => $msgs['succ'], 'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_INFO]);$successMSG ['msg'] = sprintf($successMSG ['msg'], $succCounter);$failureMSG = array('msg' => $msgs['err'], 'type' => $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [TIDY_CONSTANTS::LOG_ERR]);return ($boxSize == $succCounter) ? $successMSG : $failureMSG;}function getArrayFromTable($grabInfo) {
$stmt = $GLOBALS ['registry']->db->pdoResource->prepare('SELECT ' . $grabInfo ['value'] . ' ,' . $grabInfo ['label'] . ' FROM ' . $grabInfo ['table'] . ' WHERE 1=1 ' . $grabInfo ['whereCond']);$stmt->execute();$result = array();while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
$result [$row [0]] = $row [1];}return $result;}function jsonInputEncode($value, $slashes = true) {
return ($slashes) ? '' . addslashes(str_replace('"', "'", json_encode($value))) . '' : '' . str_replace('"', "'", json_encode($value)) . '';}function jsonInputDecode($value) {
$value = str_replace("'", '"', $value);$value = str_replace("\\\\", '%', $value);$value = str_replace("\\", '', $value);$value = str_replace("%", "\\", $value);return json_decode(stripslashes($value), true);}function strtocamel($str, $capitalizeFirst = false, $allowed = 'A-Za-z0-9') {
return preg_replace(array('/([A-Z][a-z])/e',
'/([a-zA-Z])([a-zA-Z]*)/e',
'/[^' . $allowed . ']+/e',
'/^([a-zA-Z])/e'),
array('" "."$1"',
'strtoupper("$1").strtolower("$2")',
'',
'strto' . ($capitalizeFirst ? 'upper' : 'lower') . '("$1")'),
$str);}function fromVectorToArray($vector, $key = NULL, $value = NULL) {
if (is_object($vector)) {
$array = array();for ($i = 0; $i < $vector->size(); $i ++) {
$array [($key) ? $vector->get($i)->$key : $i] = ($value) ? $vector->get($i)->$value : $vector->get($i);}return $array;}}function encodeIP($dotquad_ip) {
$ip_sep = explode('.', $dotquad_ip);if (sizeof($ip_sep) > 3)
return sprintf('%02x%02x%02x%02x', $ip_sep [0], $ip_sep [1], $ip_sep [2], $ip_sep [3]);}function decodeIP($int_ip) {
$hexipbang = explode('.', chunk_split($int_ip, 2, '.'));return hexdec($hexipbang [0]) . '.' . hexdec($hexipbang [1]) . '.' . hexdec($hexipbang [2]) . '.' . hexdec($hexipbang [3]);}function encode($info, $json = false) {
return $GLOBALS ['registry']->rsa->encrypt(($json) ? json_encode($info) : $info, $GLOBALS ['registry']->rsaKeys[1], $GLOBALS ['registry']->rsaKeys[0], 5);}function decode($enInfo, $json = false) {
$decryptStr = $GLOBALS ['registry']->rsa->decrypt($enInfo, $GLOBALS ['registry']->rsaKeys[2], $GLOBALS ['registry']->rsaKeys[0]);return ($json) ? json_decode($decryptStr, true) : $decryptStr;}function getFileExt($filename) {
$ext = end(explode('.', $filename));return $ext;}function getDirectoryList($directory) {
$results = array();$handler = opendir($directory);while ($file = readdir($handler)) {
if ($file != "." && $file != "..") {
$results [] = $file;}}closedir($handler);return $results;}function deleteAllDirFiles($dir) {
$mydir = opendir($dir);while (false !== ($file = readdir($mydir))) {
if ($file != "." && $file != "..") {
chmod($dir . $file, 0777);if (is_dir($dir . $file)) {
chdir('.');deleteAllDirFiles($dir . $file . '/');rmdir($dir . $file) or die("couldn't delete $dir$file<br />");} else {
//rename($dir.$file, $dir.$file.'.del');
unlink($dir . $file) or die("couldn't delete $dir$file<br />");}}}closedir($mydir);}function mapFile2URL($filePhysicalPath, $realHttp = HTTP_HOST_PATH) {
$fileDirArray = explode(DS, $filePhysicalPath);$fileName = array_pop($fileDirArray);$realPathDirArr = explode(DS, APP_PATH);$diffrentWithRealPathArray = array_values(array_diff($fileDirArray, $realPathDirArr));//filter according to rewrite module 
$fileURL = str_replace(ROOT . '/', '', implode('/', $diffrentWithRealPathArray) . '/' . $fileName);$fileURL = ($fileURL[0] == '/') ? substr($fileURL, 1, strlen($fileURL)) : $fileURL;return ($realHttp . $fileURL);}function base64url_encode($data) {
return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');}function base64url_decode($data) {
return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));}function _tr($msg, $msgType = null) {
//$msg=trim(strtolower($msg));
$tranlation = $GLOBALS ['registry']->tr->_($msg);if ($msgType != NULL) {
$GLOBALS ['registry']->msg->setMsg($msg, $msgType);}return $tranlation;}function defineLanguageVariable($variable, $variableSessionName) {
if (isset($variable) and $variable != NULL and in_array($variable, $GLOBALS ['sysLang'])) { //Insert Session Language
$GLOBALS ['registry']->session->setSession($variableSessionName, $variable);} elseif ($GLOBALS ['registry']->session->getSession($variableSessionName) != NULL) {
$variable = $GLOBALS ['registry']->session->getSession($variableSessionName);} else
$variable = $GLOBALS ['sysLang'] [DEFAULT_LANG];return $variable;}function defineLanguageVariableCookie($variable, $variableCookieName) {
if (isset($variable) and $variable != NULL and in_array($variable, $GLOBALS ['sysLang'])) { //Insert Session Language
//echo 'Set Cookie';
$GLOBALS ['registry']->response->setCookie($variableCookieName, $variable, TTL_REMEMBER);} elseif ($GLOBALS ['registry']->request->getCookie($variableCookieName) != NULL) {
//echo 'Get Cookie';
$variable = $GLOBALS ['registry']->request->getCookie($variableCookieName);} else {
//echo 'use Defualt';
$variable = $GLOBALS ['sysLang'] [DEFAULT_LANG];}return $variable;}function numberFormat($number, $integer = false) {
if ($integer)
return Zend_Locale_Format::toInteger($number, array('locale' => $GLOBALS ['registry']->currentLang));return Zend_Locale_Format::toNumber($number, array('precision' => NUMBER_FORMAT_PRECISION,'locale' => $GLOBALS ['registry']->currentLang));}function checkIfMobileBrowser() {
$mobile_browser = '0';if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
$mobile_browser++;}if ((strpos(strtolower($_SERVER['HTTP_ACCEPT']), 'application/vnd.wap.xhtml+xml') > 0) or ((isset($_SERVER['HTTP_X_WAP_PROFILE']) or isset($_SERVER['HTTP_PROFILE'])))) {
$mobile_browser++;}$mobile_ua = strtolower(substr($_SERVER['HTTP_USER_AGENT'], 0, 4));$mobile_agents = array(
'w3c ', 'acs-', 'alav', 'alca', 'amoi', 'audi', 'avan', 'benq', 'bird', 'blac','blaz', 'brew', 'cell', 'cldc', 'cmd-', 'dang', 'doco', 'eric', 'hipt', 'inno','ipaq', 'java', 'jigs', 'kddi', 'keji', 'leno', 'lg-c', 'lg-d', 'lg-g', 'lge-','maui', 'maxo', 'midp', 'mits', 'mmef', 'mobi', 'mot-', 'moto', 'mwbp', 'nec-','newt', 'noki', 'oper', 'palm', 'pana', 'pant', 'phil', 'play', 'port', 'prox','qwap', 'sage', 'sams', 'sany', 'sch-', 'sec-', 'send', 'seri', 'sgh-', 'shar','sie-', 'siem', 'smal', 'smar', 'sony', 'sph-', 'symb', 't-mo', 'teli', 'tim-','tosh', 'tsm-', 'upg1', 'upsi', 'vk-v', 'voda', 'wap-', 'wapa', 'wapi', 'wapp','wapr', 'webc', 'winw', 'winw', 'xda ', 'xda-');if (in_array($mobile_ua, $mobile_agents)) {
$mobile_browser++;}if (strpos(strtolower($_SERVER['ALL_HTTP']), 'OperaMini') > 0) {
$mobile_browser++;}if (strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'windows') > 0) {
$mobile_browser = 0;}return (($mobile_browser > 0) ? true : false);}function c2sdecrypt($s, $k) {
$s = urldecode($s);$k = str_split(str_pad('', strlen($s), $k));$sa = str_split($s);foreach ($sa as $i => $v) {
$t = ord($v) - ord($k[$i]);$sa[$i] = chr($t < 0 ? ($t + 256) : $t);}return join('', $sa);}function getHeaderVariable($header) {
$headers = getallheaders();if (array_key_exists($header, $headers)) {
return $headers[$header];}}if (!function_exists('getallheaders'))
{
function getallheaders()
{
$headers = '';foreach ($_SERVER as $name => $value)
{
if (substr($name, 0, 5) == 'HTTP_')
{
$headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;}}return $headers;}} 
//namespace Tidy;
class Http {
//Http Status
const HTTP_CONTINUE = 100;const HTTP_SWITCHING_PROTOCOLS = 101;const HTTP_OK = 200;const HTTP_CREATED = 201;const HTTP_ACCEPTED = 202;const HTTP_NONAUTHORITATIVE_INFORMATION = 203;const HTTP_NO_CONTENT = 204;const HTTP_RESET_CONTENT = 205;const HTTP_PARTIAL_CONTENT = 206;const HTTP_MULTIPLE_CHOICES = 300;const HTTP_MOVED_PERMANENTLY = 301;const HTTP_FOUND = 302;const HTTP_SEE_OTHER = 303;const HTTP_NOT_MODIFIED = 304;const HTTP_USE_PROXY = 305;const HTTP_UNUSED = 306;const HTTP_TEMPORARY_REDIRECT = 307;const errorCodesBeginAt = 400;const HTTP_BAD_REQUEST = 400;const HTTP_UNAUTHORIZED = 401;const HTTP_PAYMENT_REQUIRED = 402;const HTTP_FORBIDDEN = 403;const HTTP_NOT_FOUND = 404;const HTTP_METHOD_NOT_ALLOWED = 405;const HTTP_NOT_ACCEPTABLE = 406;const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;const HTTP_REQUEST_TIMEOUT = 408;const HTTP_CONFLICT = 409;const HTTP_GONE = 410;const HTTP_LENGTH_REQUIRED = 411;const HTTP_PRECONDITION_FAILED = 412;const HTTP_REQUEST_ENTITY_TOO_LARGE = 413;const HTTP_REQUEST_URI_TOO_LONG = 414;const HTTP_UNSUPPORTED_MEDIA_TYPE = 415;const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;const HTTP_EXPECTATION_FAILED = 417;const HTTP_INTERNAL_SERVER_ERROR = 500;const HTTP_NOT_IMPLEMENTED = 501;const HTTP_BAD_GATEWAY = 502;const HTTP_SERVICE_UNAVAILABLE = 503;const HTTP_GATEWAY_TIMEOUT = 504;const HTTP_VERSION_NOT_SUPPORTED = 505;protected static function getStatusMessage($code = 200) {
$status = array(
self::HTTP_CONTINUE => 'Continue',self::HTTP_SWITCHING_PROTOCOLS => 'Switching Protocols',self::HTTP_OK => 'OK',self::HTTP_CREATED => 'Created',self::HTTP_ACCEPTED => 'Accepted',self::HTTP_NONAUTHORITATIVE_INFORMATION => 'Non-Authoritative Information',self::HTTP_NO_CONTENT => 'No Content',self::HTTP_RESET_CONTENT => 'Reset Content',self::HTTP_PARTIAL_CONTENT => 'Partial Content',self::HTTP_MULTIPLE_CHOICES => 'Multiple Choices',self::HTTP_MOVED_PERMANENTLY => 'Moved Permanently',self::HTTP_FOUND => 'Found',self::HTTP_SEE_OTHER => 'See Other',self::HTTP_NOT_MODIFIED => 'Not Modified',self::HTTP_USE_PROXY => 'Use Proxy',self::HTTP_UNUSED => '(Unused)',self::HTTP_TEMPORARY_REDIRECT => 'Temporary Redirect',self::HTTP_BAD_REQUEST => 'Bad Request',self::HTTP_UNAUTHORIZED => 'Unauthorized',self::HTTP_PAYMENT_REQUIRED => 'Payment Required',self::HTTP_FORBIDDEN => 'Forbidden',self::HTTP_NOT_FOUND => 'Not Found',self::HTTP_METHOD_NOT_ALLOWED => 'Method Not Allowed',self::HTTP_NOT_ACCEPTABLE => 'Not Acceptable',self::HTTP_PROXY_AUTHENTICATION_REQUIRED => 'Proxy Authentication Required',self::HTTP_REQUEST_TIMEOUT => 'Request Timeout',self::HTTP_CONFLICT => 'Conflict',self::HTTP_GONE => 'Gone',self::HTTP_LENGTH_REQUIRED => 'Length Required',self::HTTP_PRECONDITION_FAILED => 'Precondition Failed',self::HTTP_REQUEST_ENTITY_TOO_LARGE => 'Request Entity Too Large',self::HTTP_REQUEST_URI_TOO_LONG => 'Request-URI Too Long',self::HTTP_UNSUPPORTED_MEDIA_TYPE => 'Unsupported Media Type',self::HTTP_REQUESTED_RANGE_NOT_SATISFIABLE => 'Requested Range Not Satisfiable',self::HTTP_EXPECTATION_FAILED => 'Expectation Failed',self::HTTP_INTERNAL_SERVER_ERROR => 'Internal Server Error',self::HTTP_NOT_IMPLEMENTED => 'Not Implemented',self::HTTP_BAD_GATEWAY => 'Bad Gateway',self::HTTP_SERVICE_UNAVAILABLE => 'Service Unavailable',self::HTTP_GATEWAY_TIMEOUT => 'Gateway Timeout',self::HTTP_VERSION_NOT_SUPPORTED => 'HTTP Version Not Supported');return ($status[$code]) ? $status[$code] : $status[self::HTTP_INTERNAL_SERVER_ERROR];}protected $_get = array();protected $_post = array();protected $_cookie = array();protected $_request = array();private function __constructor() {
}protected function iniSuperGlobals() {
parse_str(file_get_contents('php://input'), $this->_post);
if (is_array($_POST) and !empty($_POST))
$_POST = $this->_post = array_merge($_POST, array_keys($this->_post));else
$_POST = $this->_post = array_keys($this->_post);$this->_get = $_GET;$this->_cookie = $_COOKIE;$this->_request = $_REQUEST;}protected function clearGlobals() {
$this->_get = array();$this->_post = array();$this->_cookie = array();$this->_request = array();$this->_server = array();}}//namespace Tidy;
class Message {
public $messages;function __construct() {
}public function getMessagesSize() {
return sizeof($this->messages);}public function flushMessages($msgs) {
if (is_array($msgs) and !empty($msgs))
foreach ($msgs as $msg)
$this->setFlush();}public function setMessages($msgs) {
if (is_array($msgs) and !empty($msgs))
foreach ($msgs as $msg)
$this->setMsg($msg['message'], $msg['type']);}public function setMsg($msg, $type, $flushAndLogUpdate = false) {
$this->messages[] = array('message' => $msg, 'type' => $type);if ($flushAndLogUpdate)
$this->updateLogMessageWithSession($msg, $type);return array('message' => $msg, 'type' => $type);}public function getAllMessages($filter = null) {
if ($filter != NULL) {
if (is_array($this->messages))
return array_filter($this->messages, function ($element) use ($filter) {
return ($element['type'] == $filter);});}return $this->messages;}public function getStringAllMessages($filter = null) {
$msgs = $this->getAllMessages($filter);$stringMesages = '';if (sizeof($msgs) > 0)
foreach ($msgs as $msg) {
$stringMesages.=$msg['message'] . "\n";}return $stringMesages;}public function clearMessagesSession() {
$this->messages = array();$GLOBALS ['registry']->session->destroySessionKey('toolbarObMessages');}public function clearMessages() {
$this->messages = array();}public function setFlush() {
$messages = $this->getAllMessages();if (sizeof($messages) > 0)
$GLOBALS ['registry']->session->setSession('toolbarObMessages', $this->getAllMessages());}public function flush() {
$toolbarObMessages = $GLOBALS ['registry']->session->getSession('toolbarObMessages');$msgString = '';if (!empty($toolbarObMessages)) {
$msgString .= '<script type="text/javascript" >';foreach ($toolbarObMessages as $msg) {
//The way to show the messages
$msgString .= 'notify("' . $msg ['message'] . '",{messageType:"' . $GLOBALS ['registry']->constantResources ['clientFlashMessageLogPriority'] [$msg ['type']] . '"});';}$msgString .= '</script>';//$this->clear();
}$GLOBALS ['registry']->session->destroySessionKey('toolbarObMessages');return $msgString;}public function setDebugDB($rule, $mood, $str, $inline = false) {
if ($GLOBALS ['registry']->aclDatabaseDebug->isAllowed($rule, null, TIDY_CONSTANTS::DEBUG_QUERY_MODE) and $mood == TIDY_CONSTANTS::DEBUG_QUERY_MODE) {
$msgString = '> <strong>SQL Statment</strong> :<br />' . $str . '<br />';($inline) ? $this->showDebug($msgString) : $this->m($msgString, TIDY_CONSTANTS::LOG_DEBUG_QUERY);}if ($GLOBALS ['registry']->aclDatabaseDebug->isAllowed($rule, null, TIDY_CONSTANTS::DEBUG_VALUE_MODE) and $mood == TIDY_CONSTANTS::DEBUG_VALUE_MODE) {
$msgString = '> <strong>Values</strong> ---------------------------------------------------' . $str . '<br />';($inline) ? $this->showDebug($msgString) : $this->m($msgString, TIDY_CONSTANTS::LOG_DEBUG_QUERY);}if ($GLOBALS ['registry']->aclDatabaseDebug->isAllowed($rule, null, TIDY_CONSTANTS::DEBUG_RETURN_MODE) and $mood == TIDY_CONSTANTS::DEBUG_RETURN_MODE) {
$msgString = '> <strong>Return</strong> ---------------------------------------------------<br />' . print_r($str, TRUE);($inline) ? $this->showDebug($msgString) : $this->m($msgString, TIDY_CONSTANTS::LOG_DEBUG_QUERY);}}public function debug() {
$debugMessages = $this->getAllMessages(TIDY_CONSTANTS::LOG_DEBUG);foreach ($debugMessages as $msg) {
$this->showDebug($msg ['message']);}//return $debugString;
}private function showDebug($str) {
echo '<hr>' . $str . '<br />';}public function writeUserLog($userIP, $logType = TIDY_CONSTANTS::LOG_INFO) {
$reqInfo = $GLOBALS['registry']->request->getRequstInfo();$GLOBALS['registry']->logger['user']->log('IP (' . $userIP . '),URI(' . $reqInfo['REQUEST_URI'] . '),Method(' . $reqInfo['REQUEST_METHOD'] . ')', $logType);}}//namespace Tidy;
class Model {
public $data = array();private $_data = array();private static $_conditions = array();public static $navigation = false;public static function setCondition(array $conditions) {
self::$_conditions = $conditions;}public function addCondition($index, $value) {
self::$_conditions[$index] = $value;}public function removeCondition($index) {
unset(self::$_conditions[$index]);}public function getCondition($index = null) {
return isset($index) ? ((isset(self::$_conditions[$index]) and self::$_conditions [$index] != '') ? self::$_conditions : NULL) : self::$_conditions;}public function __set($key, $value) {
if (isset($value) and $value != NULL)
$this->_data [$key] = $value;}public function __get($key) {
return $this->_data [$key];}public function __unset($key) {
unset($this->_data [$key]);}public function getData() {
return $this->_data;}public function getAllData() {
$condation = $this->getCondition();$data = $this->getData();if (!empty($condation))
return (!empty($data)) ? array_merge($condation, $data) : $condation;else
return $data;}public static function clear() {
self::$_conditions = array();//$this->_data = array ();
}public function __destruct() {
}}//namespace Tidy;
class Registry {
private static $_isCreated;private static $_registry;private $vars = array();private function __construct() {
}public static function createRegistry() {
if (FALSE == self::$_isCreated) {
if (NULL == self::$_registry) {
self::$_registry = new Registry ();}self::$_isCreated = TRUE;return self::$_registry;} else {
return NULL;}}public function __set($index, $value) {
$GLOBALS[$index] = $value;}public function __get($index) {
return $GLOBALS[$index];}}//namespace Tidy;
class Request extends Http {
public $requestMethod = '';public $server = array();public $requestId = array();private static $_isCreated;public $expireTime = 86400;private static $RequestRegistry;private function __construct() {
$this->iniRequest();}public static function createRequestRegistry() {
if (FALSE == self::$_isCreated) {
if (NULL == self::$RequestRegistry) {
self::$RequestRegistry = new Request ();}self::$_isCreated = TRUE;return self::$RequestRegistry;} else {
self::$RequestRegistry->iniRequest();return self::$RequestRegistry;}}private function iniRequest() {
parent::iniSuperGlobals();//$this->_request
$this->server = $_SERVER;$this->requestId = md5($this->server ["REQUEST_URI"]);$this->requestMethod = $this->server['REQUEST_METHOD'];}public function decodeRequestData($data, $returnArray = true) {
if (get_magic_quotes_gpc()) {
$data = stripslashes($data);}$dataEncode = json_decode($data, $returnArray);if ($dataEncode == NULL)
$dataEncode = json_decode(substr($data, strpos($data, '{')), $returnArray); //for encodeing BOM
return $dataEncode;}public function setGet($index, $value) {
$_GET [$index] = $value;$this->setRequest($index, $value);$this->_get [$index] = $value;}public function getGet($index = NULL) {
return isset($index) ? ((isset($this->_get [$index]) and $this->_get [$index] != '') ? $this->_get [$index] : NULL) : $this->_get;}public function deleteGet($index) {
//$this->deleteRequest ( $index );
unset($_GET [$index]);unset($this->_get [$index]);}public function setPost($index, $value) {
$_POST [$index] = $value;$this->setRequest($index, $value);return $this->_post [$index] = $value;}public function getPost($index = NULL) {
return isset($index) ? ((isset($this->_post [$index]) and $this->_post [$index] != '') ? $this->_post [$index] : NULL) : $this->_post;}public function deletePost($index) {
$this->deleteRequest($index);unset($_POST [$index]);unset($this->_post [$index]);}public function getPut($index = NULL) {
return $this->getPost($index);}public function getCookie($index = NULL, $serialize = false) {
return isset($index) ? (isset($this->_cookie [$index]) ?
(($serialize) ? unserialize(base64_decode($this->_cookie [$index])) : $this->_cookie [$index]) : NULL) : $this->_cookie;}public function setRequest($index, $value) {
$_REQUEST [$index] = $value;return $this->_request [$index] = $value;}public function getRequest($index = NULL) {
return isset($index) ? (isset($this->_request [$index]) ? $this->_request [$index] : NULL) : $this->_request;}public function deleteRequest($index) {
unset($_REQUEST [$index]);unset($this->_request [$index]);}public function getRequstInfo() {
return $this->server;}}//namespace Tidy;
class Response extends Http {
private static $_isCreated;private static $ResponseRegistry;private function __construct() {
$this->iniResponse();}public static function createResponseRegistry() {
if (FALSE == self::$_isCreated) {
if (NULL == self::$ResponseRegistry) {
self::$ResponseRegistry = new Response ();}self::$_isCreated = TRUE;return self::$ResponseRegistry;} else {
self::$ResponseRegistry->iniResponse();return self::$ResponseRegistry;}}private function iniResponse() {
parent::iniSuperGlobals();}private static function encodeResponseData($data, $contentType) {
//alwayes json
if (strpos($contentType, 'json'))
return json_encode($data);else
return $data;}public static function sendResponse($status = 200, $data = null, $contentType = 'application/json', $headers = array(), $cash = 0) {
$statusHeader = 'HTTP/1.1 ' . $status . ' ' . parent::getStatusMessage($status);header($statusHeader);header('Content-type: ' . $contentType);//enable all domains to ger resonse @todo security
header('Access-Control-Allow-Origin: *');header('Access-Control-Allow-Methods: GET, POST'); //, DELETE , PUT
header('Access-Control-Allow-Credentials: true');header('Access-Control-Allow-Headers: X-Requested-With');header('Access-Control-Allow-Headers: Content-Type, Accept');header('Access-Control-Max-Age: 1728000');if (!empty($headers))
foreach ($headers as $header)
header($header);if ($cash > 0) {
$ts = gmdate("D, d M Y H:i:s") . " GMT";header("Expires: $ts");header("Last-Modified: $ts");header("Pragma: no-cache");header("Cache-Control: no-cache, must-revalidate");} else {
$ts = gmdate("D, d M Y H:i:s", time() + $cash) . " GMT";header("Expires: $ts");header("Pragma: cache");header("Cache-Control: max-age=$cash");}if ($data != '') {
die(self::encodeResponseData($data, $contentType));}}public static function responseDownloadFile($fullPath) {
if (headers_sent())
self::sendResponse(HTTP::HTTP_BAD_REQUEST);if (ini_get('zlib.output_compression'))
ini_set('zlib.output_compression', 'Off');if (file_exists($fullPath)) {
$fsize = filesize($fullPath);$path_parts = pathinfo($fullPath);$ext = strtolower($path_parts["extension"]);switch ($ext) {
case "pdf": $ctype = "application/pdf";break;case "exe": $ctype = "application/octet-stream";break;case "zip": $ctype = "application/zip";break;case "doc": $ctype = "application/msword";break;case "xls": $ctype = "application/vnd.ms-excel";break;case "ppt": $ctype = "application/vnd.ms-powerpoint";break;case "gif": $ctype = "image/gif";break;case "png": $ctype = "image/png";break;case "jpeg":case "jpg": $ctype = "image/jpg";break;default: $ctype = "application/force-download";}header("Pragma: public");
header("Expires: 0");header("Cache-Control: must-revalidate, post-check=0, pre-check=0");header("Cache-Control: private", false);
header("Content-Type: $ctype");header("Content-Disposition: attachment; filename=\"" . basename($fullPath) . "\";");header("Content-Transfer-Encoding: binary");header("Content-Length: " . $fsize);ob_clean();flush();readfile($fullPath);} else
self::sendResponse(HTTP::HTTP_BAD_REQUEST);}public function setCookie($index, $value, $expireTime = null, $path = '/') {
//$this->setResponse ( $index, $value );
$value = is_object($value) ? base64_encode(serialize($value)) : $value;setcookie($index, $value, time() + (is_int($expireTime) ? $expireTime : $this->expireTime), $path);setcookie($index . '_PATH', $path, time() + (is_int($expireTime) ? $expireTime : $this->expireTime), $path);$this->_cookie [$index][$path] = $path;return $this->_cookie [$index] = $value;}public function deleteCookie($index) {
if (array_key_exists($index . '_PATH', $this->_cookie)) {
setcookie($index, "", - 1, $this->_cookie [$index . '_PATH']);setcookie($index . '_PATH', "", - 1, $this->_cookie [$index . '_PATH']);unset($this->_cookie [$index]);}}public function destroyCookie() {
foreach ($this->_cookie as $index => $value) {
unset($this->_cookie [$index]);setcookie($index, "", - 1, $this->_cookie [$index . '_PATH']);setcookie($index . '_PATH', "", - 1, $this->_cookie [$index . '_PATH']);}}}//namespace Tidy;
class restRequest {
protected $url;protected $verb;protected $requestBody;protected $requestLength;protected $username;protected $password;protected $acceptType;protected $responseBody;protected $responseInfo;protected $contentType;protected $async;protected $customHeaders;protected $customCurlParams;public function __construct($url = null, $verb = 'GET', $requestBody = null) {
$this->url = $url;$this->verb = $verb;$this->requestBody = $requestBody;$this->requestLength = 0;$this->username = null;$this->password = null;$this->acceptType = 'application/json';$this->responseBody = null;$this->responseInfo = null;$this->contentType = 'application/json';$this->async = false;$this->customHeaders = $this->customCurlParams = array();if ($this->requestBody !== null) {
$this->buildPostBody();}}public function flush() {
$this->requestBody = null;$this->requestLength = 0;$this->verb = 'GET';$this->responseBody = null;$this->responseInfo = null;$this->async = false;$this->customHeaders = array();}public function execute() {
$ch = curl_init();$this->setAuth($ch);try {
switch (strtoupper($this->verb)) {
case 'GET':$this->executeGet($ch);break;case 'POST':$this->executePost($ch);break;case 'PUT':$this->executePut($ch);break;case 'DELETE':$this->executeDelete($ch);break;default:throw new InvalidArgumentException('Current verb (' . $this->verb . ') is an invalid REST verb.');}} catch (InvalidArgumentException $e) {
curl_close($ch);throw $e;} catch (Exception $e) {
curl_close($ch);throw $e;}}public function buildPostBody($data = null) {
$data = ($data !== null) ? $data : $this->requestBody;if (is_array($data)) {
$data = http_build_query($data, '', '&');//throw new InvalidArgumentException('Invalid data input for postBody. Array expected');
}$this->requestBody = $data;}protected function executeGet($ch) {
$this->doExecute($ch);}protected function executePost($ch) {
if (!is_string($this->requestBody)) {
$this->buildPostBody();}curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);curl_setopt($ch, CURLOPT_POSTFIELDS, $this->requestBody);curl_setopt($ch, CURLOPT_POST, 1);$this->doExecute($ch);}protected function executePut($ch) {
if (!is_string($this->requestBody)) {
$this->buildPostBody();}$this->requestLength = strlen($this->requestBody);$fh = fopen('php://memory', 'rw');
fwrite($fh, $this->requestBody);rewind($fh);curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);curl_setopt($ch, CURLOPT_INFILE, $fh);curl_setopt($ch, CURLOPT_INFILESIZE, $this->requestLength);curl_setopt($ch, CURLOPT_PUT, true);$this->doExecute($ch);fclose($fh);}protected function executeDelete($ch) {
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');$this->doExecute($ch);}protected function doExecute(&$curlHandle) {
$this->setCurlOpts($curlHandle);$this->responseBody = curl_exec($curlHandle);$this->responseInfo = curl_getinfo($curlHandle);curl_close($curlHandle);}protected function setCurlOpts(&$curlHandle) {
curl_setopt($curlHandle, CURLOPT_URL, $this->url);if ($this->async) {
//curl_setopt($curlHandle, CURLOPT_FRESH_CONNECT, true);
curl_setopt($curlHandle, CURLOPT_TIMEOUT, 1);} else {
curl_setopt($curlHandle, CURLOPT_TIMEOUT, 10);curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);}$headers = array('Content-Type:' . $this->contentType, 'Accept: ' . $this->acceptType);if (sizeof($this->customHeaders) > 0) {
$headers = array_merge($headers, $this->customHeaders);}curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $headers);if (sizeof($this->customCurlParams) > 0) {
foreach ($this->customCurlParams as $key => $value) {
curl_setopt($curlHandle, constant($key), $value);}}}protected function setAuth(&$curlHandle) {
if ($this->username !== null && $this->password !== null) {
curl_setopt($curlHandle, CURLOPT_HTTPAUTH, CURLAUTH_DIGEST);curl_setopt($curlHandle, CURLOPT_USERPWD, $this->username . ':' . $this->password);}}public function getAcceptType() {
return $this->acceptType;}public function setAcceptType($acceptType) {
$this->acceptType = $acceptType;}public function getContentType() {
return $this->contentType;}public function setContentType($contentType) {
$this->contentType = $contentType;}public function getPassword() {
return $this->password;}public function setPassword($password) {
$this->password = $password;}public function getResponseBody() {
return $this->responseBody;}public function getResponseInfo() {
return $this->responseInfo;}public function getUrl() {
return $this->url;}public function setUrl($url) {
$this->url = $url;}public function getUsername() {
return $this->username;}public function setUsername($username) {
$this->username = $username;}public function getVerb() {
return $this->verb;}public function setVerb($verb) {
$this->verb = $verb;}public function setAsync($async) {
$this->async = $async;}public function setCustomHeaders($customHeaders) {
$this->customHeaders = is_array($customHeaders) ? array_merge($customHeaders, $this->customHeaders) : array();}public function getCustomHeaders() {
return $this->customHeaders;}public function clearCustomHeaders() {
$this->customHeaders = array();}public function setCustomeCurlParams($curlParams) {
$this->customCurlParams = $curlParams;}public function clearCustomeCurlParams() {
$this->customCurlParams = array();}}class Router {
protected $_path;protected $_args = array();public $file;public $controller;public $action;protected $_mainActionFuncName, $_controllerObject;function __construct() {
}protected function loaderCommon() {
if (is_readable($this->file) == false) {
$this->controller = DEFAULT_CONTROLLER;$this->file = CONTROLLER_PATH . $this->controller . 'Controller' . CONTROLLER_EXT;}include $this->file;$class = $this->controller . 'Controller';$modelName = $this->controller . 'Model';$this->_controllerObject = new $class($GLOBALS ['registry']);if (class_exists($this->_controllerObject->relatedModel)) {
$modelName = $this->_controllerObject->relatedModel;$model = new $modelName ();$this->_controllerObject->model = $model;} elseif (class_exists($modelName)) {
$model = new $modelName ();$this->_controllerObject->model = $model;}$GLOBALS ['registry']->data = $GLOBALS ['registry']->request->getPost();if (is_array($this->_controllerObject->helpers))
$this->loadHelpers($this->_controllerObject->helpers);$this->_mainActionFuncName = ucwords($this->action);$this->_controllerObject->ini();}public function iniLoader() {
$controller = $action = NULL;$route = (empty($_GET ['rt'])) ? '' : $_GET ['rt'];$parts = explode('/', $route);if (empty($route)) {
$route = 'index';} else {
$linkArr = $this->_getMapLinkArr();$controller = $linkArr ['controller'];$action = $linkArr ['action'];$params = $linkArr ['params'];if ($controller == NULL or $action == NULL) {
$part1 = array_shift($parts);$controller = $part1;$action = array_shift($parts);}$this->controller = $controller;if (isset($action)) {
$this->action = $action;}if (isset($params) and is_array($params)) {
foreach ($params as $key => $vlaue) {
$parts [] = $key . GET_PARAM_PATTERN . $vlaue;}unset($params);}if (!empty($parts)) {
$partNoPatternCounter = 0;foreach ($parts as $part) {
if (strstr($part, GET_PARAM_PATTERN)) {
$key = str_replace(GET_PARAM_PATTERN, '', substr($part, 0, strpos($part, GET_PARAM_PATTERN)));$value = str_replace(GET_PARAM_PATTERN, '', substr($part, strpos($part, GET_PARAM_PATTERN), strlen($part)));$registryArgs [$key] = $value;$GLOBALS ['registry']->request->setGet($key, $value);} else {
$partNumber = 'param' . ($partNoPatternCounter + 1);$registryArgs [$partNumber] = $part;$GLOBALS ['registry']->request->setGet($partNumber, $part);$partNoPatternCounter ++;}}$this->_args = $registryArgs;}}if (empty($this->controller) or empty($this->action)) {
$this->controller = DEFAULT_CONTROLLER;$this->action = DEFAULT_ACTION;}$GLOBALS ['registry']->controller = $this->controller;$GLOBALS ['registry']->action = $this->action;$GLOBALS ['registry']->args = $this->_args;$this->file = CONTROLLER_PATH . $this->controller . 'Controller' . CONTROLLER_EXT;}private function _getMapLinkArr() {
if (!empty($GLOBALS ['routerMapping'])) {
foreach ($GLOBALS ['routerMapping'] as $pattern => $linkArr) {
$pattern = str_replace('*', '', $pattern);if (strstr($route, $pattern)) {
$partsString = str_replace($pattern, '', $route);$parts = explode('/', str_replace($pattern, '', $route));$paramsArray = array();if ($linkArr ['format'] != '') {
$paramsFormatArray = array();$orderdFormatSegmants = $formatSegmants = explode("########Replace######", preg_replace("/\{[0-9]\}/", "########Replace######$0", $linkArr ['format']));
$orderdFormatSegmants = $formatSegmants = array_filter($formatSegmants, 'strlen');
asort($orderdFormatSegmants);
$orderdFormatSegmants = array_values($orderdFormatSegmants);$removeStringValue = function ($value) {
return preg_replace("/\{[0-9]\}/", '', $value);};$orderdFormatSegmants = array_map($removeStringValue, $orderdFormatSegmants);
$formatSegmants = array_map($removeStringValue, $formatSegmants);
$segmentCounter = 1;$sizeOfSegmants = sizeof($formatSegmants);foreach ($formatSegmants as $segmant) {
if ($sizeOfSegmants != $segmentCounter && $segmant != '')
$valueSegment = trim(substr($partsString, 0, (strpos($partsString, $segmant))));else
$valueSegment = $partsString;if ($valueSegment != '') {
$keyOrder = array_search($segmant, $orderdFormatSegmants);
unset($orderdFormatSegmants [$keyOrder]);$partsString = substr($partsString, strlen($valueSegment . $segmant));
$paramsFormatArray [$keyOrder] = 'param' . ($keyOrder + 1) . GET_PARAM_PATTERN . $valueSegment;
$segmentCounter ++;}}asort($paramsFormatArray);
$parts = array_merge($parts, $paramsFormatArray);
}return $linkArr;break;}}}}public function loadHelpers(array $helpers) {
if (!empty($helpers))
foreach ($helpers as $helper) {
if (!@include_once (HELPER_PATH . $helper . HELPER_EXT))
throw new Exception("Failed to include '$helper' helper");}}function setPath($path) {
if (is_dir($path) == false) {
throw new Exception('Invalid controller path: `' . $path . '`');}$this->_path = $path;}}//namespace Tidy;
class Session {
private $_sessionNameSpace;private $_sessionKeys = array();public $expireSession = 3600;function __construct() {
$this->startSession();}private function startSession() {
return $GLOBALS ['registry']->sessionZendOb;}public function setSession($index, $value, $expireTime = null) {
$value = is_object($value) ? base64_encode(serialize($value)) : $value;$GLOBALS ['registry']->sessionZendOb->$index = $value;$GLOBALS ['registry']->sessionZendOb->setExpirationSeconds(is_int($expireTime) ? $expireTime : $this->expireSession , $index);}public function getSession($index, $serialize = false) {
return ($serialize) ? unserialize(base64_decode($GLOBALS ['registry']->sessionZendOb->$index)) : $GLOBALS ['registry']->sessionZendOb->$index;}public function destroySessionKey($index) {
unset($this->_sessionKeys [$index]);unset($GLOBALS ['registry']->sessionZendOb->$index);}public function getId() {
return Zend_Session::getId();}public function setId($id) {
return Zend_Session::setId($id);}public function destroySession() {
if (!empty($this->_sessionKeys)) {
foreach ($this->_sessionKeys as $key => $value) {
$this->destroySessionKey($key);}} else {
unset($this->_sessionKeys);}session_destroy();}}//namespace Tidy;
class Translate {
private $_message = array();private $_currentNumber;public $currentLang;public $currentLangKey;private static $_isCreated;private $_translate;private static $_translateObject;public static function createLangOB($local) {
if (FALSE == self::$_isCreated) {
if (NULL == self::$_translateObject) {
self::$_translateObject = new Translate($local);}self::$_isCreated = TRUE;return self::$_translateObject;} else {
return self::$_translateObject;}}private function __construct() {
}public function __($string, $msgType = NULL) {
$translation = $this->_translate->_($string);if ($msgType != NULL) {
$this->msg->m($translation, $msgType);}return $translation;}public function setLocal($local) {
$this->_translate->setLocale($local);}public function getMessage($msg) {
return $this->_message [md5($msg)];}public function getAllLabels() {
return $this->_translate->getMessages();}public function getAllMessages() {
return $this->_message;}}//namespace Tidy;
class Validate {
private $_validationArray = array();private $_request;private $_errorCounter;private $_error = false;public function __construct($requestObject) {
$this->_request = $requestObject;}public function setValdationArray(array $validationArray) {
$this->_validationArray = $validationArray;}public function clientValidate($ValidationFunctionName = 'checkValidation', $greenClass = 'green', $wrongClass = 'red') {
$JSValidation = "
function LTrim( value ) {var re = /\s*((\S+\s*)*)/;return value.replace(re, \"$1\");}function RTrim( value ) {var re = /((\s*\S+)*)\s*/;return value.replace(re, \"$1\");}function trim( value ) {return LTrim(RTrim(value));}function returnWithHtml(value){return '<li>'+value+'</li>';}var counter=0;function $ValidationFunctionName()
{var messages = [];var error=null; var tube
\n";$requiredString = '$(document).ready(function(){';foreach ($this->_validationArray as $SingleControlName => $ConditionAndErrorMessage)
foreach ($ConditionAndErrorMessage as $Condition => $ErrorMessage) {
$ErrorMessage = _tr($ErrorMessage);//_($ErrorMessage,TIDY_CONSTANTS::LOG_ERR);
///$ErrorMessage = $GLOBALS ['lang']->getMessage ( $ErrorMessage );
//$ErrorMessage = $ErrorMessage ['msg'];
$epos = strrpos($Condition, "=");list ( $getCondition, $getvalue ) = @split("=", $Condition);if ($epos >= 0) {
$getMyCondition = $getCondition;$value = $getvalue;if (is_string($value) and $getMyCondition == 'same')
$getMyCondition = 'sameFields';} else {
$getMyCondition = $Condition;}$JSValidation .= " if($('[name=\"$SingleControlName\"]').length){";switch ($getMyCondition) {
case '' :$JSValidation .= " 
if($('[name=\"$SingleControlName\"]').val()==''){
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}\n";$requiredString .= "$( \"label[for='$SingleControlName']\" ).html($( \"label[for='$SingleControlName']\" ).html()+\" <span class='required'>*</span>\");";break;case 'tinyEditor' :$JSValidation .= " 
if(tinyMCE.get(\"$SingleControlName\").getContent()==''){
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}\n";$requiredString .= "$( \"label[for='$SingleControlName']\" ).html($( \"label[for='$SingleControlName']\" ).html()+\" <span class='required'>*</span>\");";break;case "MinChar" :$JSValidation .= " 
if($('[name=\"$SingleControlName\"]').val()!=''){
if(parseInt(trim($('[name=\"$SingleControlName\"]').val()).length) < parseInt($value))
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}}\n";break;case "MaxChar" :$JSValidation .= " 
if($('[name=\"$SingleControlName\"]').val()!=''){
if(parseInt(trim($('[name=\"$SingleControlName\"]').val()).length) > parseInt($value))
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}}\n";break;case "Email" :$JSValidation .= "
var checkEmail;checkEmail=$('[name=\"$SingleControlName\"]').val();if(checkEmail!='')
{
if ((checkEmail.indexOf('@') <=0) || ((checkEmail.charAt(checkEmail.length-4) != '.') && (checkEmail.charAt(checkEmail.length-3) != '.')))
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}}\n";break;case "checkBoxesSelected" :$JSValidation .= "
if ($('input[type=checkbox]:checked').length<1)
{
" . $this->_clientWrongCase($SingleControlName . '[]', $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName . '[]', $wrongClass, $greenClass) . "
}\n";break;case "checkedBtn" :$JSValidation .= "
if(!$('[name=\"$SingleControlName\"]').is(':checked'))
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}\n
";break;case "Integer" :$JSValidation .= "
if(trim($('[name=\"$SingleControlName\"]').val())!=''){
if(!isInteger($('[name=\"$SingleControlName\"]').val()))
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}}\n";break;case "Float" :$JSValidation .= "
if(trim($('[name=\"$SingleControlName\"]').val())!=''){
if(isDecimal($('[name=\"$SingleControlName\"]').val()))
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}}\n";break;case "URL" :$JSValidation .= "
if($('[name=\"$SingleControlName\"]').val()!='')
{
var charpos = $('[name=\"$SingleControlName\"]').val().search(\"^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$\"); 
if($('[name=\"$SingleControlName\"]').val().length > 0 && charpos < 0)
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
} 
}\n";break;case "sameFields" :$JSValidation .= "
if($('[name=\"$SingleControlName\"]').val()!=$('[name=\"$value\"]').val())
{
" . $this->_clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) . "
}else{
" . $this->_clientSuccCase($SingleControlName, $wrongClass, $greenClass) . "
}\n 
";break;}$JSValidation .= " }";//$JSValidation .= " }";
}$requiredString .= '});';$JSValidation .= $this->_clientViewErrors();return $JSValidation . $requiredString;}private function _clientWrongCase($SingleControlName, $ErrorMessage, $wrongClass, $greenClass) {
return "messages[messages.length]='$ErrorMessage';//Messages 
$('[name=\"$SingleControlName\"]').focus();errorCaseValidation($('[name=\"$SingleControlName\"]'));//$('[name=\"$SingleControlName\"]').addClass('$wrongClass');
//$('[name=\"$SingleControlName\"]').removeClass('$greenClass');
$('#${SingleControlName}_desc').html('$ErrorMessage');error='err';counter++;";}public function writeJsFileValidation() {
$validationFile = JS_PATH . 'validation' . DS . $this->_request->requestId . '.js';if (!file_exists($validationFile)) {
try {
$fileValidationHandler = @fopen($validationFile, 'w');fwrite($fileValidationHandler, @$this->clientValidate());fclose($fileValidationHandler);} catch (TidyException $e) {
echo "can't open validation file";}}}private function _clientSuccCase($SingleControlName, $wrongClass, $greenClass) {
return "successCaseValidation($('[name=\"$SingleControlName\"]'));//$('[name=\"$SingleControlName\"]').removeClass('$wrongClass');
//$('[name=\"$SingleControlName\"]').addClass('$greenClass');
$('#${SingleControlName}_desc').html('');counter--;";}private function _clientViewErrors() {
return 'if(error==null){
return true;}else{
var messageString="<ul>";for (i in messages) { 
notify(messages[i],{messageType:"' . $GLOBALS ['registry']->constantResources['clientFlashMessageLogPriority'][TIDY_CONSTANTS::LOG_ERR] . '"});messageString+=messages[i];}messageString+="</ul>";return false;}}//End of JS Validation Function
';}public function serverValidate($dataSetValidation = NULL) {
$counter = 0;$multipleValue = array();$dataSetValidation = (is_array($dataSetValidation) and (sizeof($dataSetValidation) > 0)) ? $dataSetValidation : $this->_request->getRequest();foreach ($this->_validationArray as $SingleControlName => $ConditionAndErrorMessage)
foreach ($ConditionAndErrorMessage as $Condition => $ErrorMessage) {
//Set Error MEssage
$epos = strrpos($Condition, "=");list ( $getCondition, $getvalue ) = @split("=", $Condition);if ($epos >= 0) {
$getMyCondition = trim($getCondition);$value = $getvalue;if (is_string($value) and $getMyCondition == 'same') {
$getMyCondition = 'sameFields';$value = $dataSetValidation[$value];}} else {
$getMyCondition = trim($Condition);}$controlValue = $dataSetValidation[$SingleControlName];//enable multi post check and validate
if (is_array($controlValue) and !empty($controlValue)) {
$counterInnerValues = 0;if (sizeof($controlValue) > 1)
foreach ($controlValue as $elementKey => $elementValue) {
$this->_validationArray[$SingleControlName . '_' . $counterInnerValues] = $ConditionAndErrorMessage;$value = $dataSetValidation[$SingleControlName . '_' . $counterInnerValues] = $elementValue;//$value = $this->_request->setRequest ($SingleControlName.'_'.$counterInnerValues, $elementValue );
$counterInnerValues++;unset($this->_validationArray[$SingleControlName]);$this->_servRsepeateValidation($dataSetValidation);} else
$controlValue = array_pop($controlValue);//remove element from current validation
}if (isset($controlValue)) {
switch ($getMyCondition) {
case '' : {
if ($this->notEmpty($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'tinyEditor' : {
if ($this->minChar($value, $controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'MinChar' : {
if ($this->minChar($value, $controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'MaxChar' : {
if ($this->maxChar($value, $controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'Email' : {
if ($this->isEmail($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'checkBoxesSelected' : {
if ($this->notEmpty($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'checkedBtn' : {
if ($this->notEmpty($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'Integer' : {
if ($controlValue == NULL || $controlValue == '')
$this->_serverSuccCase($SingleControlName);else {
if ($this->isInteger($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}}break;case 'Float' : {
if ($controlValue == NULL || $controlValue == '')
$this->_serverSuccCase($SingleControlName);else {
if ($this->isFloat($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}}break;case 'URL' : {
if ($this->isUrl($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'NotEmptyArray' : {
if ($this->isNotEmptyArray($controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;case 'sameFields' : {
if ($this->isEqual($value, $controlValue))
$this->_serverSuccCase($SingleControlName);else
$this->_serverWrongCase($SingleControlName, $ErrorMessage);}break;}}elseif ($getMyCondition === '')
$this->_serverWrongCase($SingleControlName, $ErrorMessage);$counter ++;}if ($this->_error) { //there is error
$errorMessages = $this->_serverViewErrors();return $errorMessages;} else {
return true;}}public function isNotEmptyArray($value) {
if (is_array($value)) {
$status = (sizeof($value) > 0) ? true : false;} else
$status = false;return $status;}public function isFloat($value) {
$status = true;if (!is_float($value + 1))
$status = false;return ($status) ? $status : is_int($value + 1);}public function isDigit($value) {
$validator = new Zend_Validate_Digits ();return $validator->isValid($value);}public function isEmail($value) {
$validator = new Zend_Validate_EmailAddress ();return $validator->isValid($value);}public function isInteger($value) {
$validator = new Zend_Validate_Int ();return $validator->isValid($value);}public function lessThan($max, $value) {
$validator = new Zend_Validate_LessThan(array('max' => $max));return $validator->isValid($value);}public function greaterThan($min, $value) {
$validator = new Zend_Validate_GreaterThan(array('min' => $min));return $validator->isValid($value);}public function between($min, $max, $value) {
$validator = new Zend_Validate_Between(array('min' => $min, 'max' => $max));return $validator->isValid($value);}public function notEmpty($value) {
$validator = new Zend_Validate_NotEmpty ();return $validator->isValid($value);}public function minChar($min, $value) {
$validator = new Zend_Validate_StringLength(array('min' => $min));$validator->setEncoding("UTF-8");return $validator->isValid($value);}public function maxChar($max, $value) {
$validator = new Zend_Validate_StringLength(array('max' => $max));$validator->setEncoding("UTF-8");return $validator->isValid($value);}public function isUrl($value) {
$validator = new Zend_Validate_Callback(array('Zend_Uri', 'check'));return $validator->isValid($value);}public function isEqual($value1, $value2) {
return ($value1 == $value2);}public function isMobileNumber($mobile) {
if (preg_match('/^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1})?([0-9]{10})$/', $mobile, $matches)) {
//print_r($matches);
return true;} else
return false;}private function _serverSuccCase($SingleControlName) {
$this->_errorCounter --;}private function _serverWrongCase($SingleControlName, $errorMessage) {
$this->_errorCounter ++;//Messages
//$GLOBALS['registry']->msg->m($errorMessage,TIDY_CONSTANTS::LOG_ERR);
$GLOBALS['registry']->msg->setMsg($errorMessage, ERROR_VALIDATE_MSG);$this->_error = true;}private function _servRsepeateValidation($dataSetValidation) {
$this->_errorCounter = 0;//Messages
$allMessagesWithoutValidationError = array();$allMessages = $GLOBALS['registry']->msg->getAllMessages();$messagesValidate = $GLOBALS['registry']->msg->getAllMessages(ERROR_VALIDATE_MSG);if (is_array($allMessages) and is_array($messagesValidate))
$allMessagesWithoutValidationError = array_diff($allMessages, $messagesValidate);$GLOBALS['registry']->msg->messages = $allMessagesWithoutValidationError;$this->_error = false;$this->serverValidate($dataSetValidation);}private function _serverViewErrors() {
return $GLOBALS['registry']->msg->getAllMessages(ERROR_VALIDATE_MSG);}}//version no
define('TIDY_VERSION', '2014.3.11');class DB {
public $pdoResource;protected $stmt = FALSE;private $_debug = TIDY_CONSTANTS::DEBUG_FULL_MODE;private $_param = array();private $_data = array();private $_condationsParms = array();private $_insertID;private static $QueryBuilder = array();private static $isCreated = array(0 => false);private static $pdoOutSource = FALSE;public $driver = FALSE;public $multiParamStmt = false;public $valueValidateSetting = array();private $_databaseConfig = array();private function __construct($server, $username, $password, $db, $driver, $options = '') {
if (self::$pdoOutSource === FALSE) {
if (!interface_exists('sqlDriversInterface'))
include 'drivers' . DS . 'sqlDriversInterface.php';if (!class_exists($driver))
include 'drivers' . DS . $driver . '.php';$this->valueValidateSetting = array('check' => true, 'candidateValue' => true);$this->_databaseConfig = array('server' => $server, 'userName' => $username, 'password' => $password, 'databaseName' => $db, 'driver' => $driver);$this->driver = new $driver($this);try {
$this->driver = new $driver($this);$this->pdoResource = new PDO(sprintf($this->driver->getConnectionString(), $server, $db, $options), $username, $password); //"crm", "012012"); 
//$this->pdoResource =new PDO("mysql:host=$host;dbname=$db", $username, $password);
//$errorMode=($this->_debug==TIDY_CONSTANTS::DEBUG_NO_MODE)?ERRMODE_SILENT:ERRMODE_EXCEPTION;
$this->pdoResource->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);$this->pdoResource->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);} catch (pdoException $e) {
$this->pdoResource = FALSE;die("Error connecting to SQL Server : " . $e->getMessage());}} else
$this->pdoResource = self::$pdoOutSource;}public static function createBuilder(array $databaseConfig, $instanceIndex = 0) {
if (FALSE == @self::$isCreated[$instanceIndex]) {
if (NULL == @self::$QueryBuilder[$instanceIndex]) {
@self::$QueryBuilder[$instanceIndex] = new DB($databaseConfig ['server'], $databaseConfig ['userName'], $databaseConfig ['password'], $databaseConfig ['databaseName'], $databaseConfig ['driver'], (array_key_exists('connectionOptions', $databaseConfig) ? $databaseConfig ['connectionOptions'] : NULL));}@self::$isCreated[$instanceIndex] = TRUE;return @self::$QueryBuilder[$instanceIndex];} else {
return NULL;}}public function closeBuilder(DB $queryBuilderClose, $instanceIndex = 0) {
self::$isCreated[$instanceIndex] = FALSE;}public function connectPdoResource($driver, $databaseConfig) {
try {
$this->driver = new $driver($this);$this->pdoResource = new PDO(sprintf($this->driver->getConnectionString(), $databaseConfig ['server'], $databaseConfig ['databaseName'], $databaseConfig ['connectionOptions']), $databaseConfig ['userName'], $databaseConfig ['password']); //"crm", "012012");
$this->pdoResource->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);} catch (pdoException $e) {
$this->pdoResource = FALSE;die("Error connecting to SQL Server : " . $e->getMessage());}self::$pdoOutSource = $this->pdoResource;return $this->pdoResource;}public static function setPdoResource($pdoResource) {
self::$pdoOutSource = $pdoResource;}public function setDebug($_debug) {
$this->_debug = $_debug;}/////////////////////////////////////////////////////////////////////////////////////////////////////////Execute Function
public function updateStmtPrep($model, $execute) {
if ($this->_checkUpdatePrimaryCondition($model)) {
$stmt = $this->query($this->driver->getSimpleLimitQuery($model, '1', NULL, 1));$stmt->execute();if ($stmt->fetch()) {
return ($this->editStmtPrep($model, $execute, false) > 0) ? true : false;} else {
$condition = $model->getCondition();if (is_array($condition) and (sizeof($condition) > 0))
foreach ($condition as $key => $val)
$model->$key = $val;$status = $this->addStmtPrep($model, $execute);return (($this->insertID() > 0) ? $this->insertID() : $status);}}else {
$status = $this->addStmtPrep($model, $execute);return (($this->insertID() > 0) ? $this->insertID() : $status);}}public function getSimpleRecored() {
$stmt = $this->query($this->driver->getSimpleLimitQuery($model, '1', NULL, 1));$stmt->execute();}public function addStmtPrep($model, $execute = false) {
$this->clear();$table = $model->tableName;$this->_data = $model->getData();$this->_debug('<b>Insert ' . $table . '-----------------------------------------------------</b>');$sizeOfData = sizeof($this->_data);$into = "INSERT INTO $table (";$values = 'VALUES (';//$valueArray=implode(',',$data);
$i = 0;foreach ($this->_data as $key => $value) {
$fieldName = $key;$this->_valuesValidateAccordingDatabaseType($table, $fieldName, $value);if ($value == NULL) {
if ($i == $sizeOfData - 1) {
$into = substr($into, 0, strlen($into) - 1);$values = substr($values, 0, strlen($values) - 1);}continue;} elseif (preg_match("/^.*\(+.*\)+/", $value)) {
$stripValue = stripslashes($value);$values .= (is_string($stripValue) ? "'$stripValue'" : $stripValue) . (($i == $sizeOfData - 1) ? '' : ',');} else {
$paramKey = $this->_getParamKey($key);$values .= $paramKey . (($i == $sizeOfData - 1) ? '' : ',');$this->_param [$paramKey] = $value;$debugString .= '<br />' . $paramKey . '=' . $value;//$this->sp->Add_Parameter($fieldName, $this->checkValueBindType($value));
}$into .= $fieldName . (($i == $sizeOfData - 1) ? '' : ',');$i ++;}$into .= ') ';$values .= ') ';//add custom to insert query
$execQuery = $this->driver->setOutPutID($model, $into) . $values;$this->_debug($execQuery, TIDY_CONSTANTS::DEBUG_QUERY_MODE);if ($debugString)
$this->_debug($debugString, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$this->stmt = $this->pdoResource->prepare($execQuery);if ($execute) {
$exResult = $this->executeStmt();$this->setInsertID($this->driver->getInsertedOutputID($this->stmt, $this));$this->_debug($exResult, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $exResult;}$this->_debug($this->stmt, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $this->stmt;}public function insertID() {
return $this->pdoResource->lastInsertId();}public function setInsertID($insertID) {
return $this->_insertID = $insertID;}public function getInsertID() {
return $this->_insertID;}public function rowCount() {
return $this->stmt->rowCount();}public function editStmtPrep($model, $execute = FALSE, $primaryCheck = true) {
$this->clear();$table = $model->tableName;$this->_debug('<b>Update ' . $table . ' -----------------------------------------------------</b>');$into = 'UPDATE ' . $table . ' SET ';if ($primaryCheck)
$this->_checkUpdatePrimaryCondition($model);$this->_data = $model->getData();$i = 0;$debugString = '';$condition = $this->_getCondition($model, $debugString);$dataKeys = array_keys($this->_data);//filter repated columns 
foreach ($dataKeys as $key) {
$paramKey = $this->_getParamKey($key);if (array_key_exists($paramKey, $this->_param)) {
unset($this->_data[$key]);}};unset($dataKeys);$sizeOfData = sizeof($this->_data);foreach ($this->_data as $fieldName => $value) {
$paramKey = $this->_getParamKey($fieldName);$this->_valuesValidateAccordingDatabaseType($table, $fieldName, $value);if ($value == NULL) {
if ($i == $sizeOfData - 1) {
$into = substr($into, 0, strlen($into) - 1);}continue;} elseif (preg_match('/^.*\(+.*\)+/', $value)) {
$into .= $fieldName . '=';$stripValue = stripslashes($value);$into .= (is_string($stripValue) ? "'$stripValue'" : $stripValue) . (($i == $sizeOfData - 1) ? '' : ',');} else {
$into .= $fieldName . '=';$into .= $paramKey . (($i == $sizeOfData - 1) ? '' : ',');$this->_param [$paramKey] = $value;$debugString .= '<br />' . $paramKey . '=' . $value;//$this->sp->Add_Parameter($fieldName, $this->checkValueBindType($value));
}//$into .= $fieldName . (($i == $sizeOfData - 1) ? '' : ',');
$i ++;}$into .= ' WHERE 1=1';$into .= $condition;$this->_debug($into, TIDY_CONSTANTS::DEBUG_QUERY_MODE);if ($debugString)
$this->_debug($debugString, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$this->stmt = $this->pdoResource->prepare($into);if ($execute) {
$exResult = $this->executeStmt();$this->_debug($exResult, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $exResult;}$this->_debug($this->stmt, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $this->stmt;}public function deleteStmtPrep($model, $execute = FALSE) {
$this->clear();$table = $model->tableName;$this->_debug('<b>Delete From ' . $table . ' -----------------------------------------------------</b>');$debugString = '';$condition = $this->_getCondition($model, $debugString);$into = 'DELETE FROM ' . $table;$into .= ' WHERE 1=1';$into .= $condition;$this->_debug($into, TIDY_CONSTANTS::DEBUG_QUERY_MODE);if ($debugString)
$this->_debug($debugString, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$this->stmt = $this->pdoResource->prepare($into);if ($execute) {
$exResult = $this->executeStmt();$this->_debug($exResult, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $exResult;}$this->_debug($this->stmt, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $this->stmt;}public function query($queryString) {
$this->_debug($queryString, TIDY_CONSTANTS::DEBUG_QUERY_MODE);return $this->pdoResource->query($queryString);}////////////////////////////////////////////////////////////////////////////////////////////////////ResultSet Function
public function getRecord($model, $columns = "*", $condition = NULL, $view = NULL, $otherTablesJoin = NULL) {
$this->clear();$debugString = '';$model = $this->_getModel($model);$selectResource = isset($view) ? $view : $model->tableName;$otherTablesJoin = is_array($otherTablesJoin) ? ',' . implode(',', $otherTablesJoin) : NULL;$this->_debug('<b>Get Recored From ' . $selectResource . ' -----------------------------------------------------</b>');$qry = "SELECT $columns FROM $selectResource $otherTablesJoin WHERE 1=1 ";$condition = isset($condition) ? $condition : $this->_getCondition($model, $debugString);$qry .= $condition;$this->_debug($qry, TIDY_CONSTANTS::DEBUG_QUERY_MODE);if ($debugString)
$this->_debug($debugString, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$this->stmt = $this->pdoResource->prepare($qry);$this->executeStmt();if ($row = $this->stmt->fetch(PDO::FETCH_NUM)) {
$resultExists = TRUE;foreach ($row as $column_index => $column_value) {
$columnInfo = $this->stmt->getColumnMeta($column_index);$columnName = $columnInfo ['name'];$model->$columnName = $column_value;}}if ($resultExists) {
$this->_debug($model, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $model;}$this->_debug(NULL, TIDY_CONSTANTS::DEBUG_RETURN_MODE);}public function getRecordSet($model, $columns = '*', $condition = NULL, $view = NULL, $otherTablesJoin = NULL, $sort = NULL, $sortType = 'DESC') {
$this->clear();$model = $this->_getModel($model);$modelName = get_class($model);$selectResource = isset($view) ? $view : $model->tableName;$condition = isset($condition) ? $condition : $this->_getCondition($model, $debugString);$otherTablesJoin = is_array($otherTablesJoin) ? ',' . implode(',', $otherTablesJoin) : NULL;$this->_debug('<b>Get Recored set From ' . $selectResource . ' -----------------------------------------------------</b>');$reflectionClass = new \ReflectionClass($model);$disableOrder = $reflectionClass->getShortName() . 'Order';$qry = "SELECT $columns FROM $selectResource $otherTablesJoin WHERE 1=1 $condition ";if ($GLOBALS ['registry']->$disableOrder != 'disable') {
if ($sort == NULL) {
eval('$sort =' . $modelName . '::$sortColumns;');eval('$sortType =' . $modelName . '::$sortType;');}$qry .= " ORDER BY $sort $sortType";}$this->_debug($qry, TIDY_CONSTANTS::DEBUG_QUERY_MODE);if ($debugString)
$this->_debug($debugString, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$models = $this->fetchModelQuery($qry, $model);$this->_debug($models, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $models;}public function fetchModelQuery($query, $model) {
$models = array();$model = $this->_getModel($model);$this->stmt = $this->pdoResource->prepare($query);$this->executeStmt();while ($row = $this->stmt->fetch(PDO::FETCH_NUM)) {
$model = new $model ();foreach ($row as $column_index => $column_value) {
$columnInfo = $this->stmt->getColumnMeta($column_index);$columnName = $columnInfo ['name'];$model->$columnName = $column_value;}$modelOb = clone $model;$models[] = $modelOb->getData();}return $models;}public function quickFetchModelQuery($query, $model) {
$models = array();$model = $this->_getModel($model);$this->stmt = $this->query($query);while ($row = $this->stmt->fetch(PDO::FETCH_NUM)) {
foreach ($row as $column_index => $column_value) {
$columnInfo = $this->stmt->getColumnMeta($column_index);$columnName = $columnInfo ['name'];$model->$columnName = $column_value;}$modelOb = clone $model;$models[] = $modelOb->getData();};return $models;}////////////////////////////////////////////////////////////////////////////////////////////////Procedures Function
public function resultProcedure($procedureName, $model) { //SELECT Procedure
$this->clear();$models = array();$this->_debug('<b>Execute ' . $procedureName . ' -----------------------------------------------------</b>');$procdureExecString .= ' EXECUTE ' . $procedureName;$paramCounter = 0;$paramSize = sizeof($params);$this->_data = $model->getAllData();$paramSize = sizeof($this->_data);$paramCounter = 0;foreach ($this->_data as $fieldName => $value) {
$paramKey = $this->_getParamKey($fieldName);$procdureExecString .= ' @' . $fieldName . '= ' . $paramKey . (($paramCounter == $paramSize - 1) ? '' : ' , ');$this->_param [$paramKey] = $value;$paramCounter ++;}$this->_debug($procdureExecString, TIDY_CONSTANTS::DEBUG_QUERY_MODE);$this->stmt = $this->pdoResource->prepare($procdureExecString);$this->executeStmt();$this->stmt->nextRowset();$rows = $this->stmt->fetchAll(PDO::FETCH_ASSOC);$resultCount = count($rows);if ($resultCount > 1) { //Return Multiple Value
$models = array();foreach ($rows as $row) {
foreach ($row as $columnName => $columnValue) {
$model->$columnName = $columnValue;}$modelOb = clone $model;$models[] = $modelOb;}$returnValue = $models;} elseif ($resultCount) { //Return one Value
$columnName = key($rows [0]);$columnValue = $rows [0] [key($rows [0])];$model->$columnName = $columnValue;$returnValue = $model;}$this->_debug($returnValue, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $returnValue;}public function exeProcedure($procedureName, $model) {
$this->clear();$this->_debug('<b>Execute ' . (string) $procedureName . ' -----------------------------------------------------</b>');$procdureExecString .= 'DECLARE @returnVal int EXECUTE @returnVal=' . (string) $procedureName;$paramCounter = 0;$paramSize = @sizeof($params);if (!empty($model)) {
$this->_data = $model->getAllData();$paramSize = sizeof($this->_data);$paramCounter = 0;foreach ($this->_data as $fieldName => $value) {
$paramKey = $this->_getParamKey($fieldName);$procdureExecString .= ' @' . $fieldName . '= ' . $paramKey . (($paramCounter == $paramSize - 1) ? '' : ' , ');$this->_param [$paramKey] = $value;$this->_debug($paramKey . '=' . $value, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$paramCounter ++;}}$procdureExecString .= ' SELECT "returnVal"=@returnVal';$this->_debug($procdureExecString, TIDY_CONSTANTS::DEBUG_QUERY_MODE);$this->stmt = $this->pdoResource->prepare($procdureExecString);$this->executeStmt();while ($this->stmt->nextRowset()) {
try {
$rows = $this->stmt->fetchAll(PDO::FETCH_ASSOC);if (!empty($rows))
$returnValue = $rows [0] [key($rows [0])];if ($returnValue > 0)
break;} catch (pdoException $e) {
continue;}}$this->_debug($returnValue, TIDY_CONSTANTS::DEBUG_RETURN_MODE);return $returnValue;}public function exeProcedureGUID($procedureName, $model) {
$this->clear();$this->_debug('<b>Execute ' . (string) $procedureName . ' -----------------------------------------------------</b>');$procdureExecString .= 'DECLARE @return_valueOut UNIQUEIDENTIFIER DECLARE @returnVal int EXECUTE @returnVal=' . (string) $procedureName;$paramCounter = 0;$guid = NULL;$paramSize = @sizeof($params);if (!empty($model)) {
$this->_data = $model->getAllData();$paramSize = sizeof($this->_data);$paramCounter = 0;foreach ($this->_data as $fieldName => $value) {
$paramKey = $this->_getParamKey($fieldName);$procdureExecString .= ' @' . $fieldName . '= ' . $paramKey . (($paramCounter == $paramSize - 1) ? '' : ' , ');$this->_param [$paramKey] = $value;$this->_debug($paramKey . '=' . $value, TIDY_CONSTANTS::DEBUG_VALUE_MODE);$paramCounter ++;}}$procdureExecString .= ',@GUID = @return_valueOut OUTPUT SELECT "GUID" = @return_valueOut SELECT "returnVal"=@returnVal';$this->_debug($procdureExecString, TIDY_CONSTANTS::DEBUG_QUERY_MODE);$this->stmt = $this->pdoResource->prepare($procdureExecString);$this->executeStmt();$counterLoopingForStmt = 0;while ($this->stmt->nextRowset()) {
try {
$rows = $this->stmt->fetchAll(PDO::FETCH_ASSOC);if (!empty($rows)) {
$counterLoopingForStmt++;$guid = ($counterLoopingForStmt == 1) ? $rows [0] [key($rows [0])] : $guid;$returnValue = ($counterLoopingForStmt == 2) ? $rows [0] [key($rows [0])] : $returnValue;}if ($returnValue > 0)
break;} catch (pdoException $e) {
continue;}}$this->setInsertID($guid);return $returnValue;}////////////////////////////////////////////////////////////////////////////////////////////////////Transaction Function
public function beginTR() {
if (!$this->pdoResource->inTransaction()) {
try {
$this->pdoResource->beginTransaction();} catch (PDOException $e) {
$this->rollBack();}$this->_debug('<b>Begin transaction</b>', TIDY_CONSTANTS::DEBUG_QUERY_MODE);} else
$this->_debug('<b>Begin Trans COMMAND WITH ALREDY ACTIVE TRANSACTION</b>', TIDY_CONSTANTS::DEBUG_QUERY_MODE);}public function endTR() {
if ($this->pdoResource->inTransaction()) {
$this->pdoResource->commit();$this->_debug('<b>End transaction</b>', TIDY_CONSTANTS::DEBUG_QUERY_MODE);} else
$this->_debug('<b>END COMMAND WITHOUT TRANSACTION</b>', TIDY_CONSTANTS::DEBUG_QUERY_MODE);}public function rollBack() {
if ($this->pdoResource->inTransaction()) {
$this->pdoResource->rollBack();$this->_debug('<b>RollBack transaction</b>', TIDY_CONSTANTS::DEBUG_QUERY_MODE);} else
$this->_debug('<b>RollBack COMMAND WITHOUT TRANSACTION</b>', TIDY_CONSTANTS::DEBUG_QUERY_MODE);}////////////////////////////////////////////////////////////////////////////////////////////////////Helpers Function
private function _getModel($model) {
$model = is_string($model) ? $model . 'Model' : $model;$model = is_object($model) ? $model : new $model ();return $model;}private function _valuesValidateAccordingDatabaseType($table, $column, $value) {
if ($this->valueValidateSetting['check']) {//enable check
$table = (strpos($table, '.') != null) ? substr($table, strpos($table, '.') + 1, strlen($table)) : $table;$result = $this->driver->validateColumn($table, $column, $value);if ($result['conflict'] == true) {
$this->_debug($result['msg'], TIDY_CONSTANTS::DEBUG_VALUE_MODE);if ($this->valueValidateSetting['candidateValue'])
return $result['candidate'];} else
return $value;} else
return $value;}private function _checkUpdatePrimaryCondition(&$model) {
$this->_debug('<b>check Primary for ' . $model->tableName . '------------------------------------------------</b>');$avaliablePrimaryKey = false;//getPrimary Keys to set it directly into condition
$modelPrimary = $model->primaryKeys;$modelInitialCondition = $model->getCondition();if (is_array($modelPrimary) and (sizeof($modelPrimary) > 0)) {
foreach ($modelPrimary as $primary) {
if ($model->$primary != '') {
$model->addCondition($primary, $model->$primary);unset($model->$primary); //remove it from normal data to condition data
$avaliablePrimaryKey = true;} else {
$avaliablePrimaryKey = false;$model->setCondition($modelInitialCondition);reset($modelPrimary);foreach ($modelPrimary as $primary)
$model->$primary = $primary;break;}}} elseif ($modelPrimary != '') {
if ($model->$modelPrimary != '') { //primary key already seted
$avaliablePrimaryKey = true;$model->addCondition($modelPrimary, $model->$modelPrimary);}}unset($modelPrimary);unset($modelInitialCondition);return $avaliablePrimaryKey;}public function executeStmt($model = NULL, $st = NULL) {
if (is_object($model)) {
$this->_debug('', TIDY_CONSTANTS::DEBUG_VALUE_MODE);$this->_data = $model->getAllData();$sizeOfData = sizeof($this->_data);$i = 0;foreach ($this->_data as $fieldName => $value) {
$paramKey = $this->_getParamKey($fieldName);if (preg_match("/^.*\(+.*\)+/", $value)) {
continue;}$value = stripslashes($value);$this->_param [$paramKey] = $value;//$this->stmt->bindParam(':'.$fieldName,$value, PDO::PARAM_STR);
$i ++;$this->_debug($paramKey . '=' . $value, TIDY_CONSTANTS::DEBUG_VALUE_MODE);}}$result = $this->stmt->execute($this->_param);return $result;}private function _getCondition($model, &$debugString = '') {
$condition = '';$this->_condationsParms = $model->getCondition();$sizeOfConParms = sizeof($this->_condationsParms);$conParmsCounter = 0;if ($sizeOfConParms > 0) {
$condition = ' AND ';foreach ($this->_condationsParms as $fieldName => $value) {
if (is_array($value)) {
$condition = $fieldName;list ( $fieldName, $value ) = $value;}$condition .= $fieldName . '=';$paramKey = $this->_getParamKey($fieldName);if (preg_match("/^.*\(+.*\)+/", $value)) {
$stripValue = stripslashes($value);$condition .= (is_string($stripValue) ? "'$stripValue'" : $stripValue) . (($conParmsCounter == $sizeOfConParms - 1) ? '' : ' AND ');} else {
$condition .= $paramKey . (($conParmsCounter == $sizeOfConParms - 1) ? '' : ' AND ');$this->_param [$paramKey] = $value;$debugString .= '<br />' . $paramKey . '=' . $value;}$conParmsCounter ++;continue;}}return $condition;}private function _debug($str, $debugType = NULL) {
$errorMode = ($this->_debug == TIDY_CONSTANTS::DEBUG_NO_MODE) ? PDO::ERRMODE_SILENT : PDO::ERRMODE_EXCEPTION;$this->pdoResource->setAttribute(PDO::ATTR_ERRMODE, $errorMode);$GLOBALS ['registry']->msg->setDebugDB($this->_debug, $debugType, $str, TRUE);}private function _getParamKey($fieldName) {
$paramKey = ":${fieldName}";if (is_array($this->_param) && !empty($this->_param))
$paramKey = (array_key_exists($paramKey, $this->_param)) ? (($this->multiParamStmt) ? $paramKey . (intval(substr($paramKey, - 1)) + 1) : $paramKey) : $paramKey;return $paramKey;}public function close() {
if ($this->pdoResource)
$this->pdoResource = FALSE;if ($this->stmt)
$this->stmt = FALSE;}public function clear() {
$this->_data = NULL;$this->_param = NULL;$this->_condationsParms = NULL;$this->stmt = FALSE;}public function __destruct() {
//$this->close();
}function __sleep() {
return array('_databaseConfig', 'driver');}function __wakeup() {
$this->connectPdoResource($this->driver, $this->_databaseConfig);}}//namespace Tidy\DB;
class mysql implements sqlDriversInterface {
public $db;private $connectionString = '';private $_mysqlTypes = array();public function __construct($db) {
$this->db = $db;$this->connectionString = "mysql:host=%s; dbname=%s";$this->_mysqlTypes = array('integerTypes' =>
array('tinyint' => array('127', '255'),'smallint' => array('32767', '65535'),'mediumint' => array('8388607', '16777215'),'int' => array('2147483647', '4294967295'),'int24' => array('2147483647', '4294967295')
, 'integer' => array('2147483647', '4294967295')
, 'bigint' => array('9223372036854775807', '18446744073709551615')),'floatTypes' =>
array('decimal', 'float', 'double', 'real', 'numeric'),'stringTypes' =>
array('char', 'varchar', 'tinytext', 'text', 'mediumtext', 'longtext', 'blob', 'tinyblob', 'varblob', 'mediumblob', 'longblob', 'binary'),'bitTypes' =>
array('boolean', 'bit')
);}public function getSimpleLimitQuery($model, $columns = "*", $condition = NULL, $limit = 1, $otherTablesJoin = NULL) {
if (is_string($model))
$model = $model . 'Model';$model = is_object($model) ? $model : new $model ();$selectResource = $model->tableName;$modelPrimary = $model->getCondition();$whereCondition='';if (is_array($modelPrimary) and (sizeof($modelPrimary) > 0)) {
foreach ($modelPrimary as $keyPrimary=>$primary) { 
if ($primary != '') {
$whereCondition .=' AND '.$keyPrimary.'='.$primary;unset($model->$keyPrimary); //remove it from normal data to condition data
}}}$otherTablesJoin = is_array($otherTablesJoin) ? ',' . implode(',', $otherTablesJoin) : NULL;$condition = isset($condition) ? $condition : '';$qry = 'SELECT ' . $columns . ' FROM ' . $selectResource . ' ' . $otherTablesJoin . ' WHERE 1=1 ' . $condition.$whereCondition . " LIMIT " . $limit;return $qry;}public function limitSql($model, $columns, $selectResource, $limit, $condition, $otherTablesJoin) {
$model = is_string($model) ? $model . 'Model' : $model;$model = is_object($model) ? $model : new $model ();$modelName = (is_object($model)) ? get_class($model) : $model;eval('$sort = ' . $modelName . '::$sortColumns;');eval('$sortType = ' . $modelName . '::$sortType;');;$primary = $model->primaryKeys;$condition = $conditionInternal = isset($condition) ? $condition : $this->db->getCondition($model, $debugString);$qry = 'SELECT ' . $columns . ' FROM ' . $selectResource . ' ' . $otherTablesJoin . ' WHERE 1=1 ' . $condition . ' ORDER BY ' . $sort . ' ' . $sortType . " LIMIT " . $limit [0] . ", " . $limit [1];return $qry;}public function getColumnType($table, $column) {
$sql = 'SELECT DISTINCT COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE ,COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS ' .
'WHERE TABLE_NAME = :table AND COLUMN_NAME = :column';$st = $this->db->pdoResource->prepare($sql);$st->execute(array(':table' => $table, ':column' => $column));$row = $st->fetch(PDO::FETCH_NUM);//name
$columnInfo['name'] = $row[0];//type
//$parts = preg_split('/\s*\(/', trim($row[1]));//type
$columnInfo['type'] = strtolower(trim($row[1]));$columnInfo['length'] = $row[2];$columnInfo['null'] = ($row[3] == 'NO') ? false : true;if (strstr($row[4], 'unsigned')) {
$columnInfo['unsigned'] = true;}return $columnInfo;}public function checkTheColumnValueAccordingToDB($column, $value) {
$candidateValue = NULL;switch ($column['type']) {
case in_array($column['type'], array_keys($this->_mysqlTypes['integerTypes'])): {
if (!$GLOBALS ['registry']->validate->isInteger($value)) {
//casting
$candidateValue = (int) $value;$msg = ' value of ' . $columnInfo['name'] . ' must be int , candidate Value -> ' . $candidateValue;}if ($columnInfo['unsigned'])
$maxLength = $this->_mysqlTypes['integerTypes'][$column['type']][1];else
$maxLength = $this->_mysqlTypes['integerTypes'][$column['type']][0];if ($value >= $maxLength) {
//casting
$candidateValue = (int) $value;$msg = ' value of ' . $columnInfo['name'] . ' is bigger than noraml value type , candidate Value -> ' . $candidateValue;}} break;case in_array($column['type'], $this->_mysqlTypes['stringTypes']): {
if (!is_string($value)) {
//casting
$candidateValue = (string) $value;$msg = ' value of ' . $columnInfo['name'] . ' must be string , candidate Value -> ' . $candidateValue;}if (!$GLOBALS ['registry']->validate->maxChar($column['length'] + 1, $value)) {
$candidateValue = substr($value, 0, $column['length']);$msg = ' Wrong in Length of ' . $columnInfo['name'] . ', candidate Value -> ' . $candidateValue;}if (!$column['null'] and !$GLOBALS ['registry']->validate->notEmpty($value)) {
$candidateValue = '';$msg = ' value of ' . $columnInfo['name'] . ' Can\'t be null , candidate Value -> ' . $candidateValue;}} break;case in_array($column['type'], $this->_mysqlTypes['floatTypes']): {
if (!$GLOBALS ['registry']->validate->isFloat($value)) {
//casting
$candidateValue = (float) $value;$msg = ' value of ' . $columnInfo['name'] . ' must be float , candidate Value -> ' . $candidateValue;}if (!$column['null'] and !$GLOBALS ['registry']->validate->notEmpty($value)) {
$candidateValue = 0;$msg = ' value of ' . $columnInfo['name'] . ' Can\'t be null , candidate Value -> ' . $candidateValue;}} break;case 'datetime': {
if (strtotime($value) <= strtotime('01/01/1970')) {
$candidateValue = date('Y-m-d H:i:s', time());$msg = ' value of ' . $columnInfo['name'] . ' must be date time , candidate Value -> ' . $candidateValue;}} break;case 'date': {
if (strtotime($value) <= strtotime('01/01/1970')) {
$candidateValue = date('Y-m-d ', time());$msg = ' value of ' . $columnInfo['name'] . ' must be date , candidate Value -> ' . $candidateValue;}} break;case 'timestamp': {
if ((int) $value <= strtotime('01/01/1970')) {
$candidateValue = time();$msg = ' value of ' . $columnInfo['name'] . ' must be timeStamp , candidate Value -> ' . $candidateValue;}} break;case in_array($column['type'], $this->_mysqlTypes['bitTypes']): {
if (!$GLOBALS ['registry']->validate->isDigit($value) or strlen($value) > 1) {
//casting
$candidateValue = (bool) $value;$msg = ' value of ' . $columnInfo['name'] . ' must be bit , candidate Value -> ' . $candidateValue;}if (!$GLOBALS ['registry']->validate->lessThan($column['length'] + 1, $value)) {
$candidateValue = $column['length'];$msg = ' Wrong in Length of ' . $columnInfo['name'] . ', candidate Value -> ' . $candidateValue;}if (!$column['null'] and !$GLOBALS ['registry']->notEmpty($value)) {
$candidateValue = $column['length'];$msg = ' value of ' . $columnInfo['name'] . ' Can\'t be null , candidate Value -> ' . $candidateValue;}} break;}if ($candidateValue != NULL) {
$return['candidate'] = $candidateValue;$return['conflict'] = true;$return['realValue'] = $value;$return['msg'] = $msg;} else {
$return['conflict'] = false;$return['realValue'] = $value;}return $return;}public function validateColumn($table, $column, $value) {
$columnDB = $this->getColumnType($table, $column);$result = $this->checkTheColumnValueAccordingToDB($columnDB, $value);return $result;}public function getConnectionString() {
return $this->connectionString;}public function getInsertedOutputID($stmt) {
try {
return $this->db->pdoResource->lastInsertId ();} catch (Exception $e) {
return false;}}public function setOutPutID($model, $query) {
return $query;}}//namespace Tidy\DB;
interface sqlDriversInterface {
public function limitSql($model, $columns, $selectResource, $limit, $condition, $otherTablesJoin);public function validateColumn($table, $column, $value);public function getConnectionString();public function setOutPutID($model, $query);public function getInsertedOutputID($stmt);}//namespace Tidy\DB;
class sqlsrv implements sqlDriversInterface {
public $db;private $connectionString = '';public function __construct($db) {
$this->db = $db;$this->connectionString = "sqlsrv:server=%s;Database=%s;%s";}public function getSimpleLimitQuery($model, $columns = "*", $condition = NULL, $limit = 1, $otherTablesJoin = NULL) {
if (is_string($model))
$model = $model . 'Model';$model = is_object($model) ? $model : new $model ();$selectResource = $model->tableName;$otherTablesJoin = is_array($otherTablesJoin) ? ',' . implode(',', $otherTablesJoin) : NULL;$qry = "SELECT TOP $limit $columns FROM $selectResource $otherTablesJoin WHERE 1=1 ";$condition = isset($condition) ? $condition : '';$qry .= $condition;return $qry;}public function limitSql($model, $columns, $selectResource, $limit, $condition = NULL, $sortQuery = '' , $otherTablesJoin = NULL) {
$model = is_string($model) ? $model . 'Model' : $model;$model = is_object($model) ? $model : new $model ();$modelName = (is_object($model)) ? get_class($model) : $model;eval('$sort =' . $modelName . '::$sortColumns;');$primary = $model->primaryKeys;$condition = $conditionInternal = isset($condition) ? $condition : $this->db->getCondition($model, $debugString);$otherTablesJoin = is_array($otherTablesJoin) ? implode(',', $otherTablesJoin) : '';if($sortQuery == ''){
$sort = is_array($sort) ? implode(',', $sort) : $sort;if (is_array($primary)) {
$selectPrimary = implode(',', $primary);if (!in_array($sort, $primary))
$selectPrimary .= ',' . $sort;$newfunc = create_function('$a', 'return "CONVERT(NVARCHAR(MAX),$a,1)";');$primary = '(' . implode('+', array_map($newfunc, $primary)) . ')';} else
$selectPrimary = $primary;if ($sort != NULL) {
eval('$sortType =' . $modelName . '::$sortType;');}else{
$sort = $primary;$sortType = 'desc';}$sortQuery .= " ORDER BY $sort $sortType";}$qry = 'SELECT * FROM (SELECT ROW_NUMBER() OVER ('.$sortQuery.') AS Row, ' . $columns . ' FROM ' . $selectResource . ' ' . $otherTablesJoin . ' WHERE 1=1 ' . $condition . ') AS LIMIT_TABLE ';$qry.= 'WHERE Row BETWEEN '.$limit [0].' AND '.$limit [1].'';return $qry;}public function validateColumn($table, $column, $value) {
}public function getConnectionString() {
return $this->connectionString;}public function setOutPutID($model, $query) {
if (!is_array($model->primaryKeys) && $model->primaryKeys != '') {
$query.=' OUTPUT INSERTED.' . $model->primaryKeys . ' ';}return $query;}public function getInsertedOutputID($stmt) {
try {
$outPutParams = $stmt->fetch(PDO::FETCH_NUM);if (is_array($outPutParams) && sizeof($outPutParams) > 0) {
return $outPutParams[0];}} catch (Exception $e) {
return false;}}}class apiAuth {
public $allow = array();public $actionsPermissions = array();public $redirectAction = array();public $tokenVerifyArray = array();public $tenantVerifyURL = array();public $tokenVerifyInfoArray = array();public function __construct($allow = array(), $redirectAction = array(), $tokenVerifyArray = array(), $tokenVerifyInfoArray = array()) {
$this->allow = $allow;$this->redirectAction = $redirectAction;$this->tokenVerifyArray = $tokenVerifyArray;$this->tokenVerifyInfoArray = $tokenVerifyInfoArray;}public function verifyAccess($actionKey, $controller, $action) {
if (!($this->tokenVerifyArray['controller'] == $controller && $this->tokenVerifyArray['action'] == $action)) {
$tokenStatus = 0;$tokenVerifyArray = $this->tokenVerifyInfoArray;$token = $this->_getToken();if ($token != '') {
$cashResponse = $GLOBALS['registry']->cache->load($this->_getCasheTitle($token));if ($cashResponse == false || $cashResponse['cashTime'] < time()) {
if ($GLOBALS ['registry']->apiAuth->tokenVerifyInfoArray['verfiyTokenMethod'] != null) {
$userResponse = call_user_func($GLOBALS ['registry']->apiAuth->tokenVerifyInfoArray['verfiyTokenMethod'], $token);} else {
//$GLOBALS ['registry']->logger->LogInfo('Without Session');
$GLOBALS ['registry']->restRequest->setVerb('GET');$GLOBALS ['registry']->restRequest->setUrl(getURL($this->tokenVerifyArray));$GLOBALS ['registry']->restRequest->setCustomeCurlParams($tokenVerifyArray['curlRequestParams']);$GLOBALS ['registry']->restRequest->setAsync(false);$GLOBALS ['registry']->restRequest->execute();$userResponse = $GLOBALS ['registry']->request->decodeRequestData($GLOBALS ['registry']->restRequest->getResponseBody());}//$GLOBALS ['registry']->logger->LogInfo(getURL($this->tokenVerifyArray).$GLOBALS ['registry']->restRequest->getResponseBody());
$GLOBALS ['registry']->restRequest->flush();//check token
$checkStatus = $this->_checkToken($userResponse);if ($tokenVerifyArray['enableTenant']) {//check tenant
$checkStatus = $this->_checkTenant($userResponse) && $checkStatus;}$GLOBALS['registry']->userInfo = $this->_setUserInfoArrayFromResponse($userResponse);if ($checkStatus) {
$cashResponse['response'] = $userResponse;$cashResponse['cashTime'] = $userResponse['ttl'] + time();$GLOBALS['registry']->cache->save($cashResponse, $this->_getCasheTitle($token));}//user default lang
if ($GLOBALS['registry']->userInfo[$tokenVerifyArray['userClientConfig']] != NULL &&
is_array($GLOBALS['registry']->userInfo[$tokenVerifyArray['userClientConfig']]) &&
array_key_exists('currentLang', $GLOBALS['registry']->userInfo[$tokenVerifyArray['userClientConfig']])) {
App::setDefaultLanguage($GLOBALS['registry']->userInfo[$tokenVerifyArray['userClientConfig']]['currentLang']);}} else {
$GLOBALS['registry']->userInfo = $this->_setUserInfoArrayFromResponse($cashResponse['response']);}if (!in_array($GLOBALS['registry']->userInfo[$tokenVerifyArray['userLevelDataKey']], $tokenVerifyArray['allowedLevels']))
$this->verifyUserActionPermission(
$actionKey, $GLOBALS['registry']->userInfo[$tokenVerifyArray['userPermissionDataKey']], $GLOBALS['registry']->userInfo[$tokenVerifyArray['userLevelDataKey']]);}elseif ($token == '' && !($this->tenantVerifyURL['controller'] == $controller && $this->tenantVerifyURL['action'] == $action)) {
$tokenStatus = TOKEN_NOT_FOUND;$GLOBALS ['registry']->msg->setMsg($tokenVerifyArray['tokenStatusValues'][$tokenStatus]['message'], ERROR_MSG);$this->_responseNotAcceptRequest($tokenStatus);}}}private function _getToken() {
return $GLOBALS ['registry']->request->getGet($this->tokenVerifyInfoArray['tokenClientName']);}private function _getCasheTitle($token = '') {
return md5('userResponse' . (($GLOBALS ['registry']->tenantName != NULL) ? $GLOBALS ['registry']->tenantName : '') . $token);}public function verifyTenant($controller, $action) {
$tokenVerifyArray = $this->tokenVerifyInfoArray;$token = $this->_getToken();$cashResponse = $GLOBALS['registry']->cache->load($this->_getCasheTitle($token));if ($tokenVerifyArray['enableTenant'] &&
!($this->tenantVerifyURL['controller'] == $controller && $this->tenantVerifyURL['action'] == $action)) {
if ($cashResponse == false) {
if ($GLOBALS ['registry']->apiAuth->tokenVerifyInfoArray['verfiyTenantMethod'] != null) {
$userResponse = call_user_func($GLOBALS ['registry']->apiAuth->tokenVerifyInfoArray['verfiyTenantMethod']);} else {
//$GLOBALS ['registry']->logger->LogInfo('Tenant Without Session');
$GLOBALS ['registry']->restRequest->setVerb('GET');$GLOBALS ['registry']->restRequest->setUrl(getURL($this->tenantVerifyURL));$GLOBALS ['registry']->restRequest->setCustomeCurlParams($tokenVerifyArray['curlRequestParams']);$GLOBALS ['registry']->restRequest->setAsync(false);$GLOBALS ['registry']->restRequest->execute();$userResponse = $GLOBALS ['registry']->request->decodeRequestData($GLOBALS ['registry']->restRequest->getResponseBody());//$GLOBALS ['registry']->logger->LogInfo(getURL($this->tenantVerifyURL) . $GLOBALS ['registry']->restRequest->getResponseBody());
}} else
$userResponse = $cashResponse['response'];$this->_checkTenant($userResponse);$this->_appendTenantInfoToUserInfoArray($userResponse);}}private function _setUserInfoArrayFromResponse($userResponse) {
$GLOBALS['registry']->userInfo = $userResponse[$this->tokenVerifyInfoArray['userInfoData']];if ($this->tokenVerifyInfoArray['enableTenant']) {
$GLOBALS['registry']->userInfo = $this->_appendTenantInfoToUserInfoArray($userResponse);}return $GLOBALS['registry']->userInfo;}private function _appendTenantInfoToUserInfoArray($tenantInfo) {
$tenantResponseArray = array();$tenantResponseArray['tenant'] = $tenantInfo['tenant'];$tenantResponseArray['federation'] = $tenantInfo['federation'];$tenantResponseArray['shard'] = $tenantInfo['dbName'];$tenantResponseArray[$this->tokenVerifyInfoArray['tenantTagParam']] = $tenantInfo[$this->tokenVerifyInfoArray['tenantTagParam']];$GLOBALS['registry']->userInfo = array_merge($GLOBALS['registry']->userInfo, $tenantResponseArray);return $GLOBALS['registry']->userInfo;}private function _checkTenant($userResponse) {
$tokenVerifyArray = $this->tokenVerifyInfoArray;$status = true;$tenantStatus = $userResponse[$tokenVerifyArray['tenantClientStatusName']];$tenantTagName = @strtolower($userResponse[$tokenVerifyArray['tenantTagParam']]);$tenantGetTag = @strtolower($GLOBALS ['registry']->request->getGet($tokenVerifyArray['tenantClientParam']));//check if the user info already set
if (is_array($GLOBALS['registry']->userInfo) && sizeof($GLOBALS['registry']->userInfo) > 0) {
$tenantStatus = $this->acceptUserNameToTenantTag($GLOBALS['registry']->userInfo['User_Name'], $tenantGetTag, $tenantStatus);}//check if the tenant status is active 
if ($tenantStatus != TENANT_ACTIVE) {
$GLOBALS ['registry']->msg->setMsg($tokenVerifyArray['tenantStatusValues'][$tenantStatus]['message'], ERROR_MSG);$status = false;$this->_responseNotAcceptRequest('', $tenantStatus);}return $status;}public function acceptUserNameToTenantTag($userName, $tenantGetTag, $tenantStatus) {
//get the tenant tag from user name to check relation with current tenant 
$tenantSplit = @explode('@', $userName);$tenantTagName = @strtolower($tenantSplit[1]);//the username relate to the current tenant 
return (@strtolower($tenantGetTag) != $tenantTagName) ? TENANT_WRONG_USER : $tenantStatus;}private function _checkToken($userResponse) {
$tokenVerifyArray = $this->tokenVerifyInfoArray;$status = true;$tokenStatus = $userResponse[$tokenVerifyArray['tokenClientStatusName']];if ($tokenStatus != TOKEN_ACTIVE) {
$GLOBALS ['registry']->msg->setMsg($tokenVerifyArray['tokenStatusValues'][$tokenStatus]['message'], ERROR_MSG);$status = false;$this->_responseNotAcceptRequest($tokenStatus);}return $status;}public function verifyUserActionPermission($actionKey, $userPermission, $level) {
$tokenVerifyArray = $this->tokenVerifyInfoArray;$error = false;//level is allowed for this permission
if (@in_array($level, $GLOBALS ['registry']->apiAuth->actionsPermissions[$actionKey]['allowedLevels']))
return;if (array_key_exists($actionKey, $GLOBALS ['registry']->apiAuth->actionsPermissions)) {
//$GLOBALS ['registry']->authSetting->actionsPermissions[$actionKey]
if (is_array($userPermission)) {
if (sizeof(array_intersect($userPermission, $GLOBALS ['registry']->apiAuth->actionsPermissions[$actionKey])) < 1) {
//there is no permission
$error = true;$tokenStatus = TOKEN_NO_PERMISSION;$GLOBALS ['registry']->msg->setMsg($tokenVerifyArray['actionPermissionNotAuthorized']['message'], ERROR_MSG);}} else {
$error = true;$tokenStatus = TOKEN_NO_PERMISSION;$GLOBALS ['registry']->msg->setMsg($tokenVerifyArray['actionPermissionNotAuthorized']['message'], ERROR_MSG);}} else {
$error = true;$tokenStatus = TOKEN_NO_PERMISSION;$GLOBALS ['registry']->msg->setMsg($tokenVerifyArray['actionPermissionNotFound']['message'], ERROR_MSG);}if ($error) {//response if error
$this->_responseNotAcceptRequest($tokenStatus);}}private function _responseNotAcceptRequest($tokenStatus = '', $tenantStatus = '') {
$tokenVerifyArray = $this->tokenVerifyInfoArray;$GLOBALS['registry']->cache->save(false, $this->_getCasheTitle());$msgs = $GLOBALS ['registry']->msg->getAllMessages();$GLOBALS ['registry']->response->sendResponse(\Http::HTTP_OK, array(
'messages' => $msgs,$tokenVerifyArray['tenantClientStatusName'] => $tenantStatus,$tokenVerifyArray['tokenClientStatusName'] => $tokenStatus
));return;}}class ApiOauthServer extends ApiOauth {
private $timeStampThreshold = 300; //5 min
private function checkTimeStamp($timestamp) {
if (!$timestamp)
return false;$now = time();if (abs($now - $timestamp) > $this->timeStampThreshold) {
//$GLOBALS ['registry']->response->sendResponse(Http::HTTP_BAD_REQUEST);
//return false;
throw new TidyException(
"Expired timestamp, yours $timestamp, ours $now"
);} else
return true;}public function checkSignature($signature, $timeStamp) {
if ($signature == parent::generateSignature($this->_userName, $this->_password, $this->_key) && $this->checkTimeStamp($timeStamp)) {
//Secure
return true;} else
return false;}}class ApiOauth {
protected $_key;protected $_userName;protected $_password;private $_hashAlgorithm;function __construct($hashAlgorithm, $key, $userName, $password) {
$this->setKey($key);$this->setUserName($userName);$this->setPassword($password);$this->_hashAlgorithm = $hashAlgorithm;}public function getKey() {
return $this->_key;}public function getUserName() {
return $this->_userName;}public function getPassword() {
return $this->_password;}public function setKey($key) {
$this->_key = $key;}public function setUserName($useName) {
$this->_userName = $useName;}public function setPassword($password) {
$this->_password = $password;}public function generateSignature() {
return hash_hmac($this->_hashAlgorithm, 'user:' . $this->_userName . '&pass=' . $this->_password, $this->_key);}}class RouterApi extends Router {
private $_isRestfull = false;private $_resfullFuncName = '';public function __construct($restFull = false) {
$this->_isRestfull = $restFull;}private function _getDataAccordingToRequestType() {
$preProcessArray = array();switch ($GLOBALS ['registry']->request->requestMethod) {
case "GET" :$this->_resfullFuncName = 'get' . ucfirst($this->_mainActionFuncName);break;case "POST" :$this->_resfullFuncName = 'post' . ucfirst($this->_mainActionFuncName);$preProcessArray = $GLOBALS ['registry']->request->decodeRequestData(file_get_contents('php://input'));
if (is_array($preProcessArray)) {
array_walk($preProcessArray, array(
$GLOBALS ['registry']->cleaner,'fixJsonDecodeValues'
));}break;case "PUT" :$this->_resfullFuncName = 'put' . ucfirst($this->_mainActionFuncName);$preProcessArray = $GLOBALS ['registry']->request->decodeRequestData(file_get_contents('php://input'));
if (is_array($preProcessArray)) {
array_walk($preProcessArray, array(
$GLOBALS ['registry']->cleaner,'fixJsonDecodeValues'
));}$GLOBALS ['registry']->data = $preProcessArray;break;case "DELETE" :$this->_resfullFuncName = 'delete' . ucfirst($this->_mainActionFuncName);break;default :break;}return $preProcessArray;}public function loader() {
$this->loaderCommon();$beforeAction = 'before' . ucfirst($this->_mainActionFuncName);$GLOBALS ['registry']->data = $this->_getDataAccordingToRequestType();$verifiedTenant = false;if ($this->_controllerObject->enableAPIOauth) {
$actionKey = $this->controller . ':' . $this->action;if (!in_array($actionKey, $this->_controllerObject->apiAuth->allow)) {
$this->_controllerObject->apiAuth->verifyAccess($actionKey, $this->controller, $this->action);$verifiedTenant = true;
unset($actionKey);}}if (!$verifiedTenant) {
$GLOBALS ['registry']->apiAuth->verifyTenant($this->controller, $this->action); //check teant any way and if its enabled get the info   
$verifiedTenant = false;}//remove token from get args
@$GLOBALS ['registry']->request->deleteGet($this->_controllerObject->apiAuth->tokenVerifyInfoArray['tokenClientName']);if (key_exists($this->_controllerObject->apiAuth->tokenVerifyInfoArray['tokenClientName'], $this->_args))
unset($this->_args[$this->_controllerObject->apiAuth->tokenVerifyInfoArray['tokenClientName']]);if (is_callable(array($this->_controllerObject, 'beforeLoad')))
$this->_controllerObject->beforeLoad();if (is_callable(array($this->_controllerObject, $beforeAction)))
$this->_controllerObject->$beforeAction();if (is_array($this->_controllerObject->validateActions))
if (in_array($this->_mainActionFuncName, $this->_controllerObject->validateActions) || in_array(lcfirst($this->_mainActionFuncName), $this->_controllerObject->validateActions)) {
$GLOBALS ['registry']->validate->setValdationArray($this->_controllerObject->validateRules);$validationData = (sizeof($this->_controllerObject->validateData) > 0) ? $this->_controllerObject->validateData : $GLOBALS ['registry']->data;if (sizeof($validationData) > 0) {
$validation = $GLOBALS ['registry']->validate->serverValidate($validationData);$this->_controllerObject->validate = (is_array($validation) and !empty($validation)) ? false : true;}}$this->_mainActionFuncName = lcfirst($this->_mainActionFuncName);if ($this->_isRestfull)
call_user_func_array(array($this->_controllerObject, $this->_resfullFuncName), $this->_args);elseIf (is_callable(array($this->_controllerObject, $this->_mainActionFuncName)))
call_user_func_array(array($this->_controllerObject, $this->_mainActionFuncName), $this->_args);else
$GLOBALS ['registry']->response->sendResponse(Http::HTTP_BAD_REQUEST);}}//namespace Tidy;
class AuthSetting {
public $loginOption = array(); //autoLogin,maxLoginTime,sessionLength,loginRestTime,maxLoginAttempts 
public $cookieOptions = array(); //name,path,domain,secure
public $pageID;public $currentTime;public $userID;public $userIP;public $enableAuth = false;public $userObject;public $loginAction = array();public $redirectAction = array();public $allow = array();public function __construct($loginOption, $cookieOptions, $pageID, $userID, $userIP) {
$this->currentTime = time();$this->loginOption = $loginOption;$this->cookieOptions = $cookieOptions;$this->pageID = $pageID;$this->userIP = $userIP;$this->userID = $userID;}}//whither the user is true or not
class Authentication {
public $errorMsgKeys = array();private $sessionData;private $sessionID;private $authSetting;public $sessionUser;public $loginStatus;public $lastVisit;public function __construct(authSetting $authSetting) {
$this->sessionUser = new Model ();$this->authSetting = $authSetting;}public function errorHandle($msgKey) {
$this->errorMsgKeys [] = $msgKey;//$this->resetSessionKeys();
$this->endSession();}public function sessionUserBegin() {
$this->storgeCheck(); //get info from storge if avaliable
$this->authSetting->userID = ($this->authSetting->userID != ANONYMOUS) ? $this->authSetting->userID : $this->authSetting->userObject->User_ID;if (isset($this->authSetting->loginOption ['autoLogin']) && !$this->authSetting->loginOption ['autoLogin']) { //check auto login option
$this->sessionData ['autologinID'] = false;}$user = array();if ($this->authSetting->userID != ANONYMOUS) {
if (isset($this->sessionData ['autologinID']) && (string) $this->sessionData ['autologinID'] != '' && $this->authSetting->userID) {
$this->authSetting->userObject = $GLOBALS ['registry']->db->getRecord('users', 'u.*', USERS_TABLE . ' u,' . SESSIONS_KEYS_TABLE . ' k', 'AND u.User_Status = ' . ACTIVE_STATUS . ' AND k.User_ID = u.User_ID AND k.key_ID = \'' . md5($this->sessionData ['autologinID']) . '\'');
$this->loginStatus = LOGIN_AUTO_STATUS;} else {
$this->sessionData ['autologinID'] = '';$this->sessionData ['userID'] = $this->authSetting->userID;if (!is_object($this->authSetting->userObject))
$this->authSetting->userObject = $GLOBALS ['registry']->db->getRecord('users', 'u.*', USERS_TABLE . ' u', ' AND u.User_Status = ' . ACTIVE_STATUS . ' AND u.User_ID = ' . $this->authSetting->userID);$this->loginStatus = LOGIN_AUTO_CREATE_STATUS;}}if (!is_object($this->authSetting->userObject)) { //unknown user from storge
$this->sessionData ['autologinID'] = '';$this->sessionData ['userID'] = $this->authSetting->userID = ANONYMOUS;$this->loginStatus = LOGIN_WRONG_STATUS;//$userObject = $GLOBALS['registry']->db->getRecord ( 'users', 'u.*', USERS_TABLE . ' u', 'AND u.User_ID = ' . $this->authSetting->userID);
$this->errorHandle(ERR_NO_EXISTS_USER_LOGIN_KEY);}//save in the session table
if ($this->sessionID != null)
$sessionsModel = $GLOBALS ['registry']->db->getRecord('sessions', SESSIONS_TABLE . '.Session_ID', SESSIONS_TABLE, ' AND Session_ID=\'' . $this->sessionID . '\'');//AND Session_IP =\''. $this->authSetting->userIP.'\'
if (is_object($sessionsModel)) {
$sessionsModel->User_ID = $this->authSetting->userID;$sessionsModel->Session_Start = $this->authSetting->currentTime;$sessionsModel->Session_Time = $this->authSetting->currentTime;$sessionsModel->Session_Page = $this->authSetting->pageID;$sessionsModel->Session_Logged_In = $this->loginStatus;$sessionsModel->Session_Admin = $this->authSetting->loginOption ['admin'];$sessionsModel->setCondition(array('Session_ID' => $this->sessionID, 'Session_IP' => $this->authSetting->userIP));$GLOBALS ['registry']->db->editStmtPrep($sessionsModel, true);} else {
$sessionsModel = new sessionsModel ();$sessionsModel->User_ID = $this->authSetting->userID;$sessionsModel->Session_Start = $this->authSetting->currentTime;$sessionsModel->Session_Time = $this->authSetting->currentTime;$sessionsModel->Session_Page = $this->authSetting->pageID;$sessionsModel->Session_Logged_In = $this->loginStatus;$sessionsModel->Session_IP = $this->authSetting->userIP;$sessionsModel->Session_Admin = $this->authSetting->loginOption ['admin'];$this->sessionID = $sessionsModel->Session_ID = md5($GLOBALS ['registry']->session->getId());$GLOBALS ['registry']->db->addStmtPrep($sessionsModel, true);}if ($this->authSetting->userID != ANONYMOUS) {
$this->lastVisit = ($userObject->User_Session_Time > 0) ? $userObject->User_Session_Time : $this->authSetting->currentTime;if (!$this->authSetting->loginOption ['admin']) {
$usersModel = new usersModel ();$usersModel->User_Session_Time = $this->authSetting->currentTime;$usersModel->User_Session_Page = $this->authSetting->pageID;$usersModel->User_LastVisit = $this->lastVisit;$usersModel->setCondition(array('User_ID' => $this->authSetting->userID));if (!$GLOBALS ['registry']->db->editStmtPrep($usersModel, true) > 0) {
$this->errorHandle(ERR_UPDATE_VISIT_TIME_LOGIN_KEY);}}$usersModel->User_LastVisit = $this->lastVisit;if ($this->authSetting->loginOption ['autoLogin']) {
$autologinID = uniqid();//exists auto login key
if (isset($this->sessionData ['autologinID']) && (string) $this->sessionData ['autologinID'] != '') {
$sql = 'UPDATE ' . SESSIONS_KEYS_TABLE . ' SET ' . SESSIONS_KEYS_TABLE . ' .Key_Last_Login=' . $this->authSetting->currentTime . ',' . SESSIONS_KEYS_TABLE . ' .Key_ID=\'' . md5($autologinID) . '\' WHERE ' . SESSIONS_KEYS_TABLE . ' .Key_ID = \'' . md5($this->sessionData ['autologinID']) . '\'';if (!$GLOBALS ['registry']->db->query($sql)) {
$this->errorHandle(ERR_UPDATE_SESSION_KEY_LOGIN_KEY);}} else {
//create auto login key
$sessionsKeyModel = new sessionsKeyModel ();$sessionsKeyModel->Key_Last_Login = $this->authSetting->currentTime;$sessionsKeyModel->Key_Last_IP = $this->authSetting->userIP;$sessionsKeyModel->User_ID = $this->authSetting->userID;$sessionsKeyModel->Key_ID = md5($autologinID); //still
//die(var_dump($sessionsKeyModel));
if (!$GLOBALS ['registry']->db->addStmtPrep($sessionsKeyModel, true) > 0) {
$this->errorHandle(ERR_UPDATE_SESSION_KEY_LOGIN_KEY);}}$this->sessionData ['autologinID'] = $autologinID;} else {
$this->sessionData ['autologinID'] = '';}//$sessiondata['autologinID'] = (!$admin) ? (( $enable_autologin && $sessionmethod == SESSION_METHOD_COOKIE ) ? $auto_login_key : '') : $sessiondata['autologinID'];
$this->sessionData ['userID'] = $this->authSetting->userID;}//set the global object
$this->setSessionUser();//save the session
$this->saveSession();//get the global object
return $this->sessionUser;}public function sessionPageStart($pageID, $currentIP) {
$this->storgeCheck();$this->authSetting->pageID = $pageID;if ($this->sessionID != null) {
//$GLOBALS['registry']->db->setDebug(DEBUG_FULL_MODE);
$this->authSetting->userObject = $GLOBALS ['registry']->db->getRecord('users', 'u.*', USERS_TABLE . ' u,' . SESSIONS_TABLE . ' s', 'AND u.User_Status = ' . ACTIVE_STATUS . ' AND s.User_ID = u.User_ID AND s.Session_ID = \'' . $this->sessionID . '\'');if (!is_object($this->authSetting->userObject)) {
$this->errorHandle(ERR_NO_EXISTS_USER_LOGIN_KEY);} else {
$sessionIPCheck = substr($this->sessionUser->sessionIP, 0, 6);$currentIPCheck = substr($currentIP, 0, 6);if ($sessionIPCheck == $currentIPCheck) { //check if the ip login == ip in the session
//$SID = ($sessionmethod == SESSION_METHOD_GET || defined('IN_ADMIN')) ? $session_id : '';
if ($this->authSetting->currentTime - $userObject->User_Session_Time > 60) {
$sessionsModel = new sessionsModel ();$sessionsModel->Session_Time = $this->authSetting->currentTime;$sessionsModel->Session_Page = $this->authSetting->pageID;$sessionsModel->setCondition(array('Session_ID' => $this->sessionID));//$update_admin = (!defined('IN_ADMIN') && $current_time - $user['session_time'] > ($config['session_length']+60)) ? ', session_admin = 0' : '';
if (!$GLOBALS ['registry']->db->editStmtPrep($sessionsModel, true) > 0) {
$this->errorHandle(ERR_UPDATE_SESSION_LOGIN_KEY);}if ($this->authSetting->userID != ANONYMOUS) {
$usersModel = new usersModel ();$usersModel->User_Session_Time = $this->authSetting->currentTime;$usersModel->User_Session_Page = $this->authSetting->pageID;$usersModel->setCondition(array('user_ID' => $this->authSetting->userID));if (!$GLOBALS ['registry']->db->editStmtPrep($usersModel, true) > 0) {
$this->errorHandle(ERR_UPDATE_USER_LOGIN_KEY);}}$this->cleanSession();$this->saveSession();}if (isset($this->sessionData ['autologinID']) && $this->sessionData ['autologinID'] != '') {
$this->sessionUser->sessionKey = $this->sessionData ['autologinID'];}return $this->sessionUser;}}$this->authSetting->userID = (isset($this->sessionData ['userID'])) ? intval($this->sessionData ['userID']) : ANONYMOUS;if (!($this->sessionUser = $this->sessionUserBegin())) {
$this->errorHandle(ERR_CREATE_USER_SESSION_KEY);}}return $this->sessionUser;}private function storgeCheck() {
if (isset($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_sid']) || isset($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_data'])) {
$this->sessionID = isset($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_sid']) ? $_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_sid'] : '';$this->sessionData = isset($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_data']) ? unserialize(stripslashes($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_data'])) : array();}}private function saveSession() {
setcookie($this->authSetting->cookieOptions ['cookieName'] . '_sid', serialize($this->sessionData), time() + 31536000, $this->authSetting->cookieOptions ['cookiePath'], $this->authSetting->cookieOptions ['domain'], $this->authSetting->cookieOptions ['secure']);setcookie($this->authSetting->cookieOptions ['cookieName'] . '_sid', $this->sessionID, time() + 31536000, $this->authSetting->cookieOptions ['cookiePath'], $this->authSetting->cookieOptions ['domain'], $this->authSetting->cookieOptions ['secure']);}public function removeSession() {
setcookie($this->authSetting->cookieOptions ['cookieName'] . '_data', '', time() - 31536000, $this->authSetting->cookieOptions ['cookiePath'], $this->authSetting->cookieOptions ['domain'], $this->authSetting->cookieOptions ['secure'])
;setcookie($this->authSetting->cookieOptions ['cookieName'] . '_sid', '', time() - 31536000, $this->authSetting->cookieOptions ['cookiePath'], $this->authSetting->cookieOptions ['domain'], $this->authSetting->cookieOptions ['secure'])
;unset($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_data']);unset($_COOKIE [$this->authSetting->cookieOptions ['cookieName'] . '_sid']);}private function setSessionUser() {
$this->sessionUser->sessionID = $this->sessionID;$this->sessionUser->sessionIP = $this->authSetting->userIP;$this->sessionUser->sessionUserID = $this->authSetting->userID;$this->sessionUser->sessionLoggedIn = $this->loginStatus;$this->sessionUser->sessionPage = $this->authSetting->pageID;$this->sessionUser->sessionStart = $this->authSetting->currentTime;$this->sessionUser->sessionTime = $this->authSetting->currentTime;$this->sessionUser->sessionAdmin = $this->authSetting->loginOption ['admin'];$this->sessionUser->sessionKey = $this->sessionData ['autologinID'];$this->sessionUser->userObject = $this->authSetting->userObject;return $this->sessionUser;}private function cleanSession() {
$sql = '
DELETE FROM ' . SESSIONS_TABLE . ' 
WHERE
Session_Time < ' . (time() - (int) $this->authSetting->loginOption ['sessionLength']) . " 
AND Session_ID <> '" . $this->sessionID . "'
";if (!$GLOBALS ['registry']->db->query($sql)) {
$this->errorHandle(ERR_CLEAN_SESSION_LOGIN_KEY);}if (!empty($this->authSetting->loginOption ['maxLoginTime']) && $this->authSetting->loginOption ['maxLoginTime'] > 0) {
$sql = '
DELETE FROM ' . SESSIONS_KEYS_TABLE . '
WHERE
Key_Last_Login < ' . (time() - (86400 * (int) $this->authSetting->loginOption ['maxLoginTime']));$GLOBALS ['registry']->db->query($sql);}return true;}public function endSession() {
if (!preg_match('/^[A-Za-z0-9]*$/', $this->sessionID)) {
return;}$userID = ($this->authSetting->userID != ANONYMOUS) ? $this->authSetting->userID : $this->authSetting->userObject->User_ID;$sqlExeptionSessionTable = 'truncate ' . SESSIONS_TABLE;$sqlExeptionSessionKeyTable = 'truncate ' . SESSIONS_KEYS_TABLE;//var_dump($userID);
if ($userID != NULL) {
$sqlSession = '
DELETE FROM ' . SESSIONS_TABLE . ' 
WHERE 1=1
AND Session_ID = "' . $this->sessionID . '" AND User_ID=' . $userID;if (!$GLOBALS ['registry']->db->query($sqlSession)) {
$this->errorHandle(ERR_REMOVE_SESSION_USER_LOGIN_KEY);}if (isset($this->sessionUser->sessionKey) && $this->sessionUser->sessionKey != '') {
$autoLoginKey = md5($this->sessionUser->sessionKey);$sql = '
DELETE FROM ' . SESSIONS_KEYS_TABLE . '
WHERE 1=1
user_id  = ' . (int) $userID . "
AND Key_ID = '$autoLoginKey'
";if (!$GLOBALS ['registry']->db->query($sql)) {
$this->errorHandle(ERR_REMOVE_SESSION_USER_LOGIN_KEY);}}}$this->removeSession();return true;}public function resetSessionKeys() {
$userID = ($this->authSetting->userID == ANONYMOUS) ? $this->authSetting->userID : $this->authSetting->userObject->User_ID;$whereCondKeyID = (!empty($this->sessionUser->sessionKey)) ? "AND Key_ID != '" . md5($this->sessionUser->sessionKey) . "'" : '';$sql = '
DELETE FROM ' . SESSIONS_KEYS_TABLE . '
WHERE
User_ID = ' . (int) $userID . "
$whereCondKeyID
";if (!$GLOBALS ['registry']->db->query($sql)) {
$this->errorHandle('Error rest key');//die('Error removing auto-login keys');
}$whereCondSessionTable = 'User_ID = ' . (int) $this->authSetting->userID;$whereCondSessionTable .= ($this->authSetting->userID = $this->sessionUser->sessionUserID) ? " AND Session_ID <> '" . $this->sessionUser->sessionID . "'" : '';$sql = '
DELETE FROM ' . SESSIONS_TABLE . "
WHERE
$whereCondSessionTable
";if (!$GLOBALS ['registry']->db->query($sql)) {
$this->errorHandle(ERR_REMOVE_SESSION_USER_LOGIN_KEY);}if (!empty($whereCondKeyID)) {
$autologinID = uniqid(microtime());$sessionsKeyModel = new sessionsKeyModel ();$sessionsKeyModel->Key_Last_IP = $this->authSetting->currentTime;$sessionsKeyModel->Key_ID = md5($autologinID);$sessionsKeyModel->Key_Last_Login = $this->authSetting->currentTime;$sessionsKeyModel->setCondition(array('Key_ID' => md5($this->sessionUser->sessionUserID)));$sql = '
UPDATE ' . SESSIONS_KEYS_TABLE . "
SET
Key_Last_IP = '$user_ip', Key_ID = '" . md5($autologinID) . "', Key_Last_Login = $current_time
WHERE
Key_ID = '" . md5($this->sessionUser->sessionUserID) . "'
";if (!$GLOBALS ['registry']->db->editStmtPrep('users', true) > 0) {
$this->errorHandle(ERR_UPDATE_SESSION_KEY_LOGIN_KEY_MSG);//die('Error updating session key');
}$this->sessionData ['userID'] = $this->authSetting->userID;$this->sessionData ['autologinID'] = $this->sessionUser->sessionKey = $autologinID;$this->saveSession();}}}//wither the user can enter the page or not
class Authrization {
}function showImage($src, $type = PANEL_THUMB_IMAGE, array $imageProp = NULL) {
if ($imageProp != NULL)
foreach ($imageProp as $key => $val)
$propStr .= ' ' . $key . '="' . $val . '" ';switch ($type) {
case PANEL_THUMB_IMAGE :$return = '<img src="' . $src . '" width="16px" height="16px" ' . (($imageProp ['class'] != '') ? '' : 'class="picto"') . ' ' . $propStr . '>';break;case GRID_THUMB_IMAGE :$return = '<img src="' . $src . '" width="50px" height="50px" ' . (($imageProp ['class'] != '') ? '' : 'class="dotted"') . ' ' . $propStr . '>';break;case ARTICLES_PUBS_MAIN_THUMB_IMAGE :$return = '<img src="' . (is_file(ARTICLES_PUBS_MAIN_THUMB_PATH_FILE . $src) ? ARTICLES_PUBS_MAIN_THUMB_PATH . $src : DEFAULT_THUMB) . '" ' . $propStr . '>';break;case POST_THUMB_IMAGE :$return = '<img src="' . (is_file(POST_THUMB_PATH_FILE . $src) ? POST_THUMB_PATH . $src : POST_THUMB_DEFAULT_PATH) . '" ' . $propStr . '>';break;case ARTICLES_THUMB_IMAGE :$return = '<img src="' . (is_file(ARTICLES_THUMB_PATH_FILE . $src) ? ARTICLES_THUMB_PATH . $src : ARTICLES_THUMB_DEFAULT_PATH) . '" ' . $propStr . '>';break;case PUBS_THUMB_IMAGE :$return = '<img src="' . (is_file(PUBS_THUMB_PATH_FILE . $src) ? PUBS_THUMB_PATH . $src : PUBS_THUMB_DEFAULT_PATH) . '" ' . $propStr . '>';break;}return $return;}function generateCSS(array $css, $cash = true, $justLinks = false, $outSource = false, $options = array()) {
if (!empty($css)) {
$propStr = getProperites($options);$controllerName = $GLOBALS ['registry']->controller;$actionName = $GLOBALS ['registry']->action;$cssControllerActionFile = CSS_PATH . $controllerName . DS . $actionName . '.css';if (file_exists($cssControllerActionFile)) { //Auto Load Control action css if found
$cssControllerActionName = 'Controller-' . $controllerName . '-' . $actionName . '-Action' . (isset($langShort) ? '-' . $langShort : '');$css [] = $cssControllerActionName;}$cssControllerActionFileLang = CSS_PATH . $controllerName . DS . ($GLOBALS ['registry']->currentLang) . DS . $actionName . '.css';if (file_exists($cssControllerActionFileLang)) { //Auto Load Control action Lang css if found
$cssControllerActionNameLang = 'Controller-' . $controllerName . '-' . $actionName . '-Action-' . $GLOBALS ['lang']->currentLang;$css [] = $cssControllerActionNameLang;}if ($cash) {
$cssCashString = base64url_encode(implode('|', $css));if ($cssCashString != '')
echo ($justLinks) ? mapFile2URL('css.php') . '?cash=' . $cssCashString : '<link rel="stylesheet" type="text/css" href="' . mapFile2URL('css.php') . '?cash=' . $cssCashString . '" ' . $propStr . ' />';} else {
foreach ($css as $cssFile) {
if (is_array($cssFile))
$cssFile = $cssFile [0] . DS . $cssFile [1] . '.css';elseif (!$outSource)
$cssFile = $cssFile . '.css';if (file_exists(CSS_PATH . $cssFile))
echo ($justLinks) ? mapFile2URL('css' . DS . $cssFile) : '<link rel="stylesheet" type="text/css" href="' . mapFile2URL('css' . DS . $cssFile) . '" ' . $propStr . '/>';elseif ($outSource)
echo ($justLinks) ? $cssFile : '<link rel="stylesheet" type="text/css" href="' . $cssFile . '" ' . $propStr . '/>';}if (!$GLOBALS['noAutomation']) {
if (file_exists($cssControllerActionFile))
echo ($justLinks) ? mapFile2URL(CSS_PATH . $controllerName . DS . $actionName . '.css') : '<link rel="stylesheet" type="text/css" href="' . mapFile2URL(CSS_PATH . $controllerName . DS . $actionName . '.css') . '" ' . $propStr . '/>';if (file_exists($cssControllerActionFileLang))
echo ($justLinks) ? mapFile2URL(CSS_PATH . $controllerName . DS . ($GLOBALS ['registry']->currentLang) . DS . $actionName . '.css') : '<link rel="stylesheet" type="text/css" href="' . mapFile2URL(CSS_PATH . $controllerName . DS . ($GLOBALS ['registry']->currentLang) . DS . $actionName . '.css') . '" ' . $propStr . '/>';}}}}function deployClientFiles($js, $cash = true, $justLinks = false, $type = 'js') {
if ($type == 'js')
$invokeFunctionName = 'generateJS';else
$invokeFunctionName = 'generateCSS';foreach ($js as $key => $element) {
if (is_array($element)) {
$GLOBALS['noAutomation'] = true;call_user_func_array($invokeFunctionName, array(@$element['links'], @$element['cash'], @$element['justLinks'], @$element['outSource'], @$element['options']));} else
$elements[] = $element;}@$elements = (is_array($elements)) ? $elements : array($elements);$GLOBALS['noAutomation'] = false;call_user_func_array($invokeFunctionName, array($elements, $cash, $justLinks));}function generateJS(array $js, $cash = true, $justLinks = false, $outSource = false, $options = array()) {
if (!empty($js)) {
$propStr = getProperites($options);if (!$GLOBALS['noAutomation']) {
$controllerName = $GLOBALS ['registry']->controller;$actionName = $GLOBALS ['registry']->action;$jsControllerActionFile = JS_PATH . $controllerName . DS . $actionName . '.js';if (file_exists($jsControllerActionFile)) { //Auto Load Control action js if found
$jsControllerActionName = 'Controller-' . $controllerName . '-' . $actionName . '-Action';$js [] = $jsControllerActionName;}$jsControllerActionFileLang = JS_PATH . $controllerName . DS . ($GLOBALS ['registry']->currentLang) . DS . $actionName . '.js';if (file_exists($jsControllerActionFileLang)) { //Auto Load Control action js lang if found
$jsControllerActionNameLang = 'Controller-' . $controllerName . '-' . $actionName . '-Action-' . $GLOBALS ['lang']->currentLang;$js [] = $jsControllerActionNameLang;}}if ($cash) {
$jsCashString = base64url_encode(implode('|', $js));if ($jsCashString != '')
echo ($justLinks) ? mapFile2URL('js.php') . '?cash=' . $jsCashString : '<script type="text/javascript" src="' . mapFile2URL('js.php') . '?cash=' . $jsCashString . '" ' . $propStr . '></script>';} else {
foreach ($js as $jsFile) {
if (is_array($jsFile))
$jsFile = $jsFile [0] . DS . $jsFile [1] . '.js';elseif (!$outSource)
$jsFile = $jsFile . '.js';if (file_exists(JS_PATH . $jsFile))
echo ($justLinks) ? mapFile2URL('js' . DS . $jsFile) : '<script type="text/javascript" src="' . mapFile2URL('js' . DS . $jsFile) . '" ' . $propStr . ' ></script>';elseif ($outSource)
echo ($justLinks) ? $jsFile : '<script type="text/javascript" src="' . $jsFile . '" ' . $propStr . '></script>';}if (!$GLOBALS['noAutomation']) {
if (file_exists($jsControllerActionFile))
echo ($justLinks) ? mapFile2URL(JS_PATH . $controllerName . DS . $actionName . '.js') : '<script type="text/javascript" ' . $propStr . ' src="' . mapFile2URL(JS_PATH . $controllerName . DS . $actionName . '.js') . '"></script>';if (file_exists($jsControllerActionFileLang))
echo ($justLinks) ? mapFile2URL(JS_PATH . $controllerName . DS . ($GLOBALS ['registry']->currentLang) . DS . $actionName . '.js') : '<script type="text/javascript" ' . $propStr . ' src="' . mapFile2URL(JS_PATH . $controllerName . DS . ($GLOBALS ['registry']->currentLang) . DS . $actionName . '.js') . '"></script>';}}}}function clientValidation() {
if (is_object($GLOBALS ['registry']->validate))
echo $GLOBALS ['registry']->validate->clientValidate();}function cashFiles($fileType, array $files, $archive = false) {
$aLastModifieds = array();foreach ($files as $sFile) {
if (file_exists($sFile))
$aLastModifieds [] = filemtime("$sFile");}rsort($aLastModifieds);$iETag = (int) $aLastModifieds [0];$sLastModified = gmdate('D, d M Y H:i:s', $iETag) . ' GMT';if ((isset($_SERVER ['HTTP_IF_MODIFIED_SINCE']) && $_SERVER ['HTTP_IF_MODIFIED_SINCE'] == $sLastModified) || (isset($_SERVER ['HTTP_IF_NONE_MATCH']) && $_SERVER ['HTTP_IF_NONE_MATCH'] == $iETag)) {
header($_SERVER ['SERVER_PROTOCOL'] . " 304 Not Modified");//header("filename=\"".$combressPath."\"; ");  
exit();}if ($archive && !is_dir(CASH_ARCHIVE_FOLDER)) {
mkdir(CASH_ARCHIVE_FOLDER);}if ($archive && file_exists(CASH_PATH . DS . "$iETag.cache")) {
$sCode = file_get_contents(CASH_PATH . DS . "$iETag.cache");} else {
$sCode = '';$aLastModifieds = array();foreach ($files as $sFile) {
if (file_exists($sFile)) {
$aLastModifieds [] = filemtime("$sFile");$sCode .= file_get_contents("$sFile");}}rsort($aLastModifieds);if ($archive) {
if ($iETag == $aLastModifieds [0]) {
$oFile = fopen(CASH_PATH . DS . "$iETag.cache", 'w');if (flock($oFile, LOCK_EX)) {
fwrite($oFile, $sCode);flock($oFile, LOCK_UN);}fclose($oFile);} else {
header($_SERVER ['SERVER_PROTOCOL'] . " 404 Not Found");//header("filename=\"".$combressPath."\"; ");  
exit();}}}//var_dump($sCode);
cashContent($sCode, $fileType, $sLastModified, $iETag);}function redirectTo(array $link) {
$url = getURL($link);if (headers_sent()) {
echo "<script type=\"text/javascript\">document.location.href=\"" . $url . "\";</script>\n";} else {
header("Location: " . $url);}exit();}function cashContent($content, $fileType, $lastModified, $iETag) {
$combressContent = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $content);//$combressContent=$content;
//$combressContent = str_replace ( array ("\r", "\n", "\t", ' ', '  ' ), '', $combressContent );
//$sizeOFComabine = strlen ( $combressContent );
//var_dump($combressContent );
header('Expires: ' . gmdate('D, d M Y H:i:s', strtotime('100 days', time())) . ' GMT');
header('Content-Type: ' . $fileType);//header ( 'Content-Length: ' . $sizeOFComabine );
header("Last-Modified: $lastModified");header("ETag: $iETag");header('Cache-Control: max-age=' . CACHE_FILES_LENGTH);echo $combressContent;exit();}function getProperites($prop) {
$propStr = '';if (!empty($prop) and is_array($prop))
foreach ($prop as $key => $val)
$propStr .= ' ' . $key . '="' . $val . '" ';return $propStr;}function formatGetValue($value) {
$value = trim($value);if (is_string($value))
$value = str_replace(' ', '-', $value);return $value;}class RouterMVC extends Router {
public function loader($renderedLayouts = array()) {
$this->loaderCommon();$beforeAction = 'before' . ucfirst($this->_mainActionFuncName);$afterAction = 'after' . ucfirst($this->_mainActionFuncName);$afterActionPageLoad = 'after' . ucfirst($this->_mainActionFuncName) . 'PageLoad';if ($this->_controllerObject->authSetting->enableAuth) {
if (!in_array($this->controller . ':' . $this->action, $this->_controllerObject->authSetting->allow)) {
if ($this->_controllerObject->verifyAccess()) {
if ($GLOBALS ['registry']->request->getCookie('redirectURL') == '' and $this->controller != $this->_controllerObject->authSetting->loginAction ['controller'] and $this->action != $this->_controllerObject->authSetting->loginAction ['action'])
$GLOBALS ['registry']->response->setCookie('redirectURL', $_SERVER ['REQUEST_URI']);redirectTo($this->_controllerObject->authSetting->loginAction);}}}if (is_callable(array(
$this->_controllerObject,'beforeLoad'
)))
$this->_controllerObject->beforeLoad();if (is_callable(array(
$this->_controllerObject,$beforeAction
)))
$this->_controllerObject->$beforeAction();if (is_array($this->_controllerObject->validateActions))
if (in_array($this->action, $this->_controllerObject->validateActions)) {
$GLOBALS ['registry']->request->requestId = md5($this->controller . $this->action);$GLOBALS ['registry']->validate->setValdationArray($this->_controllerObject->validateRules);$GLOBALS ['registry']->validate->writeJsFileValidation();if (sizeof($GLOBALS ['registry']->data) > 0) {
$validation = $GLOBALS ['registry']->validate->serverValidate();if (is_array($validation) and !empty($validation)) {
$GLOBALS ['registry']->msg->flushMessages($validation);$this->_controllerObject->validate = false;} else
$this->_controllerObject->validate = true;}}if (is_callable(array(
$this->_controllerObject,$this->action
)) == false) {
$action = DEFAULT_ACTION;} else {
$action = $this->action;}$this->_controllerObject->view = $this->controller . DS . $action;call_user_func_array(array(
$this->_controllerObject,$action
), $this->_args);if (is_callable(array(
$this->_controllerObject,'afterLoad'
)))
$this->_controllerObject->afterLoad();if (is_callable(array(
$this->_controllerObject,$afterAction
)))
$this->_controllerObject->$afterAction();App::$controller = $this->_controllerObject;$GLOBALS['currentController'] = App::$controller;$GLOBALS['currentModel'] = $GLOBALS['currentController']->model; if(!$this->_controllerObject->rendered){
if (!in_array($this->_controllerObject->layout, $renderedLayouts)){
//check if the request is ajax
if (!empty($_SERVER ['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER ['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
$this->_controllerObject->render($this->_controllerObject->view);}else{
App::import($this->_controllerObject->layout, 'layout');   
}}}if (is_callable(array(
$this->_controllerObject,'afterPageLoad'
)))
$this->_controllerObject->afterPageLoad();if (is_callable(array(
$this->_controllerObject,$afterActionPageLoad
)))
$this->_controllerObject->$afterActionPageLoad();}}//namespace Tidy;
class View {
private $vars = array();function __construct() {
}public function __set($index, $value) {
$this->vars [$index] = $value;}function getViewVariables() {
return $this->vars;}}class Cleaner {
public $stopwords = array(' insert ', ' update ', ' alter ', ' delete ', ' drop '); //you need to extend this big time.
public $symbols = array('/', '\\', '\'', '"', ',', '.', '<', '>', '?', ';', '[', ']', '{', '}', '|', '=', '+', '-', '_', ')', '(', '@', '!', '~', '`'); //this will remove punctuation
public function cleanInput($string) {
if (is_string($string) and $string != '') {
$string = ' ' . strtolower($string) . ' ';//$string = $this->stringStripQuotes ( $string );
$string = $this->removeStopwords($string);$string = $this->removeSymbols($string);return $string;}}public function removeStopwords($string) {
for ($i = 0; $i < sizeof($this->stopwords); $i ++) {
$string = str_replace($this->stopwords [$i], ' ', $string);}//$string = str_replace(' ',' ',$string);
return trim($string);}public function removeSymbols($string) {
for ($i = 0; $i < sizeof($this->symbols); $i ++) {
$string = str_replace($this->symbols [$i], ' ', $string);}return trim($string);}public function stringStripQuotes($string) {
if (get_magic_quotes_gpc())
$string = stripslashes($string);if (!is_numeric($string))
$string = mysql_real_escape_string($string);return $string;}public function stripWordHtml($text, $allowedTags = '<b><i><sup><sub><em><strong><u><br><img><object><param><p>') {
        mb_regex_encoding('UTF-8');
        $search = array('/&lsquo;/u', '/&rsquo;/u', '/&ldquo;/u', '/&rdquo;/u', '/&mdash;/u');
        $replace = array('\'', '\'', '"', '"', '-');
        $text = preg_replace($search, $replace, $text);
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        if (mb_stripos($text, '/*') !== FALSE) {
            $text = mb_eregi_replace('#/\*.*?\*/#s', '', $text, 'm');
        }
        $text = preg_replace(array('/<([0-9]+)/'), array('< $1'), $text);
        $text = strip_tags($text, $allowedTags);
        $text = preg_replace(array('/^\s\s+/', '/\s\s+$/', '/\s\s+/u'), array('', '', ' '), $text);
        $search = array('#<(strong|b)[^>]*>(.*?)</(strong|b)>#isu', '#<(em|i)[^>]*>(.*?)</(em|i)>#isu', '#<u[^>]*>(.*?)</u>#isu');
        $replace = array('<b>$2</b>', '<i>$2</i>', '<u>$1</u>');
        $text = preg_replace($search, $replace, $text);
        $num_matches = preg_match_all("/\<!--/u", $text, $matches);
        if ($num_matches) {
            $text = preg_replace('/\<!--(.)*--\>/isu', '', $text);
        }
        return $text;
    }public function fixJsonDecodeValues(&$value) {
$fixValue = '';if (is_string($value)) {
if (strstr($value, '_')) {
$fixValue = str_replace('_', '.', $value);if (preg_match('/^-?(?:\d+|\d*\.\d+)$/', $fixValue)) {
$value = $fixValue;}}}}public function isJson($string) {
return !empty($string) && is_string($string) && preg_match('/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/', $string);}}