(function (window,angular) {
    'use strict';
    var weberp = window.weberp;
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
                     templateUrl:$partials.ARTICLE_LIST_MASTER,
                     controller:'ArticleListMasterController'
                 },
                 detail:{
                     template:'<div>DETAIL</div>'
                 }
             }
         })
         ;
        console.dir($partials);
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
    
    weberp.controller('ArticleListMasterController',['$scope',function($scope){
        
    }])
    
  
})(window,angular);