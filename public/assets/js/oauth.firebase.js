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


(function($) {

mail_server = 'http://54.152.4.108:8080/';

//Main URL for Database / Authentication
var main_url = "https://resplendent-inferno-4226.firebaseio.com/";
var ref = new Firebase( main_url.normalize() );

  // Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    
    //Set UID variable
    myuid = authData.uid;
    
     //Get User uid_site
     var user_url = main_url + "users/" + myuid;
     var rUsers = new Firebase( user_url.normalize() );
     
    rUsers.once("value", function(snap) {
      rMessage = snap.val();
      
      //Set Global Variables from User Profile
      uid_site = rMessage.site;
      uid_name = rMessage.full_name;
      uid_email = rMessage.email;
      uid_adm = rMessage.site_admin;
      uid_sys_adm = rMessage.sys_admin;
      uid_approver = rMessage.approver;
      
      service_name = GetServices(uid_site);
      contact_name = GetContacts(uid_site);
      otypes = GetOType(uid_site);
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
    
    if(ref.getAuth()===null){
        if(window.location.pathname!=="/Outage.Notify/public/public.html"){
            if(window.location.pathname!=="/" && window.location.pathname!=="/Outage.Notify/public/"){
            
                window.location.replace("../");     

            }    
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