<?php

class sessionValidate {

    /**
     * session_validate()
     * Will check if a user has a encrypted key stored in the session array.
     * If it returns true, user is the same as before
     * If the method returns false, the session_id is regenerated
     *
     * @param {String} $email   The users email adress
     * @return {boolean} True if valid session, else false
     */
    private $user_email;

    function sessionValidate($userEmail) {

        $this->user_email = $userEmail;
    }

    public function session_validate() {
        $sessionModel = new sessionModel();
        //get session record according to user email 
        $sissionObj = $sessionModel->getSessionModel(null,'*', ' AND User_Email=\'' . $this->user_email . '\'');

        // Check for instance of session
        if (is_object($sissionObj)) {
            //there is exist session
            // The new session does not exist, create it and remove old one
            $this->session_reset($this->user_email);
            return false;
        }
        else{
        // Create session 
            $this->session_generate($this->user_email);
             return true;
        }
     
    }

  

    /**
     * session_match()
     * Compares the session secret with the current generated secret.
     *
     */
    public function session_match() {
        // Validate the agent and initiated
        $sessionModel = new sessionModel();
        //get session record according to user email 
        $sissionObj = $sessionModel->getSessionModel(null,'*', ' AND User_Email=\'' . $this->user_email . '\'');
         if (is_object($sissionObj)) {
            // Same user with same login
           if($sissionObj->Session_ID == session_id())
            return true;
        else {
            // there is another login
            return false;
        }
        }  else {
            // no session
             return false;
        }
        
    }

 

    /**
     * session_reset()
     * Will regenerate the session_id (the local file) and build a new
     * secret for the user.
     *
     * @param {String} $userEmail
     */
    private function session_reset($userEmail) {
        // Create new id
        session_regenerate_id(TRUE);
        $sessionModel = new sessionModel();
        // delete old session
        $sessionModel->deleteSessionModel($userEmail);
        $this->session_generate($userEmail);
        $_SESSION = array();
    }

    /**
     * generate session with new id
     * @param {String} $userEmail
     */
    private function session_generate($userEmail) {
        $sessionModel = new sessionModel();
        // create new one with new id
        $sessionDataSet = array();
        $sessionDataSet['Session_ID'] = session_id();
        $sessionDataSet['User_Email'] = $userEmail;
        $_SESSION = array();
        return $sessionModel->updateSessionModel($sessionDataSet);
    }

    /**
     * Destroys the session
     */
    private function session_destroy() {
        // Destroy session
        session_destroy();
    }

}
