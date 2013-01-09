class Amoeba.App extends Module
  @include Amoeba.Events

  constructor: (@options = {}) ->
    @helpers = new Amoeba.Helpers.Base()
    @routes = new Amoeba.RouteSet()

    @initialize()
    @start() if @options.start
    @

  start: ->
    @currentView = @routes.route(window.location.pathname).currentView

  initialize: ->
