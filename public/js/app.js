var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate','ui.utils', 'ui.bootstrap', 'ngLodash']);

app.value('appToastr', toastr);

app.factory('noteToastr', function(appToastr){
	return {
		notify: function(msg){
			appToastr.success(msg);
		},
		error: function(msg){
			appToastr.error(msg);
		}
	}
});

app.controller('mainCtrl', ['$scope', '$http', 'noteToastr', 'lodash',function($scope, $http, noteToastr, lodash){


	$scope.voiture = [{name: "BUSINESS (508 - C5 - PASSAT ou équivalent)", pricePerKm: 1.90 },
		               {name: "LUXE (MERCEDES CLASSE E - BMWW Série 5 ou équivalent)", pricePerKm: 2.10},
					   {name: "PRESTIGE (MERCEDES CLASSE S - AUDI A 8 ou équivalent)", pricePerKm: 3.90},
		               {name: "VAN BUSINESS (CARAVELLE - TRAFIC ou équivalent)", pricePerKm: 2.90},
		               {name: "VAN PRESTIGE (VIANO - CLASSE V ou équivalnt)", pricePerKm: 3.50 }]



	$scope.dep = null;
	$scope.dest = null;
	$scope.price = null;
	$scope.nbKms = null;
	$scope.duration = null;

	$scope.calculDistance = function(){


		$scope.name0rigine = $scope.dep.address_components[0].long_name + ' , ' + $scope.dep.address_components[1].long_name;
		$scope.nameDestination = $scope.dest.address_components[0].long_name + ' , ' + $scope.dest.address_components[1].long_name;


		var origine = $scope.dep.geometry.location.G + ',' + $scope.dep.geometry.location.K;
		var destination = $scope.dest.geometry.location.G + ',' + $scope.dest.geometry.location.K;

		console.log(origine);

		var tmp = null;
		var distKm = [];
		var tarifKm = $scope.city.pricePerKm;
		var result;

		$http({method: 'get', url: '/dest?depart='+origine+'&destination='+ destination })

			.success(function(data, status){
				console.log(data);
				if (data.length != 0){
	   				$scope.duration = data.rows[0].elements[0].duration.text;
					tmp = data.rows[0].elements[0].distance.text;
					$scope.nbKms = tmp;
					distKm = tmp.split(" ");
					result =  distKm[0] * tarifKm ;
					$scope.price = Math.round(result*100) / 100 + " €";
					//noteToastr.notify('Le prix est : ' + result + ' euros');

				} else {
					console.log('La requette a échoué!!!');
				}


			}).error(function(data){
			});


	}  // End calculDistance

	$scope.getDistance = function(){
		$scope.calculDistance();
		$('#myRecap').modal('show');
	}

	$scope.sendMail = function(){

		$scope.mailer.departReserve = $scope.name0rigine;
		$scope.mailer.destinationReserve = $scope.nameDestination;
		$scope.mailer.distance = $scope.nbKms;
		$scope.mailer.pricePerKm = $scope.city.pricePerKm;
		$scope.mailer.price = $scope.price;

		var url = '/mailer';
		$http.post(url, $scope.mailer)
			.success(function(data, status){
				noteToastr.notify('Votre réservation a été pris en compte');
			})
			.error(function(data, status){
				noteToastr.notify('Une erreur est survenu lors de la validation, veuillez réessayer SVP !');
			})

		$('#reserver').modal('hide');
		$scope.mailer = null;
		$scope.city = null;
	}


	$scope.clearMyData = function(){
		$scope.city = null;
		$scope.dep = null;
		$scope.dest = null;
		$scope.price = null;
		$scope.nbKms = null;
		$scope.duration = null;
		$scope.nameDestination = null;
		$scope.name0rigine = null;
		$('#myRecap').modal('hide');

	}

	$scope.open = function ($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = !$scope.opened;
	};

	var loopHours = function(max){

		var tab = [];
		for (i = 0; i <max ; i++) {

			if(i < 10) {
				i = '0' + i;
				tab.push(i);
			}else {
				i = i;
				tab.push(i);
			}

		}

		return tab;
	}


	$scope.hours = loopHours(24);


	$scope.minutes = loopHours(60);


	$scope.contactClear = function(){

		$scope.contact = null;
	}

	$scope.contactSendmail = function(){

		var url = '/contact';
		$http.post(url, $scope.contact)
			.success(function(data, status){
				noteToastr.notify('Votre demande a été prise en compte');
			})
			.error(function(data, status){
				noteToastr.notify('Votre demande a échoué, veuillez réessayer SVP !');
			})
		$('#myContact').modal('hide');
		$scope.contact = null;

	}



	var depart = document.getElementById("depart");
	var destination = document.getElementById("destination");
	var options = {
					componentRestrictions: {country: 'fr'}
				   };

	autocomplete1 = new google.maps.places.Autocomplete(depart, options);

	google.maps.event.addListener(autocomplete1, 'place_changed', function(){

		var place = autocomplete1.getPlace();
		$scope.dep = place;
	});


	autocomplete2 = new google.maps.places.Autocomplete(destination, options);

	google.maps.event.addListener(autocomplete2, 'place_changed', function(){

		var place = autocomplete2.getPlace();
		$scope.dest = place;
	});


}]);
