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
        pop_outagelist(uid_site,"No");
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
$('form[name=fmotype]').submit(function(event) {
  var otype = $('input[name=otype]').val(), _
    prefix = $('input[name=prefix]').val(), 
    showendd = $('input[name=showendd]').is(':checked'), 
    otype_key = $('input[name=otype_key]').val();
    
    if (otype_key!==""){
        update_otype(uid_site,otype,prefix,showendd,otype_key)
    }
    else {
        otype_key = add_otype(uid_site,otype,prefix,showendd,myuid);
    }
    
    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { otype_key: otype_key } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url);
    });

});

//End of Script
})(jQuery);
