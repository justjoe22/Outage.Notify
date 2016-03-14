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
  var state = getUrlParameter('st');


  $('#outageid').val(outageid);
  $('#state').val(state);

  //Hide Edit Form
  if(state=="edit"){
    $('#outagePreview').fadeOut();
    $('#outage').fadeIn();
  }
  else {
    $('#outage').fadeOut();
    $('#outagePreview').fadeIn();
  }

  $('#confirm').fadeOut();

  //Populate Form.Preview
  waitForElement();

  //Add to Control
  $('input[name=chkABO]').change(function(){

    if($(this).is(':checked'))
    {
        $('#ABOimpact').fadeIn();
        $("#txtABO").prop('required',true);
    }
    else
    {
        $('#ABOimpact').fadeOut();
        $("#txtABO").prop('required',false);
    }

  });

  //Add to Control
  $('select[name=otype]').change(function(){

    if($(this).val()=="PLANNED OUTAGE")
    {
        $('#endDate').fadeIn();
        $("#time-endd").prop('required',true);
        $("#time-endt").prop('required',true);

        if($("#time-startd").val()!==""){
            pop_timeFrame();
        }
    }
    else if($(this).val()=="MAINTENANCE")
    {
        $('#endDate').fadeIn();
        $("#time-endd").prop('required',true);
        $("#time-endt").prop('required',true);

        if($("#time-startd").val()!==""){
            pop_timeFrame();
        }

    }
    else if($(this).val()=="UNPLANNED OUTAGE")
    {
        $('#endDate').fadeOut();
        $("#time-endd").prop('required',false);
        $("#time-endd").val("");
        $("#time-endt").prop('required',false);
        $("#time-endt").val("");

        if($("#time-startd").val()!==""){
            pop_timeFrame();
        }
    }
    else if($(this).val()=="USI")
    {
        $('#endDate').fadeOut();
        $("#time-endd").prop('required',false);
        $("#time-endd").val("");
        $("#time-endt").prop('required',false);
        $("#time-endt").val("");

        if($("#time-startd").val()!==""){
            pop_timeFrame();
        }
    }

  });

  //TimeFrame Control
  $("input[name*='time-']").change(function(){
    pop_timeFrame();
  });

  //TimeZone Control
  $("select[name*='time-']").change(function(){
    pop_timeFrame();
  });

});

 function waitForElement(){
    if(typeof uid_site !== "undefined"){
      //Populate Form.Init
      if (uid_site !== "") {
        
        pop_syslist(uid_site,"Yes");
        
        pop_formpreview(outageid, uid_site);
        
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
$('form[name=outage]').submit(function(event) {
  var otype = $('select[name=otype]').val(), _
    pcontact = $('input[name=pcontact]').val(), _
    service = $('select[name=service]').val(), _
    timeframe = $('#timeFrame').html(), _
    startd = $('input[name=time-startd]').val(), _
    startt = $('input[name=time-startt]').val(), _
    endd = $('input[name=time-endd]').val(), _
    endt = $('input[name=time-endt]').val(), _
    timezone = $('select[name=time-tzone]').val(), _
    todo = $('input[name=todo]').val(), _
    bimpact = $('textarea[name=bimpact]').val(), _
    chkABO, _
    txtABO = $('textarea[name=txtABO]').val(), _
    wrmessage = $('select[name=wrmessage]').val(), _
    contact = $('input[name=contact]').val(), _
    ticket = $('input[name=ticket]').val();

    if ($('input[name=chkABO]').is(':checked')===true){
      chkABO=1;
    }
    else {
      chkABO=0;
    }

    var outageid = $('#outageid').val();

    update_outage(uid_site,outageid,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket);

    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { outageid: outageid } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url + "?outageid=" + outageid + "&st=save");
    });

});

//End of Script
})(jQuery);


//Populate timeFrame
function pop_timeFrame(){
  var buildTime = "";
  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //Start Date
  var startd = document.getElementById("time-startd").value;
  var actualDay = startd.substr(startd.length-2,startd.length).replace(/\b0(?=\d)/g, '');

  startd = startd.substr(0,startd.length-2) + actualDay;

  var startDay = new Date(startd);
  var weekday = weekdays[startDay.getDay()];

  var date;
  if(parseFloat(actualDay)==startDay.getDate()){
      date = startDay.getDate();
  }
  else {
      date = startDay.getDate() + 1;
  }

  var month = months[startDay.getMonth()];
  var year = startDay.getFullYear();

  //End Date
  var endd = document.getElementById("time-endd").value;
  if (endd!==""){
    var eactualDay = endd.substr(endd.length-2,endd.length).replace(/\b0(?=\d)/g, '');

    endd = endd.substr(0,endd.length-2) + eactualDay;

    var endDay = new Date(endd);
    var eweekday = weekdays[endDay.getDay()];

    var edate;
    if(parseFloat(eactualDay)==endDay.getDate()){
        edate = endDay.getDate();
      }
      else {
        edate = endDay.getDate() + 1;
      }

      var emonth = months[endDay.getMonth()];
      var eyear = endDay.getFullYear();
    }

  buildTime += weekday + ", " + date + " " + month + " " + year;
  if (startd==endd){
    buildTime += " from ";
    buildTime += document.getElementById("time-startt").value;
    buildTime += " to ";
    buildTime += document.getElementById("time-endt").value;
  }
  else {
    buildTime += " at ";
    buildTime += document.getElementById("time-startt").value;

    if (endd!==""){
      buildTime += " to ";
      buildTime += eweekday + ", " + edate + " " + emonth + " " + eyear;
      buildTime += " at ";
      buildTime += document.getElementById("time-endt").value;
    }
  }

  buildTime += " ";
  buildTime += document.getElementById("time-tzone").value;

  document.getElementById("timeFrame").innerHTML = buildTime;
}
