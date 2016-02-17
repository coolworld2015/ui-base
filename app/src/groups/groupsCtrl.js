(function () {
    'use strict';

    angular
        .module('app')
        .controller('GroupsCtrl', GroupsCtrl);

    GroupsCtrl.$inject = ['$scope', '$rootScope', '$state', '$timeout', 'groups'];

    function GroupsCtrl($scope, $rootScope, $state, $timeout, groups) {
        $scope.$watch('numPerPage', currentPage);
        $scope.$watch('currentPage', currentPage);
        var vm = this;

        angular.extend(vm, {
            init: init,
            currentPage: currentPage,
            groupsEditForm: groupsEditForm,
            groupsAdd: groupsAdd,
            goToBack: goToBack,
            goToHead: goToHead,
            groupsBack: groupsBack,
            _errorHandler: errorHandler
        });

        $timeout(function () {
            window.scrollTo(0, 0);
        });

        init();

        function init() {
            vm.title = 'Groups';
            vm.groups = groups;
            vm.groupsFilter = [];

            $scope.currentPage = 1;
            $scope.numPerPage = 10;
            $scope.maxSize = 5;

            $rootScope.myError = false;
            $rootScope.loading = false;
        }

        function currentPage() {
            if (Object.prototype.toString.call(vm.groups) == '[object Array]') {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = parseInt(begin) + parseInt($scope.numPerPage);
                $scope.filteredGroups = vm.groups.slice(begin, end);
                $scope.totalItems = vm.groups.length;
            }
        }

        function groupsEditForm(item) {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('groups-edit', {item: item});
            }, 100);
        }

        function groupsAdd() {
            $rootScope.loading = true;
            $timeout(function () {
                $state.go('groups-add');
            }, 100);
        }

        function goToBack() {
            $scope.$broadcast('scrollHere');
        }

        function goToHead() {
            $scope.$broadcast('scrollThere');
        }

        function groupsBack() {
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