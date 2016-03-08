(function (window,angular,$) {
    'use strict';
    var weberp = window.weberp = angular.module('weberp', ['weberp.services','ui.bootstrap','ngCookies','ngAnimate','ui.router','pascalprecht.translate','tmh.dynamicLocale','ngTable']);
    var services=window.services=angular.module('weberp.services',['ngResource'])
    weberp.constant('LOCALES', {
        'locales': {
           // 'ru_RU': 'Русский',
            'fr_FR': 'Francais'
        },
    'preferredLocale': 'fr_FR'
    });
    

    
    weberp.constant('Partials',(function(){
       var partial_dir='partials/';
       
       return{
           BASE_DIR:partial_dir,
           ARTICLE_LIST:partial_dir+'article.list.html',
           ARTICLE_DETAIL:partial_dir+'article.detail.html'
           
       }
    })());

    weberp.constant('EndPoints',(function(){
       var partial_dir='http://localhost:51101/api/';
       
       return{
           BASE_DIR:partial_dir,
           ARTICLE:partial_dir+'article'
           
       }
    })());
    
    weberp.config(['$stateProvider','$urlRouterProvider','$translateProvider','$logProvider',function($stateProvider, $urlRouterProvider,$translateProvider,$log) {
        $log.debugEnabled(true);
        
        /* Translation*/
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useStaticFilesLoader({
            //prefix: 'resources/locale-',// path to translations files
            prefix: 'locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr_FR');
        $translateProvider.useLocalStorage();
        /* /Translation */
        
        
        
        console.info('WebErp is configured');
    }]);
    weberp.run([function(){
        $(".right_col").css("min-height", $(window).height());
        $(window).resize(function () {
            $(".right_col").css("min-height", $(window).height());
        });
    }]);
    
    /* Translation */
    weberp.service('LocaleService',[function(){
        
    }]);
    
    weberp.directive('wTranslate',[function(){
        
    }]);
    /* /Translation */
    
    weberp.directive('wSidebar', ['$log','$timeout',function ($log,$timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            $scope:{
                
            },
            controller:function($scope){},
            template:'<div id="sidebar-menu" class="main_menu_side hidden-print main_menu"><w-menu-section ng-repeat="section in menuSections" ng-transclude><h3>{{section.title}}</h3>' + 
            '<ul class="nav side-menu"><li ng-repeat="menu in section.menus"><a tooltip-placement="right" uib-tooltip="{{menu.tooltip | translate}}"><i class="fa fa-{{menu.icon}}"></i>{{menu.text}}<span class="fa fa-chevron-down"></span></a><w-menu-item ></w-menu-item></li></ul></w-menu-section></div>',
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
                var elt=angular.element('<a uib-tooltip="{{child.tooltip| translate}}" tooltip-placement="right">{{child.text | translate}}<span ng-if="child.label" class="label label-{{child.label.variation}} pull-right">{{child.label.text}}</span></a>');
                if (angular.isDefined($scope.child.state) && $scope.child.state !== "")
                    elt.attr('ui-sref',$scope.child.state);
                if (angular.isDefined($scope.child.link) && $scope.child.link !== "")
                    elt.attr('ng-href', $scope.child.link);
               
                
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
              var elt=angular.element('<a tooltip-placement="top" uib-tooltip="{{ title | translate }}"><span class="glyphicon glyphicon-{{icon}}" aria-hidden="true"></span></a>');
              $scope.title=$attrs.title;
              $scope.icon=$attrs.icon;
              var c=$compile(elt)($scope);
              $element.replaceWith(c);
          }
          
        };
    }]);
    
    
    weberp.directive('wTopbar',[function(){
        return{
          restrict:'E',
          replace:true,
          transclude:true,
          template:'<div class="top_nav"><div class="nav_menu"><nav class="" role="navigation"><div class="nav toggle"><w-fa-bars  tooltip-placement="right" uib-tooltip="{{\'toggle-menu-tooltip\' | translate}}"></w-fa-bars></div><ul class="nav navbar-nav navbar-right" ng-transclude></ul></nav></div></div>',
        };
    }]);
    
    weberp.directive('wFaBars',['$log','$document',function($log, $document){
        return{
            restrict:'E',
            replace:true,
            template:'<a id="menu_toggle"><i class="fa fa-bars"></i></a>',
            link:function($scope,$element,$attrs){
                $element.on('click',function(){
                    var body=$document.find("body");
                    
                    if (body.hasClass('nav-md')) {
                        body.removeClass('nav-md').addClass('nav-sm');
                        body.find('.left_col').removeClass('scroll-view').removeAttr('style');
                        body.find('.sidebar-footer').hide();

                        if (body.find('#sidebar-menu li').hasClass('active')) {
                            body.find('#sidebar-menu li.active').addClass('active-sm').removeClass('active');
                        }
                    } else {
                        body.removeClass('nav-sm').addClass('nav-md');
                        body.find('.sidebar-footer').show();

                        if (body.find('#sidebar-menu li').hasClass('active-sm')) {
                            body.find('#sidebar-menu li.active-sm').addClass('active').removeClass('active-sm');
                        }
                    }
                })
                
                
            }
        }
    }]);
    
    weberp.directive('wTopbarDropdown',[function(){
        return{
          restrict:'E',
          replace:true, 
          transclude:true, 
          template:'<li class="" uib-dropdown ng-transclude></li>'
        };
    }]);
    
    weberp.directive('divider',['$log',function($log){
        return{
          restrict:'A',
          replace:true, 
          link:function($scope,$element,$attrs){
              $log.log($element);
              var elt=angular.element('<li class="divider"></li>');
              $element.after(elt);
              
          }
        };
    }]);
    
    weberp.directive('wTopbarDropdownHeader',[function(){
        return{
            restrict:'E',
            replace:true,
            transclude:true,
            template:'<a uib-dropdown-toggle ng-transclude></a>' 
        }
    }]);
    
    weberp.directive('wTopbarDropdownItems',[function(){
        return{
            restrict:'E',
            replace:true,
            transclude:true,
            template:'<ul class="animated fadeInDown pull-right" uib-dropdown-menu ng-transclude ></ul>'
            
        };
    }]);
    
    weberp.directive('wTopbarDropdownItem',[function(){
        return{
          restrict:'E',
          replace:true,
          transclude:true,
          template:'<li ng-transclude></li>'
        };
    }]);
    
    weberp.directive('wPanel',[function(){
        return{
            restrict:'E',
            replace:true,
            transclude:true,
            template:'<div class="x_panel" ng-transclude></div>'
        };
    }])
    
    weberp.directive('wPanelHeader',['$compile',function($compile){
        return{
            restrict:'E',
            replace:true,
            transclude:true,
            scope:{
              title:'@',
              smallTitle:'@'  
            },
            template:'<div class="x_title" ng-transclude></div>',
            link:function($scope,$element,$attrs){
                if(angular.isDefined($attrs.title)){
                    $scope.title=$attrs.title;
                    var elt=angular.element('<h2>{{title}}<small ng-if="smallTitle">{{smallTitle}}</small></h2>');
                    var c=$compile(elt)($scope);
                    $element.prepend(c);
                }
               $element.append('<div class="clearfix"></div>');
            }
        }
    }]);
    
    weberp.directive('wPanelToolbox',[function(){
        return{
          restrict:'E',
          replace:true,
          transclude:true,
          template:'<ul class="nav navbar-right panel_toolbox" ng-transclude></ul>'
        };
    }]);
    
     weberp.directive('wPanelToolboxChevron',[function(){
        return{
            restrict:'E',
            replace:true,
            template:'<li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>',
            link:function($scope,$element,$attrs){
                $element.find('a').click(function () {
                    var x_panel = $(this).closest('div.x_panel');
                    var button = $(this).find('i');
                    var content = x_panel.find('div.x_content');
                    content.slideToggle(200);
                    (x_panel.hasClass('fixed_height_390') ? x_panel.toggleClass('').toggleClass('fixed_height_390') : '');
                    (x_panel.hasClass('fixed_height_320') ? x_panel.toggleClass('').toggleClass('fixed_height_320') : '');
                    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    setTimeout(function () {
                        x_panel.resize();
                    }, 50);
                });
            }
        };
    }]);
    
    weberp.directive('wPanelToolboxClose',[function(){
        return{
            restrict:'E',
            replace:true,
            template:'<li><a class="close-link"><i class="fa fa-close"></i></a></li>',
            link:function($scope,$element,$attrs){
                $element.find('a').click(function () {
                    var content = $(this).closest('div.x_panel');
                    content.remove();
                });
            }
        };
    }]);
    
    weberp.directive('wPanelToolboxTool',['$compile',function($compile){
        return{
            restrict:'E',
            replace:true,
            transclude:true, 
            template:'<li class="" uib-dropdown ><a uib-dropdown-toggle  ><i class="fa fa-wrench"></i></a><ul class="animated fadeInDown " uib-dropdown-menu ng-transclude></ul></li>',
            
        };
    }]);
    
    weberp.directive('wPanelToolboxToolItem',[function(){
        return{
            restrict:'E',
            replace:true,
            transclude:true,
            template:'<li ng-transclude></li>'
        };
    }]);
    
    weberp.directive('wPanelContent',[function(){
        return{
          restrict:'E',
          replace:true,
          transclude:true,
          template:'<div class="x_content" ng-transclude></div>'  
        };
    }]);
    
    weberp.directive('wNavigationBar',[function(){
        return {
            restrict:'E',
            replace:true,
            transclude:true,
            templateUrl:'partials/wNavigationBar.html'
        }    
    }]);
    
    weberp.directive('wNavigationButton',[function(){
        return{
          restrict:'E',
          replace:true,
          template:'<button class="btn btn-default " type="button"  aria-haspopup="true" aria-expanded="false"> <i class="fa "></i></button>' ,
          link:function($scope,$element,$attrs){
              if(angular.isDefined($attrs.icon))
                $element.find('i').addClass('fa-'+$attrs.icon);
          }
        };
    }]);
    
  /*  weberp.directive('wSpinner',[function(){
        return{
            restrict:'E',
            replace:true,
            scope:{
                index:'=',
            },
            templateUrl:'partials/wspinner.html',
            link:function($scope,$element,$attrs){
                
            }
        }
    }])*/
})(window,angular,$);