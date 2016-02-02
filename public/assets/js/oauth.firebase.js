var myuid;

(function($) {

  // Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    myuid = authData.uid;
    
  } else {
    console.log("User is logged out");
    myuid = null;
  }
}

var ref = new Firebase("https://resplendent-inferno-4226.firebaseio.com/");

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

  //Find Site
  function findMySite(){
    
    var mysite = "";
    
    var rUsers = ref.child("users");
    var rUID = rUsers.child(myuid);
    
    rUID.on("value", function(snapshot) {
      var userInfo = snapshot.val();
      
      mysite = userInfo.site;
      
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      
      mysite = "Not Found";
    });
    
    return mysite;
  }