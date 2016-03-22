var app = angular.module('phonebookApp.controllers', [])


app.controller('PhoneBookListController', ['Record', '$stateParams', '$state', '$cookies',
                                        function(Record, $stateParams, $state, $cookies) {
  var self = this;

  self.msgs = [];
  self.noRecords = false;
  self.pagination = {
                    'limit' : $cookies.get('list_limit') || "10", 
                    'page' : parseInt($cookies.get('list_page')) || 1,
                    };

  // settings for content menu (view record)
  self.TableSettings = {
      contextMenu: {
            callback: function (key, options) {
                    if (key === 'view_record') {
                      selected = this.getSelected()[0]; // index in records array
                      $state.go('viewRecord', {id: self.records[selected].id}); // on success go back to home i.e. movies state.
                    }
                  },
            items: {
              "view_record": {
                name: 'View Record',
              },
            }
          }
      };



  // this function processes response from server
  self.__get_records = function(response){
    // check, if an error has occured in REST API
    if( response.data.error ){
      self.noRecords = true;
      self.msgs.push({
        'text' : response.data.msg,
        'type' : 'danger'
      });
    } else {
      self.records = response.data.data;
      if(self.records.length == 0){
        msg = {
          'text' : "No record found",
          'type' : 'info'
        };
        self.msgs.push(msg);
      }
    }    
  }

  self.records = Record.get({ 'list_limit' : self.pagination.limit, 'list_page' : self.pagination.page },self.__get_records);

  // control pagination
  self.paginate = function(dir){
    self.pagination.page = self.pagination.page + dir;

    if(self.pagination.page < 1 ){
      self.pagination.page = 1;
    } else {
      self.records = Record.get({ 'list_limit' : self.pagination.limit, 'list_page' : self.pagination.page },self.__get_records);
    }
    $cookies.put('list_limit', self.pagination.limit);
    $cookies.put('list_page', self.pagination.page);    
  }

  // change pagination limit
  self.changeLimit = function(dir){
    self.pagination.page = 1;
    self.paginate(0);
  }

  return self;
}])

.controller('PhoneBookViewController', ['$stateParams', 'Record', function($stateParams, Record) {
  var self = this;
  self.msgs = [];

  // display message, if a new record was just added
  if( $stateParams.addedRecord == '1'){
    self.msgs.push({
      'text' : "Record has been added",
      'type' : 'info'
    });
  }

  self.record = Record.get({ id: $stateParams.id }, function(response){
    // check, if an error ocurred or if no record was returned
    if(response.data.error == false && response.data.data.length > 0){
      // we received the record
      self.record = response.data.data[0];
    } else {
      // no record ws received or an error has occured
      msg = {
        'text' : "Record has been added",
        'type' : 'info'
      };
      if(msg.text == ''){
        msg.text = 'No record found.';
      }
      self.msgs.push(msg);
    }
  });

  return self;
}])

.controller('PhoneBookCreateController', ['$state', '$stateParams', 'Record', function($state, $stateParams, Record) {
  var self = this;
  self.msgs = [];

  self.record = new Record();  //create new movie instance. Properties will be set via ng-model on UI
  self.addRecord = function() { //create a new movie. Issues a POST to /api/movies
    self.record.$save(function(response) {

      if(response.error ){
      self.msgs.push({
        'text' : "Record could not been added.",
        'type' : 'danger'
      });

      } else {
        self.record.id = response.id;
        $state.go('viewRecord', {id: response.id, addedRecord : 1}); // on success go back to home i.e. movies state.        
      }
    });
  };

  return self;
}]);