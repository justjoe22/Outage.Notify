//Global Variables
var myuid;
var uid_site;
var uid_name;
var uid_email;
var uid_adm;
var uid_sys_adm;

(function($) {

var main_url = "https://resplendent-inferno-4226.firebaseio.com/";
var ref = new Firebase( main_url.normalize() );

  // Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    //console.log("User " + authData.uid + " is logged in with " + authData.provider);
    
    myuid = authData.uid;
    
     //Get User uid_site
     var user_url = main_url + "users/" + myuid;
     var rUsers = new Firebase( user_url.normalize() );
     
    rUsers.once("value", function(snap) {
      rMessage = snap.val();
      uid_site = rMessage.site;
      uid_name = rMessage.full_name;
      uid_email = rMessage.email;
      uid_adm = rMessage.site_admin;
      uid_sys_adm = rMessage.sys_admin;
      
        //Set Sys Admin menu
        if(uid_sys_adm===true) {
            var $nav = $('<nav />').appendTo('body');
        
            $nav.attr('id', 'sys_adm');
            
            var admMenu = "<div class='adm-menu-icon'></div>";
            admMenu += "<div class='adm-menu'>";
            admMenu += "<a href='#'><i class='fa fa-plus-square'></i> Admin Menu</a>";
            admMenu += "</div>"
            
            $("#sys_adm").html(admMenu);
        }
     
      //console.log(snap.val());
    });
    
    if(window.location.pathname==="/"){
            window.location.replace("./my.outages");
    }

  } else {
    //console.log("User is logged out");
    
    myuid = null;
    uid_site = null;
    uid_email = null;
    uid_adm = null;
    uid_sys_adm = null;
    
    if(ref.getAuth()===null){
        if(window.location.pathname!=="/"){
            window.location.replace("../");
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
              window.location.replace("./my.outages");
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

//Main Menu Controls
function collapse($elements) {
  $elements.removeClass("filter");
  $elements.find(".menu").css({"display": "none", "transition": "transform 1.0s ease-out"});
  $elements.css({"height": "2.4em", "transition": "height 0.5s ease-out"});
}

$("#ddmenu").find(".menu").css({"display": "none"});

$("#ddmenu").click(function(){
  if ($(this).hasClass("filter")){
    collapse($(this));
  } else {
    $(this).find(".menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
    $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
    $(this).addClass("filter");
    collapse($("#ddmenu").not($(this)));
  }
  
});

$('html').click(function() {

    collapse($("#ddmenu").not($(this)));
    
});

$('#ddmenu').click(function(event){
    event.stopPropagation();
});

