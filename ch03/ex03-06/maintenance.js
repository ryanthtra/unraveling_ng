angular.module('maintenance', ['ngRoute'])
	.controller('adminCtrl', AdminCtrl)
	.controller('mainCtrl', MainCtrl)
	.controller('locationsCtrl', LocationsCtrl)
	.controller('sitesCtrl', SitesCtrl)
	.factory('currentSpot', currentSpot)
	.directive('ywActiveMenu', ywActiveMenu)
	.directive('ywMenuId', ywMenuId)
	.config(function ($routeProvider)
		{
			$routeProvider.when('/locations', 
				{
					templateUrl: 'views/locations.html',
					controller: 'locationsCtrl'	
				}
			);
			$routeProvider.when('/sites',
				{
					templateUrl: 'views/sites.html',
					controller: 'sitesCtrl'	
				}
			);
			$routeProvider.otherwise(
				{
					templateUrl: 'views/main.html',
					controller: 'mainCtrl'
				}
			);
		}
	);
	
function AdminCtrl($scope, currentSpot)
{
	$scope.isActive = isActive;
	$scope.getTitle = getTitle;
	
	function isActive(menuId)
	{
		return currentSpot.getActiveMenu() == menuId;
	}
	
	function getTitle() 
	{
		return currentSpot.getTitle();
	}
}

// Service to be used as a singleton object
function currentSpot()
{
	var activeMenuId = '';
	var titleText = '';
	
	var retObj =
	{
		setCurrentSpot: function(menuId, title)
		{
			activeMenuId = menuId;
			titleText = title;
		}	,
		getActiveMenu: function()
		{
			return activeMenuId;
		},
		getTitle: function()
		{
			return titleText;
		}
	};
	
	return retObj;
}

function ywActiveMenu(currentSpot)
{
	return function(scope, element, attrs)
	{
		var activeMenuId = attrs["ywActiveMenu"];
		var activeTitle = attrs["ywActiveTitle"];
		currentSpot.setCurrentSpot(activeMenuId, activeTitle);
	}
}

function ywMenuId(currentSpot)
{
	var menuElements = [];
	
	function setActive(element, menuId)
	{
		if (currentSpot.getActiveMenu() == menuId)
		{
			element.addClass('active');
		}
		else
		{
			element.removeClass('active');
		}
	}
	
	// Directive's link function runs only once for each occurrence of the directive's name (yw-menu-id)
	return function (scope, element, attrs)
	{
		var menuId = attrs["ywMenuId"];
		
		menuElements.push({id: menuId, node: element});
		
		var watcherFn = function(watchScope)
		{
			return watchScope.$eval('getActiveMenu()');
		}
		scope.$watch(watcherFn, function(newValue, oldValue)
			{
				for (var i = 0; i < menuElements.length; i++)
				{
					var menuElement = menuElements[i];
					setActive(menuElement.node, menuElement.id);
				}	
			}
		);
		setActive(element, menuId);
	}
}

function MainCtrl(currentSpot)
{

}

function LocationsCtrl(currentSpot)
{
	
}

function SitesCtrl(currentSpot)
{
	
}