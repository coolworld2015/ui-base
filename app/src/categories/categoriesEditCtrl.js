(function () {
    'use strict';

    angular
        .module('app')
        .controller('CategoriesEditCtrl', CategoriesEditCtrl);

    CategoriesEditCtrl.$inject = ['$state', '$rootScope', '$timeout', 'CategoriesService', 'CategoriesLocalStorage', '$stateParams'];

    function CategoriesEditCtrl($state, $rootScope, $timeout, CategoriesService, CategoriesLocalStorage, $stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            categoriesSubmit: categoriesSubmit,
            _editItem: editItem,
            categoriesDialog: categoriesDialog,
            categoriesEditBack: categoriesEditBack,
            _errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('categories');
            }

            $rootScope.myError = false;
            $rootScope.loading = false;
            if (vm.groups) {
                vm.groups.sort();
            }
        }

        function categoriesSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.loading = true;
            $rootScope.myError = false;

            var item = {
                id: vm.id,
                name: vm.name,
                groups: vm.groups,
                description: vm.description
            };
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                CategoriesService.editItem(item)
                    .then(function () {
                        editItem(item);
                        $rootScope.myError = false;
                        $state.go('categories');
                    })
                    .catch(errorHandler);
            } else {
                CategoriesLocalStorage.editItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('categories');
                }, 100);
            }
        }

        function editItem(item) {
            var categories = CategoriesService.categories;
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].id == item.id) {
                    categories.splice(i, 1, item);
                    break;
                }
            }
        }

        function categoriesDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('categories-dialog', {item: obj});
            }, 100);
        }

        function categoriesEditBack() {
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