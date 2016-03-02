(function($) {

var outageid = "";

//Default Settings OnLoad
$(window).load(function() {
    
    $("#approvers").fadeOut();
    $("#approve").fadeOut();

  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };

  outageid = getUrlParameter('outageid');
  
  $('#outageid').val(outageid);
  
  //Populate Form.Preview
  waitForElement();
  
});

 function waitForElement(){
    if(typeof uid_site !== "undefined"){
      //Populate Form.Init
      if (uid_site !== "") {
        pop_formpreview(outageid, uid_site);
        
        if (uid_approver===true) {
            //Hide Approver List
            $("#approvers").fadeOut();
            $("#approve").fadeIn();
        }    
        else {
            pop_approvers(uid_site);
            
            //Show Approver List
            $("#approvers").fadeIn();
            $("#approve").fadeOut();
        }
        
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
$('form[name=approvers]').submit(function(event) {

  /* stop form from submitting normally */
    event.preventDefault();

  //Save Data
  var approver = $('input[name=approver]:checked').val();

    //Send to approver
    if(approver!==""){
        
        //Save Approver
        assign_approver(uid_site,outageid,approver);
        
        //Get approver
        var appvArry = pop_one_approver(uid_site,approver);
        
        //Email approver
        var sendGmail = function(opts){
            var str = 'http://mail.google.com/mail/?view=cm&fs=1'+
                      '&to=' + opts.to +
                      '&su=' + opts.subject +
                      '&body=' + opts.message.replace(/\n/g,'%0A') +
                      '&ui=1';
            
            window.open(
               str,
              '_blank' // <- This is what makes it open in a new window.
            );
        }
        
        sendGmail({
            to: appvArry[1],
            subject: 'NEW Approval Required',
            message: 'Hello '+ appvArry[0] +' \n'+
                     'Please approve. \n'+
                     'Or Not.'
        });
    }

});

//End of Script
})(jQuery);
