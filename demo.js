(function (window,angular) {
    'use strict';
    var weberp = window.weberp;
    weberp.controller('main',['$scope',function($scope){
        $scope.title="TITRE";
        
        $scope.items=[
            {
                icon:'home',
                text:'Accueil',
                items:[
                    {
                        text:'accueil 1',
                        state:'state1'
                    },
                    {
                        text:'accueil 2',
                        link:'state2'
                    },
                ]
            },
            {
                icon:'edit',
                text:'Forms'
            }
        ];
    }])
    
  
})(window,angular);