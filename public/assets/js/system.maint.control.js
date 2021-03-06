/*global uid_site*/
/*global pop_syslist*/
/*global desc*/
/*global sysid*/
/*global update_system*/
/*global add_system*/
/*global myuid*/
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
        pop_syslist(uid_site,"No");
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
$('form[name=system]').submit(function(event) {
  var pub_name = $('input[name=pub_name]').val(), _
    desc = $('input[name=desc]').val(), 
    sysid = $('input[name=sys_id]').val();
    
    if (sysid!==""){
        update_system(uid_site,pub_name,desc,sysid)
    }
    else {
        sysid = add_system(uid_site,pub_name,desc,myuid);
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
