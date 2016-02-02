(function($) {
    
    //Default Settings OnLoad
    $(window).load(function() {
    
     //Get User uid_site
     var uid_site = "";
     var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/" + myuid;
     var rUsers = new Firebase( user_url.normalize() );
     
     uid_site = rUsers.child("site").key();
      
      //Populate Form.Init
      if (uid_site !== "") {
        pop_forminit(uid_site);
      }
    
    });

//End of Script
})(jQuery);
