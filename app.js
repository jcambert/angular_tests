(function (window,angular,$) {
    'use strict';
    var weberp = window.weberp = angular.module('weberp', ['ngCookies','ui.router','pascalprecht.translate']);
    
    weberp.constant('LOCALES', {
        'locales': {
           // 'ru_RU': 'Русский',
            'fr_FR': 'Francais'
        },
    'preferredLocale': 'fr_FR'
    })

    weberp.config(['$stateProvider','$urlRouterProvider','$translateProvider','$logProvider',function($stateProvider, $urlRouterProvider,$translateProvider,$log) {
        $log.debugEnabled(true);
        
        /* Translation*/
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useStaticFilesLoader({
            //prefix: 'resources/locale-',// path to translations files
            prefix: 'locale-',
            suffix: '.json'// suffix, currently- extension of the translations
        });
        $translateProvider.preferredLanguage('fr_FR');// is applied on first load
        $translateProvider.useLocalStorage();// saves selected language to localStorage
        /* /Translation */
        console.info('WebErp is configured');
    }]);
    weberp.run([function(){
        $(".right_col").css("min-height", $(window).height());
        $(window).resize(function () {
            $(".right_col").css("min-height", $(window).height());
        });
    }]);
    
    
    
    
    weberp.directive('wSidebarMenu', ['$log','$timeout',function ($log,$timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            $scope:{
                
            },
            controller:function($scope){},
            template:'<div id="sidebar-menu" class="main_menu_side hidden-print main_menu"><w-menu-section ng-repeat="section in menuSections" ng-transclude><h3>{{section.title}}</h3><ul class="nav side-menu"><li ng-repeat="menu in section.menus"><a><i class="fa fa-{{menu.icon}}"></i>{{menu.text}}<span class="fa fa-chevron-down"></span></a><w-menu-item ></w-menu-item></li></ul></w-menu-section></div>',
            link:function($scope,$element,$attrs){
                $timeout(function(){
                   
                    $element.find('li ul').slideUp();
                    $element.find('li').removeClass('active');
                    
                    $element.find('li').on('click touchstart', function() {
                        var link = $('a', this).attr('href');

                        if(link) { 
                            window.location.href = link;
                        } else {
                            if ($(this).is('.active')) {
                                $(this).removeClass('active');
                                $('ul', this).slideUp();
                            } else {
                                $('#sidebar-menu li').removeClass('active');
                                $('#sidebar-menu li ul').slideUp();
                                
                                $(this).addClass('active');
                                $('ul', this).slideDown();
                            }
                        }
                    });
                    
                     $log.log('Sidebar Menu is ready');
                });
                
            }
        };
    }]);

    weberp.directive('wMenuSection',[function(){
        return {
          restrict:'E',
          replace:true,
          transclude:true,
          require:'^wSidebarMenu',
          controller:function($scope){},
          template:'<div class="menu_section" ng-transclude></div>' 
        };
    }]);
    
    weberp.directive('wMenuItem', [function () {
        return {
            restrict: 'E',
            replace: true,
            require: '^wMenuSection',
            controller:function($scope){
                
            },
            template:'<ul class="nav" ng-class="{\'child_menu\': menu.childs && menu.childs.length>0}"><li ng-repeat="child in menu.childs"><w-menu-subitem "></w-menu-subitem></li></ul>',
            
        };
    }]);

    weberp.directive('wMenuSubitem', ['$log','$compile',function ($log,$compile) {
        return {
            restrict: 'E',
            replace: true,
            require: '^wMenuItem',

            link:function ($scope,$element,$attrs) {
                var elt=angular.element('<a>{{child.text}}<span ng-if="child.label" class="label label-{{child.label.variation}} pull-right">{{child.label.text}}</span></a>');
                if (angular.isDefined($scope.child.state) && $scope.child.state !== "")
                    elt.attr('ui-sref',$scope.child.state);
                if (angular.isDefined($scope.child.link) && $scope.child.link !== "")
                    elt.attr('ng-href', $scope.child.link);
                if (angular.isDefined($scope.child.label)){
                    var label=angular.element('')
                }
                    
                var c=$compile(elt)($scope);
                
                $element.replaceWith(c);
            }
           
        };
    }]);
    
    weberp.directive('wSidebarFooter',[function(){
        return{
          restrict: 'E',
          replace:true,
          transclude:true,
          template:'<div class="sidebar-footer hidden-small" ng-transclude></div>' ,
          controller:function($scope){},
          link:function($scope,$element,$attrs){}
        };
    }]);
    
    weberp.directive('wSidebarFooterItem',['$compile',function($compile){
        return {
          restrict: 'E',
          replace:true,
          require:'^wSidebarFooter',
          scope:{
              title:'@',
              icon:'@'
          },
          controller:function($scope){},
          link:function($scope,$element,$attrs){
              var elt=angular.element('<a data-toggle="tooltip" data-placement="top" title="{{ title | translate }}"><span class="glyphicon glyphicon-{{icon}}" aria-hidden="true"></span></a>');
              $scope.title=$attrs.title;
              $scope.icon=$attrs.icon;
              var c=$compile(elt)($scope);
              $element.replaceWith(c);
          }
          
        };
    }]);
    
    
    weberp.directive('wTopbarMenu',[function(){
        return{
          restrict:'E',
          replace:true,
          transclude:true,
          template:'<div class="top_nav"><div class="nav_menu"><nav class="" role="navigation"><div class="nav toggle"><a id="menu_toggle"><i class="fa fa-bars"></i></a></div><ul class="nav navbar-nav navbar-right" ng-transclude></ul></nav></div></div>'  
        };
    }]);
})(window,angular,$);