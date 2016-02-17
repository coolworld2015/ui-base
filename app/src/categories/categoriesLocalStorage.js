(function () {
    'use strict';

    angular
        .module('app')
        .factory('CategoriesLocalStorage', CategoriesLocalStorage);

    function CategoriesLocalStorage() {
        return {
            categories: [],
            numPerPage: 10,

            getCategories: getCategories,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setCategories: setCategories,

            uploadCategories: uploadCategories,
            _sort: sort
        };

        function getCategories() {
            if (CategoriesLocalStorage.categories === undefined) {
                var categories = localStorage.getItem('ui-collection.categories');
                categories = JSON.parse(categories);
                CategoriesLocalStorage.categories = categories;
            }

            if (CategoriesLocalStorage.categories === null) {
                CategoriesLocalStorage.categories = [];
            }

            return CategoriesLocalStorage.categories.sort(sort);
        }

        function addItem(item) {
            CategoriesLocalStorage.categories.push(item);
            setCategories();
        }

        function editItem(item) {
            var categories = CategoriesLocalStorage.categories;
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].id == item.id) {
                    categories.splice(i, 1, item);
                    setCategories();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var categories = CategoriesLocalStorage.categories;
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].id == id) {
                    categories.splice(i, 1);
                    setCategories();
                    break;
                }
            }
        }

        function setCategories() {
            localStorage.setItem('ui-collection.categories', JSON.stringify(CategoriesLocalStorage.categories));
        }

        function uploadCategories(categories) {
            localStorage.setItem('ui-collection.categories', JSON.stringify(categories));
            CategoriesLocalStorage.categories = undefined;
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
