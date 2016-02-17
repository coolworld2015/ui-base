(function () {
    'use strict';

    angular
        .module('app')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$scope', '$rootScope', '$state', '$http', '$timeout',
        'UsersLocalStorage', 'CategoriesLocalStorage', 'GroupsLocalStorage', 'ClientsLocalStorage', 'ItemsLocalStorage'];

    function ConfigCtrl($scope, $rootScope, $state, $http, $timeout,
                        UsersLocalStorage, CategoriesLocalStorage, GroupsLocalStorage, ClientsLocalStorage, ItemsLocalStorage) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            toggleMode: toggleMode,
            doAction: doAction,
            _getAllHeroku: getAllHeroku,
            _getUsersHeroku: getUsersHeroku,
            _getGroupsHeroku: getGroupsHeroku,
            _getCategoriesHeroku: getCategoriesHeroku,
            _getClientsHeroku: getClientsHeroku,
            _getItemsHeroku: getItemsHeroku,
            _loading: loading,
            _error: error,
            _complete: complete,
            toMain: toMain
        });

        init();

        function init() {
            vm.webUrl = $rootScope.myConfig.webUrl;
            vm.mode = $rootScope.mode;
            $rootScope.myError = false;
            $rootScope.loading = false;

            vm.options = [
                {name: 'Select transaction', value: 'none'},
                {name: 'Get all transactions', value: 'heroku.get.all'},
                {name: 'Get users (Heroku)', value: 'heroku.users.get'},
                {name: 'Get groups (Heroku)', value: 'heroku.groups.get'},
                {name: 'Get categories (Heroku)', value: 'heroku.categories.get'},
                {name: 'Get contacts (Heroku)', value: 'heroku.clients.get'},
                {name: 'Get items (Heroku)', value: 'heroku.items.get'}
            ];
            vm.selectedItem = vm.options[0];
        }

        function toggleMode() {
            if (vm.mode == 'OFF-LINE (LocalStorage)') {
                vm.mode = 'ON-LINE (Heroku)';
                $rootScope.mode = 'ON-LINE (Heroku)';
            } else {
                vm.mode = 'OFF-LINE (LocalStorage)';
                $rootScope.mode = 'OFF-LINE (LocalStorage)';
            }
            localStorage.setItem('ui-collection.mode', JSON.stringify(vm.mode));
            toMain();
        }

        function doAction() {
            loading();

            switch (vm.selectedItem.value) {
                case 'none':
                {
                    error();
                    break;
                }

                case 'heroku.get.all':
                {
                    getAllHeroku();
                    break;
                }

                case 'heroku.users.get':
                {
                    getUsersHeroku();
                    break;
                }

                case 'heroku.groups.get':
                {
                    getGroupsHeroku();
                    break;
                }

                case 'heroku.categories.get':
                {
                    getCategoriesHeroku();
                    break;
                }

                case 'heroku.clients.get':
                {
                    getClientsHeroku();
                    break;
                }

                case 'heroku.items.get':
                {
                    getItemsHeroku();
                    break;
                }
            }
        }

        function getAllHeroku() {
            $rootScope.loading = true;

            var url = vm.webUrl + 'api/items/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        ItemsLocalStorage.uploadItems(results.data);

                        var url = vm.webUrl + 'api/clients/get';
                        $http.get(url)
                            .then(function (results) {
                                try {
                                    ClientsLocalStorage.uploadClients(results.data);

                                    var url = vm.webUrl + 'api/categories/get';
                                    $http.get(url)
                                        .then(function (results) {
                                            try {
                                                CategoriesLocalStorage.uploadCategories(results.data);

                                                var url = vm.webUrl + 'api/groups/get';
                                                $http.get(url)
                                                    .then(function (results) {
                                                        try {
                                                            GroupsLocalStorage.uploadGroups(results.data);

                                                            var url = vm.webUrl + 'api/users/get';
                                                            $http.get(url)
                                                                .then(function (results) {
                                                                    try {
                                                                        UsersLocalStorage.uploadUsers(results.data);
                                                                        complete();
                                                                    } catch (e) {
                                                                        error();
                                                                        alert(e);
                                                                    }
                                                                })
                                                                .catch(function () {
                                                                    error();
                                                                });

                                                        } catch (e) {
                                                            error();
                                                            alert(e);
                                                        }
                                                    })
                                                    .catch(function () {
                                                        error();
                                                    });

                                            } catch (e) {
                                                error();
                                                alert(e);
                                            }
                                        })
                                        .catch(function () {
                                            error();
                                        });

                                } catch (e) {
                                    error();
                                    alert(e);
                                }
                            })
                            .catch(function () {
                                error();
                            });

                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function getUsersHeroku() {
            $rootScope.loading = true;
            var url = vm.webUrl + 'api/users/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        UsersLocalStorage.uploadUsers(results.data);
                        complete();
                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function getGroupsHeroku() {
            $rootScope.loading = true;
            var url = vm.webUrl + 'api/groups/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        GroupsLocalStorage.uploadGroups(results.data);
                        complete();
                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function getCategoriesHeroku() {
            $rootScope.loading = true;
            var url = vm.webUrl + 'api/categories/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        CategoriesLocalStorage.uploadCategories(results.data);
                        complete();
                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function getClientsHeroku() {
            $rootScope.loading = true;
            var url = vm.webUrl + 'api/clients/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        ClientsLocalStorage.uploadClients(results.data);
                        complete();
                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function getItemsHeroku() {
            $rootScope.loading = true;
            var url = vm.webUrl + 'api/items/get';
            $http.get(url)
                .then(function (results) {
                    try {
                        ItemsLocalStorage.uploadItems(results.data);
                        complete();
                    } catch (e) {
                        error();
                        alert(e);
                    }
                })
                .catch(function () {
                    error();
                });
        }

        function loading() {
            $rootScope.loading = true;
            $rootScope.myError = false;
            vm.complete = false;
            vm.error = false;
            vm.loading = true;
        }

        function error() {
            vm.complete = false;
            vm.loading = false;
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function complete() {
			$rootScope.loading = false;
            vm.error = false;
            vm.loading = false;
            vm.complete = true;
        }

        function toMain() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('main');
            }, 100);
        }
    }
})();

