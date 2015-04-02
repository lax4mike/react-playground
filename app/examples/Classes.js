// Classes

class View {
  constructor(options) {
    this.model = options.model;
    this.template = options.template;
  }

  render() {
    return _.template(this.template, this.model.toObject());
  }
}

class Model {
  constructor(properties) {
    this.properties = properties;
  }

  toObject() {
    return this.properties;
  }
}

class LogView extends View {
  render() {
    var compiled = super.render();
    console.log(compiled);
  }
}

var jack = new Model({
  name: 'jack'
});

var view = new View({
  model: jack,
  template: 'Hello, <%= name %>'
});

console.log(view.render());

var logView = new LogView({
  model: jack,
  template: 'Hello, <%= name %>'
});

console.log(logView.render());