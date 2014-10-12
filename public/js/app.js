var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate']);

app.controller('mainCtrl', ['ServiceMap',function(ServiceMap){
    var mc = this;
    
    mc.isEnabled = false;

	mc.dep;
	mc.dest;
    mc.distance;  
    mc.calc; 
    
	mc.showPrix = function(){		
			mc.isEnabled = !mc.isEnabled;	
	}




	var depart = document.getElementById("depart");
	var destination = document.getElementById("destination");	

	autocomplete1 = new google.maps.places.Autocomplete(depart);

		 google.maps.event.addListener(autocomplete1, 'place_changed', function(){

		 	 var place = autocomplete1.getPlace();
		 	 mc.dep = place;
		 });

	 
	 autocomplete2 = new google.maps.places.Autocomplete(destination);

	 google.maps.event.addListener(autocomplete2, 'place_changed', function(){

	 	var place = autocomplete2.getPlace();
	 	mc.dest = place;
	 });
    
    mc.getDistance = function(){

    }

	 mc.calculDistance = function(){
       
        // var origin = mc.dep.address_components[0].long_name;
        // var destination = mc.dest.address_components[0].long_name;
         mc.calc =  ServiceMap.destination;
        console.log(mc.calc);
         
	 } 
    
}]);
app.factory('ServiceMap', ['$resource',function($resource){
    return $resource ('http://google.com/maps/api/distancematrix/json?origins=Deuil-la-Barre&destinations=Sarcelle', {},
        {
        'destination': {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true}
        });
}]);