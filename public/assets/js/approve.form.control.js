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
        
        var apvrArray = pop_one_approver(uid_site,approver);
        
        alert("Your approver is "+apvrArray[0]+". Please email them at "+apvrArray[1]+".");
        // var data = {
        //     name: apvrArray[0],
        //     email: apvrArray[1],
        //     message: "message"
        // };
        
        // $.ajax({
        //     type: "POST",
        //     url: "mailclient.php",
        //     data: data,
        //     success: function(result){
        //         console.log("Success"+result);
        //     },
        //     error: function(result){
        //         console.log("Failed"+result);
        //     }
        // });
        

    }
    

});
//End of Script
})(jQuery);
