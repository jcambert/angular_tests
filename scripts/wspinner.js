window.weberp.directive('ngTouchSpin', ['$log','$compile','$timeout', '$interval', function($log,$compile,$timeout, $interval) {
	'use strict';

	var setScopeValues = function (scope, attrs) {
		scope.min = attrs.min || 0;
		scope.max = attrs.max || 100;
		scope.step = Number(attrs.step) || 1;
		scope.prefix = attrs.prefix || undefined;
		scope.postfix = attrs.postfix || undefined;
		scope.decimals = attrs.decimals || 0;
		scope.stepInterval = attrs.stepInterval || 100;
		scope.stepIntervalDelay = attrs.stepIntervalDelay || 500;
		//scope.initval = attrs.initval || '';
		scope.model=Number(scope.model);
	};

	return {
		restrict: 'EA',
		//require: '?ngModel',
		scope: {
            model:'=',
            callback:'&'
        },
		replace: true,
		link: function (scope, element, attrs) {
			setScopeValues(scope, attrs);

			var timeout, timer, helper = true, oldval = scope.model, clickStart;

			
			scope.decrement = function () {
				/*oldval = scope.model;
				var value = parseFloat(parseFloat(Number(scope.model)) - parseFloat(scope.step)).toFixed(scope.decimals);

				if (value < scope.min) {
					value = parseFloat(scope.min).toFixed(scope.decimals);
					scope.model=value;
					return;
				}

				scope.model = value;*/
                scope.model-=scope.step;
			};

			scope.increment = function () {
				/*oldval = scope.val;
				var value = parseFloat(parseFloat(Number(scope.model)) + parseFloat(scope.step)).toFixed(scope.decimals);

				if (value > scope.max) return;

				scope.model = value;*/
                scope.model+=scope.step;
			};

			scope.startSpinUp = function () {
				scope.checkValue();
				scope.increment();

				clickStart = Date.now();
				scope.stopSpin();

				$timeout(function() {
					timer = $interval(function() {
						scope.increment();
					}, scope.stepInterval);
				}, scope.stepIntervalDelay);
			};

			scope.startSpinDown = function () {
				scope.checkValue();
				scope.decrement();

				clickStart = Date.now();

				var timeout = $timeout(function() {
					timer = $interval(function() {
						scope.decrement();
					}, scope.stepInterval);
				}, scope.stepIntervalDelay);
			};

			scope.stopSpin = function () {
				if (Date.now() - clickStart > scope.stepIntervalDelay) {
					$timeout.cancel(timeout);
					$interval.cancel(timer);
				} else {
					$timeout(function() {
						$timeout.cancel(timeout);
						$interval.cancel(timer);
					}, scope.stepIntervalDelay);
				}
			};

			scope.checkValue = function () {
				/*var val;
                $log.log(scope.model);
				if (scope.model !== '' && !scope.model.match(/^-?(?:\d+|\d*\.\d+)$/i)) {
					val = oldval !== '' ? parseFloat(oldval).toFixed(scope.decimals) : parseFloat(scope.min).toFixed(scope.decimals);
					scope.model = val;
				}*/
			};
            
            element.find('input').bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        
                    });
    
                    event.preventDefault();
                }
            });
            
            scope.$watch('model',function () {
                    $log.log('Model in wSpinner has changed');
                    scope.callback({index:scope.model});
                });
		},
		template: 
		'<div class="input-group">' +
		'  <span class="input-group-btn" ng-show="!verticalButtons">' +
		'    <button class="btn btn-default" ng-mousedown="startSpinDown()" ng-mouseup="stopSpin()"><i class="fa fa-minus"></i></button>' +
		'  </span>' +
		'  <span class="input-group-addon" ng-show="prefix" ng-bind="prefix"></span>' +
		'  <input type="text" ng-model="model" class="form-control" ng-blur="checkValue()">' +
		'  <span class="input-group-addon" ng-show="postfix" ng-bind="postfix"></span>' +
		'  <span class="input-group-btn" ng-show="!verticalButtons">' +
		'    <button class="btn btn-default" ng-mousedown="startSpinUp()" ng-mouseup="stopSpin()"><i class="fa fa-plus"></i></button>' +
		'  </span>' +
		'</div>'
	};

}]);


(function (window,angular) {
    'use strict';
    var weberp = window.weberp;
    
    weberp.directive('wToto',['$log',function($log){
        return{
            restrict:'A',
            //replace:true,
            require:'?ngModel',
            //template:'<div><input type="text"> </input></div>',
           scope:{
              ngModel:'=',
              callback:'&'  
            },
            link:function($scope,$element,$attrs,ngModel){
                 $element.on('click', function() {
                    var counter = ngModel.$viewValue ? ngModel.$viewValue : 0;
                    ngModel.$setViewValue(++counter);
                    $scope.$apply();
                    $scope.callback({index:counter});
                });
                
               $scope.$watch(function () {
                    return ngModel.$modelValue;
                }, function(newValue) {
                    console.log(newValue);
                });
            }    
        };
    }]);
    
weberp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
weberp.directive("wSpinner", ['$log','$timeout','$compile',function ($log,$timeout,$compile) {
        return {
            require: 'ngModel',
            restrict: 'E',
            replace:true,
            templateUrl:'partials/wspinner.html',
            link: function (scope, element, attrs, ngModel) {
                var numericElement = "";
                
                numericElement=element.find('input');
                
                scope.decrement = function(){
                    $log.log('decrement');
                    //ngModel.$viewValue=ngModel.$viewValue-1;
                    scope.previous();
                }
                scope.increment = function(){
                    $log.log('increment');
                    //ngModel.$viewValue=ngModel.$viewValue-1;
                    scope.next();
                }
               scope.getCurrent=function(){
                   $log.log('get current:'+scope.index);
                   if(scope.index>scope.count)
                        scope.index=scope.count;
                   if(scope.index<1)
                        scope.index=1;
                    scope.get(scope.index);
                } 
            
                

                
                attrs.$observe('disabled', function (newVal) {
                    if (angular.isUndefined(newVal)) {
                        return;
                    }
                     var newValState = angular.element.type(newVal) === "boolean" ? newVal : newVal.toLowerCase() == 'true';
                    numericElement.spinner('option', 'disabled', newValState);
                });

                
                numericElement.attr("ng-model", attrs.ngModel);
                $compile(element)(scope);
                
                scope.$watch(attrs.ngModel, function (newval) {
                    $log.log('index change to:'+newval);
                    //ngModel.$render();
                    //scope.index=newval;
                }, true);
                
                ngModel.$render = function () {
                    $log.log('toto');
                };
            }
        };
    }]);
    
})(window,angular);