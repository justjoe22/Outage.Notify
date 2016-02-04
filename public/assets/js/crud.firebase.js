
  //Add List Item to Outage System
  function add_outage(form_site,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket){
    var postID;
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
       ref.push({status: "Draft", otype: otype, pcontact: pcontact, service: service, timeframe: timeframe, startd: startd, startt: startt, endd: endd, endt: endt, timezone: timezone, todo: todo, bimpact: bimpact, chkabo: chkABO, txtabo: txtABO, wrmessage: wrmessage, contact: contact, ticket: ticket});
       
       ref.on('child_added', function(snapshot) {
        postID = snapshot.key();
      });

    return postID
  }

  //Update List Item to Outage System
  function UpdateListItem(outageid,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket){

    var myDataRef = new Firebase('https://resplendent-inferno-4226.firebaseio.com/outages/');
    
       var myItemRef = myDataRef.child(outageid);
       
       myItemRef.update({otype: otype, pcontact: pcontact, service: service, timeframe: timeframe, startd: startd, startt: startt, endd: endd, endt: endt, timezone: timezone, todo: todo, bimpact: bimpact, chkabo: chkABO, txtabo: txtABO, wrmessage: wrmessage, contact: contact, ticket: ticket}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            window.location.replace("preview.outage.html?outageid=" + outageid);
          }
        });
   
  }

  //Delete List Item to Outage System
  function DeleteListItem(outageid){
    var msg;

    // Get a reference to our posts
    var ref = new Firebase('https://resplendent-inferno-4226.firebaseio.com/outages/');
    
    // Get the data on a post that has been removed
    ref.on("child_removed", function(snapshot) {
      var deletedPost = snapshot.val();
      msg="The blog post titled '" + deletedPost.title + "' has been deleted";
    });

    return msg
  }

  //Change Status of Outage System
  function change_status(outageid,statusid){

    var myDataRef = new Firebase('https://resplendent-inferno-4226.firebaseio.com/outages/');
    
       var myItemRef = myDataRef.child(outageid);
       
       myItemRef.update({status: statusid}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            window.location.replace("approve.outage.html?outageid=" + outageid);
          }
        });

  }
  
  //Initial MyOutages View Form.Setup
  function pop_forminit(form_site){

    //Get Outage for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
        
        //Start of Form Class
        var vHTML = "<div class='main-content'><div class='form-basic'>";

          //Summary
          vHTML += "<div class='form-title-row'><h3>";
          vHTML += message.otype + ": ";
          vHTML += message.service + ", ";
          vHTML += message.timeframe;
          vHTML += "</h3></div>";

          //Outage Menu
          vHTML += "<div class='submenu'>";
          if(message.status=="Draft"){
            //Edit Button
            vHTML += "<a href='preview.outage.html?outageid=" + data.key() + "&st=edit' name='edit'>";
            vHTML += "<i class='fa fa-pencil-square'></i> Edit</a>";
            //Preview Button
            vHTML += "<a href='preview.outage.html?outageid=" + data.key() + "' name='prev'>";
            vHTML += "<i class='fa fa-television'></i> Preview</a>";
          }
          else if(message.status=="Pending"){
            //Preview Button
            vHTML += "<a href='approve.outage.html?outageid=" + data.key() + "' name='prev'>";
            vHTML += "<i class='fa fa-television'></i> Preview</a>";
          }
          vHTML += "</div>";

          vHTML += "<div class='form-row'>";
          vHTML += "<h2>Status:</h2>";
          vHTML += "<p>" + message.status + "</p><br />";
          vHTML += "<h2>Ticket #:</h2>";
          vHTML += "<p>" + message.ticket + "</p><br />";
          vHTML += "<h2>Contact:</h2>";
          vHTML += "<p>" + message.pcontact + "</p>";
          vHTML += "</div>";

          //End of Form Class
          vHTML += "</div></div>";

          $("#outagelist").append(vHTML);
    
      });    
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }

  //Populate Form.Preview
  function pop_formpreview(outageid, form_site){

    //Get Outage for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().equalTo(outageid).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
        //Populate DIV with HTML
        var vHTML = "<div class='submenu'>";
          if(message.status=="Draft"){
            vHTML += "<a href='#' name='edit'><i class='fa fa-pencil-square'></i> Edit</a>";
          }
          vHTML += "</div>";

          vHTML += "<div class='form-title-row'><h1>";
          vHTML += message.otype + ": ";
          vHTML += message.service + ", ";
          vHTML += message.timeframe;
          vHTML += "</h1></div>";

          vHTML += "<div class='form-row'><h2>What service is affected?</h2><br>";
          vHTML += "<p>" + message.service + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>What is the time frame?</h2><br>";
          vHTML += "<p>" + message.timeframe + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>What do I need to do?</h2><br>";
          vHTML += "<p>" + message.todo + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>What is the business impact?</h2><br>";
          vHTML += "<p>" + message.bimpact + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>Who is receiving this message?</h2><br>";
          vHTML += "<p>" + message.wrmessage + "</p>";
          vHTML += "</div>";

          if(message.chkabo==1){
            vHTML += "<div class='form-row'><h2>IBO/ABO Impact?</h2><br>";
            vHTML += "<p>" + message.txtabo + "</p>";
            vHTML += "</div>";
          }

          vHTML += "<div class='form-row'><h2>Who do I need to contact if I have questions?</h2><br>";
          vHTML += "<p>" + message.contact + "</p>";
          vHTML += "</div>";

          vHTML += "<div class='form-row'><h2>Ticket #</h2><br>";
          vHTML += "<p>" + message.ticket + "</p>";
          vHTML += "</div>";

          if(message.status=="Draft"){
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
          $('select[name=otype]').val(message.otype);
          $('input[name=pcontact]').val(message.pcontact);
          $('select[name=service]').val(message.service);
          document.getElementById("timeFrame").innerHTML = message.timeframe;
          $('input[name=time-startd]').val(message.startd);
          $('input[name=time-startt]').val(message.startt);
          $('input[name=time-endd]').val(message.endd);
          $('input[name=time-endt]').val(message.endt);
          $('select[name=time-tzone]').val(message.timezone);
          $('input[name=todo]').val(message.todo);
          $('textarea[name=bimpact]').val(message.bimpact);
          if(message.chkabo==1){
              $('input[name=chkABO]').prop('checked',true);
          }
          else {
              $('input[name=chkABO]').prop('checked',false);
          }
          $('textarea[name=txtABO]').val(message.txtabo);
          $('select[name=wrmessage]').val(message.wrmessage);
          $('input[name=contact]').val(message.contact);
          $('input[name=ticket]').val(message.ticket);
          
          //Edit Button
          $('a[name=edit]').click(function(){
        
            $('#outagePreview').fadeOut();
        
            $('#outage').fadeIn();
        
          });
        
          //Approval Button
          $('button[name=approval]').click(function(){
        
            $('#confirm').fadeIn();
            $('#confirm').focus();
        
            window.location.replace("#confirm");
        
          });
        
          //Submit for Approval
          $('a[name=yes]').click(function(){
        
            change_status(outageid,"Pending");
        
          });
        
          //No
          $('a[name=no]').click(function(){
        
            $('#confirm').fadeOut();
        
          });
          
          //ABO/IBO Impact Control
          if($('input[name=chkABO]').is(':checked'))
          {
              $('#ABOimpact').fadeIn();
              $("#txtABO").prop('required',true);
          }
          else
          {
              $('#ABOimpact').fadeOut();
              $("#txtABO").prop('required',false);
          }
          
          //Outage Type Control
          if($('select[name=otype]').val()=="PLANNED OUTAGE")
          {
              $('#endDate').fadeIn();
              $("#time-endd").prop('required',true);
              $("#time-endt").prop('required',true);
        
              if($("#time-startd").val()!==""){
                  pop_timeFrame();
              }
          }
          else if($('select[name=otype]').val()=="MAINTENANCE")
          {
              $('#endDate').fadeIn();
              $("#time-endd").prop('required',true);
              $("#time-endt").prop('required',true);
        
              if($("#time-startd").val()!==""){
                  pop_timeFrame();
              }
        
          }
          else if($('select[name=otype]').val()=="UNPLANNED OUTAGE")
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
          else if($('select[name=otype]').val()=="ABO-FACING USI")
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
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }
