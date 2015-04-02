'use strict';

var app = angular.module('bikersApp', []);

app.controller('bikersCtrl', ['$scope', '$http', '$q', '$sce', function ($scope, $http, $q, $sce) {

    var appBikers = appBikers || {};

    (function(){
        appBikers = {

            init : function(){ 

                this.fnEvents();
                this.fnEventsScope();

                /*** init object days of week */
                $scope.daysWeek = {
                   Sun : false,
                   Mon : false,
                   Tue : false,
                   Wed : false,
                   Thu : false,
                   Fri : false,
                   Sat : false
                 };

            },
            fnEvents:function(){

                /**********************************************
                /**** JQUERY CLICK HELP AND FOCUS AND BLUR ****/
                /*********************************************/
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

            },
            fnEventsScope:function(){

                /**********************************
                /**** DELETE BIKERS FROM LIST ****/
                /**********************************/
                $scope.deleteBiker = function(biker){
                    $scope.bikers.splice($scope.bikers.indexOf(biker), 1);       
                }

                /**********************************
                /****     Clear fields form    ****/
                /**********************************/
                $scope.reseteFields = function(){
                    /*Object days of week */
                    $scope.daysWeek = {
                       Sun : false,
                       Mon : false,
                       Tue : false,
                       Wed : false,
                       Thu : false,
                       Fri : false,
                       Sat : false
                     };
                     $scope.input.name = '';
                     $scope.input.email = '';
                     $scope.input.city = '';
                     $scope.input.rideGroup =  'Always';
                }

                /**********************************
                /****     AddBiker in list    ****/
                /**********************************/
                $scope.addBiker = function(){
                    if($scope.input.rideGroup == undefined){
                        alert('Please choose Ride in Group !');
                        return;
                    }
                    var daysWeekChoose = daysChoose();
                    if(daysWeekChoose == ''){
                        alert('Please choose a days of the week !');
                        return;
                    }
                    var dataToday = getDate();
                    var hourNow = getHour();
                    $scope.bikers.push({
                        name: $scope.input.name,
                        email: $scope.input.email,
                        city: $scope.input.city,
                        rideGroup: $scope.input.rideGroup,
                        daysOfWeek: daysWeekChoose,
                        registration:[{
                            date: dataToday,
                            hour: hourNow
                        }]
                    });
                    alert('Registro incluído com sucesso !');
                    $scope.reseteFields();
                }

            }

        }
    }());

    appBikers.init();





    



    /*********
    /* Pega as variaves de escopo dos dias selecionados e compara
    * se é fim de semana
    * se é meio de semana
    * se ele faz todos os dias
    */
    function daysChoose(){
        var dayChoose = [];
        for (var prop in $scope.daysWeek) {
            if( $scope.daysWeek[prop] ) dayChoose.push(prop)
        }
        var daysWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        var weekends = ["Sat", "Sun"];
        var amountLengthArry = dayChoose.length;
        //Caso tenha 2 selecionado pode ser que ele faça aos fim de semana
        if (amountLengthArry === 2){
            for (var i = 0 ; i < amountLengthArry; i++) {
                var dayCompare = dayChoose[i];
                for (var j=0, totalArrayWeek = daysWeek.length; j < totalArrayWeek; j++){
                    var dayWeek = daysWeek[j];
                    if (dayWeek === dayCompare) { 
                        return dayChoose;
                    }
                };
            };
            return 'Weekends';
        // Se ele marcou 5 pode ser que faça no meio de semana    
        }else if(amountLengthArry === 5){
            for (var i = 0 ; i < amountLengthArry; i++) {
                var dayCompare = dayChoose[i];
                for (var j=0, totalArrayWeek = weekends.length; j < totalArrayWeek; j++){
                    var dayWeek = weekends[j];
                    if (dayWeek === dayCompare) { 
                        return dayChoose;
                    }
                };
            };
            return 'Week Days';
        // Se marcou 7 ele faz todos os dias
        }else if(amountLengthArry === 7){
            return 'Every day';
        // Senão retorna os dias
        }else{
            return dayChoose;
        }

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

    var promise = BikersOpenData();

    promise.then(function(_result) {
        $scope.bikers = _result.bikers;
    }, function(reason) {
        alert('Failed: ' + _result);
    });


    function BikersOpenData(){
        var deferred = $q.defer();
        $http.get('json/bikers.json').then(function (_result) {
            if (typeof _result.data === 'object') {
                deferred.resolve(_result.data);
            } else {
                console.log('erro -->',_result);
                $q.reject(_result.data);
            }
       }, function (_result) {
            console.log('erro -->',_result);
            deferred.reject(_result);
        });
        return deferred.promise;
    }

}])