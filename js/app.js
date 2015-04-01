'use strict';

var app = angular.module('bikersApp', []);

app.controller('bikersCtrl', ['$scope', '$http', 'bikersService', '$sce', function ($scope, $http, bikersService, $sce) {

	bikersService.BikersOpenData().then(function (_result) {
        //console.log(_result);
    }, function (_result) {
        console.log(_result);
    });

    var dataPUT = {
			"name":"James Isaac Neutron",
			"email":"neutron@example.com",
			"city":"Campinas",
			"rideGroup":"Always",
			"daysOfWeek":"Mon, Wed, Fri",
			"registration":[{
					"date":"08/13/2013",
					"hour":"11:29AM"
				}
			]
		};


		bikersService.addBikers(dataPUT);
		//console.log(dataPUT);


}]).factory('bikersService', ['$http', '$q', function ($http, $q) {
    return {
        BikersOpenData: function () {
            return $http.get('json/bikers.json').then(function (_result) {
                if (typeof _result.data === 'object') {
                    return _result.data;
                } else {
                	console.log('erro -->',_result);
                    $q.reject(_result.data);
                }
            }, function (_result) {
            	console.log('erro -->',_result);
                return $q.reject(_result);
            });
        },

        addBikers: function (_dataPut) {
        	console.log(_dataPut);
            return $http.put('json/bikers.json').then(function (_result) {
                if (typeof _result.data === 'object') {
                    return _result.data;
                } else {
                    $q.reject(_result.data);
                }
            }, function (_result) {
                return $q.reject(_result);
            });
        }
    };
}]);