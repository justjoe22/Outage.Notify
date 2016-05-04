/*-- SRS Application Code --*/
/*-- Main functionality --*/
(function($) {

var myID = "";
var myType = "";

//Default Settings OnLoad
$(window).load(function() {
	
		var elUsr = document.getElementById('altUser');
		if (elUsr.addEventListener) {
			elUsr.addEventListener('change', getUSRbyID, false);
		} else {
			elUsr.attachEvent('onchange', getUSRbyID);
		}
		
		// var elYear = document.getElementById('myYear');
		// if (elYear.addEventListener) {
			// elYear.addEventListener('change', requestType, false);
		// } else {
			// elYear.attachEvent('onchange', requestType);
		// }
		
	//Main Menu
	$('#myNew').fadeIn();
	$('#myStatus').fadeIn();
	$('#btnRefresh').fadeOut();
	
	//Default Form Status
	$('#firstStep').fadeIn();
	$('#secondStep').fadeOut();
	$('#finalStep').fadeOut();
	$('#userLookup').fadeOut();
	$('#statusList').fadeOut();	
	
	var liHtml = "";				
				
	$("#userProgress").html(liHtml);
	
	if ($.browser.msie == true){
		if($.browser.version < 9){
			$("#contact-form").fadeOut();
			
			var liHtml = "<li><strong><i class='fa fa-exclamation-triangle'></i> Your browser is NOT compatible. Please open this site in a modern browser.</strong></li>";
			
			$("#userProgress").html("");
			$("#userProgress").html(liHtml);
		}
	}
	
});

//OnClick Events
//Main Menu
$('#myStatus').on('click', function(event) {

	changeState('Status');
	
	window.location.href='#contact';
});

$('#myNew').on('click', function(event) {

	changeState('Simple');
	
	window.location.href='#contact';

});

$('#btnRefresh').on('click', function(event) {

	changeState('Status');
	
	window.location.href='#contact';

});

//Status or Start Over
function changeState(state){		
	var myValue = state;
		
	document.getElementById("contactForm").reset();
	$("#contactMessage").html("");
			
		if (myValue == 'Status') {
			//Show status or requests list
			//document.contactForm.contactSelect.options[1].selected =  true;
			
			populateStatus();
			
			//Main Menu 
			$('#btnRefresh').fadeIn();
			$('#myNew').fadeIn();
			$('#myStatus').fadeOut();
			
			//Default Form
			$('#firstStep').fadeOut();
			$('#secondStep').fadeOut();
			$('#thirdStep').fadeOut();
			$('#fourthStep').fadeOut();
			$('#finalStep').fadeOut();

			$('#myMessage').fadeOut();
			$('#myFiles').fadeOut();
						
			$('#statusList').fadeIn();	
			
			var liHtml = "";
			$("#userProgress").html(liHtml);
			$("#contactSubject").html("");			
			
		}
		else if (myValue == 'Simple') {
			
			//Main Menu 
			$('#myNew').fadeIn();
			$('#myStatus').fadeIn();
			$('#btnRefresh').fadeOut();
			
			//Default Form 
			$('#firstStep').fadeIn();
			$('#userLookup').fadeOut();
			$('#secondStep').fadeOut();
			$('#finalStep').fadeOut();
			$('#statusList').fadeOut();			
			$('#myMessage').fadeOut();
			$('#myFiles').fadeOut();
						var liHtml = "";
			$("#userProgress").html(liHtml);
			$("#contactSubject").html("");

		}

	$('#contactForm').fadeIn();
	$('#message-success').fadeOut();
};

//Step One

//Alternate User YES
$('#forMe').on('click', function(event) {

	showPerson("No");
	
	$('#firstStep').fadeOut();
	$('#secondStep').fadeIn();
	$('#finalStep').fadeIn();

});

//Alternate User NO
$('#forOther').on('click', function(event) {

	showPerson("Yes");

});

function showPerson(answer){

	if(answer == "Yes"){
				
		$('#userLookup').fadeIn();	
	}
	else {
		
		var liHtml = "<li id='selectUser'><i class='fa fa-user'></i> This request is for you. <a href='#contact' id='changeUser'>Change</a></li>";
		$("#userProgress").html(liHtml);
		
		$('#changeUser').on('click', function(event) {

			changeState('Simple');

		});
		
		document.getElementById("altUser").value = "";				
		
		$('#userLookup').fadeOut();
	}

}

	//Get User from SharePoint
	function getUSRbyID(){
		var vEntry = 0;
		var userId = document.getElementById("altUser").value;
		
		$().SPServices({
		  operation: "GetUserProfileByName",
		  async: false,
		  AccountName: "NA\\" + userId,
		  completefunc: function (xData, Status) {
			var firstName = getUPValue(xData.responseXML, "FirstName");
			var lastName = getUPValue(xData.responseXML, "LastName");
						
			var liHtml = "";
			
			if (firstName != null && firstName !=""){
				liHtml = liHtml + "";
				liHtml = liHtml + "<li>Request on behalf of <i class='fa fa-user'></i> " + firstName + " " + lastName + ". <a href='#contact' id='changeUser'>Change</a></li>";
				vEntry = 1;
				$("#userProgress").html(liHtml);
				
				$('#changeUser').on('click', function(event) {

					changeState('Simple');

				});
			}
			else {
				liHtml = liHtml + "<i class='fa fa-user-times'></i> Person not found. Please enter a valid Native ID.";				
				vEntry = 0;
				$("#userProgress").html(liHtml);
				
				document.getElementById("altUser").value = ""
			}		
			
		   }
		});
		
		if (vEntry == 1){
			$('#firstStep').fadeOut();
			$('#secondStep').fadeIn();
			$('#finalStep').fadeIn();			
		}
	}

//Step Two
function requestType(){
		
		$('#selectedSub0').remove();	
		
		$("#userProgress").append("<li id='selectedSub0'>Date on which file(s) was deleted or overwritten: <i class='fa fa-calendar'></i> " + document.getElementById("myMonth").value + "/" + document.getElementById("myDay").value + "/" + document.getElementById("myYear").value + " <a href='#contact' id='changeMe0'>Change</a></li>");	
	
		$('#changeMe0').on('click', function(event) {

			changeState('Simple');

		});
		
		//$('#secondStep').fadeOut();	
		//$('#finalStep').fadeIn();	
		
	  
}

//changeBack
function changeBack(step){	

	if (step==1){
	
		document.getElementById("contactForm").reset();

		$('#selectedSub').remove();
		$('#selectedSub0').remove();	
		
		//$('#finalStep').fadeOut();	
	}
	else if (step==0){
	
		document.getElementById("contactForm").reset();
		
		$('#selectedSub').remove();
		$('#selectedSub0').remove();		
		
		//$('#finalStep').fadeOut();	
		//$('#secondStep').fadeIn();	
	}
	
}

	/*----------------------------------------------------*/
	/*	contact form
	/*  #submitMe.submit
	------------------------------------------------------*/
	
   $('form#contactForm').on('submit', function(event) {

      $('#image-loader').fadeIn();

      //var contactSelect = $('#contactForm #contactSelect option:selected').text();
      //var contactSubject = $('#contactForm #contactSubject option:selected').text();
      //var contactMessage = document.getElementById("contactMessage").value;
	  //contactMessage = contactMessage + " " + getValues();
	  
	  var liNative = $().SPServices.SPGetCurrentUser({
		fieldName: "UserName",
		debug: false		 
	  });
	  
		var altNativeId = document.getElementById("altUser").value;
		
		var ContName = "";
		 $().SPServices({
			operation: "GetUserProfileByName",
			async: false,
			AccountName: "NA\\" + altNativeId,
			completefunc: function (xData, Status) {
				$(xData.responseXML).find("PropertyData > Name:contains('PreferredName')").each(function() {
					ContName = $(this).parent().find("Values").text();
					//ContName = ContName.substr(
				});
			}
		});
		var searchUser = "";
		
		if (altNativeId != null && altNativeId !=""){
			searchUser = altNativeId;
		}
		else {
			searchUser = liNative;
		}
		
		var managerId = "";
		 $().SPServices({
			operation: "GetUserProfileByName",
			async: false,
			AccountName: "NA\\" + altNativeId,
			completefunc: function (xData, Status) {
				$(xData.responseXML).find("PropertyData > Name:contains('Manager')").each(function() {
					managerId = $(this).parent().find("Values").text();
					managerId = managerId.substr(3,managerId.length);
				});
			}
		});
		
		 /*
			 * Date Format 1.2.3
			 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
			 * MIT license
			 *
			 * Includes enhancements by Scott Trenda <scott.trenda.net>
			 * and Kris Kowal <cixar.com/~kris.kowal/>
			 *
			 * Accepts a date, a mask, or a date and a mask.
			 * Returns a formatted version of the given date.
			 * The date defaults to the current date/time.
			 * The mask defaults to dateFormat.masks.default.
			 */

			var dateFormat = function () {
				var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
					timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
					timezoneClip = /[^-+\dA-Z]/g,
					pad = function (val, len) {
						val = String(val);
						len = len || 2;
						while (val.length < len) val = "0" + val;
						return val;
					};
			
				// Regexes and supporting functions are cached through closure
				return function (date, mask, utc) {
					var dF = dateFormat;
			
					// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
					if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
						mask = date;
						date = undefined;
					}
			
					// Passing date through Date applies Date.parse, if necessary
					date = date ? new Date(date) : new Date;
					if (isNaN(date)) throw SyntaxError("invalid date");
			
					mask = String(dF.masks[mask] || mask || dF.masks["default"]);
			
					// Allow setting the utc argument via the mask
					if (mask.slice(0, 4) == "UTC:") {
						mask = mask.slice(4);
						utc = true;
					}
			
					var    _ = utc ? "getUTC" : "get",
						d = date[_ + "Date"](),
						D = date[_ + "Day"](),
						m = date[_ + "Month"](),
						y = date[_ + "FullYear"](),
						H = date[_ + "Hours"](),
						M = date[_ + "Minutes"](),
						s = date[_ + "Seconds"](),
						L = date[_ + "Milliseconds"](),
						o = utc ? 0 : date.getTimezoneOffset(),
						flags = {
							d:    d,
							dd:   pad(d),
							ddd:  dF.i18n.dayNames[D],
							dddd: dF.i18n.dayNames[D + 7],
							m:    m + 1,
							mm:   pad(m + 1),
							mmm:  dF.i18n.monthNames[m],
							mmmm: dF.i18n.monthNames[m + 12],
							yy:   String(y).slice(2),
							yyyy: y,
							h:    H % 12 || 12,
							hh:   pad(H % 12 || 12),
							H:    H,
							HH:   pad(H),
							M:    M,
							MM:   pad(M),
							s:    s,
							ss:   pad(s),
							l:    pad(L, 3),
							L:    pad(L > 99 ? Math.round(L / 10) : L),
							t:    H < 12 ? "a"  : "p",
							tt:   H < 12 ? "am" : "pm",
							T:    H < 12 ? "A"  : "P",
							TT:   H < 12 ? "AM" : "PM",
							Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
							o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
							S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
						};
			
					return mask.replace(token, function ($0) {
						return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
					});
				};
			}();
			
			// Some common format strings
			dateFormat.masks = {
				"default":      "ddd mmm dd yyyy HH:MM:ss",
				shortDate:      "m/d/yy",
				mediumDate:     "mmm d, yyyy",
				longDate:       "mmmm d, yyyy",
				fullDate:       "dddd, mmmm d, yyyy",
				shortTime:      "h:MM TT",
				mediumTime:     "h:MM:ss TT",
				longTime:       "h:MM:ss TT Z",
				isoDate:        "yyyy-mm-dd",
				isoTime:        "HH:MM:ss",
				isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
				isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
			};
			
			// Internationalization strings
			dateFormat.i18n = {
				dayNames: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
					"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
				],
				monthNames: [
					"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				]
			};
			
			// For convenience...
			Date.prototype.format = function (mask, utc) {
				return dateFormat(this, mask, utc);
			};
	
		var myTime = document.getElementById("myTime").value + ":00 " + document.getElementById("myAMPM").value;
		
		today = new Date(document.getElementById("myMonth").value + "/" + document.getElementById("myDay").value + "/" + document.getElementById("myYear").value + " " + myTime);
		
		//var varDate = today.format("yyyy-mm-dd'T'HH:MM:ss");
		
		var fileName = document.getElementById("fileName").value;
		
		var fileLocation = document.getElementById("fileLocation").value;
		
		var overWrite = document.getElementById("overwrite").checked;
		
		var additional = document.getElementById("additional").value;
		
		
      myID = AddListItem(searchUser,today.format("yyyy-mm-dd'T'HH:MM:ss'Z'"),fileName,fileLocation,overWrite,additional);
  
  
      return false;
   });

    // $('#attachmentButton').change(function(event){	
        // var listName = 'ContactUs', // change these to suit your list and item
            // itemId = myID;		
        // handleFileChange(listName,itemId,event.target.files);	
    // });
   
	//Add List Item to ContactUs 
	function AddListItem(nativeid,thedate,fileName,fileLocation,overWrite,additional){
		var newId = "";
		
		$().SPServices({ 
			 operation: "UpdateListItems", 
			 async: false, 
			 webURL: "/sites/help/",
			 batchCmd: "New", 
			 listName: "Veritas-FileRestores", 
			 valuepairs: [["NativeID", nativeid], ["Title", fileName], ["Restore_Date", thedate], ["FileLocation", fileLocation], ["OverWrite", overWrite], ["AddComments", additional]], 
			 completefunc: function(xData, Status) { 
			    
				//alert("List Item successfully Created.");
				var out = $().SPServices.SPDebugXMLHttpResult({
					node: xData.responseXML
				});
				
				newId = $(xData.responseXML).SPFilterNode("z:row").attr("ows_ID");
				
				// Message was sent
				if (Status == 'success') {
				   $('#image-loader').fadeOut();
				   $('#message-warning').hide();
				   $('#contactForm').fadeOut();
				   	$('#btnRefresh').fadeOut();
					$("#userProgress").html("");
					$('#myNew').fadeIn();
					$('#myStatus').fadeIn();
				   $('#message-success').fadeIn();
				}
				// There was an error
				else {
				   $('#image-loader').fadeOut();
				   $('#message-warning').html(out);
					$('#message-warning').fadeIn();
				}
			 } 
		});
		
		return newId
	}

 // Escape string characters
 function escapeHTML(s) {
  return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 }

//Build Status screen.
function populateStatus(){		
	
	var liHtml = "";
	
	 $().SPServices({
		operation: "GetListItems",
		async: false,
		webURL: "/sites/help/",
		listName: "Veritas-FileRestores",
		viewName: "{E93546B6-2A40-4DE5-9B29-5D77AACC802D}",
		CAMLViewFields: "<ViewFields><FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='FileNameRestored' /><FieldRef Name='RestoreDate' /><FieldRef Name='FileLocation' /><FieldRef Name='OverWrite' /><FieldRef Name='AddComments' /></ViewFields>",
		completefunc: function (xData, Status) {
			
				var iRow = 0;
				
		  $(xData.responseXML).SPFilterNode("z:row").each(function() {
			
			if (iRow > 0) {
				liHtml = liHtml + "<hr>";				
			}
			
			iRow = iRow + 1;
						
			liHtml = liHtml + "<h1>" + $(this).attr("ows_FileNameRestored") + "</h1>";
			
			var altNativeID = $(this).attr("ows_Title");
			
			if (altNativeID != null && altNativeID !=""){
				var theName = "";
				
				$().SPServices({
				  operation: "GetUserProfileByName",
				  async: false,
				  AccountName: "NA\\" + altNativeID,
				  completefunc: function (xData, Status) {
					var firstName = getUPValue(xData.responseXML, "FirstName");
					var lastName = getUPValue(xData.responseXML, "LastName");
								
					theName = firstName + " " + lastName;
				   }
				});
				
				liHtml = liHtml + "<p>You requested this action for <i class='fa fa-user'></i> " + theName + ", " + altNativeID + ".</p>";
			}
			
			var frmDate = $(this).attr("ows_RestoreDate");
			frmDate = frmDate.substr(frmDate.indexOf("-")+1,5) + "-" + frmDate.substr(0,frmDate.indexOf("-"));
			
			liHtml = liHtml + "<p>Restore Date: " + frmDate + "</p>";
			liHtml = liHtml + "<div id='message-status'>";
				
			
			liHtml = liHtml + "</div>";
		
		  });		  
		  
		}
	  });
	
	$("#statusList").html(liHtml);
};

function getUPValue(x, p) {
  var thisValue = $(x).SPFilterNode("PropertyData").filter(function() {
    return $(this).find("Name").text() == p;
  }).find("Values").text();
  return thisValue;
}

//End of Script
})(jQuery);