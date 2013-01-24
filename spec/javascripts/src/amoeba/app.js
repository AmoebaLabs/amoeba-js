var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Amoeba.App = (function(_super) {

  __extends(App, _super);

  App.include(Backbone.Events);

  function App(options) {
    if (options == null) {
      options = {};
    }
    this.helpers = new Amoeba.Helpers();
    if (options.viewPath) {
      this.lookupContext = new Amoeba.LookupContext(options.viewPath);
    }
    if (options.templatePath) {
      this.templatePath = options.templatePath;
    }
    this.initialize.apply(this, arguments);
    this;

  }

  App.start = function(options) {
    if (options == null) {
      options = {};
    }
    Amoeba.app = new this(options);
    Backbone.history.start(_.pick(options, 'pushState', 'hashChange', 'silent', 'root'));
    return Amoeba.app;
  };

  App.prototype.initialize = function() {};

  return App;

})(Amoeba.Module);
