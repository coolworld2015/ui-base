(function () {
    'use strict';

    angular
        .module('app')
        .factory('CategoriesService', CategoriesService);

    CategoriesService.$inject = ['$rootScope', '$http'];

    function CategoriesService($rootScope, $http) {
        var webUrl = $rootScope.myConfig.webUrl;

        return {
            categories: [],
            getCategories: getCategories,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            findCategory: findCategory,
            _sort: sort
        };

        function getCategories() {
            var url = webUrl + 'api/categories/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }

        function addItem(item) {
            var url = webUrl + 'api/categories/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function editItem(item) {
            var url = webUrl + 'api/categories/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/categories/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function findCategory(id) {
            var url = webUrl + 'api/categories/find';
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
