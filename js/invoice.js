//CRUD using AngularJS and ngStorage
//Created by Peter Cox
//11 April 2015
//Copyright  2014  PCSquared.com.au
			


			
	var app = angular.module('app',['ngStorage']);
			

	app.controller('invoiceController', function($scope, $localStorage, $compile) {

	    $scope.storage = $localStorage;


	    //-------------STARTUP FUNCTION 
	    


	   /* client:                client,
	    format:                selectedformatglobal,
	    createday:             createday,
	    createmonth:           createmonth,
	    createyear:            createyear,
	    days:                   days,
	    hours:                  hours,
	    minutes:                minutes,
	    workdone:               workdone,
	    month:                  invoicemonth,
	    year:                   invoiceyear,
	    notes:                  timesheet,
	    enabletimesheet:        enabletimesheet,
	    noofdays:               addday,
	    followupsent: "No",
	    totalhours: totalhours,
	    totalpay: pay,
	    invoicenumber: invoiceno,
	    paid: "No",
	    datepaid: "N/A",
	    hourrate: hourrate
        
        nameone: "Default Company 1",
											nametwo: "Default Company 2",
											abn: "1234567890",
											contact: "0412345678 me@me.com",
											paymenttime: 7,
											paymentunit: "days",
											bsb: "000-111",
											account: "1232 1234 1235 1385",
        
        */
	    $scope.loadinvoice = function () {
	    
					 var data = $localStorage.loaded;
					 var clientinfo = $scope.storage.clientlist;
					 var config = $scope.storage.owndata;
					 var client = data.client;

                     //Setup info on page
					document.getElementById('companyone').innerHTML = config[0].nameone;
					document.getElementById('companytwo').innerHTML = config[0].nametwo;

					if (!config[0].abn == "" || !config[0].abn == null) {
					    document.getElementById('abn').innerHTML = "ABN: " + config[0].abn;
					} else {
					    document.getElementById('abn').innerHTML = "";
					}
					document.getElementById('bsb').innerHTML = config[0].bsb;
					document.getElementById('accountno').innerHTML = config[0].account;
					document.getElementById('bankname').innerHTML = config[0].bankname;
					if (config[0].paymentenabled == true || config[0].paymentenabled == "true") {
					    document.getElementById('terms').innerHTML = config[0].paymenttime + " " + config[0].paymentunit;
					}
					document.getElementById('contactdetails').innerHTML = config[0].contact; 

                    //CLIENT DATA
					var clientindex = data.index;
					var i = 0;
                    
					var found = false;
					while (i <= parseInt(clientinfo.length) && found == false) {
					    if (parseInt(clientinfo[i].index) == parseInt(clientindex)) {
					        found = true;
					        clientinfo = clientinfo[i];
					    }
                        i++
					}
                
                    var clientdata = ""
                    clientdata = data.client + "<br />"
                    clientdata = clientdata + clientinfo.addressone + "<br />" + clientinfo.addresstwo + "<br />" + clientinfo.contact;
                    


					document.getElementById('clientinfo').innerHTML = clientdata;


            //INVOICE NUMBER FORMATTING
                    var invoicenumber = "Invoice No. "
                    var temp = $scope.storage.invoicenumber;
            var done = false       

                    if( temp < 10){
                        invoicenumber += "00000" + temp;
                        done = true
                    }
                    if(temp < 100 && done == false){
                        invoicenumber += "0000" + temp;
                        done = true
                    }
                    if (temp < 1000 && done == false) {
                        invoicenumber += "000" + temp;
                        done = true
                    }
                    if (temp < 10000 && done == false) {
                        invoicenumber += "00" + temp;
                        done = true
                    }
                    if (temp < 100000 && done == false) {
                        invoicenumber += "0" + temp;
                        done = true;
                    }
                    if (done == false) {
                        invoicenumber += temp;
                    }
                  
                    var date = "Date: " + data.createday + " " + data.createmonth + " " + data.createyear;
            document.getElementById('date').innerHTML = date
					

					document.getElementById('invoicenumber').innerHTML = invoicenumber;

	        //HOURS WORKED SECTION
            var hours = ""
					if (data.format == "short" || data.format == "Short") {
					    hours = '<span style="float:left" > ' + data.month + " " + data.year + "</span>&nbsp;&nbsp;";
					    hours += '<span >' + (data.totalhours).toFixed(2) + " hours @ $" + (data.hourrate).toFixed(2) + "/hr </span>";
					    hours += '<span style="right:0px;position:absolute" >$' + data.totalpay + '</span><br>';
					    if (!data.notes == "" || !data.notes == null) {
					        hours += '<span style="text-align:center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AS PER ATTACHED TIMESHEET</span>'
					    }
					}

					if (data.format == "long" || data.format == "Long") {
					    var pay = 0.0;
					    var hoursworked = 0.0
					    var minutesworked = 0.0
					    var hourrate = parseFloat(data.hourrate);
					    for (var i = 1; i <= data.noofdays; i++) {
					        hours += '<span style="float:left" > ' + data.days[i - 1] + " " + data.month + "</span>&nbsp;&nbsp;";
					        
					        hoursworked = parseFloat(data.hours[i - 1]);
					        minutesworked = parseFloat(data.minutes[i - 1]);
					        minutesworked = minutesworked / 60;
					        hoursworked = hoursworked + minutesworked;
					        hoursworked = hoursworked.toFixed(2);
					        hours += '<span >' + hoursworked + " hours @ $" + (data.hourrate).toFixed(2) + "/hr </span>";
					        pay = hoursworked * hourrate;
					        pay = pay.toFixed(2);
					        hours += '<span style="right:0px;position:absolute" >$' + pay + '</span><br>';
					        hours += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>' + data.workdone[i - 1] + '</span><br>';
					    }
					    hours += '<span style="right:0px;position:absolute" >------------</span><br /><span style="right:0px;position:absolute" >$ ' + data.totalpay;
					}
					document.getElementById('hours').innerHTML = hours;


					if (!data.notes == "" || !data.notes == null) {
					    var timesheet = '<br /><br /><br /><br /><div>';
					    timesheet += data.notes;
					    timesheet += '</div>';
					    document.getElementById('timesheet').innerHTML = timesheet;
					}
					
	    }
	   
				 

	    /*
        DATA VALUES:
         client:                client,
							    format:                selectedformatglobal,
							    createday:             createday,
							    createmonth:           createmonth,
                                createyear:            createyear,
								days:                   days,
								hours:                  hours,
								minutes:                minutes,
								workdone:               workdone,
								month:                  invoicemonth,
                                year:                   invoiceyear,
                                notes:                  timesheet,
                                enabletimesheet:        enabletimesheet,
                                noofdays:               addday,
                                followupsent: "No",
                                totalhours: totalhours,
                                totalpay: pay,
                                invoicenumber: invoiceno,
                                paid: "No",
                                datepaid: "N/A",
                                hourrate: hourrate,
                                index: clientindex



        */
				 
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



					
			
			
	
	
			
			
			
			
