(function($) {

//Default Settings OnLoad
$(window).load(function() {

  //Populate Form.Preview
  waitForElement();
  
});

 function waitForElement(){
    if(typeof uid_site !== "undefined"){
      //Populate Form.Init
      if (uid_site !== "") {
        pop_syslist(uid_site,"No");
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
$('form[name=user]').submit(function(event) {
  var pub_name = $('input[name=pub_name]').val(), _
    desc = $('input[name=desc]').val(), 
    userid = $('input[name=user_id]').val();
    
    if (userid!==""){
        update_system(uid_site,pub_name,desc,userid)
    }
    else {
        userid = add_system(uid_site,pub_name,desc,myuid);
    }
    
    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, { sysid: sysid } );

    /* Alerts the results */
    posting.done(function( data ) {
      // similar behavior as an HTTP redirect
      window.location.replace(url);
    });

});

//End of Script
})(jQuery);

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
  function add_user(form_site,userid,full_name,email,active,approver,site_admin,sys_admin){
    var postID;
    var user_url = "https://resplendent-inferno-4226.firebaseio.com/users/";
    var ref = new Firebase( user_url.normalize() );
    
       ref.child(userid).set({
           site: form_site,
           full_name: full_name,
           email: email,
           active: active,
           approver: approver,
           site_admin: site_admin,
           sys_admin: sys_admin
       });
       
       ref.on('child_added', function(snapshot) {
        postID = snapshot.key();
      });

    return postID
  }
  
  //Update List Item to User Maintenance
  function update_user(form_site,userid,full_name,email,active,approver,site_admin,sys_admin){
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
           site_admin: site_admin,
           sys_admin: sys_admin}, function(error) {
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
