(function($) {

var ref = new Firebase("https://resplendent-inferno-4226.firebaseio.com/");    

// var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
//   if (error) {
//     alert(error);
//     return;
//   }
//   if (user) {
//     // User is already logged in.
//     doLogin(user);
    
//     window.location.replace("my.outages.html");
    
//   } else {
//     // User is logged out.
//     showLoginBox();
//   }
// });

// function showLoginBox(){

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
   $("#loginButton").on("click", function() {

    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    
    ref.authWithPassword({email: email, password: password},function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    
  });
  
  
// }

//End of Script
})(jQuery);