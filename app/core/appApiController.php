<?php

/**
 * ApiController, Tidy PHP 
 * controller for the main appBase controller (overwrite Methods , params...etc)
 * @version       $Revision$
 * @modifiedby    $LastChangedBy$
 * @lastmodified  $Date$
 * @author Hussam El-Kurd <smartx86@gmail.com>
 * @copyright Copyright (c) 2011, Hussam El-Kurd 
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package Tidy
 * @subpackage Setting
 * @filesource
 * @abstract
 */


class ApiController extends \BaseController {

    public $helpers = array('functions', 'image','session');

    public $enableAPIOauth = false;
    private static $_responseData = true;

    public function ini() {
     
                        $this->enableAPIOauth = false;

        \Model::setCondition(array());
        //to enable test
        if (getHeaderVariable('X-TEST-HEADER')) {
            $_SESSION['userLevel'] = getHeaderVariable('userLevelSession');
            $_SESSION['userID'] = getHeaderVariable('userID');
            
            $GLOBALS['registry']->userInfo = array('User_ID' => getHeaderVariable('User_ID'));
            if (getHeaderVariable('X-TEST_SECRET_KEY') == TEST_SECRET_KEY)
                $this->enableAPIOauth = false;
        }
        $GLOBALS ['registry']->apiAuth->allow = array(
            'usersApi:loginUser',
            'usersApi:addEditUser'

        );
   
 
    }


    public function beforeLoad() {
        /*
          if ($GLOBALS ['registry']->apiAuth->tokenVerifyInfoArray['enableTenant'] &&
          $GLOBALS['registry']->userInfo['tenant'] != null) {
          $this->_setTenantFederation($GLOBALS['registry']->userInfo['tenant'],$GLOBALS['registry']->userInfo['federation']);
          }
         * 
         */
    }

    public function verifyLogin() {
        $token = $GLOBALS ['registry']->request->getCookie('token');
        $operation = $GLOBALS ['registry']->OAuthServer->verifyToken($token, $nounce, $timeStamp, $signatureMethod, $consumerKey, $signature);
    }

    /*
     * change response type(return or response)
     * @param boolean responsetype
     * */

    public function setResponse($boolean) {
        self::$_responseData = $boolean;
        return self::$_responseData;
    }

    /*
     * to send response
     * @access protected
     * @param mixed $responseArray
     * */

    protected function sendResponse($responseData) {
        if (self::$_responseData) {
            $GLOBALS ['registry']->response->sendResponse(\Http::HTTP_OK, $responseData);
            return NULL;
        } else
            return $responseData;
    }

}
