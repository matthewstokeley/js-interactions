/**
 * [InView description]
 * @param {[type]} options [description]
 */
var InView = function(options) {

    /**
     * [section description]
     * @type {[type]}
     */
    this.section = options.section;

    /**
     * [id description]
     * @type {[type]}
     */
    this.id = this.section.id;

    /**
     * 
     */
    this.init().listen();

};

/**
 * [init description]
 * @return {[type]} [description]
 */
InView.prototype.init = function() {

    this.viewport = {
      "w": Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      "h": Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };

    this.offset = this.section.offsetTop - (this.viewport.h / 2);
    this.top = this.section.offsetTop - 50;
    this.height = this.section.offsetHeight;
    this.offsetEnd = this.offset + this.height;
    this.end = this.top + this.height;
    this.isInView = false;
    this.isView = false;

    return this;

};

/**
 * [listen description]
 * @return {[type]} [description]
 */
InView.prototype.listen = function() {

    events.addListener('scroll', function(pos) {
        this.findView(pos);
    }.bind(this));

    window.addEventListener('resize', function() {
        this.init();
    }.bind(this));

    return this;

};

/**
 * [findView description]
 * @param  {[type]} pos [description]
 * @return {[type]}     [description]
 */
InView.prototype.findView = function(pos) {

  if (pos > this.offset && pos < this.offsetEnd && this.isInView === false) {
      this.elIsInView();
  }

  if ((pos < this.offset || pos > this.offsetEnd + (this.height /2)) && this.isInView === true) {
      this.elIsNotInView();
  }

  if (pos > this.top && pos < this.end && this.isView === false) {      
      events.emit(this.id, null, true);
      this.isView = true;
      return this;
  }

  if ((pos < this.top || pos > this.end) && this.isView === true) {
      events.emit(this.id, null, false);
      this.isView = false;
      return this;
  }

};

/**
 * [toggleIsInView description]
 * @return {[type]} [description]
 */
InView.prototype.toggleIsInView = function() {
    this.isInView = !this.isInView;
};

/**
 * [elIsInView description]
 * @return {[type]} [description]
 */
InView.prototype.elIsInView = function() {
  
  if (!this.isInView) {
      events.emit(this.id + '-inview', null, true);
      this.isInView = true; 
  }

};

/**
 * [elIsNotInView description]
 * @return {[type]} [description]
 */
InView.prototype.elIsNotInView = function() {  
    if (this.isInView) {

        events.emit(this.id + '-not-inview', null, false);
        this.isInView = false;
    
    }

};
