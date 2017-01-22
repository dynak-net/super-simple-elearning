var automationControllers = angular.module('automationControllers', []);

automationControllers.controller('ProgramListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.launchIntoFullscreen = function() {
      var element = document.documentElement;
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    $scope.exitFullscreen = function() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    $scope.programs = [];
    $http.get('php/dir_json.php?path=../programs').success(function(data) {
      data.forEach(function(element){
        var melement=element.match(/(\d*)(.*)/);
        $scope.programs[melement[1]-1]={
          id:melement[1],
          name:melement[2],
          spec:"",
          tags:"inne",
        };
      });
    });
    $scope.orderProp = 'id';
    $scope.avalible_tags = ['alarm','oswietlenie','ogrzewanie','rolety','ogród','rtv','inne'];
    $scope.checkModel = {
      alarm: false,
      oswietlenie: false,
      ogrzewanie: false,
      rolety: false,
      ogrod: false,
      rtv: false,
      inne: false
    };
    $scope.checkResults = [];
    $scope.$watchCollection('checkModel', function () {
      $scope.checkResults = [];
      angular.forEach($scope.checkModel, function (value, key) {
        if (value) {
          $scope.checkResults.push(key);
        }
        if ($scope.checkResults.length > 1)
          $scope.checkResults = ["!"];
      });
    });
  }]);

automationControllers.controller('ProgramDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.programId = $routeParams.programId;
    $scope.program = {automation:[]};
    $http.get('php/dir_json.php?path=../programs/'+$scope.programId).success(function(elem) {
      elem.forEach(function(ele){
        var mele=ele.match(/(\d*)(.*)/);
        $scope.program.automation[mele[1]-1]={
          name:mele[1]+mele[2],
          type:"screens",
          screens:[]
        };
        $http.get('php/dir_json.php?path=../programs/'+$scope.programId+'/'+ele).success(function(el) {
          el.forEach(function(e){
            var me=e.match(/(\d*)(.*)\..../);
            $scope.program.automation[mele[1]-1].screens[me[1]-1]={img:e,text:me[2]};
          });
        });
      });
    });
  }
]);
