var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Amoeba.Router = (function(_super) {

  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.render = function(partial, options) {
    var view;
    if (options == null) {
      options = {};
    }
    if (this.currentView != null) {
      throw "Render already called with " + this.currentView;
    }
    view = Amoeba.app.lookupContext.find(partial);
    return Amoeba.app.currentView = this.currentView = new view(options);
  };

  return Router;

})(Backbone.Router);
