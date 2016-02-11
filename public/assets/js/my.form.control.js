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
        pop_forminit(uid_site);
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
