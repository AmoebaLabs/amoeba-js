#= require_directory ./lib
#= require ./helpers
#= require_directory ./routers
#= require_directory ./models
#= require_directory ./views
#= require_self

class Amoeba.App extends Module
  @include Amoeba.Events

  constructor: (@options = {}) ->
    @helpers = new Amoeba.Helpers()
    @routes = new Amoeba.RouteSet()

    @initialize()
    @start() if @options.start
    @

  start: ->
    @currentView = @routes.route(window.location.pathname).currentView

  initialize: ->
