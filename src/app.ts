/// <reference path="../bower/dt-angular/angular.d.ts" />
declare module ng {
  interface IScope {
    c: any;
  }
}

interface IRootScope {
  appName: string;
}

module MyApp {
  export class HomeCtrl {
    // @ngInject
    constructor ($scope: ng.IScope) {
      $scope.c = this;
    }
  }

  angular.module("my-app", [])
    .run(($rootScope: IRootScope) => {
      $rootScope.appName = "My App";
    });
}