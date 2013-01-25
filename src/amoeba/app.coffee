#= require_tree ./lib
#= require ./helpers

class Amoeba.App extends Amoeba.Module
  @include Backbone.Events

  @settings:
    linkSelector: 'a'

  ###
    new Amoeba.App(options) where options are:
      viewPath = The base object under which to find your app's views
      templatePath = The base object under which to find your app's templates
      hijackRequests (default: true) = Hijack <a> click events to fire associated routes
  ###
  constructor: (options = {}) ->
    @helpers = new Amoeba.Helpers()
    @lookupContext = new Amoeba.LookupContext(options.viewPath) if options.viewPath
    @templatePath = options.templatePath if options.templatePath

    @hijackRequests = if options.hijackRequests is false then false else true
    @bindRequestListner() if @hijackRequests

    @

  @start: (options = {}) ->
    Amoeba.app = new @(options)
    Amoeba.app.initialize(options)
    Backbone.history.start(_.pick(options, 'pushState', 'hashChange', 'silent', 'root'))
    Amoeba.app

  initialize: ->

  # This method handles click events
  requestHandler: (e) =>
    #TODO: Finish

  # This method will listen for click events and fire routes if they exist
  bindRequestListner: =>
    $(document).on(@constructor.settings.linkSelector, 'click', @requestHandler)

  # This method will unbind the click event hijacker
  unbindRequestListener: =>
    $(document).off(@constructor.settings.linkSelector, 'click', @requestHandler)



