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
                                state:'state1'
                            },
                            {
                                id:1,
                                text:'temp',
                                link:'state2'
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
        $scope.current=Article.first();
        $scope.index=0;
        $scope.next = function(){
            
            $scope.current=Article.next({index:$scope.index+1}).$promise.then(
                function(result){
                    $log.log(result);
                }
            );
        }
    }]);
    
    services.service('Article',['$resource','EndPoints',function($resource,$end){
        return $resource($end.ARTICLE+'/:action/:id/:index',{id:'@_id',index:'@_index'},{
            update:{
                method:'PUT'
            },
            first:{
                method:'GET',
                params:{
                    action:'First'
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
                    action:'Previous'
                }
            }
        });
    }]);
    
  
})(window,angular);