require.config({
    packages: [
        {
          name: 'physicsjs',
          location: 'lib/physicsjs',
          main: 'physicsjs-0.5.4.min'
        }
    ]
});

require([
    'physicsjs',
    'physicsjs/bodies/circle' // will mix into the PhysicsJS library
], function( Physics ){
    
    // do something fun with circles!

    console.dir(Physics);
});