var PHONENUM_REGEXP = /^\d{9}$/;
angular.module('phonebookApp.directives', [])
.directive('phonenumberdigits', function() {
  return {
    restrict : 'A',
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModel) {
      ngModel.$validators.phonenumber = function(modelValue) {
        if (PHONENUM_REGEXP.test(modelValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});