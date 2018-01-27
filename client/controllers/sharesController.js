angular.module('portfolioController', [])

	// inject the sharesService factory into our controller
	.controller('sharesController', ['$scope','$http','Shares', function($scope, $http, Shares) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all shares and show them
		// use the service to get all the shares
		Shares.get()
			.success(function(data) {
				$scope.shares = data;
				$scope.loading = false;
			});



			$scope.getShares = function() {
                // if successful creation, call our get function to get all the new shares
                if ($scope.formData.text != undefined) {
                Shares.fetch($scope.formData)
                    .success(function(data) {
                    $scope.shares = data;
                    $scope.loading = false;

                    $scope.sharesGridOptions = { data: data,
                          enableRowSelection: false,
                          enableCellEditOnFocus: true,
                          multiSelect: false,
                          columnDefs: [
                          {field: 'symbol', displayName: 'SYMBOL'},
                          {field: 'exchangeName', displayName: 'EXCHANGE NAME'},
                          {field: 'shortName', displayName: 'SHORT NAME'},
                          {field: 'regularMarketPrice', displayName: 'REGULAR MARKET PRICE'},
                          {field: 'currency', displayName: 'CURRENCY'}
                          ]
                        };
                });
                }

            };

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.addShares = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Shares.add($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.shares = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteShare = function(id) {
			$scope.loading = true;

			Shares.delete(id)
				// if successful creation, call our get function to get all the new shares
				.success(function(data) {
					$scope.loading = false;
					$scope.share = data; // assign our new list of shares
				});
		};
	}]);