        var Overlap = function(options) {
            this.box = options.box;
            this.name = options.name;
            this.position = this.box.dataset.orientation;
            this.callback = options.callback || function() {};
            this.boundBox = this.box.getBoundingClientRect();
            this.boundLeft = this.boundBox.left;
            this.boundRight = this.boundBox.left + this.boundBox.width;
            this.boundTop = this.boundBox.top;
            this.boundBottom = this.boundBox.top + this.boundBox.height;
        };

        Overlap.prototype.check = function(element) {
            if (!element.getBoundingClientRect) {
              return false;
            }
            this.elementBox = element.getBoundingClientRect();
            this.elementLeft = this.elementBox.left;
            this.elementRight = this.elementBox.left + this.elementBox.width;
            this.elementTop = this.elementBox.top;
            this.elementBottom = this.elementBox.top + this.elementBox.height;
            var method = 'check' + this.position[0].toUpperCase() + this.position.slice(1);
            this[method](element);
        };

        Overlap.prototype.checkVertical = function(element) {
             if ((this.elementLeft > this.boundLeft
                && this.elementLeft < this.boundRight)
              || (this.elementRight > this.boundLeft
                && this.elementLeft < this.boundLeft)) {
                this.callback.call(this, null, element, this.boundBox, this.name);
            }
        };

        Overlap.prototype.checkHorizontal = function() {
            if((this.elementTop > this.boundTop
                && this.elementTop < this.boundBottom)
              || (this.elementBottom > this.boundTop
                && this.elementBottom < this.boundBottom)) {
                this.callback.call(this, this.boundBox, this.elementBox);
            }
        };
