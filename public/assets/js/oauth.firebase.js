(function($) {

var ref = new Firebase("https://resplendent-inferno-4226.firebaseio.com/");    
var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
  if (error) {
    alert(error);
    return;
  }
  if (user) {
    // User is already logged in.
    doLogin(user);
    
    window.location.replace("my.outages.html");
    
  } else {
    // User is logged out.
    showLoginBox();
  }
});

function showLoginBox(){

  // Register
  $("#registerButton").on("click", function() {
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    authClient.createUser(email, password, function(error,  user) {
      if (!error) {
        doLogin(user);
      } else {
        alert(error);
      }
    });
  });
  
  // Login 
   $("#loginButton").on("click", function() {
    authClient.login("password", {
      email: $('input[name=email]').val(),
      password: $('input[name=password]').val()
    });
  });
  
  
}

//End of Script
})(jQuery);