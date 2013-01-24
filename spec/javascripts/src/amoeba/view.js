var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Amoeba.View = (function(_super) {

  __extends(View, _super);

  function View(options) {
    if (options == null) {
      options = {};
    }
    this.locals = options.locals;
    this.parent = options.parent;
    if (this.template) {
      this.template = new Amoeba.Template(this.template);
    }
    View.__super__.constructor.apply(this, arguments);
  }

  View.prototype._render = function(partial, options) {
    var view;
    if (options == null) {
      options = {};
    }
    options.parent = this;
    view = Amoeba.app.lookupContext.find(partial);
    return new view(options);
  };

  return View;

})(Backbone.View);
