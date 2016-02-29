(function (window,angular) {
    'use strict';
    var weberp = window.weberp;
    weberp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
         $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "partials/state1.html"
         })
         .state('home',{
             url:'/home',
             template:'<div>home</div>'
             
         });
        
    });
    
    
    weberp.controller('main',['$scope',function($scope){
        $scope.appTitle="Web Erp";
        $scope.appIcon='pagelines';
        $scope.menuSections=[{
                title:'GENERAL',
                menus:[
                     {
                        icon:'home',
                        text:'Accueil',
                        childs:[
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
                        text:'Forms',
                        childs:[
                            {
                                id:0,
                                text:'accueil 3',
                                state:'state1'
                            },
                            {
                                id:1,
                                text:'accueil 4',
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
                            text:'E-commerce',
                            label:{
                                variation:'success',
                                text:10
                            }
                            
                        },{
                            text:'Projects'
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
    }])
    
  
})(window,angular);