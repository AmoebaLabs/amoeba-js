
Amoeba.LookupContext = (function() {

  function LookupContext(viewPath) {
    this.viewPath = viewPath;
    if (!this.viewPath) {
      throw "Cannot find view path";
    }
  }

  LookupContext.prototype.find = function(template) {
    var namespace, namespaces, view, _i, _len;
    view = this.viewPath;
    namespaces = template.split('.');
    for (_i = 0, _len = namespaces.length; _i < _len; _i++) {
      namespace = namespaces[_i];
      view = view[namespace];
    }
    return view;
  };

  return LookupContext;

})();
