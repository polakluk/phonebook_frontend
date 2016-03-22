angular.module('phonebookApp', ['ui.router', 'ngResource', 'phonebookApp.controllers', 
                                'phonebookApp.services', 'ngHandsontable',
                                'ngCookies', 'ngMessages', 'phonebookApp.directives']);

angular.module('phonebookApp').config(function($stateProvider) {
  $stateProvider.state('listRecords', {
    url: '/records',
    templateUrl: 'partials/records.html',
    controller: 'PhoneBookListController',
    controllerAs: 'listController',
  }).state('viewRecord', {
    url: '/records/:id/view',
    templateUrl: 'partials/record-view.html',
    controller: 'PhoneBookViewController',
    controllerAs: 'viewController',
    params: {
        addedRecord: null,
      },
  }).state('newRecord', {
    url: '/record/new',
    templateUrl: 'partials/record-add.html',
    controller: 'PhoneBookCreateController',
    controllerAs: 'newController'
  });
})

.run(function($state) {
  $state.go('listRecords'); 
})

.filter('phonenumSk', function(){
  return function(text){
    if( typeof(text) == 'undefined'){
      return '';
    }
    text = String(text);
    return text.replace(/(\d{3})(\d{3})(\d{3})/, '($1) $2-$3');
  }
})