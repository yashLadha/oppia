// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


oppia.directive('realWithUnitEditor', function($compile, warningsData) {
  return {
    link: function(scope, element, attrs) {
      scope.getTemplateUrl = function() {
        return OBJECT_EDITOR_TEMPLATES_URL + scope.$parent.objType;
      };
      $compile(element.contents())(scope);
    },
    restrict: 'E',
    scope: true,
    template: '<span ng-include="getTemplateUrl()"></span>',
    controller: function($scope) {
      $scope.errorMessage = '';

      $scope.clearErrorMessage = function() {
        $scope.errorMessage = '';
      };

      $scope.createRealWithUnitObject = function(rawValue) {
        try {
          // TODO(sll): Do the whitespace removal in the parser instead.
          var parsedValue = numberWithUnitInputParser.parse(
            rawValue.replace(/ /g, ''));
        } catch(error) {
          if (error.message) {
            $scope.errorMessage = error.message;
          } else {
            $scope.errorMessage = (
              'Could not understand this input. Please enter a number with ' +
              'units.');
            throw error;
          }
          return;
        }

        $scope.$parent.value = {
          raw: rawValue,
          parsed: parsedValue
        };
      };

      if ($scope.$parent.value === '') {
        $scope.$parent.value = {
          number: 0,
          units: [{
            unit: 'km',
            exponent: 2
          }]
        };
      }
    }
  };
});
