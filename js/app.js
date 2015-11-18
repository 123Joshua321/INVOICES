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
		form = form + '<div class="ui-body ui-body-b" align="left"><form><b>Client<br></b><select id="client" ng-model="invoicemodel" ng-change="formatChange()">';
		i = 0;
		for(i=0;i<data.length;i++){
			form = form + "<option id=" + i + "value='" + data[i].name + "'>" + data[i].name + "</option>";
		}
		form = form + "</select><br>";
		i = 0;
		
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var d = new Date();
		var currentmonth = monthNames[d.getMonth()];
		//TODAYS DATE
		form = form +"<br><div id='todaydate'><b>Today's Date</b><br><select id='todayday' ng-model='invoicemodel'>" + dayselect + "</select>";
		form = form + "<select id='todaymonth' ng-model='invoicemodel'>" + monthselect + "</select>" + "<select id='todayyear' ng-model='invoicemodel'>" + yearselect +"</select></div>";
		
		//SHORT FORMAT DATE STUFF
		i = 0;
		form = form + "<div id='shortlong'>";
		if (data[i].format == "short") {
			form = form + "<br>Invoice Month<br><select id='invoicemonth' ng-model='invoicemodel'>" + monthselect + "</select><select id='invoiceyear' ng-model='invoicemodel'>" + yearselect + "</select>";
			form = form + "<br><br>Hours<br><input type='text' id='hours' size='3'>";
		}
		
		//LONG FORMAT
		if (data[i].format == "long"){
			
			
			
			//HOURS ON EACH DAY
			form = form + "<br><b>Hours</b><br>";
			form = form + "Day 1:<select id='day1' ng-model='invoicemodel'>" + dayselect + "</select><select id='month1' ng-model='invoicemodel'>" + monthselect + "</select> Hours:<input type='text' id='hours1' size='3'><div id='moredays'>";
			form = form + "</div><br><button ng-click='addhour()'>Add day</button>";
			
			
		}
		form = form + "</div>";
		
		
		form = form + "</form></div>";
		document.getElementById("addinvoiceform").innerHTML = form;
		
			
	};
	
	
	//add day
	$scope.addhour = function(){
		addday = addday + 1;
		var yearselect = "";
		var d = new Date();
		var currentyear = d.getFullYear();
		var lastyear = currentyear - 1;
		var twoyears = lastyear - 1;
		yearselect = yearselect + "<option id='" + currentyear + "'>" + currentyear + "</option>";
		yearselect = yearselect + "<option id='" + lastyear + "'>" + lastyear + "</option>";
		yearselect = yearselect + "<option id='" + twoyears + "'>" + twoyears + "</option>";
		var current = document.getElementById('moredays').innerHTML;
		current = current + "<br>Day " + addday + ":<select id='day" + addday + "'>" + dayselect + "</select><select ng-model='invoicemodel' id='month" + addday + "'>" + monthselect + "</select> Hours:<input type='text' id='hours" + addday + "' size='3'>";
		document.getElementById('moredays').innerHTML = current;	
	};//end add hour
	
	
	$scope.formatChange = function(){
		var data = $scope.storage.clientlist;
		var i = $scope.client;
		var format = data[i].format
		var form = ""
		if (format == "short"){
			form = form + "<br>Invoice Month<br><select id='invoicemonth' ng-model='invoicemodel'>" + monthselect + "</select><select id='invoiceyear' ng-model='invoicemodel'>" + yearselect + "</select>";
			form = form + "<br><br>Hours<br><input type='text' id='hours' size='3'>";
		}//end if
		if (format == "long"){
			form = form + "<br><b>Hours</b><br>";
			form = form + "Day 1:<select id='day1' ng-model='invoicemodel'>" + dayselect + "</select><select id='month1' ng-model='invoicemodel'>" + monthselect + "</select> Hours:<input type='text' id='hours1' size='3'><div id='moredays'>";
			form = form + "</div><br><button ng-click='addhour()'>Add day</button>";
			addday = 1;
		}//end if
		document.getElementById("shortlong").innerHTML = form;
	};//end reload form
	
	//--------------------------DEFAULT-------------------
	$scope.storage = $localStorage.$default({
    						clientlist: [{
											name: "Default Client",
											hourrate: 35.0,
											code: "DFT",
											format: "long",
											address: "123 Lol street, Le lenny town",
										} , {
											name: "Default Client 2",
											hourrate: 30.5,
											code: "DF2",
											format: "short",
											address: "456 ROFL street, Le lenny town",
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
											paymentunit: "weeks",
											paymenttermsenabled: true,
											bsb: "000-111",
											account: "1232 1234 1235 1385",
											paymentdetailsenabled: true,
							}]
	});

						
	//--------------------------ADD---------------------------
						$scope.addSleep = function () {
							var addSleep = {
								date: 					$scope.date,
								hoursleep: 				$scope.hoursleep,
								minutesleep:			$scope.minutesleep,
								refreshed: 				$scope.refreshed,
								sleepquality: 			$scope.sleepquality,
								notes:					$scope.notes,
						   };
						   
						$localStorage.mysleeps.push(addSleep);
						
						$scope.date			= 		"";
						$scope.hoursleep	= 		0;
						$scope.minutesleep	= 		0;
						$scope.refreshed 	= 		0;
						$scope.sleepquality =		"";
						$scope.notes		=		"";
						
						
						$scope.successfullyAdded = true; //message on the screen saying added
	
						};
		
						$scope.ClearAddMessage = function () {
							$scope.successfullyAdded = false;	
							$scope.successfullyUpdated = false;	//Resets message when nav clicked
						};
		
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
			 $scope.displayEdit = function (index) {
				 	 $scope.index			=		index;
					 $scope.date			=		$scope.storage.mysleeps[index].date;
					 $scope.hoursleep		=		$scope.storage.mysleeps[index].hoursleep;
					 $scope.minutesleep		=		$scope.storage.mysleeps[index].minutesleep;
					 $scope.refreshed		=		$scope.storage.mysleeps[index].refreshed;
					 $scope.sleepquality	=		$scope.storage.mysleeps[index].sleepquality;
					 $scope.notes			=		$scope.storage.mysleeps[index].notes;
			
			 };
			 
			 $scope.saveEditSleep = function (index) {
				 
				$scope.storage.mysleeps[index].date 			=		$scope.date; 			
				$scope.storage.mysleeps[index].hoursleep	 	=		$scope.hoursleep; 
				$scope.storage.mysleeps[index].minutesleep	 	=		$scope.minutesleep; 
				$scope.storage.mysleeps[index].refreshed 		=		$scope.refreshed; 	
				$scope.storage.mysleeps[index].sleepquality 	=		$scope.sleepquality ; 
				$scope.storage.mysleeps[index].notes			=		$scope.notes;
				
			 };
			 
			 $scope.deleteSleep = function (index) {
				 		$scope.index		=		index;
			 };
			 
			 $scope.deleteSleepYes = function (index) {
				 $scope.storage.mysleeps.splice(index, 1);
			 };
			 
			 //----------------------end EDIT AND DELETE------------
			 
			 //---------------------------REPORTS-------------------------
			 	$scope.showReports = function() {
					 	 
				 }; 
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

					
			
			
	
	
			
			
			
			
