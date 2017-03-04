var Bounder = function(options) {
            this.box = options.box;
            this.isActive = false;
            this.name = options.name;
            this.overlap = new Overlap({
                box: this.box,
                name: this.name,
                callback: function() {
                  events.emit('match', null, this.name);
                }.bind(this)
            });
            this.listen.call(this);
        };

        Bounder.prototype.listen = function() {
            events.addListener('card-animating', this.isOverlay.bind(this));
            events.addListener('match', this.isMatch.bind(this));
        };

        Bounder.prototype.isOverlay = function(element, i) {
          if (!this.isActive) {
            this.overlap.check(element); 
          }
          
        };

        Bounder.prototype.isMatch = function(name) {
          if (!this.isActive && name === this.name) { 
              this.isActive = true;
              addClass(this.box, 'box--active');
          }
        }