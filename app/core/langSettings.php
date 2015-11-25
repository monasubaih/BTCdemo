<?php

//$responseBody = $appRPC->getDefualtLang();
/**
 * Default Language 
 */
/**
 * Language Constants
 */
define('EN_LANG', 1);

define('DEFAULT_LANG',  EN_LANG);
/**
 * main Languages
 */
$GLOBALS ['sysLang'] = array(EN_LANG => 'en');
$GLOBALS ['sysLangLabels'] = array(EN_LANG => 'English');
$GLOBALS ['sysLangProp'] = array(
    $GLOBALS ['sysLang'][EN_LANG] => array('label' => 'English','againstID' => AR_LANG, 'dir' => 'ltr','designProps'=> array(
        'dropdownClass' =>'flag-gb' ,
        'dropdownMainID'=>'enLang',
        'data-bootstro-placement'=>'right',
        'direction'=>'left')),
    

);

/////////////////////////////////////// Languages

/*
 * define Request Language
 */
App::languageDefine();
//for index set language variable
$sizeOfArgs = sizeof($GLOBALS ['registry']->args) - 1;
if (in_array($GLOBALS ['registry']->args[$sizeOfArgs], $GLOBALS ['sysLang'])) {
    $GLOBALS ['registry']->request->setGet('viewLang', $GLOBALS ['registry']->args[$sizeOfArgs]);
}
unset($sizeOfArgs);

foreach($GLOBALS ['sysLang'] as $key => $lang){
   $current= DEFAULT_LANG;
    if($GLOBALS ['registry']->currentViewLang==$lang){
        $current=$key;
    }
}
define('CURRENT_LANG',$current);


/**
 * @var object translate
 * @GLOBAL
 * @see Zend_Translate
 * define translate in registry
 */
$viewLang = $GLOBALS ['sysLang'][DEFAULT_LANG];

$GLOBALS ['registry']->tr = new Zend_Translate(array('adapter' => 'gettext', 'content' => LANG_PATH . $viewLang . '.mo', 'locale' => $viewLang));
