class Amoeba.Models.Base
  constructor: ->
    @attributes = {}
    @initialize()
    @

  initialize: ->

  parser: Amoeba.Parser

  set: (attribute, value) ->
    if typeof attribute is 'object'
      @attributes[attr] = value for attr, value of attribute
    else
      @attributes[attribute] = value
    @

  get: (attribute) ->
    @attributes[attribute]

  toJson: ->
    base = {}
    if @root
      base[@root] = {}
      base[@root][attribute] = value for attribute, value of @attributes
    else
      base[attribute] = value for attribute, value of @attributes
    base

  _request: (method, success, error) ->
    options =
      error: error
      success: (model, xhr) =>
        newAttributes = model.parser.parse(xhr)
        model.set(newAttributes)
        success?(model, xhr)
    Amoeba.Request[method](@, options)

  create: (attributes, success, error) ->
    if typeof attributes isnt 'object'
      error = success
      success = attributes
    else
      @set(attributes)
    @_request('post', success, error)
    @

  save: (attributes, success, error) ->
    if typeof attributes isnt 'object'
      error = success
      success = attributes
    else
      @set(attributes)
    @_request('put', success, error)
    @
