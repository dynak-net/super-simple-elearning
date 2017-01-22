var automationApp = angular.module('automationApp', [
  'ngRoute',
  'ngTouch',
  'automationAnimations',
  'automationControllers',
  'automationFilters',
  'ui.bootstrap'
]);

automationApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/programs', {
        templateUrl: 'partials/program-list.html',
        controller: 'ProgramListCtrl'
      }).
      when('/programs/:programId', {
        templateUrl: 'partials/program-detail.html',
        controller: 'ProgramDetailCtrl'
      }).
      otherwise({
        redirectTo: '/programs'
      });
  }]);
