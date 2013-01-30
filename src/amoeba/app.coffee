#= require_tree ./lib
#= require ./helpers

###
App is the main object. Think of it like a container for your application settings, helpers, and
routers, as well as a way to automatically initialize and configure Backbone. It's important not to
try and {Amoeba.App.start} the App instance until you're certain the rest of your code (views, etc) are ]
already defined, and jQuery is ready.

See the {#constructor} documentation for specific options.

@example Create a new App and initialize it after jQuery loads
  class MySite.App extends Amoeba.App
    initialize: ->
      @myRouter = new MySite.MyRouter()

  jQuery ($) ->
    MySite.app = MySite.App.start
      pushState: true
      viewPath: MySite.Views
###
class Amoeba.App extends Amoeba.Module
  @include Backbone.Events

  @settings:
    linkSelector: 'a'

  ###
  @param [Object] options the app's settings
  @option options [Object] viewPath the base object under which your app's views are contained
  @option options [Object] templatePath the base object under which to find your app's templates
  @option options [Boolean] hijackRequests Hijack click events on "a" tags to fire associated routes
    automatically (default true)
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



