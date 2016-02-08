/*-- SRS Application Code --*/
/*-- Main functionality --*/
(function($) {

//Default Settings OnLoad
$(window).load(function() {
	
		// var elUsr = document.getElementById('txtSearch');
		// if (elUsr.addEventListener) {
			// elUsr.addEventListener('change', srchSite, false);
		// } else {
			// elUsr.attachEvent('onchange', srchSite);
		// }
		
	//Get ID from URL.
	  var myParam = location.search.split('STR=')[1].substr(0,location.search.split('STR=')[1].indexOf(';'));
	  var myParent = "";
	  var varID = "";
	  
	  myParam = location.search.split('STR=')[1];
	  myParam = escapeHTML(myParam);
	  	  
	  srchSite(myParam);
	  
});

	 // Escape string characters
	 function escapeHTML(s) {
	  return s.replace(/\%20/g,' ').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	 }

	function srchSite(searchString){
	  var recordCount = 0;
	  
	  //Search Outages
	  $().SPServices({
		operation: "GetListItems",
		async: false,
		webURL: "/sites/help/outage/",
		listName: "Outage Reporting",
		CAMLViewFields: "<ViewFields><FieldRef Name='Summary' /><FieldRef Name='Business_x0020_Impact' /><FieldRef Name='ID' /><FieldRef Name='Created' /></ViewFields>",
		CAMLQuery: "<Query><Where><And><Or><Contains><FieldRef Name='Summary' /><Value Type='Text'>" + searchString + "</Value></Contains><Contains><FieldRef Name='Business_x0020_Impact' /><Value Type='Text'>" + searchString + "</Value></Contains></Or><Geq><FieldRef Name='Created'/><Value Type='DateTime'><Today OffsetDays='-30'/></Value></Geq></And></Where><OrderBy><FieldRef Name='Summary' /></OrderBy></Query>",
		
		completefunc: function (xData, Status) {
		  $(xData.responseXML).SPFilterNode("z:row").each(function() {
			
			recordCount = recordCount + 1;
			
			//var varID = $(this).attr("ows_ID");
			// bldRating(varID)
			var liSummary = $(this).attr("ows_Summary");
			liSummary = liSummary.replace("string;#", "");
			
			var liHtml = "<article class='entry'><li><header class='entry-header'><h1 class='entry-title'><a " + findLink($(this).attr("ows_ID"),"Outage Reporting") + ">" + liSummary + "</a></h1></header><div class='entry-content-results'><p class='lead'>" + $(this).attr("ows_Business_x0020_Impact") + "</p></div><div class='pagenav group'>" +  "</div></li></article>";
			
			if(liSummary.indexOf("RESOLVED:") >= 0){
				$("#mainLow").append(liHtml);
			}
			else {
				$("#main").append(liHtml);
			}

		  });
		}
	  });
	  
	  //searchIndex List for results.
	  $().SPServices({
		operation: "GetListItems",
		async: false,
		listName: "searchIndex",
		CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Link_x0020_Summary' /><FieldRef Name='Link_x0020_ID' /><FieldRef Name='Link_x0020_Source' /><FieldRef Name='ID' /></ViewFields>",
		CAMLQuery: "<Query><Where><Or><Contains><FieldRef Name='Title' /><Value Type='Text'>" + searchString + "</Value></Contains><Contains><FieldRef Name='Link_x0020_Summary' /><Value Type='Text'>" + searchString + "</Value></Contains></Or></Where><OrderBy><FieldRef Name='Title' /></OrderBy></Query>",
		
		completefunc: function (xData, Status) {
		  $(xData.responseXML).SPFilterNode("z:row").each(function() {
			
			recordCount = recordCount + 1;
			
			//var varID = $(this).attr("ows_ID");
			// bldRating(varID)
			
			var liHtml = "<article class='entry'><li><header class='entry-header'><h1 class='entry-title'><a " + findLink($(this).attr("ows_Link_x0020_ID"),$(this).attr("ows_Link_x0020_Source")) + ">" + $(this).attr("ows_Title") + "</a></h1></header><div class='entry-content-results'><p class='lead'>" + $(this).attr("ows_Link_x0020_Summary") + "</p></div><div class='pagenav group'>" +  "</div></li></article>";
			
			$("#main").append(liHtml);
		  });
		}
	  });
	  
	  if(recordCount <= 0){
		$("#main").append("<article class='entry'><header class='entry-header'><h1 class='entry-title'>We could not find anything associated with '" + searchString + "'!<br/>Please try again.</h1></header></article>");
	  }
	  else {
		$("#results").append("<h1>We found " + recordCount + " results. <i class='fa fa-rocket'></i></h1><br>");
	  }
	}
	
	//Currently NOT used. 
	function bldRating(ID){
		
		var strRating = "<form class='rating-form' id='" + ID + "' action='#' method='post' name='rating-movie'><fieldset class='form-group'><legend class='form-legend'>Rating:</legend><div class='form-item'><input id='rating-5' name='rating' type='radio' value='5' /><label for='rating-5' data-value='5'><span class='rating-star'><i class='fa fa-star-o'></i><i class='fa fa-star'></i></span><span class='ir'>5</span></label><input id='rating-4' name='rating' type='radio' value='4' /><label for='rating-4' data-value='4'><span class='rating-star'><i class='fa fa-star-o'></i><i class='fa fa-star'></i></span><span class='ir'>4</span></label><input id='rating-3' name='rating' type='radio' value='3' /><label for='rating-3' data-value='3'><span class='rating-star'><i class='fa fa-star-o'></i><i class='fa fa-star'></i></span><span class='ir'>3</span></label><input id='rating-2' name='rating' type='radio' value='2' /><label for='rating-2' data-value='2'><span class='rating-star'><i class='fa fa-star-o'></i><i class='fa fa-star'></i></span><span class='ir'>2</span></label><input id='rating-1' name='rating' type='radio' value='1' /><label for='rating-1' data-value='1'><span class='rating-star'><i class='fa fa-star-o'></i><i class='fa fa-star'></i></span><span class='ir'>1</span></label><div class='form-action'><input class='btn-reset' type='reset' value='Reset' /></div><div class='form-output'>? / 5</div></div></fieldset></form>";
		
		return strRating;
	}
	
	function findLink(ID,Source){
		var strURL = "";
		
		if(Source=="Portfolio"){
		  $().SPServices({
			operation: "GetListItems",
			async: false,
			listName: "Portfolio",
			CAMLViewFields: "<ViewFields><FieldRef Name='PageLink' /><FieldRef Name='IsPopup' /><FieldRef Name='EncodedAbsUrl' /><FieldRef Name='LinkFilename' /><FieldRef Name='Display' /><FieldRef Name='Scheduled' /><FieldRef Name='ID' /></ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				if($(this).attr("ows_Scheduled") == 1){
					var ShowItem = ShowTool($(this).attr("ows_LinkFilename"));
					
					if (ShowItem == "Yes"){
						if ($(this).attr("ows_IsPopup") == 1){
							strURL = "href='#portfolio' onclick='" + $(this).attr("ows_PageLink") + "'";
						}
						else {
							strURL = "href='" + $(this).attr("ows_PageLink") + "'";
						}
					}
					else {
						strURL = "href='' title='Not available at this time.'";						
					}
				}
				else {
					if ($(this).attr("ows_IsPopup") == 1){
						strURL = "href='#portfolio' onclick='" + $(this).attr("ows_PageLink") + "'";
					}
					else {
						strURL = "href='" + $(this).attr("ows_PageLink") + "'";
					}
				}
			  });
			}
		  });
		}
		else if(Source=="TeamProfiles"){
		 $().SPServices({
				operation: "GetListItems",
				async: false,
				listName: "TeamProfiles",
				CAMLViewFields: "<ViewFields><FieldRef Name='FullName' /><FieldRef Name='About' /><FieldRef Name='EncodedAbsUrl' /><FieldRef Name='LinkFilename' /><FieldRef Name='SubTeam' /><FieldRef Name='UserName' /><FieldRef Name='OCDTitle' /></ViewFields>",
				CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
				completefunc: function (xData, Status) {  
				  $(xData.responseXML).SPFilterNode("z:row").each(function() {
					var varUser = $(this).attr("ows_UserName");
					varUser = varUser.substr(varUser.indexOf("#")+1,varUser.length);
					
					strURL = "href='http://myconnect/Person.aspx?accountname=na%5C" + varUser + "' target='_new'";
						
				  });
				}
			  });
		}
		else if(Source=="Announcements"){
		  $().SPServices({
			operation: "GetListItems",
			async: false,
			listName: "Announcements",
			CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='buttonId' /><FieldRef Name='buttonText' /></ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				
				var btnID = $(this).attr("ows_buttonId");
				
				if(btnID.startsWith("#")){
					strURL = "href='index.html" + btnID + "'";
				}
				else {
					strURL = "href='" + btnID + "'";
				}
			  
			  });
			}
		  });
		}
		else if(Source=="Synopsis"){
		  $().SPServices({
			operation: "GetListItems",
			async: false,
			listName: "Synopsis",
			CAMLViewFields: "<ViewFields><FieldRef Name='Header' /><FieldRef Name='Synopsis' /><FieldRef Name='SectionId' /></ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				
				strURL = "href='index.html" + $(this).attr("ows_SectionId") + "'";
				
			  });
			}
		  });
		}
		else if(Source=="TRPages"){
		  
		  strURL = "href='page-single.html?ID=" + ID + "'";
		}
		else if(Source=="blog"){
		
		  strURL = "href='single.html?ID=" + ID + "'";
			
		}
		else if(Source=="Outage Reporting"){
		
			strURL = "href='outage-single.html?ID=" + ID + "'";
		
		}
		else if(Source=="KB"){
		
		  $().SPServices({
			operation: "GetListItems",
			async: false,
			webURL: "/sites/Knowledgebase/",
			listName: "{11AA2F84-FDF9-404D-9313-D6588E44739F}",
			CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='LinkFilename' /></ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				
				strURL = "href='/sites/Knowledgebase/Shared%20Documents/" +  $(this).attr("ows_LinkFilename") + "'";
				
			  });
			}
		  });			
		
		}
		else if(Source=="MyMobile-HowTo"){
		
			strURL = "href='../../MyMobile/page-single.html?ID=" + ID + "'";
		
		}
		else if(Source=="MyMobile-Synopsis"){
		
		  $().SPServices({
			operation: "GetListItems",
			async: false,
			webURL: "/sites/help/",
			listName: "MyMobileSynopsis",
			CAMLViewFields: "<ViewFields><FieldRef Name='Header' /><FieldRef Name='Synopsis' /><FieldRef Name='SectionId' /></ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				
				strURL = "href='../../MyMobile/index.html" + $(this).attr("ows_SectionId") + "'";
				
			  });
			}
		  });
		
		}
		else if(Source=="OneDrive-HowTo"){
		
			strURL = "href='../../OneDrive/page-single.html?ID=" + ID + "'";
		
		}
		else if(Source=="OneDrive-Synopsis"){
		
		  $().SPServices({
			operation: "GetListItems",
			async: false,
			webURL: "/sites/help/",
			listName: "OneDriveSynopsis",
			CAMLViewFields: "<ViewFields><FieldRef Name='Header' /><FieldRef Name='Synopsis' /><FieldRef Name='SectionId' /></ViewFields>",
			CAMLQuery: "<Query><Where><Eq><FieldRef Name='ID' /><Value Type='Integer'>" + ID + "</Value></Eq></Where></Query>",
			completefunc: function (xData, Status) {
			  $(xData.responseXML).SPFilterNode("z:row").each(function() {
				
				strURL = "href='../../OneDrive/index.html" + $(this).attr("ows_SectionId") + "'";
				
			  });
			}
		  });
		
		}
		
		return strURL;
	}
	
	//Scheduled Icon
	function ShowTool(myTitle){
		//Get Today
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

		if(dd<10) {
			dd='0'+dd
		} 

		if(mm<10) {
			mm='0'+mm
		} 

		today = yyyy+'-'+mm+'-'+dd+' '+time;
	
		var DisplayMe = "No";
		
	  //Look up Tool for Portfolio Section
	  //<And><Geq><FieldRef Name='Start Time' /><Value  IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Geq></And>
	  $().SPServices({
		operation: "GetListItems",
		async: false,
		listName: "ScheduledIcon",
		viewName: "{9E5D4537-20E7-402F-BF95-8CD5DB0D5C40}",		
		CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Start Time' /><FieldRef Name='End Time' /></ViewFields>",
		completefunc: function (xData, Status) {
		  $(xData.responseXML).SPFilterNode("z:row").each(function() {
			if($(this).attr("ows_Title") == myTitle){
				if($(this).attr("ows_EventDate") <= today && $(this).attr("ows_EndDate") >= today){
				  var current = new Date();
  
				  if(current.getDay()==0){
						DisplayMe = "No";
				  }
				  else if(current.getDay()==6){
						DisplayMe = "No";
				  }
				  else {
					  if(current.getHours()>7){
						  if(current.getHours()>16){
							DisplayMe = "No";
						   }
						  else {
							DisplayMe = "Yes";
						  }
					   }
					   else {
						   DisplayMe = "No";
					   }
					}					
				}
				else {
					DisplayMe = "No";
				}
			}
			else {
				DisplayMe = "No";
			}
		  });
		}
	  });
	  
	  return DisplayMe;	
	}
	

//End of Script
})(jQuery);