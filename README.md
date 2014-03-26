# AngularTS Minify Demo

This is just a very basic sample of how to cope with minifying code to work with [AngularJS](http://angularjs.org) dependency injection from [TypeScript](http://typescriptlang.org).

It uses two things:

## 1: [ng-annotate](https://github.com/olov/ng-annotate)

This is a little package that goes through JavaScript code looking for AngularJS function patterns and automatically generating the annotated versions.

For example,

```JavaScript
angular.module("x",[])
  .run(function($rootsScope) {
    $rootScope.appName = "X";
  });
```

becomes

```JavaScript
angular.module("x",[])
  .run(["$rootScope", function($rootsScope) {
    $rootScope.appName = "X";
  }]);
```

*(There is another package, [ngmin](http://github.com/btford/ngmin), that works similarly, but it adds lines to the code it outputs, which throws off source-maps.)*

However, neither ng-annotate nor ngmin will annotate class constructors, and when you're writing AngularJS in TypeScript, using classes is one of the best bits. So we need thing...

## 2: [UglifyJS](https://github.com/mishoo/UglifyJS2)

Uglify is the best minifier for JavaScript that isn't written in Java, and this year it added support for the AngularJS `@ngInject` annotation that is supported by Google's Closure compiler. You explicitly add a comment with the `@ngInject` slug before your constructor, and when Uglify passes by doing its minification thing, it generates the `$inject` value for the function.

## Putting it together

So your compilation phase is basically:

* Run TypeScript
* Run ng-annotate over the TypeScript output to annotate the inline functions
* Run Uglify with the `angular` option over the ng-annotate output to create your final `.min.js`

The Gruntfile for this project does all this using the Grunt modules for each component.

As a bonus, it also passes the output source-map from the TypeScript compilation into the Uglify process, so that the source-map for the minified file points right back to your `.ts` files. That's why I used ng-annotate rather than ngmin, you see.