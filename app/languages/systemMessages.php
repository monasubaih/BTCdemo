<?php
$msgSectionID = 0;

$GLOBALS['SYS_MSG'] = array();

define('EMAIL_FORGET_PASSWORD_MSG', $msgSectionID++);
$GLOBALS['SYS_MSG'][EMAIL_FORGET_PASSWORD_MSG]['TITLE'] = _tr('PrimaryEngineer: Reset Password');
$GLOBALS['SYS_MSG'][EMAIL_FORGET_PASSWORD_MSG]['MSG'] = 'Hi %s, <br> We\'re emailing you because you requested a link to reset your password on the Primary Engineer CUE System.<br>';
$GLOBALS['SYS_MSG'][EMAIL_FORGET_PASSWORD_MSG]['MSG'] .= 'If you initiated the request, please click the below link:<br>';
$GLOBALS['SYS_MSG'][EMAIL_FORGET_PASSWORD_MSG]['MSG'] .= '%s<br>';
$GLOBALS['SYS_MSG'][EMAIL_FORGET_PASSWORD_MSG]['MSG'] .= 'If you did not initiate the request, you may ignore this message.';




