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
  @defaults:
    hijackRequests: true
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
    _.defaults(options, @constructor.defaults)

    @helpers = new Amoeba.Helpers()
    @lookupContext = new Amoeba.LookupContext(options.viewPath)
    @templatePath = options.templatePath if options.templatePath
    @hijackRequests = options.hijackRequests
    @bindRequestListner() if @hijackRequests

    @

  @start: (options = {}) ->
    Amoeba.app = new @(options)
    Amoeba.app.initialize(options)
    backboneOpts = _.pick(options, 'pushState', 'hashChange', 'silent', 'root')
    Backbone.history.start(backboneOpts)
    Amoeba.app

  ###
  This method is intensionally left empty for the user of the library to subclass and implemenet.
  ###
  initialize: ->

  ###
  Fired whenever a click event is generated. This will search the DOM for the nearest `<a>` tag to
    the event target, and check its href against known routes. If such a route exists, it will
    navigate to that page. Otherwise, it will reach out to the server.
  @param [Object] e the jQuery event fired from a click event
  ###
  requestHandler: (e) =>
    requestedPath = $(e.target).closest('a').attr('href').replace /^\//, '' # Remove any starting slashes
    Amoeba.log "Initiating route to '#{requestedPath}'"
    if Backbone.history.hasUrl(requestedPath)
      Backbone.history.navigate(requestedPath, trigger: true)
      return false;

    return true; # If we didn't find a router for this path, bubble up to the browser.

  ###
  This method will bind to all click events and listen for click events and fire the
    {#requestHandler} function. It is called during the constructor if `hijackRequests = true`.
  ###
  bindRequestListner: =>
    $(document).on('click', @constructor.settings.linkSelector, @requestHandler)

  ###
  This method will unbind the click event hijacker setup by {#bindRequestListner}.
  ###
  unbindRequestListener: =>
    $(document).off('click', @constructor.settings.linkSelector, @requestHandler)



