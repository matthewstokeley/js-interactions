 var Swipist = function(options) {
        this.name = options.name;
        this.element = options.element;
        this.threshold = options.threshold || 50;
        this.allowedTime = options.allowedTime || 350;
        this.restraint = options.restraint || 100;
        this.movement = [];
        this.velocity = 0;
        this.direction = false;
        this.startObject = {};
        this.endObject = {};
        this.callback = options.callback || function() {};
        this.translate = 0;
        this.listen();
    };

    Swipist.prototype.listen = function() {
        this.element.addEventListener('touchstart', this.start.bind(this), true);
        this.element.addEventListener('touchmove', this.move.bind(this), false);
        this.element.addEventListener('touchend', this.end.bind(this), false);
    };

    Swipist.prototype.start = function(event) {
        // @todo make sure only 
        this.movement = [];
        this.startObject.touchObj = event.changedTouches[0];
        this.startObject.direction = false;
        this.startObject.distance = 0;
        this.startObject.startX = this.startObject.touchObj.pageX;
        this.startObject.startY = this.startObject.touchObj.pageY;
        this.startObject.timestamp = event.timeStamp;
        event.preventDefault();
    };

    Swipist.prototype.move = function(event) {
        this.movement.push(event.timeStamp);
        event.preventDefault();
    };

    Swipist.prototype.end = function(event) {
        this.endObject.touchObj = event.changedTouches[0];
        
        // get horizontal dist traveled by finger while in contact with surface
        this.endObject.distX = this.endObject.touchObj.pageX - this.startObject.startX;
        
        // get vertical dist traveled by finger while in contact with surface
        this.endObject.distY = this.endObject.touchObj.pageY - this.startObject.startY;

        this.endObject.elapsedTime = event.timeStamp - this.startObject.timestamp;
        if (this.endObject.elapsedTime <= this.allowedTime){ // first condition for awipe met

            var coordinates = {
                start: this.startObject.startX,
                startY: this.startObject.startY,
                x: this.endObject.distX,
                y: this.endObject.distY
            };

            if (Math.abs(this.endObject.distX) >= this.threshold && Math.abs(this.endObject.distY) <= this.restraint){ // 2nd condition for horizontal swipe met
                this.direction = (this.endObject.distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(this.endObject.distY) >= this.threshold && Math.abs(this.endObject.distX) <= this.restraint){ // 2nd condition for vertical swipe met
                this.direction = (this.endObject.distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        this.swipe.call(this, this.direction, coordinates);
        event.preventDefault()
    };

    Swipist.prototype.findVelocity = function() {
        var multiplier = -1;
        var timing = this.movement.splice(this.movement.length - 5, 5);
        if (timing.length !== 5) {
          return 0;
        }
        var difference = timing.map(function(time, index, array) {
            if (index !== 0) {
              return time - (array[index - 1]);
            }
            return 0;
        });
        
        var reduced = difference.reduce(function(previousValue, currentValue) {
            return previousValue - currentValue;
        });

        return ((reduced * 0.1) * -1);
    };

    Swipist.prototype.swipe = function(direction, coordinates) {
        events.emit('swipe', null, this.name, coordinates);
    };

            var translateX = 0;
    var translateY = 0;
    events.addListener('swipe', function(name, coordinates) {
    
      var velocity = 1;
      var velocityX = coordinates.x;
      var velocityY = coordinates.y;
      
      var rotate = '0deg';
      var multiplier = -0.6;
          translate = translateX + (-multiplier * velocityX) + 'vw, ' + (-multiplier * velocityY) + 'vh';
          document.getElementById('character').style.transform = 'translate(' + translate + ') rotate('+rotate+')';
   
    }); 