(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoriesAddCtrl', CategoriesAddCtrl);

    CategoriesAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'CategoriesService', 'CategoriesLocalStorage'];

    function CategoriesAddCtrl($state, $rootScope, $timeout, CategoriesService, CategoriesLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            categoriesAddSubmit: categoriesAddSubmit,
            _addItem: addItem,
            categoriesAddBack: categoriesAddBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            $rootScope.loading = false;
        }

        function categoriesAddSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                groups: [],
                description: vm.description
            };

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                CategoriesService.addItem(item)
                    .then(function () {
                        addItem(item);
                        $rootScope.myError = false;
                        $state.go('categories');
                    })
                    .catch(errorHandler);
            } else {
                CategoriesLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('categories');
                }, 100);
            }
        }

        function addItem(item) {
            CategoriesService.categories.push(item);
        }

        function categoriesAddBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('categories');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();