//CRUD using AngularJS and ngStorage
//Created by Peter Cox
//11 April 2015
//Copyright  2014  PCSquared.com.au
			
	// creates the Angular modular "app"  
	// NOTE: we inject into the module the ngStorage object  AND ui-rangeSlider
	
	
	var app = angular.module('app',['ngStorage','ui-rangeSlider']);
			
	//  This is the controller called "reviewController". 
	//  It has two parameters:  $scope and $localStorage
	app.controller('invoiceController', function($scope,$localStorage) {

	$scope.startng = function() {
		var data = $scope.storage.clientlist;
		
		
		var form = "";
		form = form + "<form><h>Client<br></h><select id='client' onchange='format(client)'>";
		var i = 0;
		for(i=0;i<data.length;i++){
			form = form + "<option id=" + i + "value='" + data[i].name + "'>" + data[i].name + "</option>";
		}
		form = form + "</select><br>";
		i = 0;
		if (data[i].format = "short"){
			form = form + "<div id='dateselect'>Month<br><select id='month'>"
			form = form + "<option id='January'>January</option>"
			form = form + "<option id='February'>February</option>"
			form = form + "<option id='March'>March</option>"
			form = form + "<option id='April'>April</option>"
			form = form + "<option id='May'>May</option>"
			form = form + "<option id='June'>June</option>"
			form = form + "<option id='July'>July</option>"
			form = form + "<option id='August'>August</option>"
			form = form + "<option id='September'>September</option>"
			form = form + "<option id='October'>October</option>"
			form = form + "<option id='November'>November</option>"
			form = form + "<option id='December'>December</option></div>"
		}
		else {form = form +"<div id='dateselect'>Start Date<input type'date' id='date1'/><br>End Date<input type='date' id='date2'/></div>";}
		document.getElementById("addinvoiceform").innerHTML = form;
		
		
		
		
	};
	function format(client){
		var name = document.getElementById('client').innerHTML;
		var found = false
		var data = $scope.storage.clientlist;
		for (var i = 0; i < data.length && found == false; i = i + 1){
			if (name == data[i].name) {
				found = true;
				var format = data[i].format;
			}
		}
		if (format = "short"){
			document.getElementById('dateselect').innerHTML = "Month<br><select id='month'<option id='January'>January</option><option id='February'>February</option><option id='March'>March</option><option id='April'>April</option><option id='May'>May</option><option id='June'>June</option><option id='July'>July</option><option id='August'>August</option><option id='September'>September</option><option id='October'>October</option><option id='November'>November</option><option id='December'>December</option></div>";
		}
		else { if (format = "long"){
			
				}
		}
	}
	
	//--------------------------DEFAULT-------------------
	$scope.storage = $localStorage.$default({
    						clientlist: [{
											name: "Default Client",
											hourrate: 35.0,
											code: "DFT",
											format: "short",
											address: "123 Lol street, Le lenny town",
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

					
			
			
	
	
			
			
			
			
