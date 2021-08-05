// ===========================================================
// See tutorial at :
// https://css-tricks.com/animate-a-workfigure-on-mouse-over-using-perspective-and-transform/
// ===========================================================

function showanimation(a){
  // Init
  var workfigure = document.querySelectorAll(".work-figure"),
      workimage = document.querySelectorAll(".work-image");

  // Mouse
  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")";
    }
  };

  // Track the mouse position relative to the center of the workfigure.

  mouse.setOrigin(workfigure[a]);



  //----------------------------------------------------

  var counter = 0;
  var refreshRate = 2;
  var isTimeToUpdate = function() {
    return counter++ % refreshRate === 0;
  };

  //----------------------------------------------------

  var onMouseEnterHandler = function(event) {
    update(event);
  };

  var onMouseLeaveHandler = function() {

    workimage[a].style = "";

  };

  var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  //----------------------------------------------------

  var update = function(event) {
    mouse.updatePosition(event);

    updateTransformStyle(
      (mouse.y / workimage[a].offsetHeight / 2).toFixed(2),
      (mouse.x / workimage[a].offsetWidth / 2).toFixed(2)
    );

  };

  var updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";

      workimage[a].style.transform = style;
      workimage[a].style.webkitTransform = style;
      workimage[a].style.mozTranform = style;
      workimage[a].style.msTransform = style;
      workimage[a].style.oTransform = style;


  };

  //--------------------------------------------------------

  workfigure[a].onmousemove = onMouseMoveHandler;
  workfigure[a].onmouseleave = onMouseLeaveHandler;
  workfigure[a].onmouseenter = onMouseEnterHandler;
}



// object following cursor
var cursor = $(".cursor"),
		follower = $(".cursor-follower");

var posX = 0,
		posY = 0;
var mouseX = 0,
		mouseY = 0;

TweenMax.to({}, 0.016, {
	repeat: -1,
	onRepeat: function(){
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;

		TweenMax.set(follower, {
			css: {
				left: posX - 12,
				top: posY - 12
			}
		});
		TweenMax.set(cursor, {
			css: {
				left: mouseX,
				top: mouseY
			}
		});
	}
})

$(".work-figure").on("mousemove", function(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
});
