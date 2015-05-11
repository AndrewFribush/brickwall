Squares = new Meteor.Collection('bricks');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to the wall.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.wall.bricks = function() {
    return Bricks.find();
  };

}

var WIDTH = 40;
var HEIGHT = 20;

if (Meteor.isServer) {
  var insertAllBricks = function() {
    if (Bricks.find().count() === 0) {
      for (var i = 0; i < WIDTH; i++) {
        for (var j = 0; j < HEIGHT; j++) {
          Bricks.insert({
            x: i,
            y: j,
            color: Random.hexString(6)
          });
        };
      };
    }
  };

  Meteor.startup(function () {
    // code to run on server at startup

    insertAllBricks();
  });
}
