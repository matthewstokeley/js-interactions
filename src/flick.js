var Push = function(options) {
            this.element = options.element;
            this.listen();
        };

        Push.prototype.listen = function() {
            this.element.addEventListener('touchstart', this.start.bind(this), true);
            this.element.addEventListener('touchmove', this.move.bind(this), false);
            this.element.addEventListener('touchend', this.end.bind(this), false);

        };

        Push.prototype.start = function(event) {
          this.startObject = {};
            this.startObject.touchObj = event.changedTouches[0];
            console.log(this.startObject.touchObj)
            this.startX = this.startObject.touchObj.pageX;
            this.startY = this.startObject.touchObj.pageY;
        };

        Push.prototype.move = function(event) {
          var x = event.targetTouches[0].clientX;
          var y = event.targetTouches[0].clientY;
          var translateX = (this.startX - x) * -1;
          var translateY = (this.startY - y) * -1;
          this.element.style.transform = 'translate('+translateX+'px, ' +translateY+'px)';
        };

        Push.prototype.end = function() {

        };