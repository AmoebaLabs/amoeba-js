class Amoeba.Views.Base extends Module
  @include Amoeba.Events

  eventRegex: /([:\w]+)\s+([#-\.\w]+)/
  constructor: (@controller, @parent, @options = {}) ->
    @[key] = option for key, option of @options
    @app = @controller.app
    @lookupContext = @controller.lookupContext
    @helpers = @controller.helpers

    @rebind()
    @events ?= {}

    @delegateEvents()
    @initialize()
    @

  initialize: ->
  rebind: ->
    @$ = $(@el or document)
  delegateEvents: ->
    for event, handler of @events
      throw "Handler #{handler} does not exist for event delegation" unless @[handler]?

      match = event.match(@eventRegex)
      @[handler] = @[handler].bind(@)

      @$.on(match[1], match[2], @[handler])
  undelegateEvents: ->
    for event, handler of @events
      match = event.match(@eventRegex)

      @$.off(match[1], match[2], @[handler])
  render: (partial, options = {}) ->
    view = @lookupContext.find(partial)
    new view(@controller, @, options)
  remove: ->
    @$.remove()
