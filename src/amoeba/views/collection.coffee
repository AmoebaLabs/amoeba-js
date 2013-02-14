#= require ../view

class Amoeba.View.Collection extends Amoeba.View
  subView: Amoeba.View
  constructor: (options = {}) ->
    @subviews = []
    options.subView ?= {}
    @subView = options.subView.partial or @subview
    super(options)

    @listenTo(@collection, 'add', @addModel)
    @listenTo(@collection, 'remove', @removeModel)

  render: =>
    return if @rendered

    @extractSubViews()
    @$el.html(@renderSubViews()) if @subviews.length
    @rendered = true
    @trigger('render')
    @

  refresh: ->
    @subviews = []
    @rendered = false
    @collection.fetch(success: @render, silent: true)
    @

  extractSubViews: ->
    @collection.each @extractSubView

  extractSubView: (model) =>
    subview = @_render(@subView, _.extend(@options.subView, model: model))
    @subviews.push(subview)
    subview

  renderSubViews: ->
    fragment = document.createDocumentFragment()
    _.each @subviews, (subview) =>
      fragment.appendChild(subview.render().el)
    fragment

  addModel: (model) =>
    subview = @extractSubView(model)

    if @rendered
      @$el.append(subview.render().el)
      @trigger('render')

  removeModel: (model) =>
    subviewToRemove = _.select(@subviews, (subview) ->
      subview.model.id is model.id
    )[0]

    if subviewToRemove
      @subviews = _.without @subviews, subviewToRemove
      subviewToRemove.remove() if @rendered
