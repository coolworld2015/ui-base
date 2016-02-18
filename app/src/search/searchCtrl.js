(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$state', '$rootScope', '$timeout'];

    function SearchCtrl($state, $rootScope, $timeout) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            hideError: hideError,
            updateChange: updateChange,
            searchSubmit: searchSubmit,
            searchBack: searchBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.options = [
                {name: 'Search by phone'},
                {name: 'Search by name'}
            ];
            vm.search = 'Search by phone';
            vm.selectedItem = vm.options[0];
            $rootScope.loading = false;
        }

        function hideError() {
            vm.minLengthError = false;
        }
        
        function updateChange(item) {
            vm.error = false;
            vm.search = item.name;
        }

        function searchSubmit() {
            if (vm.form.$invalid) {
                return;
            }
            console.log(vm.name.length);
            if (vm.name.length < 3) {
                vm.minLengthError = true;
                return;
            }
            $rootScope.loading = true;
            $rootScope.error = false;
            $state.go('search-results', {name: vm.name, search: vm.search, finds: true});
        }

        function searchBack() {
            $rootScope.myError = false;
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('main');
            }, 100);
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }
    }
})();