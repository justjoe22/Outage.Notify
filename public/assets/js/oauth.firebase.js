(function($) {

  // Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    
  } else {
    console.log("User is logged out");
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
            var posting = $.post( url, { outageid: $('#outageid').val() } );
        
            /* Alerts the results */
            posting.done(function( data ) {
              // similar behavior as an HTTP redirect
              window.location.replace("my.outages.html");
            });
            
      }
    });
    
    event.preventDefault();
    
  });
  
  //My outages
  $( "#outagelist" ).init(function( event ) {
      
    //Get Outage for Preview
    // Get a database reference to our posts
    //var Myref = new Firebase("https://resplendent-inferno-4226.firebaseio.com/outages/");
    var Myref = ref.child("outages");
    
    // Attach an asynchronous callback to read the data at our posts reference
    Myref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
        
        //Start of Form Class
        var vHTML = "<div class='main-content'><div class='form-basic'>";

          //Summary
          vHTML += "<div class='form-title-row'><h3>";
          vHTML += message.otype + ": ";
          vHTML += message.service + ", ";
          vHTML += message.timeframe;
          vHTML += "</h3></div>";

          //Outage Menu
          vHTML += "<div class='submenu'>";
          if(message.status=="Draft"){
            //Edit Button
            vHTML += "<a href='preview.outage.html?outageid=" + data.key() + "&st=edit' name='edit'>";
            vHTML += "<i class='fa fa-pencil-square'></i> Edit</a>";
            //Preview Button
            vHTML += "<a href='preview.outage.html?outageid=" + data.key() + "' name='prev'>";
            vHTML += "<i class='fa fa-television'></i> Preview</a>";
          }
          else if(message.status=="Pending"){
            //Preview Button
            vHTML += "<a href='approve.outage.html?outageid=" + data.key() + "' name='prev'>";
            vHTML += "<i class='fa fa-television'></i> Preview</a>";
          }
          vHTML += "</div>";

          vHTML += "<div class='form-row'>";
          vHTML += "<h2>Status:</h2>";
          vHTML += "<p>" + message.status + "</p><br />";
          vHTML += "<h2>Ticket #:</h2>";
          vHTML += "<p>" + message.ticket + "</p><br />";
          vHTML += "<h2>Contact:</h2>";
          vHTML += "<p>" + message.pcontact + "</p>";
          vHTML += "</div>";

          //End of Form Class
          vHTML += "</div></div>";

          $("#outagelist").append(vHTML);
    
      });    
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });
      
  });
  
//End of Script
})(jQuery);