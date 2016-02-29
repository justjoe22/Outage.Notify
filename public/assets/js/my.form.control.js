/*Script functionality*/

(function($) {
    
  //Default Settings OnLoad
 $(window).load(function() {
    
    waitForElement();
    
 });

 //uid_site = "bussiness1";
 function waitForElement(){
    if(typeof uid_site !== "undefined"){
      //Populate Form.Init
      if (uid_site !== "") {
        
        //Set Approver View
        if(uid_approver===true){
          outages_by_approver(uid_site,myuid);
        }
        
        pop_forminit(uid_site,myuid);
        
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
     
//End of Script
})(jQuery);
