(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, logger) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $q.when([{
                firstName: 'JD',
                lastName: 'Courtoy',
                age: 'Infinite',
                location: 'Murfreesboro, TN'
            }]);
        }
    }
})();
