var Bounce = function(options) {
            this.element = options.element;
            this.callback = options.callback;
            this.height = window.outerHeight;
            this.width = window.outerWidth;
            this.hit = false;
            this.boundLeft = 0;
            this.boundRight = this.width;

        };

        Bounce.prototype.check = function() {
              if (!this.hit) {
                this.elementBox = this.element.getBoundingClientRect();
                this.elementLeft = this.elementBox.left;
                this.elementRight = this.elementBox.left + this.elementBox.width;
                this.elementTop = this.elementBox.top;
                this.elementBottom = this.elementBox.top + this.elementBox.height;
                if ((this.elementLeft < this.boundLeft)
                  || (this.elementRight > this.boundRight)) {
            
                      this.callback.call(this, null);
                }
              }
              
        };

        var bounce = new Bounce({
            element: document.getElementById('character'),
            callback: function() {
                var transform = document.getElementById('character').style.transform;
                var reg = new RegExp(/translate\((.*)vw\,/);
                var array = reg.exec(transform);
                var newX = (parseInt(array[1], 10) * -1) / 2;
                var newTransform = transform.replace(/translate\((.*)vw\,/, 'translate(' + newX + 'vw,');
                document.getElementById('character').style.transform = newTransform;
                document.getElementById('character').style.transition = 'all 1s ease-out'
            }
        });

        (function(bounce) {
          console.log(bounce);
            setInterval(function() {
                bounce.check();
            }, 5);
        })(bounce);
