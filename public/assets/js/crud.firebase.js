//Add List Item to Outage System
  function add_outage(form_site,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket,created){
    var postID;
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
       ref.push({status: "Draft", otype: otype, pcontact: pcontact, service: service, timeframe: timeframe, startd: startd, startt: startt, endd: endd, endt: endt, timezone: timezone, todo: todo, bimpact: bimpact, chkabo: chkABO, txtabo: txtABO, wrmessage: wrmessage, contact: contact, ticket: ticket, created: created});
       
       ref.on('child_added', function(snapshot) {
        postID = snapshot.key();
      });

    return postID
  }

  //Update List Item to Outage System
  function update_outage(form_site,outageid,otype,pcontact,service,timeframe,startd,startt,endd,endt,timezone,todo,bimpact,chkABO,txtABO,wrmessage,contact,ticket){

    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
       var myItemRef = ref.child(outageid);
       
       myItemRef.update({otype: otype, pcontact: pcontact, service: service, timeframe: timeframe, startd: startd, startt: startt, endd: endd, endt: endt, timezone: timezone, todo: todo, bimpact: bimpact, chkabo: chkABO, txtabo: txtABO, wrmessage: wrmessage, contact: contact, ticket: ticket}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            window.location.replace("preview.outage.html?outageid=" + outageid);
          }
        });
   
  }
  
  //Assign Approver
  function assign_approver(form_site,outageid,approver_uid){

    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
       var myItemRef = ref.child(outageid);
       
       myItemRef.update({approver: approver_uid}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            //window.location.replace("approve.outage.html?outageid=" + outageid);
          }
        });
   
  }

  //Change Status of Outage System
  function change_status(form_site,outageid,statusid){

    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
       var myItemRef = ref.child(outageid);
       
       myItemRef.update({status: statusid}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            if(statusid=="Pending"){
                window.location.replace("approve.outage.html?outageid=" + outageid);
            }
            else if(statusid=="Draft"){
                window.location.replace("preview.outage.html?outageid=" + outageid);
            }
            else if(statusid=="Approved"){
                window.location.replace("outage.html?outageid=" + outageid);
            }
            else if(statusid=="Sent"){
                //window.location.replace("approve.outage.html?outageid=" + outageid);
            }
            else if(statusid=="Complete"){
                //window.location.replace("approve.outage.html?outageid=" + outageid);
            }
            else if(statusid=="Locked"){
                //window.location.replace("approve.outage.html?outageid=" + outageid);
            }
          }
        });

  }

  //Initial MyOutages View Form.Setup
  function pop_forminit(form_site,uid_key){

    //Get Outage for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByChild("created").equalTo(uid_key).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
        
         //Start of Form Class
         var vHTML = "<div class='main-content'><div class='form-basic'>";

          //Outage Menu
          vHTML += "<div class='submenu'>";
          if(message.status=="Draft"){
            //Preview Button
            vHTML += "<a href='../preview.outage.html?outageid=" + data.key() + "' title='Preview Outage' name='prev'>";
            vHTML += "<i class='fa fa-television'></i></a>";
            
            //Edit Button
            vHTML += "<a href='../preview.outage.html?outageid=" + data.key() + "&st=edit' title='Edit Outage' name='edit'>";
            vHTML += "<i class='fa fa-pencil-square'></i></a>";
          }
          else if(message.status=="Pending"){
            //Preview Button
            vHTML += "<a href='../approve.outage.html?outageid=" + data.key() + "' title='Preview Outage' name='prev'>";
            vHTML += "<i class='fa fa-television'></i></a>";
          }
          else if(message.status=="Approved"){
            //Preview Button
            vHTML += "<a href='../outage.html?outageid=" + data.key() + "' title='View & Send Outage' name='prev'>";
            vHTML += "<i class='fa fa-envelope-o'></i></a>";
          }
          vHTML += "</div>";
          
          //Summary
          vHTML += "<div class='form-title-row'><h3>";
          vHTML += "<span id='otype_view"+data.key()+"'></span>: ";
          vHTML += "<span id='service"+data.key()+"'></span>, ";
          vHTML += message.timeframe;
          vHTML += "</h3></div>";
          
          //Summary Details
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
          
          //Get Service Name
          var Service = ref.root().child('sites').child(form_site).child('systems').child(message.service);
        
          Service.on("value", function (snap) {
            var serv = snap.val();
            
            var myVal = serv.system_public_nm;
            
            $("#service"+data.key()).html(myVal);
            
          });
          
          //Get Outage Type Name
          var Outage_Type = ref.root().child('sites').child(form_site).child('outage_types').child(message.otype);
        
          Outage_Type.on("value", function (snap) {
            var otype_set = snap.val();
            
            var oval = otype_set.otype;
            
            $("#otype_view"+data.key()).html(oval);
            
          });
        
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
            vHTML += "<a href='#' name='edit' title='Edit Outage'><i class='fa fa-pencil-square'></i></a>";
          }
          vHTML += "</div>";

          vHTML += "<div class='form-title-row'><h1>";
          vHTML += "<span id='otype_view'></span>: ";
          vHTML += "<span id='service1'></span>, ";
          vHTML += message.timeframe;
          vHTML += "</h1></div>";

          vHTML += "<div class='form-row'><h2>What service is affected?</h2><br>";
          vHTML += "<p><span id='service2'></span></p>";
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
          vHTML += "<p><span id='wrmessage1'></span></p>";
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
          
          //Get Service Name
          var Service = ref.root().child('sites').child(form_site).child('systems').child(message.service);
        
          Service.on("value", function (snap) {
            var serv = snap.val();
            
            var myVal = serv.system_public_nm;
            
            $("#service1").html(myVal);
            $("#service2").html(myVal);
            
          });
          
          //Get Contact Name
          var Contact = ref.root().child('sites').child(form_site).child('contacts').child(message.wrmessage);
        
          Contact.on("value", function (snap) {
            var cont = snap.val();
            
            var myVal = cont.cont_name;
            
            $("#wrmessage1").html(myVal);
            
          });
          
          //Get Outage Type Name
          var Outage_Type = ref.root().child('sites').child(form_site).child('outage_types').child(message.otype);
        
          Outage_Type.on("value", function (snap) {
            var otype_set = snap.val();
            
            var oval = otype_set.otype;
            
            $("#otype_view").html(oval);
            
          });

          if(message.status=="Draft"){
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
            
                change_status(uid_site,outageid,"Pending");
            
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
              //Get Outage Type Name
              var OTLookup = ref.root().child('sites').child(form_site).child('outage_types').child($('select[name=otype]').val());
            
              OTLookup.on("value", function (snap) {
                var otype_set = snap.val();
                
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

          //End of Draft Mode
         }
         
         if(message.status=="Pending"){
          //Approval
            vHTML = "<div class='form-title-row'><h2>Do You Approve this Outage?</h2><br>";
            vHTML += "<a href='#' name='yes'>";
            vHTML += "<i class='fa fa-check'></i> Yes I Approve</a>";
            vHTML += "<a href='#' name='no'>";
            vHTML += "<i class='fa fa-times'></i> No please revise</a>";
            vHTML += "</div>";
            document.getElementById("approve").innerHTML = vHTML;
            
            //Approve or Deny
              $('a[name=yes]').click(function(){
            
                assign_approver(uid_site,outageid,myuid);
                
                change_status(uid_site,outageid,"Approved");
            
              });
            
              //No
              $('a[name=no]').click(function(){
            
                change_status(uid_site,outageid,"Draft");
            
              });
            
          //End of Pending
         }
         
         if(message.status=="Approved"){
             
            vHTML = "<div class='form-title-row'>";
            vHTML += "<a href='#' name='send'>";
            vHTML += "<i class='fa fa-envelope-o'></i> Send Outage</a>";
            vHTML += "</div>";
            document.getElementById("options").innerHTML = vHTML;
            
            //Approve or Deny
              $('a[name=send]').click(function(){
            
                var subject = pop_outage_email(outageid, uid_site, "Exclusive");
                
                var note = pop_outage_email(outageid, uid_site, "No");
                
                var contact_email = findContactEmail(message.wrmessage);
                
                //Email approver
                $.post('mailclient.php',
                    {
                        "to": contact_email , 
                        "message":note , 
                        "from": uid_email , 
                        "name": uid_name , 
                        "subject":subject
                        
                    },function(response) {     
                    //response = $.parseJSON(response);           
                    console.log(response);
                    
                });
            
              });
              
         }
      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }

  //Populate Public View
  function pop_pubpreview(outageid, form_site){

    //Get Outage for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/" + outageid +"/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
       var message = snapshot.val();
            
        //Populate DIV with HTML
        var vHTML = "<div class='form-title-row'><h1>";
          vHTML += "<span id='otype_view'></span>: ";
          vHTML += "<span id='service1'></span>, ";
          vHTML += message.timeframe;
          vHTML += "</h1></div>";

          vHTML += "<div class='form-row'><h2>What service is affected?</h2><br>";
          vHTML += "<p><span id='service2'></span></p>";
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
          vHTML += "<p><span id='wrmessage1'></span></p>";
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

          document.getElementById("outagePreview").innerHTML = vHTML;
          
          //Get Service Name
          var Service = ref.root().child('sites').child(form_site).child('systems').child(message.service);
        
          Service.on("value", function (snap) {
            var serv = snap.val();
            
            var myVal = serv.system_public_nm;
            
            $("#service1").html(myVal);
            $("#service2").html(myVal);
       
          }); 
          
          //Get Contact Name
          var Contact = ref.root().child('sites').child(form_site).child('contacts').child(message.wrmessage);
        
          Contact.on("value", function (snap) {
            var cont = snap.val();
            
            var myVal = cont.cont_name;
            
            $("#wrmessage1").html(myVal);
       
          });
          
          //Get Outage Type Name
          var Outage_Type = ref.root().child('sites').child(form_site).child('outage_types').child(message.otype);
        
          Outage_Type.on("value", function (snap) {
            var otype_set = snap.val();
            
            var oval = otype_set.otype;
            
            $("#otype_view").html(oval);
            
          });
          
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }

  //Populate Approvers
  function pop_approvers(form_site){
    
    // Get a database reference to our posts
    var approver_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/approvers/";
    var ref = new Firebase( approver_url.normalize() );
    
    var vHTML = "<div class='form-radio-buttons' id='app_radio'></div>";
    $("#approvers-list").html(vHTML);
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var message = data.val();
        var myKey = data.key();
        
          //Populate DIV with HTML
          vHTML = "<div><label id='app-" + myKey + "'>";
          vHTML += "<input type='radio' name='approver' value='" + myKey + "' /> "
          vHTML += "</label></div>";

          $("#app_radio").append(vHTML);
        
        //Define Approver Name from Users db
        var uName = ref.root().child('users').child(myKey);
        
        uName.on("value", function (snap) {
            var arrName = snap.val();
            
            var nHTML = "<span>";
                nHTML += arrName.full_name;
                nHTML += " (" + arrName.email + ")";
                nHTML += "</span>";
            $("#app-"+myKey).append(nHTML);
        });
        
      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });
    
  }
 
  //Populate Approvers
  function pop_one_approver(form_site,uid_key){
    
    // Get a database reference to our posts
    var approver_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/approvers/";
    var ref = new Firebase( approver_url.normalize() );
    var nMessage = [];
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var message = data.val();
        var myKey = data.key();
        
        if(myKey==uid_key){
            //Define Approver Name from Users db
            var uName = ref.root().child('users').child(myKey);
        
            uName.on("value", function (snap) {
                var arrName = snap.val();
            
                nMessage.push(arrName.full_name, arrName.email);
                
            
            });
            
        }

      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });
    
    return nMessage;
    
  }
  
  //Get Outages by Approver
  function outages_by_approver(form_site,uid_key){
    
    // Get a database reference to our posts
    var approver_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( approver_url.normalize() );
    var nMessage = [];
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByChild("approver").equalTo(uid_key).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var message = data.val();
        //var myKey = data.key();
        
        //Start of Form Class
        if(message.status=="Pending"){
            var vHTML = "<div class='main-content'><div class='form-basic approval'>";

          //Outage Menu
          vHTML += "<div class='submenu'>";
          
            //Preview Button
            vHTML += "<a href='../approve.outage.html?outageid=" + data.key() + "' title='Preview Outage' name='prev'>";
            vHTML += "<i class='fa fa-television'></i></a>";
          
          vHTML += "</div>";
          
          //Summary
          vHTML += "<div class='form-title-row'><h3>";
          vHTML += "<span id='otype_view'></span>: ";
          vHTML += "<span id='service1'></span>, ";
          vHTML += message.timeframe;
          vHTML += "</h3></div>";
          
          //Summary Details
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
          
          //Get Service Name
          var Service = ref.root().child('sites').child(form_site).child('systems').child(message.service);
        
          Service.on("value", function (snap) {
            var serv = snap.val();
            
            var myVal = serv.system_public_nm;
            
            $("#service1").html(myVal);
            
          });
          
          //Get Outage Type Name
          var Outage_Type = ref.root().child('sites').child(form_site).child('outage_types').child(message.otype);
        
          Outage_Type.on("value", function (snap) {
            var otype_set = snap.val();
            
            var oval = otype_set.otype;
            
            $("#otype_view").html(oval);
            
          });
        }

      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });
    
  }

  //Populate Outage Email
  function pop_outage_email(outageid, form_site, subject){
    var vHTML = "";
    
    //Get Outage for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outages/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().equalTo(outageid).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
        
        var service = findServiceArray(message.service);
        var contact = findContactArray(message.wrmessage);
        var otype = findOTypeArray(message.otype);
        
        //Populate DIV with HTML
        if(subject=="Yes" || subject=="Exclusive"){
          vHTML += otype + ": ";
          vHTML += service + ", ";
          vHTML += message.timeframe;
          
          if(subject!=="Exclusive"){
            vHTML = "<h1>" + vHTML + "</h1>";
          }
          
        }
        
        if(subject!=="Exclusive"){
        
          vHTML += "<h2>What service is affected?</h2>";
          vHTML += "<p>" + service + "</p>";

          vHTML += "<h2>What is the time frame?</h2>";
          vHTML += "<p>" + message.timeframe + "</p>";
          
          vHTML += "<h2>What do I need to do?</h2>";
          vHTML += "<p>" + message.todo + "</p>";
          
          vHTML += "<h2>What is the business impact?</h2>";
          vHTML += "<p>" + message.bimpact + "</p>";
          
          vHTML += "<h2>Who is receiving this message?</h2>";
          vHTML += "<p>" + contact + "</p>";
          
          if(message.chkabo==1){
            vHTML += "<h2>IBO/ABO Impact?</h2>";
            vHTML += "<p>" + message.txtabo + "</p>";
          }

          vHTML += "<h2>Who do I need to contact if I have questions?</h2>";
          vHTML += "<p>" + message.contact + "</p>";
          
          vHTML += "<h2>Ticket #</h2>";
          vHTML += "<p>" + message.ticket + "</p>";
        }
        
      }); 
    }, function (errorObject) {
          vHTML = "The read failed: " + errorObject.code;
    });
    
    return vHTML;    
  }

  // -- System Maintenance -- //
  
  //Get list of all Services to Array
  function GetServices(form_site){
    var myVal = [];
    
    //Get Service Name
    var sys_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/systems/";
    var ref = new Firebase( sys_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var serv = data.val();
        
        myVal.push({key: data.key() , name: serv.system_public_nm, description: serv.system_desc });

      });
      
    });

    return myVal;    
  }
  
  //Search for individual Service
  function findServiceArray(service_key){
       var service_nm = "";
       
        jQuery.each(service_name, function(index, item) {
            if(service_name[index].key==service_key){
                service_nm = service_name[index].name;
            }
        });
       
       return service_nm;
   }
  
  //Add List Item to System Maintenance
  function add_system(form_site,pub_name,desc,created){
    var postID;
    var system_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/systems/";
    var ref = new Firebase( system_url.normalize() );
    
       ref.push({system_desc: desc, system_public_nm: pub_name, created: created});
       
       ref.on('child_added', function(snapshot) {
        postID = snapshot.key();
      });

    return postID
  }
  
  //Update List Item to System Maintenance
  function update_system(form_site,pub_name,desc,sys_key){
    var postID;
    var system_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/systems/";
    var ref = new Firebase( system_url.normalize() );

       var myItemRef = ref.child(sys_key);
       
       myItemRef.update({system_public_nm: pub_name, system_desc: desc}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          }
        });
        
  }
  
  //Delete a System
  function delete_system(form_site,sys_key){
     // Get a reference to our posts
    var system_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/systems/" + sys_key;
    var ref = new Firebase( system_url.normalize() );
    
    // Get the data on a post that has been removed
    ref.remove();
    
    return true;
  }
  
  //Populate System_List
  function pop_syslist(form_site,dropdown){

    //Get Systems for Preview
    // Get a database reference to our posts
    var system_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/systems/";
    var ref = new Firebase( system_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByChild("system_public_nm").on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
        var vHTML = "";
        
        if(dropdown=="Yes"){
            vHTML = "<option value='"+data.key()+"'>";
            vHTML += message.system_public_nm;
            vHTML += "</option>";
            
            $('[name=service]').append(vHTML);
        }
        else {
            //Populate DIV with HTML
              vHTML = "<div class='submenu'>";
              vHTML += "<a href='#' name='del"+data.key()+"' title='Delete System'><i class='fa fa-trash'></i></a>";
              vHTML += "<a href='#' name='edit"+data.key()+"' title='Edit System'><i class='fa fa-pencil-square'></i></a>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>System Public Name</h2><br>";
              vHTML += "<p>" + message.system_public_nm + "</p>";
              vHTML += "</div>";
    
              vHTML += "<div class='form-row'><h2>Description</h2><br>";
              vHTML += "<p>" + message.system_desc + "</p>";
              vHTML += "</div>";
              
              vHTML += "<div class='form-row'><hr></div>";
    
              $("#system_list").append(vHTML);
              
              $('a[name=edit'+data.key()+']').click(function(){
            
                 $('input[name=pub_name]').val(message.system_public_nm);
                 $('input[name=desc]').val(message.system_desc);
                 $('input[name=sys_id]').val(data.key());
            
              });
              
              $('a[name=del'+data.key()+']').click(function(){
                
                var r = confirm("Please make sure there's no related Outages to this system. Are you sure you want to delete?");
                if (r === true) {
                    delete_system(uid_site,data.key());
                 
                    window.location.replace("system.maint.html");
                    
                }
                 
              });
        }

      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }

  //Populate Single System
  function pop_singlesys(form_site,key){

    //Get Systems for Preview
    // Get a database reference to our posts
    var system_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/systems/";
    var ref = new Firebase( system_url.normalize() );
    
    var vHTML;
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().equalTo(key).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
            vHTML = message.system_public_nm;
      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

    return vHTML;
  }
  
  // -- Contact Maintenance -- //
  
  //Get list of all Contacts to Array
  function GetContacts(form_site){
    var myVal = [];
    
    //Get Contact Name
    var cont_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/contacts/";
    var ref = new Firebase( cont_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var cont = data.val();
        
        myVal.push({key: data.key() , cont_name: cont.cont_name, cont_email: cont.cont_email });

      });
      
    });

    return myVal;    
  }
  
  //Search for individual Contact
  function findContactArray(contact_key){
       var contact_nm = "";
       
        jQuery.each(contact_name, function(index, item) {
            if(contact_name[index].key==contact_key){
                contact_nm = contact_name[index].cont_name;
            }
        });
       
       return contact_nm;
   }
   
  //Search for individual Contact Email
  function findContactEmail(contact_key){
       var contact_email = "";
       
        jQuery.each(contact_name, function(index, item) {
            if(contact_name[index].key==contact_key){
                contact_email = contact_name[index].cont_email;
            }
        });
       
       return contact_email;
   }
  
  //Add List Item to Contact Maintenance
  function add_contact(form_site,cont_name,cont_email,created){
    var postID;
    var cont_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/contacts/";
    var ref = new Firebase( cont_url.normalize() );
    
       ref.push({cont_name: cont_name, cont_email: cont_email, created: created});
       
       ref.on('child_added', function(snapshot) {
        postID = snapshot.key();
      });

    return postID
  }
  
  //Update List Item to Contact Maintenance
  function update_contact(form_site,cont_name,cont_email,cont_key){
    var postID;
    var cont_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/contacts/";
    var ref = new Firebase( cont_url.normalize() );

       var myItemRef = ref.child(cont_key);
       
       myItemRef.update({cont_name: cont_name, cont_email: cont_email}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          }
        });
        
  }
  
  //Delete a Contact
  function delete_contact(form_site,cont_key){
     // Get a reference to our posts
    var contact_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/contacts/" + cont_key;
    var ref = new Firebase( contact_url.normalize() );
    
    // Get the data on a post that has been removed
    ref.remove();
    
    return true;
  }
  
  //Populate Contact_List
  function pop_contlist(form_site,dropdown){

    //Get Contacts for Preview
    // Get a database reference to our posts
    var cont_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/contacts/";
    var ref = new Firebase( cont_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByChild("cont_name").on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
        var vHTML = "";
        
        if(dropdown=="Yes"){
            vHTML = "<option value='"+data.key()+"'>";
            vHTML += message.cont_name;
            vHTML += "</option>";
            
            $('[name=wrmessage]').append(vHTML);
        }
        else {
            //Populate DIV with HTML
              vHTML = "<div class='submenu'>";
              vHTML += "<a href='#' name='del"+data.key()+"' title='Delete Contact'><i class='fa fa-trash'></i></a>";
              vHTML += "<a href='#' name='edit"+data.key()+"' title='Edit Contact'><i class='fa fa-pencil-square'></i></a>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Contact Name</h2><br>";
              vHTML += "<p>" + message.cont_name + "</p>";
              vHTML += "</div>";
    
              vHTML += "<div class='form-row'><h2>Contact Email</h2><br>";
              vHTML += "<p>" + message.cont_email + "</p>";
              vHTML += "</div>";
              
              vHTML += "<div class='form-row'><hr></div>";
    
              $("#contact_list").append(vHTML);
              
              $('a[name=edit'+data.key()+']').click(function(){
            
                 $('input[name=cont_name]').val(message.cont_name);
                 $('input[name=cont_email]').val(message.cont_email);
                 $('input[name=cont_id]').val(data.key());
            
              });
              
              $('a[name=del'+data.key()+']').click(function(){
                
                var r = confirm("Please make sure there's no related Outages to this contact. Are you sure you want to delete?");
                if (r === true) {
                    delete_contact(uid_site,data.key());
                 
                    window.location.replace("contact.maint.html");
                    
                }
                 
              });
        }

      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }

  //Populate Single Contact
  function pop_singlecont(form_site,key){

    //Get Contact for Preview
    // Get a database reference to our posts
    var cont_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/contacts/";
    var ref = new Firebase( cont_url.normalize() );
    
    var vHTML;
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().equalTo(key).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
            vHTML = message.cont_name;
      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

    return vHTML;
  }
  
  // -- Outage Type -- //
  
  //Get list of all Outage Types to Array
  function GetOType(form_site){
    var myVal = [];
    
    //Get Outage Type Name
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outage_types/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var outage = data.val();
        
        myVal.push({key: data.key() , otype: outage.otype , prefix: outage.prefix, showEndD: outage.showEndD });

      });
      
    });

    return myVal;    
  }
  
  //Search for individual Outage Type
  function findOTypeArray(outage_key){
       var outage_type = "";
       
        jQuery.each(otypes, function(index, item) {
            if(otypes[index].key==outage_key){
                outage_type = otypes[index].otype;
            }
        });
       
       return outage_type;
   }
   
  //Add List Item to Outage Type Maintenance
  function add_otype(form_site,otype,prefix,showendd,created){
    var postID;
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outage_types/";
    var ref = new Firebase( outage_url.normalize() );
    
       ref.push({otype: otype, prefix: prefix, showEndD: showendd, created: created});
       
       ref.on('child_added', function(snapshot) {
        postID = snapshot.key();
      });

    return postID
  }
  
  //Update List Item to Outage Type Maintenance
  function update_otype(form_site,otype,prefix,showendd,otype_key){
    var postID;
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outage_types/";
    var ref = new Firebase( outage_url.normalize() );

       var myItemRef = ref.child(otype_key);
       
       myItemRef.update({otype: otype, prefix: prefix, showEndD: showendd}, function(error) {
          if (error) {
            alert("Data could not be saved." + error);
          }
        });
        
  }
  
  //Delete a Outage Type
  function delete_otype(form_site,otype_key){
     // Get a reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outage_types/" + otype_key;
    var ref = new Firebase( outage_url.normalize() );
    
    // Get the data on a post that has been removed
    ref.remove();
    
    return true;
  }
  
  //Populate Outage_Type
  function pop_outagelist(form_site,dropdown){

    //Get Outage_Type for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outage_types/";
    var ref = new Firebase( outage_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
        var vHTML = "";
        
        if(dropdown=="Yes"){
            vHTML = "<option value='" + data.key() + "'>";
            vHTML += message.otype;
            vHTML += "</option>";
            
            $('[name=otype]').append(vHTML);
        }
        else {
            //Populate DIV with HTML
              vHTML = "<div class='submenu'>";
              vHTML += "<a href='#' name='del"+data.key()+"' title='Delete Type'><i class='fa fa-trash'></i></a>";
              vHTML += "<a href='#' name='edit"+data.key()+"' title='Edit Type'><i class='fa fa-pencil-square'></i></a>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Outage Type</h2><br>";
              vHTML += "<p>" + message.otype + "</p>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Prefix</h2><br>";
              vHTML += "<p>" + message.prefix + "</p>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Show End Date?</h2><br>";
              if (message.showEndD===true){
                vHTML += "<p>Yes</p>";
              }
              else {
                vHTML += "<p>No</p>";
              }
              vHTML += "</div>";
              
              vHTML += "<div class='form-row'><hr></div>";
    
              $("#otype_list").append(vHTML);
              
              $('a[name=edit'+data.key()+']').click(function(){
            
                 $('input[name=otype]').val(message.otype);
                 $('input[name=prefix]').val(message.prefix);
                 $('input[name=showendd]')[0].checked = message.showEndD;
                 $('input[name=otype_key]').val(data.key());
            
              });
              
              $('a[name=del'+data.key()+']').click(function(){
                
                var r = confirm("Please make sure there's no related Outages to this Outage Type. Are you sure you want to delete?");
                if (r === true) {
                    delete_otype(uid_site,data.key());
                 
                    window.location.replace("otype.maint.html");
                    
                }
                 
              });
        }

      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }
  
  //Populate Single Outage Type
  function pop_singleotype(form_site,key){

    //Get Contact for Preview
    // Get a database reference to our posts
    var outage_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/outage_types/";
    var ref = new Firebase( outage_url.normalize() );
    
    var vHTML;
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().equalTo(key).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
            vHTML = message.otype;
      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

    return vHTML;
  }
  

  // -- User Maintenance -- //
  
  //Get list of all Users to Array
  function GetUsers(form_site){
    var myVal = [];
    
    //Get User Name
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
    var ref = new Firebase( user_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByChild("site").equalTo(form_site).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        var user = data.val();
        
        myVal.push({key: data.key() , full_name: user.full_name , email: user.email , active: user.active , approver: user.approver , site_admin: user.site_admin , sys_admin: user.sys_admin , site: user.site });

      });
      
    });

    return myVal;
  }
  
  //Search for individual User
  function findUserArray(user_key){
       var user_type = "";
       
        jQuery.each(users, function(index, item) {
            if(users[index].key==user_key){
                user_type = users[index].full_name;
            }
        });
       
       return user_type;
   }
   
  //Add List Item to User Maintenance
  function add_user(form_site,email,password,full_name,active,approver,site_admin){
    var postID;
    
      var refUser = new Firebase("https://resplendent-inferno-4226.firebaseio.com");
        refUser.createUser({
          email: email,
          password: password
        }, function(error, userData) {
          if (error) {
            switch (error.code) {
              case "EMAIL_TAKEN":
                console.log("The new user account cannot be created because the email is already in use.");
                break;
              case "INVALID_EMAIL":
                console.log("The specified email is not a valid email.");
                break;
              default:
                console.log("Error creating user:", error);
            }
          } else {
            postID = userData.uid;
            
            var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
            var ref = new Firebase( user_url.normalize() );
            
               ref.child(postID).set({
                   site: form_site,
                   full_name: full_name,
                   email: email,
                   active: active,
                   approver: approver,
                   site_admin: site_admin
               });
               
               //Send email
                var message = 'Hello '+ full_name;
                message += '<br>Welcome to ' + form_site + '.<br><hr>';
                message += 'Your new password is <b>' + password + '</b><br>'
                message += '<a href="'+window.location+'">Login</a><br>';
                
                //Email approver
                $.post('../mailclient.php',
                    {
                        "to": email , 
                        "message":message , 
                        "from": uid_email , 
                        "name": uid_name , 
                        "subject": 'Your account has been created.'
                    },function(response) {
                        console.log(response);
                });
            
            return postID;
          }
        });
        
       refUser.on('child_added', function(snapshot) {
         postID = snapshot.key();
         
         return postID;
       });

  }
  
  //Add User to Users db for settings
  function add_user_profile(form_site,userid,full_name,email,active,approver,site_admin){
    var newID;
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
    var ref = new Firebase( user_url.normalize() );
    
       ref.child(userid).set({
           site: form_site,
           full_name: full_name,
           email: email,
           active: active,
           approver: approver,
           site_admin: site_admin
       });
       
       ref.on('child_added', function(snapshot) {
        newID = snapshot.key();
       });
    
    return newID;
  }
  
  //Update List Item to User Maintenance
  function update_user(form_site,userid,full_name,email,active,approver,site_admin){
    var postID;
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
    var ref = new Firebase( user_url.normalize() );

       var myItemRef = ref.child(userid);
       
       myItemRef.update({
           site: form_site,
           full_name: full_name,
           email: email,
           active: active,
           approver: approver,
           site_admin: site_admin}, function(error) {
                if (error) {
                    alert("Data could not be saved." + error);
                }
        });
        
  }
  
  //Delete a User
  function delete_user(form_site,userid){
    
    // Get a reference to our posts
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/" + userid;
    var ref = new Firebase( user_url.normalize() );
    
    // Get the data on a post that has been removed
    ref.remove();
   
    // Get a reference to our posts
    var approver_url = "https://resplendent-inferno-4226.firebaseio.com/sites/" + form_site + "/approvers/" + userid;
    var approver = new Firebase( approver_url.normalize() );
    
    // Get the data on a post that has been removed
    approver.remove();
    
    return true;
  }
  
  //Populate User List
  function pop_userlist(form_site,dropdown){

    //Get Outage_Type for Preview
    // Get a database reference to our posts
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
    var ref = new Firebase( user_url.normalize() );
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByChild("site").equalTo(form_site).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
        var vHTML = "";
        
        if(dropdown=="Yes"){
            vHTML = "<option value='" + data.key() + "'>";
            vHTML += message.full_name;
            vHTML += "</option>";
            
            $('[name=users]').append(vHTML);
        }
        else {
            //Populate DIV with HTML
              vHTML = "<div class='submenu'>";
              vHTML += "<a href='#' name='del"+data.key()+"' title='Remove User from Site'><i class='fa fa-trash'></i></a>";
              vHTML += "<a href='#' name='edit"+data.key()+"' title='Edit User'><i class='fa fa-pencil-square'></i></a>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Full Name</h2><br>";
              vHTML += "<p>" + message.full_name + "</p>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Email</h2><br>";
              vHTML += "<p>" + message.email + "</p>";
              vHTML += "</div>";
              vHTML += "<div class='form-row'><h2>Active</h2><br>";
              if (message.active===true){
                vHTML += "<p>Yes</p>";
              }
              else {
                vHTML += "<p>No</p>";
              }
              vHTML += "</div>";
              
              vHTML += "<div class='form-row'><h2>Site Approver</h2><br>";
              if (message.approver===true){
                vHTML += "<p>Yes</p>";
              }
              else {
                vHTML += "<p>No</p>";
              }
              vHTML += "</div>";
              
              vHTML += "<div class='form-row'><h2>Site Administrator</h2><br>";
              if (message.site_admin===true){
                vHTML += "<p>Yes</p>";
              }
              else {
                vHTML += "<p>No</p>";
              }
              vHTML += "</div>";
              
              vHTML += "<div class='form-row'><hr></div>";
    
              $("#user_list").append(vHTML);
              
              $('a[name=edit'+data.key()+']').click(function(){
            
                 $('input[name=full_name]').val(message.full_name);
                 $('input[name=email]').val(message.email);
                 $('input[name=active]')[0].checked = message.active;
                 $('input[name=approver]')[0].checked = message.approver;
                 $('input[name=sadmin]')[0].checked = message.site_admin;
                 $('input[name=user_id]').val(data.key());
            
              });
              
              $('a[name=del'+data.key()+']').click(function(){
                
                var r = confirm("Are you sure you want to remove this user?");
                if (r === true) {
                    delete_user(uid_site,data.key());
                 
                    window.location.replace("user.maint.html");
                    
                }
                 
              });
        }

      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

  }
  
  //Populate Single Outage Type
  function pop_singleuser(form_site,key){

    //Get Contact for Preview
    // Get a database reference to our posts
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
    var ref = new Firebase( user_url.normalize() );
    
    var vHTML;
    
    // Attach an asynchronous callback to read the data at our posts reference
    ref.orderByKey().equalTo(key).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
            var message = data.val();
            
            vHTML = message.full_name;
      }); 
    }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
    });

    return vHTML;
  }