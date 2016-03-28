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
        pop_contlist(uid_site,"No");
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
$('form[name=contact]').submit(function(event) {
  var cont_name = $('input[name=cont_name]').val(), _
    cont_email = $('input[name=cont_email]').val(), 
    cont_id = $('input[name=cont_id]').val();
    
    if (cont_id!==""){
        update_contact(uid_site,cont_name,cont_email,cont_id)
    }
    else {
        cont_id = add_contact(uid_site,cont_name,cont_email,myuid);
    }
    
    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { cont_id: cont_id } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url);
    });

});

//End of Script
})(jQuery);
