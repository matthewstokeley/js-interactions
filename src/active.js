(function(Interactions) {

    /**
     * [Active description]
     * @param {[type]} options [description]
     */
    var Active = function(options) {
    
        this.elements = options.elements;
        this.init();
        this.listen();
    
    };

    /**
     * [init description]
     * @return {[type]} [description]
     */
    Active.prototype.init = function() {
        
        for (var i = 0; i < this.elements.length; i++) {
            this.listen(this.elements[i]);
        }

    };

    /**
     * [listen description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    Active.prototype.listen = function(value) {
        
        if (value === undefined) {
            return false;
        }
        
        events.addListener(value.id, function(inview) {
          if (inview) {
            this.removeAllClasses();
            this.addClass(value.id);
          } else {
            this.removeClass(value.id);
          }
        }.bind(this));

        window.addEventListener('resize', function() {
            this.removeAllClasses();
        }.bind(this));

    };

    /**
     * [addClass description]
     * @param {[type]} id [description]
     */
    Active.prototype.addClass = function(id) {
        elemental.addClass(document.getElementById(id + "-alt-button"), 'secondary-nav__link--active');
    };

    /**
     * [removeClass description]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    Active.prototype.removeClass = function(id) {
        elemental.removeClass(document.getElementById(id + "-alt-button"), 'secondary-nav__link--active');
    };

    /**
     * [removeAllClasses description]
     * @return {[type]} [description]
     */
    Active.prototype.removeAllClasses = function() {
        
        var links = document.getElementsByClassName('secondary-nav__link');
        for(var i = 0; i < links.length; i++) {
            elemental.removeClass(links[i], 'secondary-nav__link--active');
        }

    };

    /**
     * [if description]
     * @param  {[type]} !Interactions [description]
     * @return {[type]}               [description]
     */
    if (!Interactions) {
        return false;
    }

    Interactions.Active  = Active;

})(Interactions);
