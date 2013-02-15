class Amoeba.LookupContext
  constructor: (@viewPath) ->

  getNamespaces: (path) ->
    path.split('.')

  recurse: (base, path) ->
    return undefined unless base
    return base unless path.length

    namespaces = @getNamespaces(path)

    for namespace in namespaces
      if base[namespace]
        base = base[namespace]
      else
        base = undefined
        break
    base

  findFromViewPath: (viewPath, context = window) ->
    namespaces = @getNamespaces(viewPath)
    base = namespaces.shift()

    @recurse(context[base], namespaces.join('.'))

  find: (template, context) ->
    throw "A template is required" unless template
    return template unless typeof template is 'string'

    if @viewPath
      view = @recurse(@viewPath, template)
    else
      view = @findFromViewPath(template, context)

    throw "Cannot find template #{template}" unless view
    view
