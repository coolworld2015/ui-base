(function () {
    'use strict';

    angular
        .module('app')
        .factory('GroupsLocalStorage', GroupsLocalStorage);

    function GroupsLocalStorage() {
        return {
            groups: [],
            numPerPage: 10,

            getGroups: getGroups,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
            setGroups: setGroups,

            uploadGroups: uploadGroups,
            _sort: sort
        };

        function getGroups() {
            if (GroupsLocalStorage.groups === undefined) {
                var groups = localStorage.getItem('ui-collection.groups');
                groups = JSON.parse(groups);
                GroupsLocalStorage.groups = groups;
            }

            if (GroupsLocalStorage.groups === null) {
                GroupsLocalStorage.groups = [];
            }

            return GroupsLocalStorage.groups.sort(sort);
        }

        function addItem(item) {
            GroupsLocalStorage.groups.push(item);
            setGroups();
        }

        function editItem(item) {
            var groups = GroupsLocalStorage.groups;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].id == item.id) {
                    groups.splice(i, 1, item);
                    setGroups();
                    break;
                }
            }
        }

        function deleteItem(id) {
            var groups = GroupsLocalStorage.groups;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].id == id) {
                    groups.splice(i, 1);
                    setGroups();
                    break;
                }
            }
        }

        function setGroups() {
            localStorage.setItem('ui-collection.groups', JSON.stringify(GroupsLocalStorage.groups));
        }

        function uploadGroups(groups) {
            localStorage.setItem('ui-collection.groups', JSON.stringify(groups));
            GroupsLocalStorage.groups = undefined;
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
