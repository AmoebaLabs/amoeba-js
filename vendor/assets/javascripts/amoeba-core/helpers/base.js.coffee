class Amoeba.Helpers.Base
  constructor: ->
    @extractHelper helper, methods for helper, methods of Amoeba.Helpers when helper isnt "Base"

  extractHelper: (helper, methods) ->
    (@[name] = method.bind(@)) for name, method of methods
