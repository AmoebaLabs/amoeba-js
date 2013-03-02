class Amoeba.View extends Backbone.View
  constructor: (options = {}) ->
    @locals = options.locals or {}
    @parent = options.parent
    @template = new Amoeba.Template(@template) if @template
    @helpers = Amoeba.app.helpers
    super

  _render: (partial, options = {}) ->
    options.parent = @
    view = Amoeba.app.lookupContext.find(partial)
    new view(options)
