var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Amoeba.Template = (function() {

  function Template(template) {
    var _this = this;
    this.template = template;
    this.render = __bind(this.render, this);

    return function(object) {
      if (object == null) {
        object = {};
      }
      return _this.template(_.extend(object, {
        render: _this.render,
        helpers: Amoeba.app.helpers
      }));
    };
  }

  Template.prototype.render = function(template, options) {
    var item, result, _ref;
    if (options == null) {
      options = {};
    }
    if ((_ref = options.locals) == null) {
      options.locals = {};
    }
    if (options.collection) {
      result = (function() {
        var _i, _len, _ref1, _results,
          _this = this;
        _ref1 = options.collection;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          item = _ref1[_i];
          _results.push((function(item) {
            var object;
            object = _.extend({}, item, options.locals);
            return _this._render(template, object);
          })(item));
        }
        return _results;
      }).call(this);
      return result.join('');
    } else {
      return this._render(template, options.locals);
    }
  };

  Template.prototype._render = function(template, object) {
    template = JST["" + Amoeba.app.templatePath + "/" + template];
    if (!template) {
      throw "" + Amoeba.app.templatePath + "/" + template + " does not exist";
    }
    return new Amoeba.Template(template)(object);
  };

  return Template;

})();
