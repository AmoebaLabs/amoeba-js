var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Amoeba.View.Collection = (function(_super) {

  __extends(Collection, _super);

  Collection.prototype.subviews = [];

  function Collection(options) {
    var _ref;
    if (options == null) {
      options = {};
    }
    this.extractSubView = __bind(this.extractSubView, this);

    if ((_ref = options.subView) == null) {
      options.subView = {};
    }
    Collection.__super__.constructor.call(this, options);
    this.collection.on('add', this.add.bind(this));
    this.collection.on('remove', this.remove.bind(this));
  }

  Collection.prototype.render = function() {
    this.extractSubViews();
    this.$el.html(this.renderSubViews());
    this.rendered = true;
    this.trigger('render');
    return this;
  };

  Collection.prototype.extractSubViews = function() {
    return this.collection.each(this.extractSubView);
  };

  Collection.prototype.extractSubView = function(model) {
    var subview;
    subview = this._render(this.subView, _.extend(this.options.subView, {
      model: model
    }));
    this.subviews.push(subview);
    return subview;
  };

  Collection.prototype.renderSubViews = function() {
    var fragment,
      _this = this;
    fragment = document.createDocumentFragment();
    _.each(this.subviews, function(subview) {
      return fragment.appendChild(subview.render().el);
    });
    return fragment;
  };

  Collection.prototype.add = function(model) {
    var subview;
    subview = this.extractSubView(model);
    if (this.rendered) {
      this.$el.append(subview.render().el);
      return this.trigger('render');
    }
  };

  Collection.prototype.remove = function(model) {
    var subviewToRemove;
    subviewToRemove = _.select(this.subviews, function(subview) {
      return subview.model.id === model.id;
    })[0];
    this.subviews = _.without(this.subviews, subviewToRemove);
    if (this.rendered) {
      return subviewToRemove.$el.remove();
    }
  };

  return Collection;

})(Amoeba.View);
