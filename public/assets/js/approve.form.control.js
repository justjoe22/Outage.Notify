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
        
        var message = 'Hello '+ appvArry[0] +' <br>Please approve the outage.<br>';
        message += '<a href="'+window.location+'">Preview and Approve</a><br>';
        message += ' Or Not. <br><br> Regards, <br>'+uid_name;
        
        //Email approver
        $.post('mailclient.php',{"to": appvArry[1] , "message":message , "from": uid_email , "name": uid_name},function(response) 
        {     
            //response = $.parseJSON(response);           
            console.log(response);
        });
        
    }

});

//End of Script
})(jQuery);
