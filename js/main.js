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
    'physicsjs/bodies/circle', // will mix into the PhysicsJS library
    'physicsjs/renderers/canvas',
    'physicsjs/behaviors/edge-collision-detection',
    'physicsjs/behaviors/body-impulse-response',
    'physicsjs/behaviors/constant-acceleration'

], function( Physics ){
    
  Physics(function(world){

    var viewWidth = 400;
    var viewHeight = 300;
          
    var renderer = Physics.renderer('canvas', {
      el: 'viewport',
      width: viewWidth,
      height: viewHeight,
      meta: false, // don't display meta data
      styles: {
          // set colors for the circle bodies
          'circle' : {
              strokeStyle: 'hsla(60, 37%, 17%, 1)',
              lineWidth: 1,
              fillStyle: 'hsla(60, 37%, 57%, 0.8)',
              angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
          }
      }
    });

    // add the renderer
    world.add( renderer );
    // render on each step
    world.subscribe('step', function(){
      world.render();
    });
    
    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
    
    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.99,
        cof: 0.99
    }));

    // add a circle
    world.add(
        Physics.body('circle', {
          x: 50, // x-coordinate
          y: 30, // y-coordinate
          vx: 0.2, // velocity in x-direction
          vy: 0.01, // velocity in y-direction
          radius: 20
        })
    );

    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    // add some gravity
    world.add( Physics.behavior('constant-acceleration') );

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function( time, dt ){
      
        world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();

});});