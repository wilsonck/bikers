'use strict';

var app = angular.module('bikersApp', []);

app.controller('bikersCtrl', ['$scope', '$http', 'bikersService', '$sce', function ($scope, $http, bikersService, $sce) {


    $( "#header-help" ).click(function() {
      $('#content-help').toggle('slow');
      ($('.open').hasClass('hidden')) ? $('.open').removeClass('hidden') : $('.open').addClass('hidden');
      ($('.close').hasClass('hidden')) ? $('.close').removeClass('hidden') : $('.close').addClass('hidden');
    });

    $( "input[type=text], input[type=email]" ).focus(function() {
        $( this ).next().show();
    })
    
    $( "input[type=text], input[type=email]" ).blur(function(){
        $( this ).next().hide();
    });



    /*document.getElementById('header-help').addEventListener('click', openCloseHelp);

    function openCloseHelp(){
        var _element = document.getElementById('content-help').style;
        (function cresce(){ 
            (_element.clientHeight())
            (_element.clientHeight +=1) >= 200 ? _element.clientHeight +=1 : setTimeout(cresce,40);
        })();
    }*/

	bikersService.BikersOpenData().then(function (_result) {
        console.log(_result);
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

		//bikersService.addBikers(dataPUT);
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
            
            var res = $http.put('json/bikers.json', _dataPut);
            res.success(function(data, status, headers, config) {
                console.log(data);
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });

        }
    };
}]);