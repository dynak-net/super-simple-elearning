angular.module('automationFilters', []).filter('ftags', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
