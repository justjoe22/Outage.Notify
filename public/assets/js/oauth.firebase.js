var myuid;
var uid_site;

(function($) {

var main_url = "https://resplendent-inferno-4226.firebaseio.com/";
var ref = new Firebase( main_url.normalize() );

  // Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    //console.log("User " + authData.uid + " is logged in with " + authData.provider);
    
    myuid = authData.uid;
    
     //Get User uid_site
     var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/" + myuid;
     var rUsers = new Firebase( user_url.normalize() );
     
    rUsers.once("value", function(snap) {
      rMessage = snap.val();
      uid_site = rMessage.site;
     
      //console.log(snap.val());
    });

  } else {
    //console.log("User is logged out");
    
    myuid = null;
    uid_site = null;
    
    if(ref.getAuth()===null){
        if(window.location.pathname!=="/"){
            window.location.replace("./");
        }
    }
  }
}

ref.onAuth(authDataCallback);

  // Register
  $("#registerButton").on("click", function() {
    
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    
    ref.createUser({email: email, password: password}, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  });
  
  // Login
  $( "#login" ).submit(function( event ) {
    
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    
    ref.authWithPassword({email: email, password: password},function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        
            /* get some values from elements on the page: */
            var $form = $( this ),
                url = $form.attr( 'action' );
        
            /* Send the data using post */
            var posting = $.post( url, { email: email } );
        
            /* Alerts the results */
            posting.done(function( data ) {
              // similar behavior as an HTTP redirect
              window.location.replace("my.outages.html");
            });
            
      }
    });
    
    event.preventDefault();
    
  });
  
   // Logout
  $( "#logout" ).on("click", function() {
    
    ref.unauth();
    
    window.location.replace("./");
    
  });

//End of Script
})(jQuery);