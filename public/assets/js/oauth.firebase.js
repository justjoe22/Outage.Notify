/*global $*/
//Global User Variables
var myuid;
var uid_site;
var uid_name;
var uid_email;
var uid_adm;
var uid_sys_adm;
var uid_approver;
var service_name;
var contact_name;
var otypes;
var users;
//var outageid;
var mail_server;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBeJDO84t81kUwS5Y6sK1qQ9nt-Jw_6CJU",
    authDomain: "resplendent-inferno-4226.firebaseapp.com",
    databaseURL: "https://resplendent-inferno-4226.firebaseio.com",
    projectId: "resplendent-inferno-4226",
    storageBucket: "resplendent-inferno-4226.appspot.com",
    messagingSenderId: "581593030551"
};
/*global firebase*/
firebase.initializeApp(config);

(function($) {

mail_server = 'https://resplendent-inferno-4226.firebaseapp.com/';

//Main URL for Database / Authentication
//var main_url = "https://resplendent-inferno-4226.firebaseio.com/";
//var ref = new firebase.database().ref("/");

  // Create a callback which logs the current auth state
  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
            //Set UID variable
            myuid = user.uid;
            
            $('.g-signin2').hide();
            
             //Get User uid_site
            firebase.database().ref('/users/' + myuid).once('value').then(function(snapshot) {
              //var username = snapshot.val().username;
              
              //Set Global Variables from User Profile
              uid_site = snapshot.val().site;
              uid_name = snapshot.val().full_name;
              uid_email = snapshot.val().email;
              uid_adm = snapshot.val().site_admin;
              uid_sys_adm = snapshot.val().sys_admin;
              uid_approver = snapshot.val().approver;
              
              /*global GetServices*/
              service_name = GetServices(uid_site);
              /*global GetContacts*/
              contact_name = GetContacts(uid_site);
              /*global GetOType*/
              otypes = GetOType(uid_site);
              /*global GetUsers*/
              users = GetUsers(uid_site);
              
                //Set Sys Admin menu
                if(uid_sys_adm===true) {
                    var $nav = $('<nav />').appendTo('body');
                
                    $nav.attr('id', 'sys_adm');
                    
                    var admMenu = "<div class='adm-menu-icon'></div>";
                    admMenu += "<div class='adm-menu'>";
                    admMenu += "<a href='#'><i class='fa fa-plus-square'></i> System Admin Menu</a>";
                    admMenu += "</div>";
                    
                    $("#sys_adm").html(admMenu);
                    
                    //Admin Menu Controls
                    $("#sys_adm").find(".adm-menu").css({"display": "none"});
                    
                    $("#sys_adm").click(function(){
                      if ($(this).hasClass("filter")){
                        admcollapse($(this));
                        $("#sys_adm").unbind('mouseenter mouseleave')
                        $("#site_adm").unbind('mouseenter mouseleave')
                        $("#ddmenu").unbind('mouseenter mouseleave')
                      } else {
                        $(this).find(".adm-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                        $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                        $(this).addClass("filter");
                        admcollapse($("#sys_adm").not($(this)));
                        collapse($("#ddmenu").not($(this)));
                        sitecollapse($("#site_adm").not($(this)));
                        $("#sys_adm").unbind('mouseenter mouseleave')
                        $("#site_adm").unbind('mouseenter mouseleave')
                        $("#ddmenu").unbind('mouseenter mouseleave')
                      
                          $("#ddmenu").hover(function(){
                              if ($(this).hasClass("filter")){
                                //collapse($(this));
                              } else {
                                $(this).find(".menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                                $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                                $(this).addClass("filter");
                                //collapse($("#ddmenu").not($(this)));
                                sitecollapse($("#site_adm").not($(this)));
                                admcollapse($("#sys_adm").not($(this)));
                              } 
                          })
                          $("#site_adm").hover(function(){
                              if ($(this).hasClass("filter")){
                                //sitecollapse($(this));
                              } else {
                                $(this).find(".site-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                                $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                                $(this).addClass("filter");
                                //sitecollapse($("#site_adm").not($(this)));
                                collapse($("#ddmenu").not($(this)));
                                admcollapse($("#sys_adm").not($(this)));
                              }
                          })
                          $("#sys_adm").hover(function(){
                              if ($(this).hasClass("filter")){
                                //admcollapse($(this));
                              } else {
                                $(this).find(".adm-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                                $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                                $(this).addClass("filter");
                                //admcollapse($("#sys_adm").not($(this)));
                                collapse($("#ddmenu").not($(this)));
                                sitecollapse($("#site_adm").not($(this)));
                              }
                          })
                      }
                    });
                    
                    $('html').click(function() {
                    
                        admcollapse($("#sys_adm").not($(this)));
                        $("#sys_adm").unbind('mouseenter mouseleave')
                        
                    });
                    
                    $('#sys_adm').click(function(event){
                        event.stopPropagation();
                    });
                }
             
                //Set Site Admin menu
                if(uid_adm===true || uid_sys_adm===true) {
                    var $snav = $('<nav />').appendTo('body');
                
                    $snav.attr('id', 'site_adm');
                    
                    var sMenu = "<div class='site-menu-icon'></div>";
                    sMenu += "<div class='site-menu'>";
                    sMenu += "<a href='#'><i class='fa fa-plus-square'></i> Site Options</a><br />";
                    sMenu += "<a href='"+getBaseUrl()+"siteadm/user.maint.html'><i class='fa fa-users'></i> User Management</a><br />";
                    sMenu += "<a href='#'><i class='fa fa-plus-square'></i> Outage Options</a><br />";
                    sMenu += "<a href='"+getBaseUrl()+"siteadm/contact.maint.html'><i class='fa fa-envelope'></i> Contact Maint</a><br />";
                    sMenu += "<a href='"+getBaseUrl()+"siteadm/system.maint.html'><i class='fa fa-tasks'></i> System Maint</a><br />";
                    sMenu += "<a href='"+getBaseUrl()+"siteadm/otype.maint.html'><i class='fa fa-desktop'></i> Outage Type Maint</a><br />";
                    sMenu += "</div>"
                    
                    $("#site_adm").html(sMenu);
                    
                    //Admin Menu Controls
                    $("#site_adm").find(".site-menu").css({"display": "none"});
                    
                    $("#site_adm").click(function(){
                      if ($(this).hasClass("filter")){
                        sitecollapse($(this));
                        $("#sys_adm").unbind('mouseenter mouseleave')
                        $("#site_adm").unbind('mouseenter mouseleave')
                        $("#ddmenu").unbind('mouseenter mouseleave')
                      } else {
                        $(this).find(".site-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                        $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                        $(this).addClass("filter");
                        sitecollapse($("#site_adm").not($(this)));
                        collapse($("#ddmenu").not($(this)));
                        admcollapse($("#sys_adm").not($(this)));
                        $("#sys_adm").unbind('mouseenter mouseleave')
                        $("#site_adm").unbind('mouseenter mouseleave')
                        $("#ddmenu").unbind('mouseenter mouseleave')
                          
                          $("#ddmenu").hover(function(){
                              if ($(this).hasClass("filter")){
                                //collapse($(this));
                              } else {
                                $(this).find(".menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                                $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                                $(this).addClass("filter");
                                //collapse($("#ddmenu").not($(this)));
                                sitecollapse($("#site_adm").not($(this)));
                                admcollapse($("#sys_adm").not($(this)));
                              } 
                          })
                          $("#sys_adm").hover(function(){
                              if ($(this).hasClass("filter")){
                                //admcollapse($(this));
                              } else {
                                $(this).find(".adm-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                                $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                                $(this).addClass("filter");
                                //admcollapse($("#sys_adm").not($(this)));
                                collapse($("#ddmenu").not($(this)));
                                sitecollapse($("#site_adm").not($(this)));
                              }
                          })
                          $("#site_adm").hover(function(){
                              if ($(this).hasClass("filter")){
                                //sitecollapse($(this));
                              } else {
                                $(this).find(".site-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
                                $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
                                $(this).addClass("filter");
                                //sitecollapse($("#site_adm").not($(this)));
                                collapse($("#ddmenu").not($(this)));
                                admcollapse($("#sys_adm").not($(this)));
                              }
                            })
                      }
                    });
                    
                    $('html').click(function() {
                    
                        sitecollapse($("#site_adm").not($(this)));
                        $("#site_adm").unbind('mouseenter mouseleave')
                        
                    });
                    
                    $('#site_adm').click(function(event){
                        event.stopPropagation();
                    });
                }
            });
            
            if(window.location.pathname==="/"){
                window.location.replace("./my.outages");
            }
            else if(window.location.pathname==="/Outage.Notify/public/"){
                window.location.replace("./my.outages");
            }

        } else {
                
            //Set Global Variables from User Profile to NULL
            myuid = null;
            uid_site = null;
            uid_email = null;
            uid_adm = null;
            uid_sys_adm = null;
            uid_approver = null;
            
            service_name = null;
            contact_name = null;
            otypes = null;
            users = null;
            
            if(!firebase.auth().currentUser){
                if(window.location.pathname!=="/public.html" && window.location.pathname!=="/public/public.html"){
                    if(window.location.pathname!=="/" && window.location.pathname!=="/public/"){
                    
                        window.location.replace("../");     
        
                    }    
                }
                
            }
          }
    });
  }
  
  //Load initApp
  window.onload = function() {
    initApp();
  };

  // Register
  $("#registerButton").on("click", function() {
    
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    
    /*global ref*/
    ref.createUser({email: email, password: password}, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  });
  
  // Login Email
  $( "#login" ).submit(function( event ) {
    
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        console.log(errorCode);
        console.log(errorMessage);
      }
      // [END_EXCLUDE]
    });
    // [END authwithemail]
    
    // Continue after Authentication
    //console.log("Authenticated successfully with payload:", authData);

    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { email: email } );

    /* Alerts the results */
    posting.done(function( data ) {
       //similar behavior as an HTTP redirect
      window.location.replace("./my.outages");
    });
    
    event.preventDefault();
    
  });
  
  // Logout
  $( "#logout" ).on("click", function() {
    
    handleSignOut();
    
    window.location.replace("./");
    
  });


//End of Script
})(jQuery); /*global jQuery*/

//OAuth Controls
    // [START googlecallback]
    function onSignIn(googleUser) {
      console.log('Google Auth Response', googleUser);
      
      if(!firebase.auth().currentUser){
          
          // We need to register an Observer on Firebase Auth to make sure auth is initialized.
          var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
              // Build Firebase credential with the Google ID token.
              var credential = firebase.auth.GoogleAuthProvider.credential(
                  googleUser.getAuthResponse().id_token);
                  
              var email = googleUser.getBasicProfile().hg;
              
              firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
                if (providers[0] === 'password') {
                    // Asks the user his password.
                    // In real scenario, you should handle this asynchronously.
                    var password = $('input[name=password]').val(); // TODO: implement promptUserForPassword.
                    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
                      return user.link(credential);
                    }).then(function() {
                      // Google account successfully linked to the existing Firebase user.
                      //goToApp();
                    });
                    
                }
                else {
                    // Sign in with credential from the Google user.
                    firebase.auth().signInWithCredential(credential).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // [START_EXCLUDE]
                        if (errorCode === 'auth/account-exists-with-different-credential') {
                          alert('You have already signed up with a different auth provider for that email.');
                          // If you are using multiple auth providers on your app you should handle linking
                          // the user's accounts here.
                        } else {
                          console.error(error);
                        }
                        // [END_EXCLUDE]
                      });
                      // [END authwithcred]
                    
                }
              });
              
            } else {
              console.log('User already signed-in Firebase.');
            }
          });
      }
    }
    // [END googlecallback]
    /**
     * Check that the given Google user is equals to the given Firebase user.
     */
    // [START checksameuser]
    function isUserEqual(googleUser, firebaseUser) {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    }
    // [END checksameuser]
    
    /**
     * Handle the sign out button press.
     */
    function handleSignOut() {
      /*global gapi*/
      var googleAuth = gapi.auth2.getAuthInstance();
      googleAuth.signOut().then(function() {
        firebase.auth().signOut();
      });
    }
    
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
    $("#sys_adm").unbind('mouseenter mouseleave')
    $("#site_adm").unbind('mouseenter mouseleave')
    $("#ddmenu").unbind('mouseenter mouseleave')
  } else {
    $(this).find(".menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
    $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
    $(this).addClass("filter");
    collapse($("#ddmenu").not($(this)));
    sitecollapse($("#site_adm").not($(this)));
    admcollapse($("#sys_adm").not($(this)));
    $("#sys_adm").unbind('mouseenter mouseleave')
    $("#site_adm").unbind('mouseenter mouseleave')
    $("#ddmenu").unbind('mouseenter mouseleave')
  
    $("#sys_adm").hover(function(){
      if ($(this).hasClass("filter")){
        //admcollapse($(this));
      } else {
        $(this).find(".adm-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
        $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
        $(this).addClass("filter");
        //admcollapse($("#sys_adm").not($(this)));
        collapse($("#ddmenu").not($(this)));
        sitecollapse($("#site_adm").not($(this)));
      }
    })
    
    $("#site_adm").hover(function(){
      if ($(this).hasClass("filter")){
        //sitecollapse($(this));
      } else {
        $(this).find(".site-menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
        $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
        $(this).addClass("filter");
        //sitecollapse($("#site_adm").not($(this)));
        collapse($("#ddmenu").not($(this)));
        admcollapse($("#sys_adm").not($(this)));
      }
    })
    
    $("#ddmenu").hover(function(){
      if ($(this).hasClass("filter")){
        //collapse($(this));
      } else {
        $(this).find(".menu").css({"display": "block", "transition": "transform 0.9s ease-out"});
        $(this).css({"height": "200px", "transition": "height 0.5s ease-out"});
        $(this).addClass("filter");
        //collapse($("#ddmenu").not($(this)));
        sitecollapse($("#site_adm").not($(this)));
        admcollapse($("#sys_adm").not($(this)));
      } 
    })
  }
  
});

$('html').click(function() {

    collapse($("#ddmenu").not($(this)));
    $("#ddmenu").unbind('mouseenter mouseleave')
    
});

$('#ddmenu').click(function(event){
    event.stopPropagation();
});

//Admin Functions
function admcollapse($elements) {
  if(uid_sys_adm===true){
    $elements.removeClass("filter");
    $elements.find(".adm-menu").css({"display": "none", "transition": "transform 1.0s ease-out"});
    $elements.css({"height": "2.4em", "transition": "height 0.5s ease-out"});
  }
}

function sitecollapse($elements) {
  if(uid_adm===true || uid_sys_adm===true){
    $elements.removeClass("filter");
    $elements.find(".site-menu").css({"display": "none", "transition": "transform 1.0s ease-out"});
    $elements.css({"height": "2.4em", "transition": "height 0.5s ease-out"});
  }
}

function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	var url = window.location.href;
	
	if(url.indexOf("public")>0){
        return re.exec(url.substr(0,url.indexOf("public")+7));
    }
    else {
        return re.exec(url.substr(0,url.indexOf(".com")+5));
    }
	
}