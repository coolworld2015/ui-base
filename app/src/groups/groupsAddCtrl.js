(function () {
    'use strict';

    angular
        .module('app')
        .controller('GroupsAddCtrl', GroupsAddCtrl);

    GroupsAddCtrl.$inject = ['$state', '$rootScope', '$timeout', 'GroupsService', 'GroupsLocalStorage',
        'categories', 'CategoriesLocalStorage', 'CategoriesService'];

    function GroupsAddCtrl($state, $rootScope, $timeout, GroupsService, GroupsLocalStorage,
                           categories, CategoriesLocalStorage, CategoriesService) {
        var vm = this;
        var optionalCategory = {name: 'Select category'};

        angular.extend(vm, {
            init: init,
            updateChange: updateChange,
            groupsAddSubmit: groupsAddSubmit,
            _addItem: addItem,
            groupsAddBack: groupsAddBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.category = categories;
            vm.categoryOptions = [].concat(vm.category);
            vm.categoryOptions.unshift(optionalCategory);
            vm.categorySelectedItem = vm.categoryOptions[0];
            $rootScope.loading = false;
        }

        function updateChange(item) {
            vm.error = false;
            vm.categoryName = item.name;
            vm.categoryID = item.id;
        }

        function groupsAddSubmit() {
            if (vm.categorySelectedItem.name == 'Select category') {
                vm.error = true;
                return;
            }

            if (vm.form.$invalid) {
                return;
            }

            $rootScope.myError = false;
            $rootScope.loading = true;
			
			for (var i = 0; i < vm.category.length; i++) {
                if (vm.category[i].id == vm.categoryID) {
                    vm.category[i].groups.push(' ' + vm.name);
					
					if ($rootScope.mode == 'ON-LINE (Heroku)') {
					CategoriesService.editItem(vm.category[i])
						.then(function () {
						})
						.catch(errorHandler);
					} else {
						CategoriesLocalStorage.editItem(vm.category[i]);		
					}
					
                }
            }
			
            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                category: vm.categoryName,
                description: vm.description
            };

            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                GroupsService.addItem(item)
                    .then(function () {
                        addItem(item);
                        $rootScope.myError = false;
                        $state.go('groups');
                    })
                    .catch(errorHandler);
            } else {
                GroupsLocalStorage.addItem(item);
                $rootScope.loading = true;
                $timeout(function () {
                    $state.go('groups');
                }, 100);
            }
        }

        function addItem(item) {
            GroupsService.groups.push(item);
        }

        function groupsAddBack() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('groups');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();