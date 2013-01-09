class Amoeba.Routers.Base extends Module
  @include Amoeba.Events

  constructor: (@app) ->
    @helpers = @app.helpers
    @lookupContext = new Amoeba.LookupContext()
    @initialize()
    @

  initialize: ->
  route: (regex, action) ->
    @app.routes.add @, regex, action
  execute: (action) ->
    @currentView = null
    @[action]()
    @
  render: (partial) ->
    throw "Render already called with #{@currentView}" if @currentView?

    view = @lookupContext.find(partial)

    @currentView = new view(@)
