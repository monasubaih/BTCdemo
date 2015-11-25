<?php

function get_file_extension($file_name) {
    return substr(strrchr($file_name, '.'), 1);
}

function cutwords($words, $len) {
    $x = strtok($words, " ");
    for ($i = 0; $i < $len; $i ++)
        $x = $x . " " . strtok(" ");
    return $x;
}

function uploadFile($path, $files, $typefile = NULL) {
    $name = $files ['name'];
    $tmp = $files ['tmp_name'];
    $splits = explode('.', $name);
    $type = strtolower($splits [sizeof($splits) - 1]);
    if ($typefile != NULL) {
        if (!in_array($type, $typefile)) {
            return;
        }
    }

    if (is_uploaded_file($tmp)) {
        $filename = uniqid() . "." . $type;
        move_uploaded_file($tmp, $path . $filename) or die('Couldn\'t Upload');
        return $filename;
    }
}

function dateFormat($date, $dateFormat = DATE_FORMAT) {
    return date($dateFormat, is_int($date) ? $date : strtotime($date) );
}

function gif_image($name, $new_width, $new_height, $dir) {
    global $i, $config, $width, $height;
    $image_p = imagecreatetruecolor($new_width, $new_height);
    $img = imagecreatefromgif($name);
    //echo $name;
    imagecopyresampled($image_p, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    $thenames = $dir . $i;
    imagegif($image_p, $thenames, 100);
}

/*
 * check if is array and it contain items
 * @param array for the check
 * @return boolean
 * @author Hussam El-Kurd
 * */

function checkArrayContainElements($array) {
    if (is_array($array)) {
        return (sizeof($array) > 0) ? true : false;
    }
}

function jpeg_image($name, $new_width, $new_height, $dir) {
    global $i, $config, $width, $height;
    $image_p = imagecreatetruecolor($new_width, $new_height);
    $img = imagecreatefromjpeg($name);
    // echo $name;
    imagecopyresampled($image_p, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    $thenames = $dir . $i;
    imagejpeg($image_p, $thenames, 100);
}

function png_image($name, $new_width, $new_height, $dir) {
    global $i, $config, $width, $height;
    $image_p = imagecreatetruecolor($new_width, $new_height);
    $img = imagecreatefrompng($name);
    // echo $name;
    imagecopyresampled($image_p, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    $thenames = $dir . $i;
    imagepng($image_p, $thenames, 100);
}

function coder($size) {
    $chars = explode(';', 'a;b;c;d;e;f;g;h;i;j;k;l;m;n;o;p;q;r;s;t;u;v;w;x;y;z;1;2;3;4;5;6;7;8;9;0');
    $code = '';
    for ($i = 0; $i < $size; $i ++) {
        $code .= $chars [rand(0, (count($chars) - 1))];
    }
    return $code;
}

function clean_username($username) {
    $username = substr(htmlspecialchars(str_replace("\'', ''", trim($username))), 0, 25);
    $username = phpbb_rtrim($username, "\\");
    $username = str_replace("'', '\'", $username);
    return $username;
}

function tm_rtrim($str, $charlist = false) {
    if ($charlist === false) {
        return rtrim($str);
    }
    $php_version = explode('.', PHP_VERSION);
    if ((int) $php_version [0] < 4 || ((int) $php_version [0] == 4 && (int) $php_version [1] < 1)) {
        while ($str {strlen($str) - 1} == $charlist) {
            $str = substr($str, 0, strlen($str) - 1);
        }
    } else {
        $str = rtrim($str, $charlist);
    }
    return $str;
}

function get_userdata($user, $force_str = false) {
    global $db;
    if (intval($user) == 0 || $force_str) {
        $user = clean_username($user);
    } else {
        $user = intval($user);
    }
    $sql = 'SELECT * FROM ' . USERS_TABLE . ' WHERE ';
    $sql .= ((is_integer($user)) ? "user_id='{$user}'" : "username='{$user}'") . ' AND user_id<>' . ANONYMOUS;
    $result = $db->Execute($sql);
    return $result->fields ? $result->fields : false;
}

function encode_ip($dotquad_ip) {
    $ip_sep = explode('.', $dotquad_ip);
    return sprintf('%02x%02x%02x%02x', $ip_sep [0], $ip_sep [1], $ip_sep [2], $ip_sep [3]);
}

function decode_ip($int_ip) {
    $hexipbang = explode('.', chunk_split($int_ip, 2, '.'));
    return hexdec($hexipbang [0]) . '.' . hexdec($hexipbang [1]) . '.' . hexdec($hexipbang [2]) . '.' . hexdec($hexipbang [3]);
}

function tm_preg_quote($str, $delimiter) {
    $text = preg_quote($str);
    $text = str_replace($delimiter, '\\' . $delimiter, $text);
    return $text;
}

function countRows($select) {
    global $db;
    $result = $db->Execute($select);
    return $db->Affected_Rows();
}

/////////////////////////////////////////////////////////////////////////



function includeall($pattern) {

    foreach (glob($pattern) as $file) {
        if (!is_dir($file))
            include_once $file;
    }
}

function getURLOrder($sort) {
    global $sortOrder;
    global $_GET;

    if ($sortOrder == "DESC") {
        $orderURL = "sort=$sort:ASC";
    } elseif ($sortOrder == "ASC") {
        $orderURL = "sort=$sort:DESC";
    }
    if (isset($_GET ['sort']))
        unset($_GET ['sort']);
    $queryString = http_build_query($_GET);
    if ($queryString != "")
        $orderURL = $_SERVER ['PHP_SELF'] . "?" . $queryString . "&" . $orderURL;
    else
        $orderURL = $_SERVER ['PHP_SELF'] . "?" . $orderURL;
    return $orderURL;
}

function returnArabDay($selectDay = NULL) {
    if ($selectDay == NULL) {
        $date = getdate();
        $today = $date ['wday'];
    } else
        $today = $selectDay;
    $char_days [6] = 'السبت';
    $char_days [5] = 'الجمعة';
    $char_days [4] = 'الخميس';
    $char_days [3] = 'الأربعاء';
    $char_days [2] = 'الثلاثاء';
    $char_days [1] = 'الإثنين';
    $char_days [0] = 'الأحد';
    return $char_days [$today];
}

function checked($value, $dbvalue) {
    if ($value == $dbvalue)
        return "checked=\"checked\"";
}

function selected($value, $dbvalue) {
    if ($value == $dbvalue)
        return "selected=\"selected\"";
}

function deletefile($name, $path = UPLOAD_ATTACH_PATH) {
    if (file_exists($path . $name))
        unlink($path . $name);
}

function removeqsvar($url, $varname) {
    list ( $urlpart, $qspart ) = array_pad(explode('?', $url), 2, '');
    parse_str($qspart, $qsvars);
    unset($qsvars [$varname]);
    $newqs = http_build_query($qsvars);
    return $urlpart . '?' . $newqs;
}

function changePosition($tabel, $tabel_pk, $position_column, $id, $opreation, $type_column = "") {

    $plus_condition = "";

    if ($type_column != "") {
        $sql = "SELECT $type_column FROM  $tabel WHERE $tabel_pk = $id ";
        $result = $GLOBALS ['DBSQL']->sql_query($sql);
        $row = $GLOBALS ['DBSQL']->sql_fetchrow($result);
        $type = $row [$type_column];
        $plus_condition = "AND $type_column = $type";
    }

    switch ($opreation) {

        // Assign New Position
        case "assign" : {

                $position = 0;

                $sql = "SELECT MAX($position_column) AS max_position FROM  $tabel WHERE 1=1 $plus_condition ";

                $result = $GLOBALS ['DBSQL']->sql_query($sql);

                if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {
                    $position = $row ['max_position'] + 1;
                }
                return $position;
            }
            break;

        // Make the Element @ the top
        case "top" : {

                $position = 0;
                $sql = "SELECT MAX($position_column) AS max_position FROM  $tabel WHERE 1=1 $plus_condition ";
                $result = $GLOBALS ['DBSQL']->sql_query($sql);

                if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {
                    $position = (($row ['max_position'] != NULL) ? $row ['max_position'] : 0) + 1;
                }
                return $position;
            }
            break;

        // Make the Element @ the bottom
        case "bottom" : {
                $position = 0;
                $sql = "SELECT MIN($position_column) AS min_position FROM  $tabel WHERE 1=1 $plus_condition ";
                $result = $GLOBALS ['DBSQL']->sql_query($sql);

                if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {
                    $position = (($row ['max_position'] > 0) ? $row ['max_position'] : 1) - 1;
                }
                return $position;
            }
            break;

        // Move Up the Element by one
        case "up" : {
                $sql = "SELECT $tabel_pk,$position_column  FROM  $tabel WHERE $tabel_pk = $id ";
                $result = $GLOBALS ['DBSQL']->sql_query($sql);
                if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {

                    $curren_id = $id;
                    $current_position = $row [$position_column];

                    $sql = "SELECT $tabel_pk,$position_column  FROM  $tabel WHERE $position_column > $current_position $plus_condition  ORDER BY  $position_column ASC LIMIT 0 , 1 ";
                    $result = $GLOBALS ['DBSQL']->sql_query($sql);

                    if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {
                        $next_id = $row [$tabel_pk];
                        $next_position = $row [$position_column];

                        $sql = "UPDATE $tabel SET $position_column = $current_position  WHERE $tabel_pk = $next_id";
                        $result = $GLOBALS ['DBSQL']->sql_query($sql);
                        return $next_position;
                    }
                }

                return $current_position;
            }
            break;

        // Move Down the Element by one	
        case "down" : {

                $sql = "SELECT $tabel_pk,$position_column  FROM  $tabel WHERE $tabel_pk = $id ";
                $result = $GLOBALS ['DBSQL']->sql_query($sql);
                if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {

                    $curren_id = $id;
                    $current_position = $row [$position_column];

                    $sql = "SELECT $tabel_pk,$position_column  FROM  $tabel WHERE $position_column < $current_position $plus_condition ORDER BY  $position_column  DESC LIMIT 0 , 1 ";
                    $result = $GLOBALS ['DBSQL']->sql_query($sql);

                    if ($row = $GLOBALS ['DBSQL']->sql_fetchrow($result)) {
                        $next_id = $row [$tabel_pk];
                        $next_position = $row [$position_column];

                        $sql = "UPDATE $tabel SET $position_column = $current_position  WHERE $tabel_pk = $next_id";
                        $result = $GLOBALS ['DBSQL']->sql_query($sql);
                        return $next_position;
                    }
                }

                return $current_position;
            }
            break;
    }
}

function formatDate($date) {
    if ($date != NULL)
        return date(DATE_FORMAT, strtotime($date));
}

function checkValue($value) {
    return ((isset($value) and (trim($value) != '')) ? $value : '--');
}

function urlMenuFormat($url, $variablesGet) {
    foreach ($variablesGet as $key => $value) {
        $arr [$key] = $value;
        $url = removeqsvar($url, $key);
    }
    $newqs = http_build_query($arr);
    return $url . '&' . $newqs;
}

function array_not_null_values($array) {
    $newArray = array();
    foreach ($array as $value) {
        if ((trim($value)) != '')
            $newArray [] = trim($value);
    }
    return $newArray;
}

function strip_word_html($text, $allowed_tags = '<b><i><sup><sub><em><strong><u><br><img><object><param><p>') {
    mb_regex_encoding('UTF-8');
    //replace MS special characters first
    $search = array('/&lsquo;/u', '/&rsquo;/u', '/&ldquo;/u', '/&rdquo;/u', '/&mdash;/u');
    $replace = array('\'', '\'', '"', '"', '-');
    $text = preg_replace($search, $replace, $text);
    //make sure _all_ html entities are converted to the plain ascii equivalents - it appears
    //in some MS headers, some html entities are encoded and some aren't
    $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
    //try to strip out any C style comments first, since these, embedded in html comments, seem to
    //prevent strip_tags from removing html comments (MS Word introduced combination)
    if (mb_stripos($text, '/*') !== FALSE) {
        $text = mb_eregi_replace('#/\*.*?\*/#s', '', $text, 'm');
    }
    //introduce a space into any arithmetic expressions that could be caught by strip_tags so that they won't be
    //'<1' becomes '< 1'(note: somewhat application specific)
    $text = preg_replace(array('/<([0-9]+)/'), array('< $1'), $text);
    $text = strip_tags($text, $allowed_tags);
    //eliminate extraneous whitespace from start and end of line, or anywhere there are two or more spaces, convert it to one
    $text = preg_replace(array('/^\s\s+/', '/\s\s+$/', '/\s\s+/u'), array('', '', ' '), $text);
    //strip out inline css and simplify style tags
    $search = array('#<(strong|b)[^>]*>(.*?)</(strong|b)>#isu', '#<(em|i)[^>]*>(.*?)</(em|i)>#isu', '#<u[^>]*>(.*?)</u>#isu');
    $replace = array('<b>$2</b>', '<i>$2</i>', '<u>$1</u>');
    $text = preg_replace($search, $replace, $text);
    //on some of the ?newer MS Word exports, where you get conditionals of the form 'if gte mso 9', etc., it appears
    //that whatever is in one of the html comments prevents strip_tags from eradicating the html comment that contains
    //some MS Style Definitions - this last bit gets rid of any leftover comments */
    $num_matches = preg_match_all("/\<!--/u", $text, $matches);
    if ($num_matches) {
        $text = preg_replace('/\<!--(.)*--\>/isu', '', $text);
    }
    return $text;
}

#============================= You Tube Player========================================

function youTubePlayer($variable, $width, $height) {
    echo '<object width="' . $width . '" height="' . $height . '">
<param name="movie" value="http://www.youtube.com/v/' . $variable . '?fs=1"</param>
<param name="allowFullScreen" value="true"></param>
<param name="allowScriptAccess" value="always"></param>
<embed src="http://www.youtube.com/v/' . $variable . '?fs=1"
  type="application/x-shockwave-flash"
  allowfullscreen="true"
  allowscriptaccess="always"
  width="' . $width . '" height="' . $height . '">
</embed>
</object>';
}

/*
 * generated No with Fixed begin string
 * 
 * @beginStr,length of NO
 * @return String
 * */

function generatePassword($beginStr = '', $length = 6) {

    list($usec, $sec) = explode(' ', microtime());
    srand((float) $sec + ((float) $usec * 100000));


    $validchars[1] = "2346789bcdfghjkmnpqrtvwxyzBCDFGHJKLMNPQRTVWXYZ";

    $password = "";
    $counter = 0;

    while ($counter < $length) {
        $actChar = substr($validchars[1], rand(0, strlen($validchars[1]) - 1), 1);

        // All character must be different
        if (!strstr($password, $actChar)) {
            $password .= $actChar;
            $counter++;
        }
    }

    return $beginStr . $password;
}

/*
 * diffrent between two dates
 * @param string $time1 from date
 * @param string $time2 to date
 * @param string $precision for float
 * return array of diffrents
 * */

function dateDiff($time1, $time2, $precision = 6) {
    // If not numeric then convert texts to unix timestamps
    if (!is_int($time1)) {
        $time1 = strtotime($time1);
    }
    if (!is_int($time2)) {
        $time2 = strtotime($time2);
    }

    // If time1 is bigger than time2
    // Then swap time1 and time2
    if ($time1 > $time2) {
        $ttime = $time1;
        $time1 = $time2;
        $time2 = $ttime;
    }

    // Set up intervals and diffs arrays
    $intervals = array('year', 'month', 'day', 'hour', 'minute', 'second');
    $diffs = array();

    // Loop thru all intervals
    foreach ($intervals as $interval) {
        // Set default diff to 0
        $diffs[$interval] = 0;
        // Create temp time from time1 and interval
        $ttime = strtotime("+1 " . $interval, $time1);
        // Loop until temp time is smaller than time2
        while ($time2 >= $ttime) {
            $time1 = $ttime;
            $diffs[$interval] ++;
            // Create new temp time from time1 and interval
            $ttime = strtotime("+1 " . $interval, $time1);
        }
    }

    $count = 0;
    $times = array();
    // Loop thru all diffs
    foreach ($diffs as $interval => $value) {
        // Break if we have needed precission
        if ($count >= $precision) {
            break;
        }
        // Add value and interval 
        // if value is bigger than 0
        if ($value > 0) {
            // Add s if value is not 1
            if ($value != 1) {
                $interval .= "s";
            }
            // Add value and interval to times array
            $times[$interval] = $value;
            $count++;
        }
    }

    // Return string with times
    return $times;
}

function hashMe($pharse, &$slat) {
    // http://hungred.com/useful-information/php-better-hashing-password/
    define('SALT_LENGTH', 15);

    $key = '!@#$%^&*()_+=-{}][;";/?<>.,';
    if ($slat == '') {
        $slat = substr(hash('sha512', uniqid(rand(), true) . $key . microtime()), 0, SALT_LENGTH);
    } else {
        $slat = substr($slat, 0, SALT_LENGTH);
    }
    return hash('sha512', $slat . $key . $pharse);
}

function post_request($url, $data, $referer = '') {

    // Convert the data array into URL Parameters like a=b&foo=bar etc.
    $data = http_build_query($data);

    // parse the given URL
    $url = parse_url($url);

    if ($url['scheme'] != 'http') {
        die('Error: Only HTTP request are supported !');
    }

    // extract host and path:
    $host = $url['host'];
    $path = $url['path'];

    // open a socket connection on port 80 - timeout: 30 sec
    $fp = fsockopen($host, 80, $errno, $errstr, 30);

    if ($fp) {

        // send the request headers:
        fputs($fp, "POST $path HTTP/1.1\r\n");
        fputs($fp, "Host: $host\r\n");

        if ($referer != '')
            fputs($fp, "Referer: $referer\r\n");

        fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
        fputs($fp, "Content-length: " . strlen($data) . "\r\n");
        fputs($fp, "Connection: close\r\n\r\n");
        fputs($fp, $data);

        $result = '';
        while (!feof($fp)) {
            // receive the results of the request
            $result .= fgets($fp, 128);
        }
    } else {
        return array(
            'status' => 'err',
            'error' => "$errstr ($errno)"
        );
    }

    // close the socket connection:
    fclose($fp);

    // split the result header from the content
    $result = explode("\r\n\r\n", $result, 2);

    $header = isset($result[0]) ? $result[0] : '';
    $content = isset($result[1]) ? $result[1] : '';

    // return as structured array:
    return array(
        'status' => 'ok',
        'header' => $header,
        'content' => $content
    );
}

function formatSQLDate($date, $format = 'm/d/Y') {
    /*
      $dateBeforeFormat = new DateTime($date);
      return $dateBeforeFormat->format('m/d/Y');
     */
    return date($format, strtotime(str_replace('/', '-', $date)));
}

/**
 * sign oauthParameters
 * prepare parameters that use in oauth
 * @return array of parameters
 */
function signOauthParameters() {

    $userInfo = json_decode($_COOKIE["userInfo"], true);

    $nonce = uniqid('');
    $time = time();

    $parms = array(
        'oauth_nonce' => $nonce,
        'oauth_signature_method' => 'HMAC-SHA1',
        'oauth_timestamp' => $time,
        'oauth_token' => $userInfo['token'],
        'oauth_signature' => ''
    );

    $normalizeParms = urlencode(getNormalizedParams($parms));
    $sig = array();
    $sig[] = "POST";
    $sig[] = $normalizeParms;
    $base = implode('&', $sig);
    $key = urlencode($userInfo['consumerKey']);


    $signature = base64_encode(hash_hmac("sha1", $base, $key, true));

    $parms['oauth_signature'] = urlencode($signature);
    return $parms;
}

/**
 * get Normalized Params
 * convert array of parameters to string
 * @param array $params
 * @return string
 */
function getNormalizedParams($params) {

    $normalized = array();

    ksort($params);
    foreach ($params as $key => $value) {
        // all names and values are already urlencoded, exclude the oauth signature
        if ($key != 'oauth_signature') {
            if (is_array($value)) {
                $value_sort = $value;
                sort($value_sort);
                foreach ($value_sort as $v) {
                    $normalized[] = $key . '=' . $v;
                }
            } else {
                $normalized[] = $key . '=' . $value;
            }
        }
    }
    return implode('&', $normalized);
}

/**
 * remove all files in folder
 * @param  $path
 */
function removefiles($path) {
    $files = glob($path . '*'); // get all file names
    foreach ($files as $file) { // iterate files
        if (is_file($file))
            unlink($file); // delete file
    }
}
/**
 * force redirect to ssl
 */
function forceRedirectToSSL(){
    global $_SERVER;
    if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == ""){
       $redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
       header("HTTP/1.1 301 Moved Permanently");
       header("Location: $redirect");
   }        
}
