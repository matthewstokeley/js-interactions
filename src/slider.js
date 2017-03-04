(function(Interactions)) {

    /**
     * [Slider description]
     * @param {[type]} options [description]
     */
    Slider = function(options) {
        this.frame = options.frame;
        this.container = options.container;
        this.slideClass = options.slideClass;
        this.btnClass = options.btnClass;
        this.speed = options.speed || 5000;
        this.slides = [];
        this.activeSlideIndex = 0;
        this.currentTransform = 0;
        this.init().autoplay();
    };

    /**
     * [init description]
     * @return {[type]} [description]
     */
    Slider.prototype.init = function() {
        this.width = this.frame.offsetWidth;
        this.getSlides().getButtons().setWidth().listen();
        return this;
    };

    /**
     * [listen description]
     * @return {[type]} [description]
     */
    Slider.prototype.listen = function() {

        this.rightBtn.addEventListener('click', function() {
            this.slideRight.call(this);
        }.bind(this));

        this.leftBtn.addEventListener('click', function() {
            this.slideLeft.call(this);
        }.bind(this));

        return this;
        
    };

    Slider.prototype.getWidth = function() {
        return this.width * (this.slides.length);
    };

    Slider.prototype.setWidth = function(width) {
        this.container.style.width = width + 'px';
        return this;
    };

    /**
     * [autoplay description]
     * @return {[type]} [description]
     */
    Slider.prototype.autoplay = function() {

        (function(self) {
          window.setInterval(function() {
              self.slideRight.call(self);
          }, self, this.speed);
        })(this);

        return this;

    };

    /**
     * [getSlides description]
     * @return {[type]} [description]
     */
    Slider.prototype.getSlides = function() {
        var slides = document.getElementsByClassName(this.slideClass);
        
        for(var i = 0; i < slides.length; i++) {
            slides[i].style.width = this.width + 'px';
            this.slides.push(slides[i]);
        }
        
        return this;
    };

    /**
     * [getButtons description]
     * @return {[type]} [description]
     */
    Slider.prototype.getButtons = function() {
        var buttons = document.getElementsByClassName(this.btnClass);
        for(var i = 0; i < buttons.length; i++) {
          if (buttons[i].dataset.slideDirection === 'left') {
            this.leftBtn = buttons[i];
          } else if (buttons[i].dataset.slideDirection === 'right') {
            this.rightBtn = buttons[i];
          }
        }
        return this;
    };

    /**
     * [setToStart description]
     */
    Slider.prototype.setToStart = function() {
        this.currentTransform = 0;
        this.activeSlideIndex = 0;
    };

    /**
     * [setToEnd description]
     */
    Slider.prototype.setToEnd = function() {
        this.currentTransform = this.width * (this.slides.length - 1);
        this.activeSlideIndex = this.slides.length - 1;
    };

    /**
     * [slideRight description]
     * @return {[type]} [description]
     */
    Slider.prototype.slideRight = function() {
        if (this.activeSlideIndex >= this.slides.length - 1) {
          this.setToStart();
        } else {
          this.currentTransform = this.currentTransform + this.width;
          this.activeSlideIndex = this.activeSlideIndex + 1;
      }
      this.slide('right');
    };

    /**
     * [slideLeft description]
     * @return {[type]} [description]
     */
    Slider.prototype.slideLeft = function() {
      if (this.activeSlideIndex === 0) {
      
        this.setToEnd();
      
      } else {
        this.currentTransform = this.currentTransform - this.width;
        this.activeSlideIndex = this.activeSlideIndex - 1;
      }

      this.slide('left');
    };

    /**
     * [slide description]
     * @param  {[type]} direction [description]
     * @return {[type]}           [description]
     */
    Slider.prototype.slide = function(direction) {
        this.container.style.transform = 'translate(-'+this.currentTransform+'px)';
        events.emit('slider', null, direction);
    };

    if (!Interactions) {
        return false;
    }

    Interactions.Slider = Slider;

})(Interactions);