'use strict';

angular.module('nwauCalculatorApp')
  .directive('journeyForm', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/_journey-form.html',
      controller: ['$scope', '$rootScope', 'ihpaService', '$modal', 'EncounterService',
        function ($scope, $rootScope, ihpaService, $modal, $facilty, EncounterService) {
          $scope.currentYear = {
            value: 2018,
            label: 'NWAU18'
          };
          $scope.previousYear = {
            value: 2017,
            label: 'NWAU17'
          };
          $scope.facilties = [];
          $scope.regions = [];
          $scope.facilty;
          $scope.encounter;

          $scope.changeFacility = function(facility) {
            $facilty = facility;
            // $encounter =  EncounterCtrl.getEncounter()
            console.log('changed');
            if ($scope.journey.nwauVersion > 2017 && facility && (facility.FacilityID === 'B101' || facility.FacilityID === 'D102')) {
              var exceptionModal = $modal.open({
                templateUrl: 'views/hospital-exception-modal.html',
                controller: 'HospitalExceptoinCtrl',
                resolve: {
                  name: function () {
                    return true;
                  },
                  type: function () {
                    return 'Please note that Cumberland Hospital and Macquarie Hospital are out of scope for NWAU18.';
                  }
                }
              });

              return exceptionModal.result.then(function (str) {
                $scope.journey.facility = '';
                $facilty = '';
                return str;
              })
            }
          }

          $scope.yearChange = function() {
            console.log('yearchante');
          }

          $rootScope.$on('cancelUserChange', function() {   // Mark
            //console.log('cancelUserChange ');
            if( $scope.journey.nwauVersion === $scope.previousYear.value) {
              $scope.journey.nwauVersion = $scope.currentYear.value;
            } else {
              $scope.journey.nwauVersion = $scope.previousYear.value;
            }
          });

          var getFacilities = function () {
            var returnValue = [];
            ihpaService.getFacilities($scope.journey.nwauVersion)
              .then(function (result) {
                if ($scope.journey.nwauVersion > 2014) {
                  $scope.facilities = result;
                }
                else {
                  $scope.facilities = result.filter(function(e) {
                    return !e.IsNewFacility;
                  });
                }
                returnValue = $scope.facilities;
              });
            //console.log('returnValue ', returnValue);

            return returnValue;
          };
          getFacilities();

          var getRegions = function () {
            ihpaService.getRegions($scope.journey.nwauVersion)
              .then(function (result) {
                $scope.regions = result;
              });
          };
          getRegions();

          $scope.$watch('journey.nwauVersion', function () {
            //console.log('$$$$scope.journey.nwauVersion ', $scope.journey.nwauVersion);
            console.log($facilty);
            if ($scope.journey.nwauVersion > 2017 && $facilty && ($facilty.FacilityID === 'B101' || $facilty.FacilityID === 'D102')) {
              var exceptionModal = $modal.open({
                templateUrl: 'views/hospital-exception-modal.html',
                controller: 'HospitalExceptoinCtrl',
                resolve: {
                  name: function () {
                    return true;
                  },
                  type: function () {
                    return 'Please note that Cumberland Hospital and Macquarie Hospital are out of scope for NWAU18.';
                  }
                }
              });

              return exceptionModal.result.then(function (str) {
                $scope.journey.facility = '';
                $facilty = '';
                return str;
              })
            }
            getRegions();
            getFacilities();

            //if ($scope.journey.nwauVersion<=2014 && $scope.journey.facility.IsNewFacility) {
            if ($scope.journey.facility.IsNewFacility) {
              $scope.journey.facility = null;
            }
          });
        }]
    };
  })
;
