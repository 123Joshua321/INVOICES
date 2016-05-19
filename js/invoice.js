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
	    
					 var data = $scope.storage.loaded;
					 var clientinfo = $scope.storage.clientlist;
					 var config = $scope.storage.owndata;
					 var client = data.client;

                     //Setup info on page
					document.getElementById('companyone').innerHTML = config[0].nameone;
					document.getElementById('companytwo').innerHTML = config[0].nametwo;
					document.getElementById('abn').innerHTML = "ABN: " + config[0].abn;
					document.getElementById('bsb').innerHTML = config[0].bsb;
					document.getElementById('accountno').innerHTML = config[0].account;
                    
					document.getElementById('contactdetails').innerHTML = config[0].contact; 


					var clientinfo = data.client + "<br />" 
                    


					document.getElementById('clientinfo').innerHTML = clientinfo;

            
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



					
			
			
	
	
			
			
			
			
