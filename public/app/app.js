var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate']);

app.controller('mainCtrl', ['$scope', '$http', 'noteToastr',function($scope, $http, noteToastr){
    
    
   $scope.isEnabled = false;

	$scope.dep = null;
	$scope.dest = null;
    $scope.vehicle = [
                         {type: 'BUSINESS : 508 – C5 ou équivalent', value: 1},
                         {type: 'LUXE : MERCEDES Classe E – BMW Série 5', value: 2},
                         {type: 'PRESTIGE : MERCEDES Classe S – AUDI A8', value: 3},
                         {type: 'VAN BUSINESS : Caravelle', value: 4},
                         {type: 'VAN PRESTIGE : VIANO', value: 5}
                     ];
    
    
    
    $scope.calculDistance = function(){
        
        var origine = $scope.dep.address_components[0].long_name;
        var destination = $scope.dest.address_components[0].long_name;        
       
        var tmp = null;
        var distKm = [];
        var tarifKm = 2;
        var result;
        
            $http({method: 'get', url: '/dest?depart='+origine+'&destination='+ destination })
            
            .success(function(data, status){
               if (data.length != 0){
                   tmp = data.distance;
                   distKm = tmp.split(" "); 
                   result =  distKm[0] * tarifKm ;
               
               // console.log('Le prix est : ' + result + ' euros'); 
                noteToastr.notify('Le prix est : ' + result + ' euros');  
                $scope.depart = null;
	            $scope.destination = null;  
                $scope.typeVehicle = null;   
                   
               } else {
                   console.log('La requette a échoué!!!');
               }
               
    
            }).error(function(data, status){
               console.log(status);
            });
       
      
   
       $scope.dep = null;
	   $scope.dest = null; 
    }
    
    
	$scope.showPrix = function(){		
			$scope.isEnabled = !$scope.isEnabled;	
	}

    
	var depart = document.getElementById("depart");
	var destination = document.getElementById("destination");	

	autocomplete1 = new google.maps.places.Autocomplete(depart);

		 google.maps.event.addListener(autocomplete1, 'place_changed', function(){

		 	 var place = autocomplete1.getPlace();
		 	 $scope.dep = place;
		 });

	 
	 autocomplete2 = new google.maps.places.Autocomplete(destination);

	 google.maps.event.addListener(autocomplete2, 'place_changed', function(){

	 	var place = autocomplete2.getPlace();
	 	$scope.dest = place;
	 });    

    
}]);

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