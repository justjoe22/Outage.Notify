var myuid;
var uid_site;
var main_url = "https://resplendent-inferno-4226.firebaseio.com/";
var ref = new Firebase( main_url.normalize() );

(function($) {

  // Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    
    myuid = authData.uid;

     var user_url = main_url + "users/" + myuid;
     var rUsers = new Firebase( user_url.normalize() );
     //var rUID = rUsers.child(myuid);
      rUsers.once("value", function(snapshot) {
        var data = snapshot.val();
        
        uid_site = data.site;
        
      });
    
  } else {
    console.log("User is logged out");
    
    myuid = null;
    uid_site = null;
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

//End of Script
})(jQuery);