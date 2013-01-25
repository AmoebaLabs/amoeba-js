Backbone.History::hasUrl = (fragment) ->
  _.any @handlers, (handler) ->
    if handler.route.test(fragment) then true else false