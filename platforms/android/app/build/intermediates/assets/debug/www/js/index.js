/// <reference path="" />
var app = angular.module('app', ['ngRoute', 'ngAnimate']);




//Routing

app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
    .when('/', {
        templateUrl: 'views/main.html',
    }).when('/news', {
        templateUrl: 'views/news.html',
    }).when('/map', {
        templateUrl: 'views/map.html',
    }).when('/eve', {
        templateUrl: 'views/events.html',
    }).when('/sal', {
        templateUrl: 'views/shop.html',
    });

    $routeProvider.otherwise({ redirectTo: "/" });

});

//Page Controllers
(function () {
    'use strict';

    app.controller('MainController', MainController);
    MainController.$inject = ['$scope', '$location', '$timeout'];

    function MainController($scope, $location, $timeout) {
        var vm = this;
        vm.title = "News";
        vm.pageTitle = "Auerfarm Mobile";
        vm.map = false;
        vm.part = false;
        vm.back = false;
        vm.infoWindow = false;
        vm.slide = false;//'slideDown';
        vm.quickClose = false;

        function titleChange(input) {
            vm.pageTitle = input;
        };

        vm.showMap = function () {
            vm.map = true;
            vm.back = true;
        }

        vm.hideMap = function () {
            vm.map = false;
        }

        vm.showPart = function () {
            vm.part = true;
        }

        vm.hidePart = function () {
            vm.part = false;
        }

        vm.showBack = function () {
            vm.back = true;
        }

        vm.hideBack = function () {
            vm.back = false;
        }

        vm.changeView = function (view) {
            $location.path(view); // path not hash
        }

        vm.iconSelect = function (view) {
            $location.path(view); // path not hash
            vm.part = true;
            vm.back = true;
        }


        vm.backToMenu = function () {
            vm.map = false;
            vm.back = false;
            vm.part = false;
            vm.closeInfoWindow();
        }

        vm.openInsta = function() {
            var url = 'https://www.instagram.com/auerfarm/';
            var target = '_blank';
            var options = "location=yes"
            var ref = cordova.InAppBrowser.open(url, target, options);

            ref.addEventListener('loadstart', loadstartCallback);
            ref.addEventListener('loadstop', loadstopCallback);
            ref.addEventListener('loadloaderror', loaderrorCallback);
            ref.addEventListener('exit', exitCallback);

            function loadstartCallback(event) {
                console.log('Loading started: ' + event.url)
            }

            function loadstopCallback(event) {
                console.log('Loading finished: ' + event.url)
            }

            function loaderrorCallback(error) {
                console.log('Loading error: ' + error.message)
            }

            function exitCallback() {
                console.log('Browser is closed...')
            }
        }

        vm.openFB = function () {
            var url = 'https://www.facebook.com/auerfarm.org/?ref=br_rs';
            var target = '_blank';
            var options = "location=yes"
            var ref = cordova.InAppBrowser.open(url, target, options);

            ref.addEventListener('loadstart', loadstartCallback);
            ref.addEventListener('loadstop', loadstopCallback);
            ref.addEventListener('loadloaderror', loaderrorCallback);
            ref.addEventListener('exit', exitCallback);

            function loadstartCallback(event) {
                console.log('Loading started: ' + event.url)
            }

            function loadstopCallback(event) {
                console.log('Loading finished: ' + event.url)
            }

            function loaderrorCallback(error) {
                console.log('Loading error: ' + error.message)
            }

            function exitCallback() {
                console.log('Browser is closed...')
            }
        }

        vm.showInfoWindow = function (marker) {
            vm.quickClose = false;
            vm.infoWindow = true;
            //vm.toggleContent = true;
            vm.slide = true;//'slideUp';
            vm.MapInfoName = marker.Name;
            vm.MapInfoDescription = marker.Description;
            $scope.$apply();
        }

        vm.hideInfoWindow = function () {
            vm.infoWindow = false;
            vm.slide = false;//'slideDown';
            $scope.$apply();
        }

        // No animation to prevent overlap when going back to menu
        vm.closeInfoWindow = function () {
            vm.quickClose = true;
            vm.infoWindow = false;
            vm.slide = false;//'slideDown';
           //$scope.$apply();
        }

    }
})();

(function () {
    'use strict';

    app.controller('NewsController', NewsController);

    app.filter("jsDate", function () {
        return function (x) {
            return new Date(parseInt(x.substr(6)));
        };
    });

    NewsController.$inject = ['$scope', '$http'];

    function NewsController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "News";
        vm.showAll = true;

        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "news" }
        }).then(function mySucces(response) {
            vm.newsItems = response.data;
        }, function myError(response) {
        });

        _.each(vm.newsItems, function (story) {
            story.showFull = false;
        });

        vm.toggleStory = function (story) {
            story.showFull = !story.showFull;
            vm.showAll = !vm.showAll;
        };

        vm.loadCheck = function () {
            if (document.readyState === "complete") {
                vm.isLoaded = true;
            };
        };
        vm.loadCheck();
    }
})();

(function () {
    'use strict';

    app.controller('MapController', MapController);

    app.filter("jsDate", function () {
        return function (x) {
            return new Date(parseInt(x.substr(6)));
        };
    });

    MapController.$inject = ['$scope'];

    function MapController($scope) {
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    }

})();

(function () {
    'use strict';

    app.controller('EventsController', EventsController);

    app.filter("jsDate", function () {
        return function (x) {
            return new Date(parseInt(x.substr(6)));
        };
    });

    EventsController.$inject = ['$scope', '$http'];

    function EventsController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "Events";
        vm.showAll = true;
        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "calendar" }
        }).then(function mySucces(response) {
            vm.events = response.data;
        }, function myError(response) {
        });

        _.each(vm.events, function (story) {
            story.showFull = false;
        });

        vm.toggleStory = function (story) {
            story.showFull = !story.showFull;
            vm.showAll = !vm.showAll;
        };

        vm.loadCheck = function () {
            if (document.readyState === "complete") {
                vm.isLoaded = true;
            };
        };
        vm.loadCheck();
    }


})();

(function () {
    'use strict';

    app.controller('ShopController', ShopController);

    app.filter("jsDate", function () {
        return function (x) {
            return new Date(parseInt(x.substr(6)));
        };
    });

    ShopController.$inject = ['$scope', '$http'];

    function ShopController($scope, $http) {
        var vm = this;
        vm.isLoaded = false;
        vm.title = "Shop";
        vm.showAll = true;
        $http({
            url: "http://localhost:50409/Api/Data",
            method: "GET",
            params: { type: "shop" }
        }).then(function mySucces(response) {
            vm.saleItems = response.data;
        }, function myError(response) {
        });

        _.each(vm.saleItems, function (story) {
            story.showFull = false;
        });

        vm.toggleStory = function (story) {
            story.showFull = !story.showFull;
            vm.showAll = !vm.showAll;
        };

        vm.loadCheck = function () {
            if (document.readyState === "complete") {
                vm.isLoaded = true;
            };
        };
        vm.loadCheck();
    }


})();