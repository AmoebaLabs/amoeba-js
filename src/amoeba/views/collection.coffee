#= require ../view

class Amoeba.View.Collection extends Amoeba.View
  subviews: []
  constructor: (options = {}) ->
    options.subView ?= {}
    super(options)

    @collection.on('add', @add.bind(@))
    @collection.on('remove', @remove.bind(@))

  render: ->
    @extractSubViews()
    @$el.html(@renderSubViews())
    @rendered = true
    @trigger('render')
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

  add: (model) ->
    subview = @extractSubView(model)

    if @rendered
      @$el.append(subview.render().el)
      @trigger('render')

  remove: (model) ->
    subviewToRemove = _.select(@subviews, (subview) ->
      subview.model.id is model.id
    )[0]
    @subviews = _.without @subviews, subviewToRemove

    subviewToRemove.$el.remove() if @rendered
