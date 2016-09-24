(function(){
	var app = angular.module('app',['ngRoute']);

	app.config(function($routeProvider){
		$routeProvider
			.when('/home',{
				templateUrl:'home.html'
			})
			.when('/about',{
				templateUrl:'about.html'
			})
	})

	app.controller('MainController',["$scope","$http","$cacheFactory",MainController]);

	function MainController($scope,$http,$cacheFactory){

			$http({
				method:'GET',
				url:"https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths"
			}).then(onSearchSuccess,onError);

			function onSearchSuccess(response){
				$scope.allPaths = response.data.paths;
				console.log(response.data.paths);
			}

			function onError(){
				console.log('Error retrieving data');
			}

			var dataCache = $cacheFactory('pathList');
			dataCache.put("prashant",'agarwal');

			dataCache.get("prashant");

		$scope.search = function(searchText){
			$scope.showText = true;
			$scope.allPaths.forEach(function(currentObject){
				var result = currentObject.tags.split(", ");
				result.forEach(function(currentValue){
					if(currentValue === searchText){
						$scope.requiredObject = currentObject;
					}
				});
				
			});
		}

		$scope.upVote = function(){
			$scope.upvote +=1;
		}

		$scope.downVote = function (){
			$scope.downvote +=1;
		}
		$scope.upvote = null;
		$scope.downvote = null;
		$scope.showText = false;
		$scope.HeaderTitle="SpringBoard"
	}


}());