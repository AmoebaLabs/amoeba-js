
Amoeba.Helpers = (function() {

  Helpers.helpers = [];

  function Helpers() {
    var methods, _i, _len, _ref;
    _ref = this.constructor.helpers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      methods = _ref[_i];
      this.extractHelper(methods);
    }
  }

  Helpers.prototype.extractHelper = function(methods) {
    var method, name, _results;
    _results = [];
    for (name in methods) {
      method = methods[name];
      _results.push(this[name] = method.bind(this));
    }
    return _results;
  };

  Helpers.register = function(helper) {
    return this.helpers.push(helper);
  };

  return Helpers;

})();
