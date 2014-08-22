// public/core.js
var scotchDateinfo = angular.module('scotchDateinfo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $http.get('/api/dateinfos')
    .success(function(data) {
      $scope.dateinfos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createDateinfo = function() {
    $http.post('/api/dateinfos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.dateinfos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteDateinfo = function(id) {
    $http.delete('/api/dateinfos/' + id)
      .success(function(data) {
        $scope.dateinfos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
