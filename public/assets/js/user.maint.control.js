/*global uid_site*/
/*global pop_userlist*/
/*global update_user*/
/*global add_user*/
/*global jQuery*/

(function($) {

//Default Settings OnLoad
$(window).load(function() {

  //Populate Form.Preview
  waitForElement();
  
});

 function waitForElement(){
    if(typeof uid_site !== "undefined"){
      //Populate Form.Init
      if (uid_site !== "") {
        pop_userlist(uid_site,"No");
      }
      else {
          waitForElement();
      }
    }
    else{
        setTimeout(function(){
            waitForElement();
        },250);
    }
 }
 
 function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
 
//Form OnSubmit
$('form[name=user]').submit(function(event) {
  event.preventDefault();
  
  var step1 = false,
      step2 = false,
      step3 = false;
  
  var full_name = $('input[name=full_name]').val(),
    email = $('input[name=email]').val(), 
    active = $('input[name=active]').is(':checked'),
    approver = $('input[name=approver]').is(':checked'), 
    site_admin = $('input[name=sadmin]').is(':checked'),
    userid = $('input[name=user_id]').val();
    
    if (userid!==""){
        update_user(uid_site,userid,full_name,email,active,approver,site_admin);
    }
    else {
        var password = randomPassword(10);
        
        userid = add_user(uid_site,email,password,full_name,active,approver,site_admin);
     
        //add_user_profile(uid_site,userid,full_name,email,active,approver,site_admin);   
    }
    
     /* get some values from elements on the page: */
     var $form = $( this ),
         url = $form.attr( 'action' );

     /* Send the data using post */
     var posting = $.post( url, { userid: userid } );

     /* Alerts the results */
     posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      
      //window.location.replace(url);
     });

});

//End of Script
})(jQuery);