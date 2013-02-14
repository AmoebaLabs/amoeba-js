Backbone.History::hasUrl = (fragment) ->
  _.any @handlers, (handler) ->
    handler.route.test(fragment)