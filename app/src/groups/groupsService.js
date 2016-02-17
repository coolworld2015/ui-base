(function () {
    'use strict';

    angular
        .module('app')
        .factory('GroupsService', GroupsService);

    GroupsService.$inject = ['$rootScope', '$http'];

    function GroupsService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            groups: [],
            getGroups: getGroups,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            findGroup: findGroup,
            _sort: sort
        };

        function getGroups() {
            var url = webUrl + 'api/groups/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }

        function addItem(item) {
            var url = webUrl + 'api/groups/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/groups/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/groups/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function findGroup(id) {
            var url = webUrl + 'api/groups/find';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }
    }
})();
