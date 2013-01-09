class Amoeba.LookupContext
  constructor: (@viewPath) ->
    throw "Cannot find view path" unless @viewPath

  find: (template) ->
    view = @viewPath
    namespaces = template.split('.')

    (view = view[namespace]) for namespace in namespaces
    view
