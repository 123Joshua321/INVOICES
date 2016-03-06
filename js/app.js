//CRUD using AngularJS and ngStorage
//Created by Peter Cox
//11 April 2015
//Copyright  2014  PCSquared.com.au
			
	
	var addday = 1;
	var monthselect ="<option id='January'>January</option>";
			monthselect = monthselect + "<option id='February'>February</option>";
			monthselect = monthselect + "<option id='March'>March</option>";
			monthselect = monthselect + "<option id='April'>April</option>";
			monthselect = monthselect + "<option id='May'>May</option>";
			monthselect = monthselect + "<option id='June'>June</option>";
			monthselect = monthselect + "<option id='July'>July</option>";
			monthselect = monthselect + "<option id='August'>August</option>";
			monthselect = monthselect + "<option id='September'>September</option>";
			monthselect = monthselect + "<option id='October'>October</option>";
			monthselect = monthselect + "<option id='November'>November</option>";
			monthselect = monthselect + "<option id='December'>December</option>";
		var dayselect = "<option id='1'>1</option>";
			dayselect = dayselect + "<option id='2'>2</option>";
			dayselect = dayselect + "<option id='3'>3</option>";
			dayselect = dayselect + "<option id='4'>4</option>";
			dayselect = dayselect + "<option id='5'>5</option>";
			dayselect = dayselect + "<option id='6'>6</option>";
			dayselect = dayselect + "<option id='7'>8</option>";
			dayselect = dayselect + "<option id='8'>8</option>";
			dayselect = dayselect + "<option id='9'>9</option>";
			dayselect = dayselect + "<option id='10'>10</option>";
			dayselect = dayselect + "<option id='11'>11</option>";
			dayselect = dayselect + "<option id='12'>12</option>";
			dayselect = dayselect + "<option id='13'>13</option>";
			dayselect = dayselect + "<option id='14'>14</option>";
			dayselect = dayselect + "<option id='15'>15</option>";
			dayselect = dayselect + "<option id='16'>16</option>";
			dayselect = dayselect + "<option id='17'>17</option>";
			dayselect = dayselect + "<option id='18'>18</option>";
			dayselect = dayselect + "<option id='19'>19</option>";
			dayselect = dayselect + "<option id='20'>20</option>";
			dayselect = dayselect + "<option id='21'>21</option>";
			dayselect = dayselect + "<option id='22'>22</option>";
			dayselect = dayselect + "<option id='23'>23</option>";
			dayselect = dayselect + "<option id='24'>24</option>";
			dayselect = dayselect + "<option id='25'>25</option>";
			dayselect = dayselect + "<option id='26'>26</option>";
			dayselect = dayselect + "<option id='27'>27</option>";
			dayselect = dayselect + "<option id='28'>28</option>";
			dayselect = dayselect + "<option id='29'>29</option>";
			dayselect = dayselect + "<option id='30'>30</option>";
			dayselect = dayselect + "<option id='31'>31</option>";
			
			
	var app = angular.module('app',['ngStorage','ui-rangeSlider']);
			
			
	//add day to hour input
	function addhours() {
		addday = addday + 1;
		var yearselect = "";
		var d = new Date();
		var currentyear = d.getFullYear();
		var lastyear = currentyear - 1;
		var twoyears = lastyear - 1;
		yearselect = yearselect + "<option id='" + currentyear + "'>" + currentyear + "</option>";
		yearselect = yearselect + "<option id='" + lastyear + "'>" + lastyear + "</option>";
		yearselect = yearselect + "<option id='" + twoyears + "'>" + twoyears + "</option>";
		$(".moredays").append("<br>Day " + addday + ":<select id='day" + addday + "'>" + dayselect + "</select> Hours:<input type='number' id='hours" + addday + "' size='2'></select> Minutes:<input type='number' id='minutes" + addday + "' size='2'><br>Work Done:<input type='text' id='workdone" + addday + "' ng-model='workdone" + addday + "'/>");
	}		





	app.controller('invoiceController', function($scope,$localStorage) {

	$scope.startng = function() {
		var data = $scope.storage.clientlist;
		
		//setup input templates
		
		var i = 0;
		var yearselect = "";
		var d = new Date();
		var currentyear = d.getFullYear();
		var lastyear = currentyear - 1;
		var twoyears = lastyear - 1;
		yearselect = yearselect + "<option id='" + currentyear + "'>" + currentyear + "</option>";
		yearselect = yearselect + "<option id='" + lastyear + "'>" + lastyear + "</option>";
		yearselect = yearselect + "<option id='" + twoyears + "'>" + twoyears + "</option>";
			
		
		
		//CLIENT SELECT
		var form = "";
		form = form + '<form><b>Client<br></b><select id="client" ng-model="formatChangeScript" ng-change="formatChangeScript(id)">';
		i = 0;
		for(i=0;i<data.length;i++){
			form = form + "<option  id=" + i + "value='" + data[i].name + "'>" + data[i].name + "</option>";
		}
		form = form + "</select><br/><b>Invoice Format</b><br/><select><option>short</option><option>long</option></select>";
		i = 0;
		
		//var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		/*var d = new Date();
		var currentmonth = monthNames[d.getMonth()];*/
		
		//TODAYS DATE
		form = form +"<br><div id='todaydate'><b>Today's Date</b><br><select id='todayday' ng-model='invoicemodel'>" + dayselect + "</select>";
		form = form + "<select id='todaymonth' ng-model='invoicemodel'>" + monthselect + "</select>" + "<select id='todayyear' ng-model='invoicemodel'>" + yearselect +"</select></div>";
		
		//SHORT FORMAT DATE STUFF
		i = 0;
		form = form + "<div id='shortlong'>";
					form = form + "<br>Invoice Month<br><select id='invoicemonth' ng-model='invoicemodel'>" + monthselect + "</select><select id='invoiceyear' ng-model='invoicemodel'>" + yearselect + "</select>";
		if (data[i].format == "short") {
		    form = form + "<br><br>Hours:<input type='number' id='hours1' size='2'><br>Minutes:<input type='number' id='minutes1' size='2'><br><br>";
		}
		
		//LONG FORMAT
		if (data[i].format == "long"){
			
	
			//HOURS ON EACH DAY
			form = form + "<br><b>Hours</b><br>";
			form = form + "Day 1:<select id='day1' ng-model='day1'>" + dayselect + "</select>" + " Hours:<input type='number' id='hours1' size='3' ng-model='hours1'> Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'></input><br>Work Done:<input type='text' id='workdone1 ng-model='workdone1'/><br><br><div id='moredays' class='moredays'>";
			form = form + "</div><button onclick='addhours()'>Add day</button>";
			
			
		}
		form = form + "</div>";
		
		var timesheet = "<br>Notes:<br><textarea rows='7' cols='25' id='timesheet' ng-model='timesheet'></textarea>	";
		form = form + timesheet;
		if (data[i].format == "short"){
			form = form +"<br>Use notes as timesheet:<input type='checkbox' id='enabletimesheet' ng-model='enabletimesheet'/>"
		}
		form = form + "<br><button ng-click='submitinvoice' value='Submit'>Submit</button>";
		form = form + "</form></div>";
		document.getElementById("formthing").innerHTML = form;
		
		
	};
	
	

	
	

 
	
	
	$scope.termsselect = function(){
		if ($scope.storage.owndata[0].terms == "weeks"){
			document.getElementById('termsunits').innerHTML = '<option name="days" ng-model="days" id="days">DAYS</option><option name="weeks" ng-model="weeks" id="days ng-selected="expression">WEEKS</option>'
		} else {
			document.getElementById('termsunits').innerHTML = '<option name="days" ng-model="days" id="days" ng-selected="expression">DAYS</option><option name="weeks" ng-model="weeks" id="days">WEEKS</option>';
		}
	}
	
	
	
	
	
	
	//--------------------------DEFAULT-------------------
	$scope.storage = $localStorage.$default({
    						clientlist: [{
											name: "Default Client",
											hourrate: 40.0,
											format: "short",
											addressone: "123 Lol street",
											addresstwo: "Le Lenny Town",
											contact: "0400123456",
										} , {
											name: "Default Client 2",
											hourrate: 30.5,
											format: "long",
											addressone: "456 Rofl street",
											addresstwo: "Le Lenny Town",
											contact: "email@email.com",
										}]
							
					});
	$scope.storage = $localStorage.$default({
							owndata: [{
											nameone: "Default Company 1",
											nameoneenabled: true,
											nametwo: "Default Company 2",
											nametwoenabled: true,
											abn: "1234567890",
											abnenabled: true,
											contact: "0412345678 me@me.com",
											contactenabled: true,
											paymenttime: 7,
											paymentunit: "days",
											paymenttermsenabled: true,
											bsb: "000-111",
											account: "1232 1234 1235 1385",
											paymentdetailsenabled: true,
											invoicenos: "000002",
							}]
	});
	$scope.storage = $localStorage.$default({
						loaded: [{
								client: "Default Client",
								days: 0,
								hours: 40,
								month: "December",
								year: "2014",
								madedate: "1 January 2015",
								timesheet: "defaultTS",
						}]
	});
	$scope.storage = $localStorage.$default({
				invoices: [{
						client: "Default Client",
						format: "short",
						hours: 10,
						perhour: 40,
						totalpay: 400.00,
						month: "December 2014",
						made: "1 January 2015",
						note: "5 December 5 hours, 10 December 5 hours", 
						invoiceno: "000001",
						paid: "Yes",
						datepaid: "29th February 2015",
                        followupsent: "Yes",
				},{
					client: "Default Client 2",
					format: "long",
					hours: 6,
					perhour: 30.5,
					totalpay: 183.00,
					month: "November 2014",
					made: "3 December 2014",
					day1: 14,
					month1: "November",
					hours1: 3,
					day2: 27,
					month2: "November",
					hours2: 3,
					workdone1: "Did accounts",
					workdone2: "Did payroll",
					note: "",
					invoiceno: "000002",
					paid: "No",
					datepaid: "",
					followupsent: "Yes",
				}]
	});

						
	//--------------------------ADD---------------------------
						$scope.addSleep = function () {
							var notes = $scope.timesheet;
							var timesheet = nl2br(notes, false)
							var addInvoice = {
								date: 					$scope.date,
								hoursleep: 				$scope.hoursleep,
								minutesleep:			$scope.minutesleep,
								refreshed: 				$scope.refreshed,
								sleepquality: 			$scope.sleepquality,
								notes:					timesheet
						   };
						   
						$localStorage.mysleeps.push(addInvoice);
						
						$scope.date			= 		"";
						$scope.hoursleep	= 		0;
						$scope.minutesleep	= 		0;
						$scope.refreshed 	= 		0;
						$scope.sleepquality =		"";
						$scope.timesheet	=		"";
						
						
						$scope.successfullyAdded = true; //message on the screen saying added
	
						};
		
						$scope.ClearAddMessage = function () {
							$scope.successfullyAdded = false;	
							$scope.successfullyUpdated = false;	//Resets message when nav clicked
						};
		
		
		//CONVERT TEXTAREA TO HTML TEXT
	function nl2br(str, is_xhtml) {
  //  discuss at: http://phpjs.org/functions/nl2br/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Philip Peterson
  // improved by: Onno Marsman
  // improved by: Atli Þór
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Maximusya
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //   example 1: nl2br('Kevin\nvan\nZonneveld');
  //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
  //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
  //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'

  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
		
		
		
		
		//--------------------END ADD------------------
		
		//----------------------SETTINGS------------------
			 
		$scope.updateSettings = function () {
				var updateSettings = {
						age:		$scope.age, 
				};
				
				$localStorage.appsettings.push(updateSettings);
				
				$scope.age	 = 		"";
				$scope.storage.appsettings.splice(0, 1);
				
				$scope.successfullyUpdated = true;
		};
		
			
		
			
	//----------------------------END SETTINGS--------------------
	
	//----------------------------EDIT AND DELETE----------------		
			 $scope.displayEditClient = function (index) {
				 	 $scope.index			=		index;
					 $scope.name			=		$scope.storage.clientlist[index].name;
					 $scope.hourrate		=		$scope.storage.clientlist[index].hourrate;
					 $scope.addressone		=		$scope.storage.clientlist[index].addressone;
					 $scope.addresstwo		=		$scope.storage.clientlist[index].addresstwo;
					 $scope.contact			=		$scope.storage.clientlist[index].contact;
					var thing = '<select name="format" ng-model="editformat">  ';

					 if ($scope.storage.clientlist[index].format == "short"){
						 document.getElementById('editshortlong').innerHTML = thing + "<option value='short' id='short' ng-selected='expression'>Short</option><option value='long' id='long'>Long</option>";
					 } else {
						 document.getElementById('editshortlong').innerHTML = thing +"<option value='long' id='long' ng-selected='expression'>Long</option><option value='short' id='short'>Short</option>";
					 }
			
			 };
			 
			 $scope.saveEditClient = function (index) {
				 
				$scope.storage.clientlist[index].name 			=		$scope.name; 			
				$scope.storage.clientlist[index].hourrate	 	=		$scope.hourrate; 
				$scope.storage.clientlist[index].addressone	 	=		$scope.addressone; 
				$scope.storage.clientlist[index].addresstwo 	=		$scope.addresstwo; 	
				$scope.storage.clientlist[index].format 		=		$scope.editformat ; 
				
			 };
			 
			 $scope.deleteClient = function (index) {
				 		$scope.index		=		index;
			 };
			 
			 $scope.deleteClientYes = function (index) {
				 $scope.storage.clientlist.splice(index, 1);
			 };
			 
			 //----------------------end EDIT AND DELETE------------
			 
			 //---------------------------REPORTS-------------------------
			 	$scope.showReports = function() {
					 	 
				 }; 
				 
				 
				 
				/*------------------------------
				---------------------------------INVOICE.HTM CODE
				----------------------------------
				---------------------------------*/
				 $scope.formatinvoice = function() {
					 var data = $scope.storage.loaded;
					 var clientinfo = $scope.storage.clientlist;
					 var config = $scope.storage.owndata;
					 var client = data[0].client;
					 if (clientinfo[client].format == "short"){
					 	document.getElementById('longformat').style.display = 'none';}
					 if (clientinfo[client].format == "long"){
						 document.getElementById('shortformat').style.display = 'none';
						 document.getElementById('timesheet').style.display = 'none';}
					if (config[client].nameoneenabled == false){
						document.getElementById('companyone').style.display = 'none';}
					if (config[client].nametwoenabled == false){
						document.getElementById('companytwo').style.display = 'none';}
					document.getElementById('companyone').innerHTML = config[client].nameone;
					document.getElementById('companytwo').innerHTML = config[client].nametwo;
					
				 }
				 
				 
			});//end angular application
	//NOTE:  this directive fixes the clash between JQuery Mobile and  Angular when they both try to refresh an item you add to a listview
	app.directive('listView', function () {
		 var link=function(scope, element, attrs) {
			$(element).listview();
			scope.$watchCollection(attrs.watch, function() {
				$(element).listview("refresh");
			});
		};
		return {
			restrict: 'EA',
			scope:false,
			link: link
		};
	});	

					
			
			
	
	
			
			
			
			
