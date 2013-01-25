class Amoeba.Template
  constructor: (@template) ->
    return (object = {}) => @template(_.extend(object, render: @render, helpers: Amoeba.app.helpers))

  render: (template, options = {}) =>
    options.locals ?= {}

    if options.collection
      result = for item in options.collection
        do (item) =>
          object = {}
          object[template] = item
          _.extend(object, options.locals)
          @_render(template, object)
      result.join('')
    else
      @_render(template, options.locals)

  _render: (template, object) ->
    template = JST["#{Amoeba.app.templatePath}/#{template}"]

    throw "#{Amoeba.app.templatePath}/#{template} does not exist" unless template
    new Amoeba.Template(template)(object)
