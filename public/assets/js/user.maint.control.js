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
  var pub_name = $('input[name=pub_name]').val(), _
    desc = $('input[name=desc]').val(), 
    userid = $('input[name=user_id]').val();
    
    if (userid!==""){
        update_system(uid_site,pub_name,desc,userid)
    }
    else {
        userid = add_system(uid_site,pub_name,desc,myuid);
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