(function(Interactions) {

    /**
     * [Parallax description]
     * @param {[type]} options [description]
     */
    var Parallax = function(options) {
        this.elements = options.elements;
        this.init().listen();
    };

    /**
     * [init description]
     * @return {[type]} [description]
     */
    Parallax.prototype.init = function() {
        return this;
    };

    /**
     * [listen description]
     * @return {[type]} [description]
     */
    Parallax.prototype.listen = function() {
        events.addListener('scroll', this.onScroll.bind(this));
        //return this;
    };

    /**
     * [onScroll description]
     * @return {[type]} [description]
     */
    Parallax.prototype.onScroll = function(value) {
        return value.element.style.top = -this.getElementValues().scrollTop * value.speed + 'px';
    };

    /**
     * [eachElement description]
     * @return {[type]} [description]
     */
    Parallax.prototype.eachElement = function() {
        return this.elements.forEach(this.onScroll.bind(this));
    };

    /**
     * [getElementValues description]
     * @return {[type]} [description]
     */
    Parallax.prototype.getElementValues = function() {
        return {
            scrollTop: window.pageYOffset
        };
    };

    if (!Interactions) {
        return false;
    }

    Interactions.Parallax = Parallax;

})(Interactions);