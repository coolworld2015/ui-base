(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientsEditCtrl', ClientsEditCtrl);

    ClientsEditCtrl.$inject = ['$scope', '$state', '$rootScope', '$timeout', 'ClientsService', 'ClientsLocalStorage', '$stateParams'];

    function ClientsEditCtrl($scope, $state, $rootScope, $timeout, ClientsService, ClientsLocalStorage, $stateParams) {
        $scope.convertPicToJSON = convertPicToJSON;
        var vm = this;

        angular.extend(vm, {
			init: init,
            convertPicToJSON: convertPicToJSON,
            openPic: openPic,
            clientsSubmit: clientsSubmit,
			_editItem: editItem,
            clientsDialog: clientsDialog,
            clientsEditBack: clientsEditBack,
            _errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            if ($stateParams.item.name == undefined) {
                $state.go('clients');
            }

			if ($stateParams.item.pic == 'blank') {
				vm.pic = $rootScope.noImage;
			}			
            $rootScope.myError = false;
            $rootScope.loading = false;
        }
		
        function convertPicToJSON() {
            var fileInput = document.getElementById("picFileInput");
            var files = fileInput.files;
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function () {
                $scope.$apply(function () {
                    vm.pic = reader.result;
                });
            };
            reader.readAsDataURL(file);
        }

        function openPic() {
			$rootScope.loading = true;

		    $timeout(function () {
				window.open(vm.pic);
			}, 100);
			
			$timeout(function () {
				$rootScope.loading = false;
			}, 3000);
        }

        function clientsSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $rootScope.loading = true;
            $rootScope.myError = false;

            var item = {
                id: vm.id,
                name: vm.name,
                pic: vm.pic,
                description: vm.description
            };
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                ClientsService.editItem(item)
                    .then(function () {
						editItem(item);
                        $rootScope.myError = false;
                        $state.go('clients');
                    })
                    .catch(errorHandler);
            } else {
				try {
					ClientsLocalStorage.editItem(item);
					$rootScope.loading = true;
					$timeout(function () {
						$state.go('clients');
					}, 100);
				} catch(e) {
					errorHandler();
					alert(e);
				}	
            }
        }
		
        function editItem(item) {
            var clients = ClientsService.clients;
            for (var i = 0; i < clients.length; i++) {
                if (clients[i].id == item.id) {
                    clients.splice(i, 1, item);
                    break;
                }
            }
        }
		
        function clientsDialog() {
            var obj = {
                id: vm.id,
                name: vm.name
            };
			$rootScope.loading = true;
			$timeout(function () {
				$state.go('clients-dialog', {item: obj});
			}, 100);				
        }

        function clientsEditBack() {
			$rootScope.myError = false;
            $rootScope.loading = true;
			$timeout(function () {
				$state.go('clients');
			}, 100);			
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();