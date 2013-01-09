class Amoeba.Models.Base
  constructor: ->
    @attributes = {}
    @initialize()
    @

  initialize: ->

  set: (attributes) ->
    @attributes[attribute] = value for attribute, value of attributes

  get: (attribute) ->
    @attributes[attribute]

  toJson: (includeRoot = false) ->
    base = {}
    if includeRoot
      throw 'There is no root association' unless @root
      (base[@root] ?= {})[attribute] = value for attribute, value of @attributes
    else
      base[attribute] = value for attribute, value of @attributes
    base
