/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2014 Webapplayers.com
 *
 * Main directives.js file
 * Define directives for used plugin
 *
 *
 * Functions (directives)
 *  - pageTitle
 *  - sideNavigation
 *  - iboxTools
 *  - minimalizaSidebar
 *  - vectorMap
 *  - morrisArea
 *  - morrisBar
 *  - morrisLine
 *  - morrisDonut
 *  - sparkline
 *  - icheck
 *  - ionRangeSlider
 *  - dropZone
 *  - fancyBox
 *  - responsiveVideo
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'Clinic | Responsive Admin Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'Clinic | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            element.metisMenu();
        }
    };
};

/**
 * responsibleVideo - Directive for responsive video
 */
function responsiveVideo() {
    return {
        restrict: 'A',
        link:  function(scope, element) {
            var figure = element;
            var video = element.children();
            video
                .attr('data-aspectRatio', video.height() / video.width())
                .removeAttr('height')
                .removeAttr('width')

            //We can use $watch on $window.innerWidth also.
            $(window).resize(function() {
                var newWidth = figure.width();
                video
                    .width(newWidth)
                    .height(newWidth * video.attr('data-aspectRatio'));
            }).resize();
        }
    }
}

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
};
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}


/**
 * minimalizaSidebar - Directive for minimalize sidebar
*/
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};

/**
 * vectorMap - Directive for Vector map plugin
 */
function vectorMap() {
    return {
        restrict: 'A',
        scope: {
            myMapData: '=',
        },
        link: function (scope, element, attrs) {
            element.vectorMap({
                map: 'world_mill_en',
                backgroundColor: "transparent",
                regionStyle: {
                    initial: {
                        fill: '#e4e4e4',
                        "fill-opacity": 0.9,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 0
                    }
                },
                series: {
                    regions: [
                        {
                            values: scope.myMapData,
                            scale: ["#1ab394", "#22d6b1"],
                            normalizeFunction: 'polynomial'
                        }
                    ]
                },
            });
        }
    }
}


/**
 * morrisArea - Directive for Morris chart - type Area
 */
function morrisArea() {
    return {
        restrict: 'A',
        scope: {
            chartOptions: '='
        },
        link: function(scope, element, attrs) {
            var chartDetail = scope.chartOptions;
            chartDetail.element = attrs.id;
            var chart = new Morris.Area(chartDetail);
            return chart;
        }
    }
}

/**
 * morrisBar - Directive for Morris chart - type Bar
 */
function morrisBar() {
    return {
        restrict: 'A',
        scope: {
            chartOptions: '='
        },
        link: function(scope, element, attrs) {
            var chartDetail = scope.chartOptions;
            chartDetail.element = attrs.id;
            var chart = new Morris.Bar(chartDetail);
            return chart;
        }
    }
}

/**
 * morrisLine - Directive for Morris chart - type Line
 */
function morrisLine() {
    return {
        restrict: 'A',
        scope: {
            chartOptions: '='
        },
        link: function(scope, element, attrs) {
            var chartDetail = scope.chartOptions;
            chartDetail.element = attrs.id;
            var chart = new Morris.Line(chartDetail);
            return chart;
        }
    }
}

/**
 * morrisDonut - Directive for Morris chart - type Donut
 */
function morrisDonut() {
    return {
        restrict: 'A',
        scope: {
            chartOptions: '='
        },
        link: function(scope, element, attrs) {
            var chartDetail = scope.chartOptions;
            chartDetail.element = attrs.id;
            var chart = new Morris.Donut(chartDetail);
            return chart;
        }
    }
}

/**
 * sparkline - Directive for Sparkline chart
 */
function sparkline() {
    return {
        restrict: 'A',
        scope: {
            sparkData: '=',
            sparkOptions: '=',
        },
        link: function (scope, element, attrs) {
            scope.$watch(scope.sparkData, function () {
                render();
            });
            scope.$watch(scope.sparkOptions, function(){
                render();
            });
            var render = function () {
                $(element).sparkline(scope.sparkData, scope.sparkOptions);
            };
        }
    }
};

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 * ionRangeSlider - Directive for Ion Range Slider
 */
function ionRangeSlider() {
    return {
        restrict: 'A',
        scope: {
            rangeOptions: '='
        },
        link: function (scope, elem, attrs) {
            elem.ionRangeSlider(scope.rangeOptions);
        }
    }
}

/**
 * dropZone - Directive for Drag and drop zone file upload plugin
 */
function dropZone() {
    return function(scope, element, attrs) {
        element.dropzone({
            url: "/upload",
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 5,
            init: function() {
                scope.files.push({file: 'added'});
                this.on('success', function(file, json) {
                });
                this.on('addedfile', function(file) {
                    scope.$apply(function(){
                        alert(file);
                        scope.files.push({file: 'added'});
                    });
                });
                this.on('drop', function(file) {
                    alert('file');
                });
            }
        });
    }
}

/**
 * fancyBox - Directive for Fancy Box plugin used in simple gallery view
 */
function fancyBox() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.fancybox({
                openEffect	: 'none',
                closeEffect	: 'none'
            });
        }
    }
}


/* Added 30-10-2015*/
    function closeOffCanvas() {
    return {
        restrict: 'A',
        template: '<a class="close-canvas-menu" ng-click="closeOffCanvas()"><i class="fa fa-times"></i></a>',
        controller: function ($scope, $element) {
            $scope.closeOffCanvas = function () {
                $("body").toggleClass("mini-navbar");
            }
        }
    };
    };

    function selectClinic(clinicResource) {
        return {
            restrict: 'E',
           // scope: { myDirectiveVar: '@' },
            //require: 'ngModel',
            //'<input ng-model="clientId">'
            template: '<select ng-model="clinicId" ng-options="c.name for c in clinics track by c.value" class="form-control"></select>',
            replace: true,
            
            
            link: function (scope, elem, attrs) {
                
                //Get doctor Id from attr
                var doctorId = attrs.doctorId;
                console.log(doctorId);
                // Get doctor's clinics by doctor Id 
                clinicResource.doctor.get({ id: doctorId }).$promise.then(function (data) {
                    scope.clinics = [];
                    // push clinics to select option
                    angular.forEach(data, function (value, key) {
                        scope.clinics.push({
                            name: value.name,
                            value: value.id
                        });
                        // Select first option By default
                        scope.clinicId = scope.clinics[0];
                    });
                }, function (err) { alert("An error occured !"); });

            }
        };
    };

    function compareTo() {
        return {
            require: "ngModel",
            
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    };


    function textMultiLine() {
        return {
            restrict: 'A',
            priority: 450,
            link: function (scope, element, attrs) {         

                element.bind('focus', function (e) {                
                    element.bind("keydown keypress", function (event) {
                        if (event.which === 13 || event.which === 8) {
                            var data = $(element).val();
                            var lines = data.split(/\r*\n/);
                            var lineCount = lines.length;
                            scope.$apply(function () {
                                $(element).attr('rows', lineCount+1)
                            });

                            //event.preventDefault();
                        } else {
                            //alert("eee")

                        }
                    });
                });
            }
        };
    }

    function nextInput($timeout) {
        return {
            restrict: 'A',
            priority: 450,
            scope:{
                nextField: "@",
                nextTab: "=nextTab",
            },
            link: function (scope, element, attrs) {

                element.bind('focus', function (e) {
                    element.bind("keydown keypress", function (event) {

                        if (event.which === 9) {
                            console.log(scope.nextField)
                            scope.nextTab = true
                            document.getElementById('topTab').scrollIntoView()
                            $timeout(function () { $('#' + scope.nextField).focus(); }, 100);
                            scope.$apply(function () {
                            });
                        } 
                    });
                });
            }
        };
    }


/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('vectorMap', vectorMap)
    .directive('morrisArea', morrisArea)
    .directive('morrisBar', morrisBar)
    .directive('morrisLine', morrisLine)
    .directive('morrisDonut', morrisDonut)
    .directive('sparkline', sparkline)
    .directive('icheck', icheck)
    .directive('ionRangeSlider', ionRangeSlider)
    .directive('dropZone', dropZone)
    .directive('fancyBox', fancyBox)
    .directive('responsiveVideo', responsiveVideo)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('selectClinic', selectClinic)
    .directive('compareTo', compareTo)
    .directive('textMultiLine', textMultiLine)
    .directive('nextInput', nextInput)


