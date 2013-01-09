class Amoeba.Helpers
  constructor: ->
    @extractHelper helper, methods for helper, methods of @constructor.helpers

  @extractHelper: (helper, methods) ->
    (@[name] = method.bind(@)) for name, method of methods

  @register: (helper) ->
    @helpers.push helper
