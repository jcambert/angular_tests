(function (window,angular) {
    'use strict';
    var weberp = window.weberp;
    var services = window.services;
    weberp.config(['$stateProvider', '$urlRouterProvider','Partials',function($stateProvider, $urlRouterProvider,$partials) {
       
        $urlRouterProvider.otherwise("/home");
         $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "partials/state1.html"
         })
         .state('home',{
             url:'/home',
             template:'<div>home</div>'
             
         })
         .state('article',{
             abstract:true,
             url:'/article',
             views:{
                 '':{
                     template:'<div class="row"><div class="col-md-12" ui-view="master"></div><div class="col-md-12" ui-view="detail"></div></div>',
                 }
             }
         })
         .state('article.list',{
             url:'',
             
             views:{
                 master:{
                     templateUrl:$partials.ARTICLE_DETAIL,
                     controller:'ArticleListMasterController'
                 },
                 detail:{
                     template:'<div>DETAIL</div>'
                 }
             }
         })
         ;
    }]);
    
    
    weberp.controller('main',['$scope',function($scope){
        $scope.appTitle="Web Erp";
        $scope.appIcon='pagelines';
        $scope.user={photo:'resources/photo.jpg',firstname:"Jean-Christophe",lastname:"Ambert", fullname:'Ambert Jean-Christophe'};
        $scope.menuSections=[{
                title:'GENERAL',
                menus:[
                     {
                        icon:'home',
                        text:'Accueil',
                        childs:[
                            {
                                id:0,
                                text:'temp',
                                state:'home'
                            },
                            {
                                id:1,
                                text:'temp',
                                link:'home'
                            },
                        ]
                    },
                    {
                        icon:'building-o',
                        text:'Articles',
                        tooltip:'article-management-tooltip',
                        childs:[
                            {
                                id:0,
                                text:'tous',
                                state:'article.list',
                               //tooltip:'Tous les articles'
                                
                            },
                            {
                                id:1,
                                text:'creer',
                                link:'state4'
                            },
                        ]
                    }
                ]
            },{
                title:'LIVE ON',
                menus:[
                    {
                        icon:'bug',
                        text:'Additional Pages',
                        childs:[{
                            text:'temp',
                            label:{
                                variation:'success',
                                text:10
                            }
                            
                        },{
                            text:'temp'
                        }
                        ]
                    }
                ]
            }];/*
            
            {
                icon:'home',
                text:'Accueil',
                items:[
                    {
                        id:0,
                        text:'accueil 1',
                        state:'state1'
                    },
                    {
                        id:1,
                        text:'accueil 2',
                        link:'state2'
                    },
                ]
            },
            {
                icon:'edit',
                text:'Forms'
            }
        ];*/
    }]);
    
    weberp.controller('ArticleListMasterController',['$log','$scope','Article','NgTableParams',function($log,$scope,Article,NgTableParams){
       /* $scope.articles= new NgTableParams({}, {
            getData: function(params) {
                // ajax request to api
                return Article.query();
            }
        });*/
        //$scope.current=Article.first();
        var self=$scope;
        self.index = 0;
        $scope.count = 0;
        
        $scope.get = function(index){
            Article.get({index:index}).$promise.then(function(result){
                $scope.current=result.Result;
                $scope.count = result.Count;
                $scope.index=result.Index;
            })
        }
        
        $scope.first = function(){
            Article.first().$promise.then(
                function(result){
                    $log.log(result);
                    $scope.current=result.Result;
                    self.index=parseInt(result.Index);
                    $scope.count = result.Count;
                }
            );
        }
        
         $scope.last = function(){
            Article.last().$promise.then(
                function(result){
                    $log.log(result);
                    $scope.current=result.Result;
                    $scope.index=result.Index;
                    $scope.count = result.Count;
                }
            );
        }
        
        $scope.next = function(){
            Article.next({index:$scope.index}).$promise.then(
                function(result){
                    $log.log(result);
                    $scope.current=result.Result;
                    self.index=parseInt(result.Index);
                    $scope.count = result.Count;
                   $log.log(self.index);
                }
            );
        };
        $scope.previous = function(){
            Article.previous({index:$scope.index}).$promise.then(function(result){
                $log.log(result);
                $scope.current = result.Result;
                $scope.index = result.Index;
                $scope.count = result.Count;
            })
        };
        $scope.$watch(self.index,function(){
            $log.log('index change:'+self.index);
        })
        $scope.first();
        
        
    }]);
    
    services.service('Article',['$resource','EndPoints',function($resource,$end){
        return $resource($end.ARTICLE+'/:action/:id/',{id:'@_id'},{
            update:{
                method:'PUT'
            },
            first:{
                method:'GET',
                params:{
                    action:'First'
                }
            },
            last:{
                method:'GET',
                params:{
                    action:'Last'
                }
            },
            next:{
                method:'GET',
                params:{
                    action:'Next',
                }
            },
            previous:{
                method:'GET',
                params:{
                    action:'Previous',
                }
            },
            get:{
                method:'GET',
                
            }
        });
    }]);
    
  
})(window,angular);