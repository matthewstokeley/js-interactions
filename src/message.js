var Message = function(options) {
    this.container = options.container;
    this.listen();
};

Message.prototype.listen = function() {
    events.addListener('swiped', this.message.bind(this));
};

Message.prototype.messages = {
  up: "Pass",
  down: "Pass",
  left: "No Thanks",
  right: "Saved!"
}

Message.prototype.message = function(name, direction) {
    this.container.innerHTML = this.messages[direction];
};
