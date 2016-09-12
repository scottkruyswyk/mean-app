angular.module('myApp')
.config(function($mdThemingProvider) {

    $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'EDE7F6',
        '100': 'D1C4E9',
        '200': 'B39DDB',
        '300': '9575CD',
        '400': '7E57C2',
        '500': '673AB7',
        '600': '5E35B1',
        '700': '512DA8',
        '800': '4527A0',
        '900': '311B92',
        'A100': 'B388FF',
        'A200': '7C4DFF',
        'A400': '651FFF',
        'A700': '6200EA',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', 'A100']   // could also specify this if default was 'dark'
        });


    $mdThemingProvider.theme('default')
    .primaryPalette('amazingPaletteName', {
      'default': '500',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
    })
    .accentPalette('cyan', {
      'default': 'A200'
    });

});