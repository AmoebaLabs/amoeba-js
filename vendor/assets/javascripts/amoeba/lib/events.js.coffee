Amoeba.Events = {
  on: (events, callback) ->
    if typeof events is 'string'
      return this if not callback
      e = {}
      e[events] = callback
      events = e
    callbacks = @_callbacks or (@_callbacks = {})

    for event, _callback of events
      (callbacks[event] or (callbacks[event] = [])).push(_callback)
    @
  trigger: ->
    event = arguments[0]
    eventArgs = Array::slice.call(arguments, 1)

    return this if not (@_callbacks and (callbacks = @_callbacks[event]))

    for callback in callbacks
      do (callback) ->
        callback.apply(@, eventArgs)
    @
}
