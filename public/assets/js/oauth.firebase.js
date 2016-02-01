//Login to Firebase
$('form[name=login]').submit(function(event) {
    var ref = new Firebase("https://resplendent-inferno-4226.firebaseio.com/");
    
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
    
    /* get some values from elements on the page: */
    var $form = $( this ),
        url = "my.outages.html";

    /* Send the data using post */
    var posting = $.post( url, { email: $('input[name=email]').val() } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url);
    });
    
});

//Register to Firebase
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