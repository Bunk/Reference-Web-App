(function () {
    'use strict';
    angular.module('TempoSPA')
    .factory('notificationService', function ($rootScope, $timeout, growlNotifications) {
        var timer = {},
            removeGrowl = function () {
                $rootScope.growls.splice( 0, 1 );
            };

        return {
            notify: function ( text, state ) {
                $rootScope.growls.push( { state: state, text: text } );
                timer = $timeout(function () {
                    removeGrowl();
                }, 7500);
            }
        };
    });
})();
