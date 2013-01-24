var methodMap, originalSync;

methodMap = {
  create: 'POST',
  update: 'PUT',
  patch: 'PATCH',
  "delete": 'DELETE',
  read: 'GET'
};

originalSync = Backbone.sync;

Backbone.sync = function(method, model, options) {
  var data, _ref;
  if (options == null) {
    options = {};
  }
  if (model && (method === 'create' || method === 'update' || method === 'patch')) {
    if ((_ref = options.data) == null) {
      options.data = {};
    }
    data = {};
    if (model.paramRoot) {
      data[model.paramRoot] = model.toJSON(options);
    } else {
      data = model.toJSON(options);
    }
    options.contentType = 'application/json';
    options.data = JSON.stringify(_.extend(options.data, data));
  }
  return originalSync(method, model, options);
};
