(function($) {

var outageid = "";

//Default Settings OnLoad
$(window).load(function() {

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
  uid_site = getUrlParameter('site');
  
  $('#outageid').val(outageid);
  
  //Hide Google Authentication
  $('.g-signin2').hide();
  
  //Populate Form.Preview
  pop_pubpreview(outageid, uid_site);
  
});

//End of Script
})(jQuery);
