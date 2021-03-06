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
    var mod = ng.module('categoryModule', ['ngCrud', 'ui.router']);

    mod.constant('categoryModel', {
        name: 'category',
        displayName: 'Categoria',
        url: 'categorys',
        fields: {
            description: {
                
                displayName: 'Descripcion',
                type:  'String',
                required: true 
            },
            modality: {
                
                displayName: 'Modalidad',
                type:  'String',
                required: true 
            },
            weight: {
                
                displayName: 'Peso',
                type:  'String',
                required: true 
            },
            name: {
                
                displayName: 'Nombre',
                type:  'String',
                required: true 
            }        }
    });

    mod.config(['$stateProvider',
        function($sp){
            var basePath = 'src/modules/category/';
            var baseInstancePath = basePath + 'instance/';

            $sp.state('category', {
                url: '/categorys?page&limit',
                abstract: true,
                
                views: {
                     mainView: {
                        templateUrl: basePath + 'category.tpl.html',
                        controller: 'categoryCtrl'
                    }
                },
                resolve: {
                    model: 'categoryModel',
                    categorys: ['Restangular', 'model', '$stateParams', function (r, model, $params) {
                            return r.all(model.url).getList($params);
                        }]
                }
            });
            $sp.state('categoryList', {
                url: '/list',
                parent: 'category',
                views: {
                     categoryView: {
                        templateUrl: basePath + 'list/category.list.tpl.html',
                        controller: 'categoryListCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                 resolve:{
				   model: 'categoryModel'
					},
                 ncyBreadcrumb: {
                   label: 'category'
                    }
            });
            $sp.state('categoryNew', {
                url: '/new',
                parent: 'category',
                views: {
                    categoryView: {
                        templateUrl: basePath + 'new/category.new.tpl.html',
                        controller: 'categoryNewCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                  resolve:{
						model: 'categoryModel'
					},
                  ncyBreadcrumb: {
                        parent :'categoryList', 
                        label: 'new'
                   }
            });
            $sp.state('categoryInstance', {
                url: '/{categoryId:int}',
                abstract: true,
                parent: 'category',
                views: {
                    categoryView: {
                        template: '<div ui-view="categoryInstanceView"></div>'
                    }
                },
                resolve: {
                    category: ['categorys', '$stateParams', function (categorys, $params) {
                            return categorys.get($params.categoryId);
                        }]
                }
            });
            $sp.state('categoryDetail', {
                url: '/details',
                parent: 'categoryInstance',
                views: {
                    categoryInstanceView: {
                        templateUrl: baseInstancePath + 'detail/category.detail.tpl.html',
                        controller: 'categoryDetailCtrl'
                    }
                },
                  resolve:{
						model: 'categoryModel'
					},
                  ncyBreadcrumb: {
                        parent :'categoryList', 
                        label: 'details'
                    }
            });
            $sp.state('categoryEdit', {
                url: '/edit',
                sticky: true,
                parent: 'categoryInstance',
                views: {
                    categoryInstanceView: {
                        templateUrl: baseInstancePath + 'edit/category.edit.tpl.html',
                        controller: 'categoryEditCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                  resolve:{
						model: 'categoryModel'
					},
                  ncyBreadcrumb: {
                        parent :'categoryDetail', 
                        label: 'edit'
                    }
            });
            $sp.state('categoryDelete', {
                url: '/delete',
                parent: 'categoryInstance',
                views: {
                    categoryInstanceView: {
                        templateUrl: baseInstancePath + 'delete/category.delete.tpl.html',
                        controller: 'categoryDeleteCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                  resolve:{
				      model: 'categoryModel'
					}
            });
            $sp.state('categoryBicycle', {
                url: '/bicycle',
                parent: 'categoryDetail',
                abstract: true,
                views: {
                    categoryChieldView: {
                        template: '<div ui-view="categoryBicycleView"></div>'
                    }
                },
                resolve: {
                     
                    bicycle: ['category', function (category) {
                            return category.getList('bicycle');
                        }],
                    model: 'bicycleModel'
                }
            });
            $sp.state('categoryBicycleList', {
                url: '/list',
                parent: 'categoryBicycle',
                views: {
                    categoryBicycleView: {
                        templateUrl: baseInstancePath + 'bicycle/list/category.bicycle.list.tpl.html',
                        controller: 'categoryBicycleListCtrl'
                    }
                }
            });
            $sp.state('categoryBicycleEdit', {
                url: '/edit',
                parent: 'categoryBicycle',
                views: {
                    categoryBicycleView: {
                        templateUrl: baseInstancePath + 'bicycle/edit/category.bicycle.edit.tpl.html',
                        controller: 'categoryBicycleEditCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                resolve: {
                    model: 'bicycleModel',
                    pool: ['Restangular', 'model', function (r, model) {
                            return r.all(model.url).getList();
                        }]
                }
            });
	}]);
})(window.angular);
