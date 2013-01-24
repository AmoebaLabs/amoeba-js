class Amoeba.Helpers
  @helpers: []

  constructor: ->
    @extractHelper methods for methods in @constructor.helpers

  extractHelper: (methods) ->
    (@[name] = method.bind(@)) for name, method of methods

  @register: (helper) ->
    @helpers.push helper
