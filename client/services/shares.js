angular.module('sharesService', [])

	// super simple service
	// each function returns a promise object
	.factory('Shares', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/shares/list');
			},
			fetch : function(shareData) {
                return $http.post('/shares/data', shareData);
            },
			add : function(shareData) {
				return $http.post('/shares/add', shareData);
			},
			delete : function(id) {
				return $http.delete('/shares/delete' + id);
			}
		}
	}]);