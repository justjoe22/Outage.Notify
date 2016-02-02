(function($) {
    
    //Default Settings OnLoad
    $(window).load(function() {
    
     //Get User uid_site
     var uid_site = "";
     var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/" + myuid;
     var rUsers = new Firebase( user_url.normalize() );
     
    rUsers.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            var message = data.val();
            uid_site = message.site;
        });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
      
      //uid_site = "bussiness1";
      
      //Populate Form.Init
      if (uid_site !== "") {
        pop_forminit(uid_site);
      }
    
    });

//End of Script
})(jQuery);
