var app = angular.module('bikersApp', []);

app.controller('bikersCtrl', ['$scope', 'bikersService', '$sce', function ($scope, dribbleService, $sce) {


}]).factory('bikersService', ['$http', '$q', function ($http, $q) {
    return {
        getShotsApi: function (_page) {
            return $http.jsonp('http://api.dribbble.com/shots/popular?per_page=16&page=' + _page + '&callback=JSON_CALLBACK').then(function (_result) {
                if (typeof _result.data === 'object') {
                    return _result.data;
                } else {
                    $q.reject(_result.data);
                }
            }, function (_result) {
                return $q.reject(_result);
            });
        },

        getShotDesc: function (_shotId) {
            return $http.jsonp('http://api.dribbble.com/shots/' + _shotId + '?callback=JSON_CALLBACK').then(function (_result) {
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