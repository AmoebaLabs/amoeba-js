class Amoeba.RouteSet
  @GLOB_ROUTE = /.*/
  constructor: (@routes = {}) ->
  add: (router, regex, route) ->
    if regex.source is @constructor.GLOB_ROUTE.source
      @glob = [router, route]
    else
      @routes[route] = [router, regex]
  route: (path) ->
    routed = false
    for action, route of @routes
      router = route[0]
      regex = route[1]

      if regex.test(path)
        routed = true
        @execute(router, action)
    @execute.apply(@, @glob) if @glob
  execute: (router, action) ->
    router.execute.call(router, action)
