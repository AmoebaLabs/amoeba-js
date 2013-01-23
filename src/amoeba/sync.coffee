methodMap =
  create: 'POST'
  update: 'PUT'
  patch: 'PATCH'
  delete: 'DELETE'
  read: 'GET'

originalSync = Backbone.sync
Backbone.sync = (method, model, options = {}) ->
  if model and (method is 'create' or method is 'update' or method is 'patch')
    options.data ?= {}
    data = {}
    if model.paramRoot
      data[model.paramRoot] = model.toJSON(options)
    else
      data = model.toJSON(options)
    options.contentType = 'application/json'
    options.data = JSON.stringify(_.extend(options.data, data))

  originalSync(method, model, options)
