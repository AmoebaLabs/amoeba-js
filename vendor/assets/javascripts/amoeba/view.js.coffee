#= require_self
#= require_tree ./view

class Amoeba.View extends Backbone.View
  constructor: (options = {}) ->
    @locals = options.locals
    @parent = options.parent
    @template = new Amoeba.Template(@template) if @template
    super

  _render: (partial, options = {}) ->
    options.parent = @
    view = Amoeba.app.lookupContext.find(partial)
    new view(options)
