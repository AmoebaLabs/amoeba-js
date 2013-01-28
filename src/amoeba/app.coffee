#= require_tree ./lib
#= require ./helpers

class Amoeba.App extends Amoeba.Module
  @include Backbone.Events

  constructor: (options = {}) ->
    @helpers = new Amoeba.Helpers()
    @lookupContext = new Amoeba.LookupContext(options.viewPath)
    @templatePath = options.templatePath if options.templatePath

    @initialize.apply(@, arguments)
    @

  @start: (options = {}) ->
    Amoeba.app = new @(options)
    Backbone.history.start(_.pick(options, 'pushState', 'hashChange', 'silent', 'root'))
    Amoeba.app

  initialize: ->
