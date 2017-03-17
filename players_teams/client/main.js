var app = angular.module('app', ['ngRoute']);

// Routes
app.config(function ($routeProvider) {
  $routeProvider
  .when('/players', {
    templateUrl: 'partials/players.html',
    controller: 'playersController'
  })
  .when('/teams', {
    templateUrl: 'partials/teams.html',
    controller: 'teamsController'
  })
  .when('/associations', {
    templateUrl: 'partials/associations.html',
    controller: 'associationsController'
  })
  .otherwise( {
    redirectTo: '/players'
  });
});

// Controllers
app.controller('playersController', function ($scope, playerFactory) {
  var get = function() {
    $scope.players = playerFactory.players;
  }
  get();

  $scope.create = function() {
    playerFactory.create($scope.newPlayer, get)
    $scope.newPlayer = {}
  }
  $scope.delete = function($index){
   playerFactory.delete($index, get);
  }
});

app.controller('teamsController', function ($scope, teamFactory) {
  var get = function() {
    $scope.teams = teamFactory.teams;
  }
  get();

  $scope.create = function() {
    teamFactory.create($scope.newTeam, get)
    $scope.newTeam = {}
  }
  $scope.delete = function($index){
  console.log($index)
   teamFactory.delete($index, get);
  }
});

app.controller('associationsController', function ($scope, playerFactory, teamFactory) {
  var get = function() {
    $scope.teams = teamFactory.teams;
    $scope.players = playerFactory.players;
  }
  get();

  $scope.create = function() {
    playerFactory.associate($scope.newAss);
  }

  $scope.delete = function($index) {
    playerFactory.unassociate($index)
  }
});

// Factory
app.factory('playerFactory', function() {
  var factory = {};
  factory.players = [
    {player_name: "Ian", team_name: "Lakers", date_added: new Date()},
    {player_name: "Jace", team_name: "Algorythms", date_added: new Date()},
    {player_name: "Taylor", team_name: "Bacons", date_added: new Date()},
    {player_name: "Evee", team_name: "Dogs", date_added: new Date()}
  ]

  factory.create = function(player, callback) {
    factory.players.push({
      player_name: player.player_name,
      team_name: "",
      date_added: new Date()
    })
    callback();
  }

  factory.delete = function(index, callback) {
    factory.players.splice(index,1)
    callback();
  }

  factory.associate = function(newAss) {
    factory.players[newAss.playerIndex].team_name = newAss.team_name
  }

  factory.unassociate = function(index) {
    factory.players[index].team_name = "";
  }

  return factory;
})

app.factory('teamFactory', function() {
  var factory = {};
  factory.teams = [
    {team_name:"Lakers"},
    {team_name:"Algorythms"},
    {team_name:"Bacons"},
    {team_name:"Dogs"}
  ]

  factory.create = function(team, callback) {
    factory.teams.push({
      team_name: team.team_name,
      date_added: new Date()
    })
    callback();
  }

  factory.delete = function(index, callback) {
    factory.teams.splice(index,1)
    callback();
  }
  return factory;
})
