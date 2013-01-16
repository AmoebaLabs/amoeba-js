class Amoeba.View extends Backbone.View
  constructor: (options = {}) ->
    @locals = options.locals
    @parent = options.parent
    super

  _render: (partial, options = {}) ->
    options.parent = @
    view = Amoeba.app.lookupContext.find(partial)
    new view(options)
