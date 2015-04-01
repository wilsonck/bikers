'use strict';

var app = angular.module('bikersApp', []);

app.controller('bikersCtrl', ['$scope', '$http', 'bikersService', '$sce', function ($scope, $http, bikersService, $sce) {


    $( "#header-help" ).click(function() {
      $('#content-help').toggle('slow');
      ($('.open').hasClass('hidden')) ? $('.open').removeClass('hidden') : $('.open').addClass('hidden');
      ($('.close').hasClass('hidden')) ? $('.close').removeClass('hidden') : $('.close').addClass('hidden');
    });

    $( "input[type=text], input[type=email]" )
        .focus(function() {
            $( this ).next().show();
        })
        .blur(function(){
            $( this ).next().hide();
        });

    $scope.deleteBiker = function(biker){
        $scope.bikers.splice($scope.bikers.indexOf(biker), 1);       
    }

    $scope.addBiker = function(biker){
        var dataToday = getDate();
        var hourNow = getHour();
        var DaysWeek = 
        $scope.bikers.push({
            name: $scope.input.name,
            email: $scope.input.email,
            city: $scope.input.city,
            rideGroup: $scope.input.rideGroup,
            daysOfWeek: "Mon, Wed, Fri",
            registration:[{
                date: dataToday,
                hour: hourNow
            }]
        });     
    }

    function getDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        return today;
    }

    function getHour(){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        if(m<10){
            m='0'+m
        } 
        var AMPM = (h > 12) ? 'PM' : 'AM';
        var s = today.getSeconds();
        var hourComplete = h+":"+m+AMPM;
        return hourComplete
    }

    /*document.getElementById('header-help').addEventListener('click', openCloseHelp);

    function openCloseHelp(){
        var _element = document.getElementById('content-help').style;
        (function cresce(){ 
            (_element.clientHeight())
            (_element.clientHeight +=1) >= 200 ? _element.clientHeight +=1 : setTimeout(cresce,40);
        })();
    }*/

	bikersService.BikersOpenData().then(function (_result) {
        $scope.bikers = _result.bikers;
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