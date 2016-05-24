//CRUD using AngularJS and ngStorage
//Created by Peter Cox
//11 April 2015
//Copyright  2014  PCSquared.com.au
			
	//---------------------------------------------BEGIN NON-ANGULAR SETUP---------------------------------
var addday = 1;
var selectedformatglobal = "";
	var monthselect ="<option id='January'>January</option>";
			monthselect = monthselect + "<option value='February'>February</option>";
			monthselect = monthselect + "<option value='March'>March</option>";
			monthselect = monthselect + "<option value='April'>April</option>";
			monthselect = monthselect + "<option value='May'>May</option>";
			monthselect = monthselect + "<option value='June'>June</option>";
			monthselect = monthselect + "<option value='July'>July</option>";
			monthselect = monthselect + "<option value='August'>August</option>";
			monthselect = monthselect + "<option value='September'>September</option>";
			monthselect = monthselect + "<option value='October'>October</option>";
			monthselect = monthselect + "<option value='November'>November</option>";
			monthselect = monthselect + "<option value='December'>December</option>";
		var dayselect = "<option value='1'>1</option>";
			dayselect = dayselect + "<option value='2'>2</option>";
			dayselect = dayselect + "<option value='3'>3</option>";
			dayselect = dayselect + "<option value='4'>4</option>";
			dayselect = dayselect + "<option value='5'>5</option>";
			dayselect = dayselect + "<option value='6'>6</option>";
			dayselect = dayselect + "<option value='7'>7</option>";
			dayselect = dayselect + "<option value='8'>8</option>";
			dayselect = dayselect + "<option value='9'>9</option>";
			dayselect = dayselect + "<option value='10'>10</option>";
			dayselect = dayselect + "<option value='11'>11</option>";
			dayselect = dayselect + "<option value='12'>12</option>";
			dayselect = dayselect + "<option value='13'>13</option>";
			dayselect = dayselect + "<option value='14'>14</option>";
			dayselect = dayselect + "<option value='15'>15</option>";
			dayselect = dayselect + "<option value='16'>16</option>";
			dayselect = dayselect + "<option value='17'>17</option>";
			dayselect = dayselect + "<option value='18'>18</option>";
			dayselect = dayselect + "<option value='19'>19</option>";
			dayselect = dayselect + "<option value='20'>20</option>";
			dayselect = dayselect + "<option value='21'>21</option>";
			dayselect = dayselect + "<option value='22'>22</option>";
			dayselect = dayselect + "<option value='23'>23</option>";
			dayselect = dayselect + "<option value='24'>24</option>";
			dayselect = dayselect + "<option value='25'>25</option>";
			dayselect = dayselect + "<option value='26'>26</option>";
			dayselect = dayselect + "<option value='27'>27</option>";
			dayselect = dayselect + "<option value='28'>28</option>";
			dayselect = dayselect + "<option value='29'>29</option>";
			dayselect = dayselect + "<option value='30'>30</option>";
			dayselect = dayselect + "<option value='31'>31</option>";
			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
			
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
		
		
		$(".moredays").append("Day " + addday + ":<select id='day" + addday + "'>" + dayselect + "</select> Hours:<input type='number' id='hours" + addday + "' ng-model='hours" + addday + "'size='2'></select> Minutes:<input type='number' id='minutes" + addday + "' ng-model='minutes" + addday + "' size='2'><br>Work Done:<input type='text' id='workdone" + addday + "' ng-model='workdone" + addday + "'/><br/><br/>");
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
		
		i = 0;
		var reports = "<option value='all'>All clients</option>";
		for(i=0;i<data.length;i++){
		    document.getElementById('clientselect').innerHTML += "<option  id=" + i + "value='" + data[i].name + "'>" + data[i].name + "</option>";
		    reports += "<option value='" + data[i].name + "'>" + data[i].name + "</option>"
		}
		document.getElementById('reportclient').innerHTML = reports;

        
		
		i = 0;


		//TODAY'S DATE INPUT SELECTION
		form = form +"<br><div id='todayinput'><b>Today's Date</b><br><select id='todaydate' ng-model='todaydate'>" + dayselect + "</select>";
		form = form + "<select id='todaymonth' ng-model='todaymonth'>" + monthselect + "</select>" + "<select id='todayyear' ng-model='todayyear'>" + yearselect +"</select></div>";
		

        //INVOICE MONTH SELECTION
		i = 0;
		form = form + "<br><b>Invoice Month</b><br><select id='invoicemonth' ng-model='invoicemonth'>" + monthselect + "</select><select id='invoiceyear' ng-model='invoiceyear'>" + yearselect + "</select>";


		form = form + "<div id='shortlong'>";


	    //SHORT FORMAT INPUT CREATION
		if (data[0].format == "short" || data[0].format == "Short") {
		    form = form + "<br><br>Hours:<input type='number' id='hours1' size='2' ng-model='hours1'><br>Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'><br>Work Done:<input type='text' id='workdone1' ng-model='workdone1'/><br><br>";
		    selectedformatglobal = 'short';
		}
		

		//LONG FORMAT INPUT CREATION
		if (data[0].format == "long" || data[0].format == "Long"){
			//HOURS WORKED ON EACH DAY INPUTS
			form = form + "<br><b>Hours</b><br>";
			form = form + "Day 1:<select id='day1' ng-model='day1' >" + dayselect + "</select>" + " Hours:<input type='number' id='hours1' size='3' ng-model='hours1'> Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'></input><br>Work Done:<input type='text' id='workdone1' ng-model='workdone1'/><br><br><span id='moredays' class='moredays'>";
			form = form + "</span><button onclick='addhours()'>Add day</button>";
			selectedformatglobal = 'long';
		}


		form = form + "</div>";
		
            form = form + "<br /><b>Personal notes</b><br /><textarea rows='1' cols='40' id='personalnotes'></textarea>"
        //TIMESHEET/NOTES INPUT
		var timesheet = "<br><b>Timesheet</b><br /><textarea rows='7' cols='25' id='timesheet' ng-model='timesheet'></textarea>";
		form = form + timesheet;


        
		
		


			//document.getElementById('selectformat').selectedIndex = data[i].format
            //DISABLED - SEE FORMAT CHANGE - FORMAT
        
		document.getElementById('formthing').innerHTML = form;
		
		document.getElementById('formthing').style.visibility = "hidden";
		


		
		//$scope.$apply();
	};
	//----------------END STARTUP FUNCTION--------------
	




	    //--------------FORMAT FORM FUNCTION - CLIENT SELECTION CHANGED-----------------------
	    $scope.formatChangeClient = function () {
	        var form = "";
	        var data = $scope.storage.clientlist;
	        var selected = document.getElementById('clientselect').selectedIndex;
	        addday = 1;
            

	        //SHORT FORMAT INPUT CREATION
	        if (data[selected].format == "short" || data[selected].format == "Short") {
	            form = form + "<br><br>Hours:<input type='number' id='hours1' size='2' ng-model='hours1'><br>Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'><br>Work Done:<input type='text' id='workdone1' ng-model='workdone1'/><br><br>";
	          
	            selectedformatglobal = 'short';
	        }


	        //LONG FORMAT INPUT CREATION
	        if (data[selected].format == "long" || data[selected].format == "Long") {
	            //HOURS WORKED ON EACH DAY INPUTS
	            form = form + "<br><b>Hours</b><br>";
	            form = form + "Day 1:<select id='day1' ng-model='day1' >" + dayselect + "</select>" + " Hours:<input type='number' id='hours1' size='3' ng-model='hours1'> Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'></input><br>Work Done:<input type='text' id='workdone1' ng-model='workdone1'/><br><br><div id='moredays' class='moredays'>";
	            form = form + "</div><button onclick='addhours()'>Add day</button>";
	            
	            selectedformatglobal = 'long';
	        }


	        document.getElementById('shortlong').innerHTML = form;
	        document.getElementById('formthing').style.visibility = "visible";

	    }
	
	    //------------------END FORMAT FORM FUNCTION - CLIENT----------------


	    //----------------------FORMAT FORM FUNCTION - FORMAT SELECTION CHANGED------------------------   CURRENTLY DISABLED - NO WAY OF RUNNING FUNCTION IN HTML PAGE
	    $scope.formatChangeFormat = function () {
	        var form = "";

	        addday = 1;
	        var temp = document.getElementById('selectformat');
	        var selected = temp.options[temp.selectedIndex].text;


	        //SHORT FORMAT INPUT CREATION
	        if (selected == "short" || selected == "Short") {
	            form = form + "<br><br>Hours:<input type='number' id='hours1' size='2' ng-model='hours1'><br>Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'><br>Work Done:<input type='text' id='workdone1' ng-model='workdone1'/><br><br>";
	            selectedformatglobal = 'short';
	        }


	        //LONG FORMAT INPUT CREATION
	        if (selected == "long" || selected == "Long") {
	            //HOURS WORKED ON EACH DAY INPUTS
	            form = form + "<br><b>Hours</b><br>";
	            form = form + "Day 1:<select id='day1' ng-model='day1' >" + dayselect + "</select>" + " Hours:<input type='number' id='hours1' size='3' ng-model='hours1'> Minutes:<input type='number' id='minutes1' size='2' ng-model='minutes1'></input><br>Work Done:<input type='text' id='workdone1 ng-model='workdone1'/><br><br><div id='moredays' class='moredays'>";
	            form = form + "</div><button onclick='addhours()'>Add day</button>";
	            selectedformatglobal = 'long';
	        }
	        document.getElementById('shortlong').innerHTML = form;
	        document.getElementById('formthing').style.visibility = "hidden";
	    }

        //---------------------END FORMAT FORM FUNCTION - FORMAT
 
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
											hourrate: 40,
											format: "short",
											addressone: "123 Lol street",
											addresstwo: "Le Lenny Town",
											contact: "0400123456",
                                            index: 1
										} , {
											name: "Default Client 2",
											hourrate: 30.5,
											format: "long",
											addressone: "456 Rofl street",
											addresstwo: "Le Lenny Town",
											contact: "email@email.com",
                                            index: 2
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
                                            paymentenabled: true,
                                            bankname: "My Bank",
											bsb: "000-111",
											account: "1232 1234 1235 1385",
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
	        format: "Short",
	        createday: "5",
	        createmonth: "February",
	        createyear: 2015,
	        days: 1,
	        hours: 8,
	        minutes: 30,
	        workdone: "Did BAS",
	        month: "January",
	        year: "2015",
	        notes: "",
	        enabletimesheet: false,
	        noofdays: 1,
	        followupsent: "Yes",
	        totalhours: 8.5,
	        totalpay: 340,
            hourrate: 40,
	        invoicenumber: 1,
	        paid: "Yes",
	        datepaid: "7 March 2015",
	        index: 1,
	        personalnotes: "DEFAULT INVOICE"
	    }]
	});

	$scope.storage = $localStorage.$default({
	    invoicenumber: 1
	})
	$scope.storage = $localStorage.$default({
        clientindex: 2
	})

        //---------------------END DEFAULT DATA-------------------------




						
	//--------------------------ADD---------------------------
	$scope.addinvoice = function() {
	                        var notes = document.getElementById('timesheet').value;
	                        var data = $scope.storage.clientlist;
	                        var invoicedata = $scope.storage.invoicenumber;
							var timesheet = nl2br(notes, false)
							var days = new Array;
							var hours = new Array;
							var minutes = new Array;
							var workdone = new Array;
                            

	    //Code from http://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
							var temp = ""

							//temp = document.getElementById('selectformat');
	    //var selectformat = temp.options[temp.selectedIndex].text;

							temp = document.getElementById('invoicemonth');
							var invoicemonth = temp.options[temp.selectedIndex].text;

							temp = document.getElementById('invoiceyear');
							var invoiceyear = temp.options[temp.selectedIndex].text;

							temp = document.getElementById('clientselect');
							var client = temp.options[temp.selectedIndex].text;
							temp = temp.selectedIndex;
							temp = parseInt(temp);
							var selectedindex = temp;
							var hourrate = parseFloat(data[selectedindex].hourrate)
							var clientindex = data[selectedindex].index;

							temp = document.getElementById('todaydate');
							var createday = temp.options[temp.selectedIndex].text;

							temp = document.getElementById('todaymonth');
							var createmonth = temp.options[temp.selectedIndex].text;

							temp = document.getElementById('todayyear');
							var createyear = temp.options[temp.selectedIndex].text;

                            
							var invoiceno = parseInt($localStorage.invoicenumber) + 1;
							var notes2 = document.getElementById('personalnotes').value;
							
							var i = 1;
							var pay = 0.0;
							var totalhours = 0.0;
	    

	    //VALIDATION----------------
							var error = false;





							if (error == false) {

							    //Short format
							    if (selectedformatglobal == 'Short' || selectedformatglobal == 'short') {
							        hours[0] = document.getElementById('hours1').value;
							        minutes[0] = document.getElementById('minutes1').value;
							        workdone[0] = document.getElementById('workdone1').value;
							        if (hours[0] == "" || minutes[0] == "") { error = true }
							        pay = hours[0] * hourrate;
							        temp = minutes[0] / 60 * hourrate;
							        pay = pay + temp;
							        pay = pay.toFixed(2);
							        totalhours = hours[0];
							        temp = minutes[0] / 60;
							        temp = temp.toFixed(2);
							        totalhours = parseFloat(totalhours);
							        totalhours = totalhours + parseFloat(temp);
							    }

							    var hourerror = false
                                var minuteerror = false
							    //Long format
							    if (selectedformatglobal == 'Long' || selectedformatglobal == 'long') {
							        var hoursworked = 0;
							        var minutesworked = 0;
							        for (i = 1; i <= addday; i++) {
							            minuteerror = true;
							            hourerror = true;
							            if (!isNaN(document.getElementById('hours' + i).value)) {
							                hours[i - 1] = parseFloat(document.getElementById('hours' + i).value);
                                            hourerror = false
							            }
							            if (!isNaN(document.getElementById('minutes' + i).value)) {
							                minutes[i - 1] = parseFloat(document.getElementById('minutes' + i).value)
                                            minuteerror = false
							            };
							            workdone[i - 1] = document.getElementById('workdone' + i).value;
							            days[i - 1] = parseInt(document.getElementById('day' + i).value);
							            if (hourerror == true) { hours[i - 1] = 0; hourerror = false }
							            if (minuteerror == true) { minutes[i - 1] = 0; minuteerror = false}
							            hoursworked = parseFloat(hours[i - 1]);
							            minutesworked = parseFloat(minutes[i - 1]);
							            minutesworked = minutesworked / 60;
							            hoursworked = hoursworked + minutesworked;
							            hoursworked = hoursworked.toFixed(2);
							            pay += hoursworked * hourrate;

							            totalhours = totalhours + hours[i - 1];
							            temp = minutes[i - 1] / 60;
							            temp = temp.toFixed(2);
							            totalhours = parseFloat(totalhours);
							            totalhours = totalhours + parseFloat(temp);

							        }
							        pay = pay.toFixed(2);
							    }




							



							    if (error == false) {
							        var addInvoiceData = {
							            client: client,
							            format: selectedformatglobal,
							            createday: createday,
							            createmonth: createmonth,
							            createyear: createyear,
							            days: days,
							            hours: hours,
							            minutes: minutes,
							            workdone: workdone,
							            month: invoicemonth,
							            year: invoiceyear,
							            notes: timesheet,
							            enabletimesheet: true,
							            noofdays: addday,
							            followupsent: "No",
							            totalhours: totalhours,
							            totalpay: pay,
							            invoicenumber: invoiceno,
							            paid: "No",
							            datepaid: "N/A",
							            hourrate: hourrate,
							            index: clientindex,
                                        personalnotes: notes2


							        };
							        var number = {
							            invoicenumber: invoiceno
							        }

							        $localStorage.invoicenumber = invoiceno;

							        addday = 1;
							        $localStorage.invoices.push(addInvoiceData);
							        $localStorage.loaded = addInvoiceData;


							        document.getElementById('enabletimesheet').checked = false;
							        document.getElementById('todayyear').selectedIndex = 0;
							        document.getElementById('todaymonth').selectedIndex = 0;
							        document.getElementById('todaydate').selectedIndex = 0;
							        document.getElementById('clientselect').selectedIndex = 0;
							        document.getElementById('invoiceyear').selectedIndex = 0;
							        document.getElementById('invoicemonth').selectedIndex = 0;
							        document.getElementById('timesheet').value = "";
							        for (i = 1; i <= addday; i++) {
							            if (selectedformatglobal == 'long' || selectedformatglobal == 'Long') {
							                document.getElementById('hours' + i).value = "";
							                document.getElementById('minutes' + i).value = "";
							                document.getElementById('workdone' + i).value = "";
							                document.getElementById('day' + i).value = "";
							                document.getElementById('moredays').innerHTML = "";
							            } else {
							                document.getElementById('hours1').value = "";
							                document.getElementById('minutes1').value = "";
							                document.getElementById('workdone1').value = "";
							            }
							        }



							        $scope.successfullyAdded = true; //message on the screen saying added
							        setTimeout(function () { $scope.successfullyAdded = false; window.open("invoice.htm"); }, 1000);
							    }
							}
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
		

//---------CLEAR SUCCESS MESSAGE--------
	$scope.ClearAddMessage = function () {
	    $scope.successfullyAdded = false;
	    $scope.successfullyUpdated = false;	//Resets message when nav clicked
	};


		//----------------------SETTINGS PAGE------------------
			 
	$scope.editscreenpopulate = function () {
	    document.getElementById('namerow1').value = $scope.storage.owndata[0].nameone;
	    document.getElementById('namerow2').value = $scope.storage.owndata[0].nametwo; //-------------------------FIX THIS. REPLACE WITH DOCUMENT.GETELEMENTBYID?
	    document.getElementById('abn').value = $scope.storage.owndata[0].abn;
	    document.getElementById('contactdetails').value = $scope.storage.owndata[0].contact;
	    document.getElementById('paymentnumber').value = parseInt($scope.storage.owndata[0].paymenttime);
	    document.getElementById('bankname').value = $scope.storage.owndata[0].bankname;
	    document.getElementById('bsb').value = $scope.storage.owndata[0].bsb;
	    document.getElementById('accountnumber').value = $scope.storage.owndata[0].account;
	    document.getElementById('enableterms').checked = $scope.storage.owndata[0].paymentenabled;
        
	    document.getElementById('termsunits').value = $scope.storage.owndata[0].paymentunit;
	    
	}

		$scope.updateSettings = function () {
				var updateSettings = {
				    nameone:        document.getElementById('namerow1').value,
				    nametwo:        document.getElementById('namerow2').value,
				    abn:            document.getElementById('abn').value,
				    contact:        document.getElementById('contactdetails').value,
				    paymenttime:    document.getElementById('paymentnumber').value,
				    paymentunit:    document.getElementById('termsunits').value,
				    bankname:       document.getElementById('bankname').value,
				    bsb:            document.getElementById('bsb').value,
				    account:        document.getElementById('accountnumber').value,
				    paymentenabled: document.getElementById('enableterms').checked

				};
				
				$localStorage.owndata.push(updateSettings);
				
				
				$scope.storage.owndata.splice(0, 1);
				
				$scope.successfullyUpdated = true;
				
		};
		
		$scope.ClearSettingsMessage = function () { $scope.successfullyUpdated = false };
		
			
	//----------------------------END SETTINGS--------------------
	

	    //------------------ADD CLIENT----------------

		$scope.saveNewClient = function () {
		    var index = $scope.storage.clientindex + 1;
		    var clientdata = {
		        name: $scope.addname,
		        hourrate: parseFloat($scope.addhourrate),
		        format: $scope.addformat,
		        addressone: $scope.addaddressone,
		        addresstwo: $scope.addaddresstwo,
		        contact: $scope.addcontact,
                index: index
		    }
		    $localStorage.clientlist.push(clientdata);
		    $scope.storage.clientindex = $scope.storage.clientindex + 1;

		    $scope.addname = "";
		    $scope.addformat = "short";
		    $scope.addhourrate = "";
		    $scope.addaddressone = "";
		    $scope.addaddresstwo = "";
		    $scope.contact = "";

		}





	    //-----------------END ADD CLIENT--------------




	//----------------------------EDIT AND DELETE CLIENTS PAGE----------------		
			 $scope.displayEditClient = function (index) {
				 	 $scope.index			=		index;
					 $scope.name			=		$scope.storage.clientlist[index].name;
					 $scope.hourrate		=		$scope.storage.clientlist[index].hourrate;
					 $scope.addressone		=		$scope.storage.clientlist[index].addressone;
					 $scope.addresstwo		=		$scope.storage.clientlist[index].addresstwo;
					 $scope.contact			=		$scope.storage.clientlist[index].contact;
					var thing = '<select id="editformat" ng-model="editformat">  ';

					 if ($scope.storage.clientlist[index].format == "short"){
						 document.getElementById('editshortlong').innerHTML = thing + "<option value='short' id='short' ng-selected='expression'>Short</option><option value='long' id='long'>Long</option></select>";
					 } else {
						 document.getElementById('editshortlong').innerHTML = thing +"<option value='long' id='long' ng-selected='expression'>Long</option><option value='short' id='short'>Short</option></select>";
					 }
			
			 };
			 
			 $scope.saveEditClient = function (index) {
				 
				$scope.storage.clientlist[index].name 			=		$scope.name; 			
				$scope.storage.clientlist[index].hourrate	 	=		$scope.hourrate; 
				$scope.storage.clientlist[index].addressone	 	=		$scope.addressone; 
				$scope.storage.clientlist[index].addresstwo 	=		$scope.addresstwo; 	
				$scope.storage.clientlist[index].format = document.getElementById('editformat').value;
				
			 };
			 
			 $scope.deleteClient = function (index) {
				 		$scope.index		=		index;
			 };
			 
			 $scope.deleteClientYes = function (index) {
				 $scope.storage.clientlist.splice(index, 1);
			 };
			 
			 //----------------------end EDIT AND DELETE------------
			 

	    //-----------VIEW INVOICES PAGE------------------
			 $scope.displayInvoice = function (index) {
			     $localStorage.loaded = $localStorage.invoices[index];
                 window.open("invoice.htm")
			 }


			 $scope.markpaid = function (index) {
			     $scope.storage.invoices[index].paid = "Yes"

			     //Code modified, from http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
			     var today = new Date();
			     var dd = today.getDate();
			     var mm = today.getMonth(); 
			     var yyyy = today.getFullYear();

			     if (dd < 10) {
			         dd = '0' + dd
			     }
			     mm = months[mm];
			     today = dd + ' ' + mm + ' ' + yyyy;
			     $scope.storage.invoices[index].datepaid = today;
			 }
			 $scope.displayFollowupInvoice = function (index) {
			     $localStorage.loaded = $localStorage.invoices[index];
			     $localStorage.invoices[index].followupsent = "Yes";
			     window.open("invoice.htm");
			 }

			 $scope.deleteinvoice = function (index) {
			     var d = new Date();
			     var currentyear = d.getFullYear();
			     var invoice = $scope.storage.invoices[index];
			     var allowed = true
			     var invoiceyear = parseInt(invoice.createyear);
			     if (invoiceyear > currentyear - 6) {
			         allowed = false;
			     }
			     if (allowed == true) {
			         allowed = false
			         if (invoiceyear < currentyear - 7) {
			             allowed = true;
			         }

			         var i = 0;
			         var found = false;
			         while (i <= 11 && found == false) {
			             if (invoice.createmonth == months[i]) {
			                 found = true;
                             var monthindex = i
			             }
			             i++;
			         }

			         if (invoiceyear == currentyear - 7) {
			             if (d.getMonth() > monthindex) {
			                 allowed = true;
			             }
			         }
			         if (d.getMonth() == monthindex && d.getDate() > parseInt(invoice.createday)) {
			             allowed = true;
			         }
			     }

			     if (allowed == false) {
			         alert("This invoice is too young and cannot be deleted. Invoices must be 7 years old to be deleted.");
			     }
			     if (allowed == true) {
			         $scope.storage.invoices.splice(index, 1);
			     }
			 }



			 //---------------------------REPORTS-------------------------
			 	$scope.earningsreport = function() {
			 	    var type = $('input[name="g1"]:checked').val();
			 	    var client = document.getElementById('reportclient').value;
			 	    var data = $scope.storage.invoices;
			 	    var totalearnings = 0.0;
			 	    var number = 0;

			 	    var day1 = 0;
			 	    var day2 = 0;
			 	    var month1 = 0;
			 	    var month2 = 0;
			 	    var year1 = 0;
			 	    var year2 = 0;
			 	    var testday = 0;
			 	    var testmonth = 0;
			 	    var testyear = 0;


			 	    if (type == "ytd") {
			 	        var d = new Date();
			 	        year2 = d.getFullYear();
			 	        month2 = d.getMonth();
			 	        day2 = d.getDate();
			 	        day1 = 1;
			 	        month1 = 6;
			 	        year1 = d.getFullYear() - 1
			 	        
			 	    }




			 	    for (var i = 0; i < data.length; i++) {
			 	        if (data[i].client == client || client == "all") {
			 	            if (type == "all") {
			 	                number = number + 1;
			 	                totalearnings = totalearnings + parseFloat(data[i].totalpay);
			 	            } else {
			 	                testyear = data[i].createyear;
			 	                for (var e = 0; e <= 11; e++) {
			 	                    if (data[i].createmonth = months[e]) {
			 	                        testmonth = e;
			 	                        e = 12;
			 	                    }
			 	                }
			 	                testday = parseInt(data[i].createday);
			 	                if (dateRange(day1, month1, year1, day2, month2, year2, testday, testmonth, testyear) == true) {
			 	                    number = number + 1;
			 	                    totalearnings = totalearnings + parseFloat(data[i].totalpay);
			 	                }
			 	            }
			 	        }
			 	    }
			 	    var average = totalearnings / number;
			 	    if (isNaN(average)) {
                        average = 0
			 	    }

			 	    if (number == 1) {
			 	        var plural = " invoice.";
			 	    } else {
			 	        var plural = " invoices.";
			 	    }
			 	    var output = "The total earnings for the given client and time period was " + totalearnings;
			 	    output = output + " . The average earnings per invoice was " + average + " which was over " + number + plural;
			 	    document.getElementById('earningsreportresults').innerHTML = output;
				 }; 
				 
				 
				 



			

			 	$scope.appreport = function () {
			 	    document.getElementById('appreport').innerHTML = "There are approx. " + JSON.stringify(localStorage).length + " bytes of localstorage being used. The total storage is approx. 5000000 (5 million) bytes"
			 	}




	    //-----------GENERIC CODE MODULE
			 	function dateRange(day1, month1, year1, day2, month2, year2, testday, testmonth, testyear) {
			 	    if (year1 < testyear && testyear < year2) {
			 	        return true;
			 	    } else {
			 	        if (year1 <= testyear && testyear < year2) {
			 	            if (month1 < testmonth) {
			 	                return true;
			 	            } else {
			 	                if (month1 <= testmonth) {
			 	                    if (day1 <= testday) {
			 	                        return true;
			 	                    } else {
			 	                        return false;
			 	                    }
			 	                }
			 	            }
			 	        } else {
			 	            if (year1 < testyear && testyear <= year2) {
			 	                if (month2 > testmonth) {
			 	                    return true;
			 	                } else {
			 	                    if (month2 >= testmonth) {
			 	                        if (day2 >= testday) {
			 	                            return true;
			 	                        } else {
			 	                            return false;
			 	                        }
			 	                    }
			 	                }
			 	            }
			 	        }
			 	    }
			 	    return false;
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



					
			
			
	
	
			
			
			
			
