(function($) {

function register(){
    var ref = new Firebase("https://resplendent-inferno-4226.firebaseio.com/");
    ref.createUser({
      email    : $('input[name=email]').val(),
      password : $('input[name=password]').val()
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

}

$('form[name=login]').submit(function(event) {
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    
    ref.authWithPassword({
      email    : $('input[name=email]').val(),
      password : $('input[name=password]').val()
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
});

//End of Script
})(jQuery);