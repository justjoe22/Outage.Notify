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
 
//Form OnSubmit
$('form[name=user]').submit(function(event) {
  //event.preventDefault();
  
  var full_name = $('input[name=full_name]').val(), _
    email = $('input[name=email]').val(), 
    active = $('input[name=active]').is(':checked'),
    approver = $('input[name=approver]').is(':checked'), 
    site_admin = $('input[name=sadmin]').is(':checked'), 
    userid = $('input[name=user_id]').val();
    
    if (userid!==""){
        update_user(uid_site,userid,full_name,email,active,approver,site_admin);
    }
    else {
        userid = add_user(uid_site,full_name,email,active,approver,site_admin);
    }
    
    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { sysid: sysid } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url);
    });

});

//End of Script
})(jQuery);