(function($) {
//Default Settings OnLoad
$(window).load(function() {

  waitForElement();
  
  //ABO/IBO Impact Control
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

  //Outage Type Control
  $('select[name=otype]').change(function(){

    var ref = firebase.database().ref("sites/" + uid_site + "/outage_types/");
    
    ref.orderByKey().equalTo($('select[name=otype]').val()).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var otype_set = data.val();
    
        var showEndD = otype_set.showEndD;
    
        if(showEndD===true){
          $('#endDate').fadeIn();
          $("#time-endd").prop('required',true);
          $("#time-endt").prop('required',true);
        
          if($("#time-startd").val()!==""){
              pop_timeFrame();
          }
        }
        else {
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
    });

  });

  //TimeFrame Control
  $("input[name*='time-']").change(function(){
    pop_timeFrame();
  });

  //TimeZone Control
  $("select[name*='time-']").change(function(){
    pop_timeFrame();
  });

	$('#ABOimpact').fadeOut();

});

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

//Form OnSubmit
$('form[name=outage]').submit(function(event) {

  /* stop form from submitting normally */
    event.preventDefault();

  //Save Data
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

    var saveNote;
    
    //Add when Site is filled
    if(uid_site!==""){
        saveNote = add_outage(uid_site,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket,myuid);
    }
    
  //Pass list item ID.
  $('#outageid').val(saveNote)

    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { outageid: $('#outageid').val() } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url + "?outageid=" + saveNote);
    });

});

 function waitForElement(){
    if(typeof uid_site !== "undefined"){
      //Populate Form.Init
      if (uid_site !== "") {
        pop_syslist(uid_site,"Yes");
        pop_contlist(uid_site,"Yes");
        pop_outagelist(uid_site,"Yes");
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
