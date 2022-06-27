require("dotenv").config()
const APP_ID = process.env.APP_ID

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function() {
    // the Messenger Extensions JS SDK is done loading

    MessengerExtensions.getContext("449310003232049",
        function success(thread_context){
            // success
        },
        function error(err){
            // error
        }
    );
};