/**
 * [SmoothScroll description]
 * @param {[type]} options [description]
 */
var SmoothScroll = function(options) {

    this.element = options.element;
    this.id = options.id;
    this.init();
    this.listen();

};

/**
 * [init description]
 * @return {[type]} [description]
 */
SmoothScroll.prototype.init = function() {

    this.viewport = {
      "w": Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      "h": Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };

    this.offset = this.element.offsetTop;
    this.height = this.element.offsetHeight;
    this.end = this.offset + this.height;
    this.isInView = false;

};

/**
 * [listen description]
 * @return {[type]} [description]
 */
SmoothScroll.prototype.listen = function() {
    
    events.addListener(this.id, null, this.scrollTo);

    window.addEventListener('resize', function() {
      this.init();
    }.bind(this));
      
};

/**
 * [scrollTo description]
 * @return {[type]} [description]
 */
SmoothScroll.prototype.scrollTo = function() {
    
    Velocity(this.element, "scroll", {
      duration: 600,
      easing: "easeInOut",
      offset: "-40vh"
    });

};