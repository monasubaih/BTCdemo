<?php
/*Directories that contain classes*/
error_reporting(0);
define(DS,'\\');
define(ROOT_DIR, __DIR__ . '\src');
$classesDir = array (
    ROOT_DIR.'\Conversion'.DS,
    ROOT_DIR.'\Create'.DS,
    ROOT_DIR.'\Exception'.DS,
    ROOT_DIR.'\Explorer'.DS,
    ROOT_DIR.'\PushTX'.DS,
    ROOT_DIR.'\Rates'.DS,
    ROOT_DIR.'\Receive'.DS,
    ROOT_DIR.'\Stats'.DS,
    ROOT_DIR.'\Wallet'.DS,
    ROOT_DIR.DS
);
function autoload() {
    global $classesDir;
    foreach ($classesDir as $directory) {
      foreach(glob($directory.'*.php') as $file) {
     include_once $file;
}
    }
}
