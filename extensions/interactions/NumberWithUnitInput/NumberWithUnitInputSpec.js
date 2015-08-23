// Copyright 2015 The Oppia Authors. All Rights Reserved.
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

/**
 * Tests for the NumberWithUnitInput interaction.
 */

describe('numberWithUnitInput', function() {
  var $httpBackend, $templateCache;
  var elt, scope, ctrlScope;

  beforeEach(module('oppia'));
  beforeEach(module('directiveTemplates'));
  beforeEach(inject(function($compile, _$templateCache_, $rootScope) {
    $templateCache = _$templateCache_;
    var templatesHtml = $templateCache.get(
      'extensions/interactions/NumberWithUnitInput/NumberWithUnitInput.html');
    $compile(templatesHtml)($rootScope);
    $rootScope.$digest();
  }));

  beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    var TAG_NAME = 'oppia-interactive-number-with-unit-input';
    scope = $rootScope.$new();
    elt = angular.element('<' + TAG_NAME + '></' + TAG_NAME + '>');
    $compile(elt)(scope);
    scope.$digest();
    ctrlScope = elt.isolateScope();
  }));

  afterEach(function() {
    scope.$apply();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('loads the template', function() {
    expect(elt.html()).toContain('row number-with-unit-container');
  });

  describe('preprocess', function() {
    it('gets rid of white spaces and commas', function() {
      expect(ctrlScope.preprocess('5,000 km^2  ')).toBe('5000km^2')
    });
  });

  describe('postprocess', function() {
    it('builds the whole schema from parts', function() {
      var answer = "5 km^2";
      var parsedAnswer = {
      "number": 5,
      "units": [
        {
          "unit": "km",
          "exponent": 2
        }
      ]
    };

      expect(ctrlScope.postprocess(answer, parsedAnswer)).toEqual({
        'raw': answer,
        'parsed': parsedAnswer
      });
    });
  });
});
