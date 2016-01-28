
  //Add List Item to Outage System
  function AddListItem(otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket){
    var newId = "";

    $().SPServices({
       operation: "UpdateListItems",
       async: false,
       webURL: "/sites/help/outage/",
       batchCmd: "New",
       listName: "{F6F0A3E6-739F-4480-9126-692927FD1E6D}",
       valuepairs: [["OutageType", otype],["PointContact", pcontact],["Title", service],["TimeFrame", timeframe],["startd", startd],["startt", startt],["endd", endd], ["endt", endt], ["TimeZone", timezone], ["ToDo", todo],["BusinessImpact", bimpact],["chkABO", chkABO],["ABOimpact", txtABO],["ReceivingMessage", wrmessage],["ContactQuestions", contact],["TicketN", ticket]],
       completefunc: function(xData, Status) {

        //alert("List Item successfully Created.");
        var out = $().SPServices.SPDebugXMLHttpResult({
          node: xData.responseXML
        });

        // Message was sent
        if (Status == 'success') {
            newId = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
        }
        // There was an error
        else {
          newId = "None";
        }
       }
    });

    return newId
  }

  //Update List Item to Outage System
  function UpdateListItem(outageid,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket){

    $().SPServices({
       operation: "UpdateListItems",
       async: false,
       webURL: "/sites/help/outage/",
       listName: "{F6F0A3E6-739F-4480-9126-692927FD1E6D}",
       ID: outageid,
       valuepairs: [["OutageType", otype],["PointContact", pcontact],["Title", service],["TimeFrame", timeframe],["startd", startd],["startt", startt],["endd", endd], ["endt", endt], ["TimeZone", timezone], ["ToDo", todo],["BusinessImpact", bimpact],["chkABO", chkABO],["ABOimpact", txtABO],["ReceivingMessage", wrmessage],["ContactQuestions", contact],["TicketN", ticket]],
       completefunc: function(xData, Status) {

        var out = $().SPServices.SPDebugXMLHttpResult({
          node: xData.responseXML
        });

        // Message was sent
        if (Status == 'success') {
          $('#outage').fadeOut();
          $('#outagePreview').fadeIn();
        }
        // There was an error
        else {
          alert('Save Failed: ' + out);
        }
       }
    });

  }

  //Delete List Item to Outage System
  function DeleteListItem(outageid){
    var msg;

    $().SPServices({
      operation:"UpdateListItems",
      async: false,
      batchCmd: "Delete",
      webURL: "/sites/help/outage/",
      listName: "{F6F0A3E6-739F-4480-9126-692927FD1E6D}",
      ID: outageid,
      completefunc:function(xData, Status){
        var out = $().SPServices.SPDebugXMLHttpResult({
          node: xData.responseXML
        });

        // Message was sent
        if (Status == 'success') {
          msg = "Outage Deleted";
        }
        // There was an error
        else {
          alert('Delete Failed: ' + out);
        }
      }
    });

    return msg
  }

  //Change Status of Outage System
  function change_status(outageid,statusid){

    $().SPServices({
       operation: "UpdateListItems",
       async: false,
       webURL: "/sites/help/outage/",
       listName: "{F6F0A3E6-739F-4480-9126-692927FD1E6D}",
       ID: outageid,
       valuepairs: [["Approval", statusid]],
       completefunc: function(xData, Status) {

        //alert("List Item successfully Created.");
        var out = $().SPServices.SPDebugXMLHttpResult({
          node: xData.responseXML
        });

        // Message was sent
        if (Status == 'success') {
          window.location.replace("approve.outage.html?outageid=" + outageid);
        }
        // There was an error
        else {
          alert('Save Failed: ' + out);
        }
       }
    });

  }
  
  //Initial MyOutages View Form.Setup
  function pop_forminit(){

    //Get Outage for Preview
    $().SPServices({
    operation: "GetListItems",
    async: false,
    webURL: "/sites/help/outage/",
    listName: "{F6F0A3E6-739F-4480-9126-692927FD1E6D}",
    viewName: "{E67E9543-E152-4BB7-BD88-09D62D5E9623}",
    CAMLViewFields: "<ViewFields><FieldRef Name='Approval' /><FieldRef Name='OutageType' /><FieldRef Name='PointContact' /><FieldRef Name='Title' /><FieldRef Name='TimeFrame' /><FieldRef Name='startd' /><FieldRef Name='startt' /><FieldRef Name='endd' /> <FieldRef Name='endt' /> <FieldRef Name='TimeZone' /> <FieldRef Name='ToDo' /><FieldRef Name='BusinessImpact' /><FieldRef Name='chkABO' /><FieldRef Name='ABOimpact' /><FieldRef Name='ReceivingMessage' /><FieldRef Name='ContactQuestions' /><FieldRef Name='TicketN' /></ViewFields>",

    completefunc: function (xData, Status) {
      $(xData.responseXML).SPFilterNode("z:row").each(function() {

        //Start of Form Class
        var vHTML = "<div class='main-content'><div class='form-basic'>";

          //Summary
          vHTML += "<div class='form-title-row'><h3>";
          vHTML += $(this).attr("ows_OutageType") + ": ";
          vHTML += $(this).attr("ows_Title") + ", ";
          vHTML += $(this).attr("ows_TimeFrame");
          vHTML += "</h3></div>";

          //Outage Menu
          vHTML += "<div class='submenu'>";
          if($(this).attr("ows_Approval")=="Draft"){
            //Edit Button
            vHTML += "<a href='preview.outage.html?outageid=" + $(this).attr("ows_ID") + "&st=edit' name='edit'>";
            vHTML += "<i class='fa fa-pencil-square'></i> Edit</a>";
            //Preview Button
            vHTML += "<a href='preview.outage.html?outageid=" + $(this).attr("ows_ID") + "' name='prev'>";
            vHTML += "<i class='fa fa-television'></i> Preview</a>";
          }
          else if($(this).attr("ows_Approval")=="Pending"){
            //Preview Button
            vHTML += "<a href='approve.outage.html?outageid=" + $(this).attr("ows_ID") + "' name='prev'>";
            vHTML += "<i class='fa fa-television'></i> Preview</a>";
          }
          vHTML += "</div>";

          vHTML += "<div class='form-row'>";
          vHTML += "<h2>Status:</h2>";
          vHTML += "<p>" + $(this).attr("ows_Approval") + "</p><br />";
          vHTML += "<h2>Ticket #:</h2>";
          vHTML += "<p>" + $(this).attr("ows_TicketN") + "</p><br />";
          vHTML += "<h2>Contact:</h2>";
          vHTML += "<p>" + $(this).attr("ows_PointContact") + "</p>";
          vHTML += "</div>";

          //End of Form Class
          vHTML += "</div></div>";

          $("#outagelist").append(vHTML);

        });
      }
      });

  }

  //Populate Form.Preview
  function pop_formpreview(outageid){

    //Get Outage for Preview
    $().SPServices({
    operation: "GetListItems",
    async: false,
    webURL: "/sites/help/outage/",
    listName: "{F6F0A3E6-739F-4480-9126-692927FD1E6D}",
    CAMLViewFields: "<ViewFields><FieldRef Name='Approval' /><FieldRef Name='OutageType' /><FieldRef Name='PointContact' /><FieldRef Name='Title' /><FieldRef Name='TimeFrame' /><FieldRef Name='startd' /><FieldRef Name='startt' /><FieldRef Name='endd' /> <FieldRef Name='endt' /> <FieldRef Name='TimeZone' /> <FieldRef Name='ToDo' /><FieldRef Name='BusinessImpact' /><FieldRef Name='chkABO' /><FieldRef Name='ABOimpact' /><FieldRef Name='ReceivingMessage' /><FieldRef Name='ContactQuestions' /><FieldRef Name='TicketN' /></ViewFields>",
    CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Text'>" + outageid + "</Value></Eq></Where></Query>",

    completefunc: function (xData, Status) {
      $(xData.responseXML).SPFilterNode("z:row").each(function() {

        //Populate DIV with HTML
        var vHTML = "<div class='submenu'>";
          if($(this).attr("ows_Approval")=="Draft"){
            vHTML += "<a href='#' name='edit'><i class='fa fa-pencil-square'></i> Edit</a>";
          }
          vHTML += "</div>";

          vHTML += "<div class='form-title-row'><h1>";
          vHTML += $(this).attr("ows_OutageType") + ": ";
          vHTML += $(this).attr("ows_Title") + ", ";
          vHTML += $(this).attr("ows_TimeFrame");
          vHTML += "</h1></div>";

          vHTML += "<div class='form-row'><h2>What service is affected?</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_Title") + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>What is the time frame?</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_TimeFrame") + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>What do I need to do?</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_ToDo") + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>What is the business impact?</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_BusinessImpact") + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>Who is receiving this message?</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_ReceivingMessage") + "</p>";
          vHTML += "</div>";

          if($(this).attr("ows_chkABO")==1){
            vHTML += "<div class='form-row'><h2>IBO/ABO Impact?</h2><br>";
            vHTML += "<p>" + $(this).attr("ows_ABOimpact") + "</p>";
            vHTML += "</div>";
          }

          vHTML += "<div class='form-row'><h2>Who do I need to contact if I have questions?</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_ContactQuestions") + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>Ticket #</h2><br>";
          vHTML += "<p>" + $(this).attr("ows_TicketN") + "</p>";
          vHTML += "</div>";

          if($(this).attr("ows_Approval")=="Draft"){
            vHTML += "<div class='form-row'>";
            vHTML += "<button type='submit' name='approval'>Submit for Approval</button>";
            vHTML += "</div>";
          }

          document.getElementById("outagePreview").innerHTML = vHTML;

          //Confirm
          vHTML = "<div class='form-title-row'><h2>Are you sure?</h2><br>";
          vHTML += "<a href='#' name='yes'>";
          vHTML += "<i class='fa fa-check'></i> Yes</a>";
          vHTML += "<a href='#' name='no'>";
          vHTML += "<i class='fa fa-times'></i> No</a>";
          vHTML += "</div>";
          document.getElementById("confirm").innerHTML = vHTML;

          //Populate Form
          $('select[name=otype]').val($(this).attr("ows_OutageType"));
          $('input[name=pcontact]').val($(this).attr("ows_PointContact"));
          $('select[name=service]').val($(this).attr("ows_Title"));
          document.getElementById("timeFrame").innerHTML = $(this).attr("ows_TimeFrame");
          $('input[name=time-startd]').val($(this).attr("ows_startd"));
          $('input[name=time-startt]').val($(this).attr("ows_startt"));
          $('input[name=time-endd]').val($(this).attr("ows_endd"));
          $('input[name=time-endt]').val($(this).attr("ows_endt"));
          $('select[name=time-tzone]').val($(this).attr("ows_TimeZone"));
          $('input[name=todo]').val($(this).attr("ows_ToDo"));
          $('textarea[name=bimpact]').val($(this).attr("ows_BusinessImpact"));
          if($(this).attr("ows_chkABO")==1){
              $('input[name=chkABO]').prop('checked',true);
          }
          else {
              $('input[name=chkABO]').prop('checked',false);
          }
          $('textarea[name=txtABO]').val($(this).attr("ows_ABOimpact"));
          $('select[name=wrmessage]').val($(this).attr("ows_ReceivingMessage"));
          $('input[name=contact]').val($(this).attr("ows_ContactQuestions"));
          $('input[name=ticket]').val($(this).attr("ows_TicketN"));

        });
      }
      });

  }
