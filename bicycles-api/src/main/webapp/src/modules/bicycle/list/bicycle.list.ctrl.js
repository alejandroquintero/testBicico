/*
 The MIT License (MIT)
 
 Copyright (c) 2015 Los Andes University
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function (ng) {

  var mod = ng.module("bicycleModule");

  mod.controller("bicycleListCtrl", ["$scope", '$state', 'bicycles', '$stateParams', 'model',
    function ($scope, $state, bicycles, $params, model) {
      $scope.model = model;
      $scope.records = bicycles;
      $scope.buttons = ['none'];
      $scope.photos = [];

      //Paginación
      this.itemsPerPage = $params.limit;
      this.currentPage = $params.page;
      this.totalItems = bicycles.totalRecords;

      this.loadPhotos = function () {
        for (var i = 0; i < $scope.records.length; i++) {
          $scope.records[i].getList('photoAlbum').then(function(photos){
            var image = photos.plain()[Math.floor((Math.random()*photos.plain().length))];
            if(image){
              $scope.photos.push({image: image.image, id: image.bicycle.id});
            }
          });
        }
      };

      this.loadPhotos();

      this.pageChanged = function () {
        $state.go('bicycleList', {page: this.currentPage});
      };

      $scope.actions = {
        create: {
          displayName: 'Create',
          icon: 'plus',
          fn: function () {
            $state.go('bicycleNew');
          }
        },
        refresh: {
          displayName: 'Refresh',
          icon: 'refresh',
          fn: function () {
            $state.reload();
          }
        }};
      $scope.recordActions = {
        detail: {
          displayName: 'Detail',
          icon: 'eye-open',
          fn: function (rc) {
            $state.go('bicycleDetail', {bicycleId: rc.id});
          },
          show: function () {
            return true;
          }
        },
        edit: {
          displayName: 'Edit',
          icon: 'edit',
          fn: function (rc) {
            $state.go('bicycleEdit', {bicycleId: rc.id});
          },
          show: function () {
            return true;
          }
        },
        delete: {
          displayName: 'Delete',
          icon: 'minus',
          fn: function (rc) {
            $state.go('bicycleDelete', {bicycleId: rc.id});
          },
          show: function () {
            return true;
          }
        }
      };
    }]);
})(window.angular);
