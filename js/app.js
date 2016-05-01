//CRUD using AngularJS and ngStorage
//Created by Peter Cox
//11 April 2015
//Copyright  2014  PCSquared.com.au
			
	//---------------------------------------------BEGIN NON-ANGULAR SETUP---------------------------------
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
			
			
	var app = angular.module('app',['ngStorage']);
			
			
	//ADD DAY TO HOURS INPUT FOR LONG FORMAT
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
		$(".moredays").append("<br>Day " + addday + ":<select id='day" + addday + "'>" + dayselect + "</select> Hours:<input type='number' id='hours" + addday + "' ng-model='hours" + addday + "'size='2'></select> Minutes:<input type='number' id='minutes" + addday + "' ng-model='minutes" + addday + "' size='2'><br>Work Done:<input type='text' id='workdone" + addday + "' ng-model='workdone" + addday + "'/>");
	}		




//--------------------------------------------------END NON-ANGULAR. APPLICATION START-----------------------------------------




	app.controller('invoiceController', function($scope, $localStorage, $compile) {




	    //-------------STARTUP FUNCTION - FORM AND STUFF
	    
	    $scope.startng = function () {

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
			
		
		
		//POPULATE CLIENT SELECT DROPDOWN
		var form = "";
		form = form + '<b>Client<br></b><select id="client" ng-model="clientselect" ng-change="formatChangeScript()">';
		i = 0;
		for(i=0;i<data.length;i++){
			form = form + "<option  id=" + i + "value='" + data[i].name + "'>" + data[i].name + "</option>";
		}


        //SELECT FORMAT BOX
		form = form + "</select><br/><b>Invoice Format</b><br/><select ng-model='selectformat'><option value='short'>Short</option><option value='long'>Long</option></select>";
		i = 0;


		//TODAY'S DATE INPUT SELECTION
		form = form +"<br><div id='todaydate'><b>Today's Date</b><br><select id='todaydate' ng-model='invoicemodel'>" + dayselect + "</select>";
		form = form + "<select id='todaymonth' ng-model='todaymonth'>" + monthselect + "</select>" + "<select id='todayyear' ng-model='todayyear'>" + yearselect +"</select></div>";
		

        //INVOICE MONTH SELECTION
		i = 0;
		form = form + "<br>Invoice Month<br><select id='invoicemonth' ng-model='invoicemonth'>" + monthselect + "</select><select id='invoiceyear' ng-model='invoiceyear'>" + yearselect + "</select>";


		form = form + "<div id='shortlong'>";


	    //SHORT FORMAT INPUT CREATION
		if (data[i].format == "short") {
		    form = form + "<br><br>Hours:<input type='number' id='hours1' size='2' ng-model='hours1'><br>Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'><br>Work Done:<input type='text' id='workdone1' ng-model='workdone1'/><br><br>";
		}
		

		//LONG FORMAT INPUT CREATION
		if (data[i].format == "long"){
			//HOURS WORKED ON EACH DAY INPUTS
			form = form + "<br><b>Hours</b><br>";
			form = form + "Day 1:<select id='day1' ng-model='day1' >" + dayselect + "</select>" + " Hours:<input type='number' id='hours1' size='3' ng-model='hours1'> Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'></input><br>Work Done:<input type='text' id='workdone1 ng-model='workdone1'/><br><br><div id='moredays' class='moredays'>";
			form = form + "</div><button onclick='addhours()'>Add day</button>";
		}


		form = form + "</div>";
		

        //TIMESHEET/NOTES INPUT
		var timesheet = "<br>Notes:<br><textarea rows='7' cols='25' id='timesheet' ng-model='timesheet'></textarea>	";
		form = form + timesheet;


        //CHECKBOX FOR USING NOTES AS TIMESHEET
		if (data[i].format == "short"){
			form = form +"<br>Use notes as timesheet:<input type='checkbox' id='enabletimesheet' ng-model='enabletimesheet'/>"
		}



		$compile(form)(scope);
		document.getElementById('formthing').innerHTML = form;
		
		
		


		
		//$scope.$apply();
	};
	//----------------END STARTUP FUNCTION--------------
	

	
	

 
	//-------EDIT OWN INFO SCREEN POPULATE DEFAULT
	
	$scope.editscreenpopulate = function () {

        //Terms selection dropdown
		if ($scope.storage.owndata[0].terms == "weeks"){
			document.getElementById('termsunits').innerHTML = '<option name="days" id="days">DAYS</option><option name="weeks"  id="days ng-selected="expression">WEEKS</option>'
		} else {
			document.getElementById('termsunits').innerHTML = '<option name="days" id="days" ng-selected="expression">DAYS</option><option name="weeks" id="days">WEEKS</option>';
		}
	}
	
	
	//-----------END EDIT OWN INFO SCREEN POPULATE
	
	
	
	    //--------------------------DATABASE SETUP - DEFAULT DATA--------------


        //Client List default
	$scope.storage = $localStorage.$default({
    						clientlist: [{
											name: "Default Client",
											hourrate: 40.0,
											format: "short",
											addressone: "123 Lol street",
											addresstwo: "Le Lenny Town",
											contact: "0400123456"
										} , {
											name: "Default Client 2",
											hourrate: 30.5,
											format: "long",
											addressone: "456 Rofl street",
											addresstwo: "Le Lenny Town",
											contact: "email@email.com"
										}]
							
	});


        //Own Data default
	$scope.storage = $localStorage.$default({
							owndata: [{
											nameone: "Default Company 1",
											nametwo: "Default Company 2",
											abn: "1234567890",
											contact: "0412345678 me@me.com",
											paymenttime: 7,
											paymentunit: "days",
											bsb: "000-111",
											account: "1232 1234 1235 1385",
											invoicenos: "000002"
							}]
	});

        //Loaded invoice (temp storage when loading)
	$scope.storage = $localStorage.$default({
						loaded: [{
								client: "Default Client",
								days: 0,
								hours: 40,
								month: "December",
								year: "2014",
								madedate: "1 January 2015",
								timesheet: "defaultTS"
						}]
	});

        //Invoices default
	$scope.storage = $localStorage.$default({
        //TODO: Fix this to follow new format
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
	        followupsent: "Yes"
	    }]
	});

        //---------------------END DEFAULT DATA-------------------------




						
	//--------------------------ADD---------------------------
	$scope.addinvoice = function() {
	                        console.log("ADD FUNCTION CALLED");
							var notes = document.getElementById('timesheet').innerHTML;
							var timesheet = nl2br(notes, false)
							var days = [];
							var hours = [];
							var minutes = [];
							var workdone = [];

                            //Short format
							if ($scope.selectformat == 'short') {
							    hours[1] = document.getElementById('hours1').innerHTML;
							    minutes[1] = document.getElementById('minutes1').innerHTML;
							    workdone[1] = document.getElementById('workdone1').innerHTML;
                                    	}


                            //Long format
							if ($scope.selectformat == 'long') {
							    for (var i = 1; i <= addday; i++) {
							        hours[i] = document.getElementById('hours' + i).innerHTML;
							        minutes[i] = document.getElementById('minutes' + i).innerHTML;
							        workdone[i] = document.getElementById('workdone' + i).innerHTML;
							        days[i] = document.getElementById('days' + i).innerHTML;
							    }
							}



							var addInvoiceData = {
								client: 				$scope.clientselect,
								format:                 $scope.selectformat,
								days:                   days,
								hours:                  hours,
								minutes:                minutes,
                                workdone:               workdone,
                                month:                  $scope.invoicemonths,
                                notes:                  timesheet,
                                enabletimesheet:        $scope.enabletimesheet
						   };
						   
							$localStorage.invoices.push(addInvoiceData);
						
						$scope.clientselect		= 		"";
						$scope.selectformat	    = 		"";
						$scope.invoicemonths	= 		"";
						$scope.enabletimesheet 	= 		false;
						$scope.timesheet	    =		"";
						
						
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


  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
		
		//--------------------END ADD------------------
		



		//----------------------SETTINGS PAGE------------------
			 
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
	



	//----------------------------EDIT AND DELETE PAGE----------------		
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



					
			
			
	
	
			
			
			
			
