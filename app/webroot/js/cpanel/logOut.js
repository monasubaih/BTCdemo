
// grid event initial variable			
function logoutRowINI() {
    // logout row operation 
    $('#logOut').click(function() {
        //alert(getCookie("userInfo"));
        if (getCookie("userInfo") != null) {
            var userInfo = JSON.parse(getCookie("userInfo"));
            var token = userInfo['token'];
            var consumerKey = userInfo['consumerKey'];

            //alert(token+consumerKey)
            if (token == null || consumerKey == null) {

                notify(['error', _tl(' you have no write to access please login first')]);
                //	window.location=USERS_LINKS+'login/';
            }


            else {
                $.ajax({url: USERS_LINKS + 'logOut/',
                    type: "POST",
                    async: false,
                    contentType: 'application/json',
                    dataType: 'json',
                    beforeSend: function() {
                        notify(_tl('loading'));
                    },
                    success: function(data) {
                        opStatus = true;
                        if (data.operation) {
                            output = "logout";
                        } else
                            output = "error";
                        unnotify();


                        //   notify(listMassages(data));

                    },
                    error: function() {
                        unnotify();
                        notify(['error', _tl('something went wrong, please try again later')]);
                    },
                });
                if (output = "logout")
                {
                    deleteCookie("userInfo", '/');

                    window.location = USERS_LINKS + 'login/';

                }



            }
        }
        else {
            notify(['error', _tl(' you must login first to allow this operation')]);
            window.location = USERS_LINKS + 'login/';

        }
    });
}




$(document).ready(function() {

    logoutRowINI();

});