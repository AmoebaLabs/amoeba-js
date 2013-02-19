#= require ./collection

class Amoeba.View.PaginatedCollection extends Amoeba.View
  collectionView: Amoeba.View.Collection
  constructor: (options = {}) ->
    @pages = {}
    @currentPage = options.page or 1
    @collectionView = options.collectionView or @collectionView
    @container = options.container

    @listenTo(@container, 'removePage', @removePage)
    @listenTo(@container, 'remove', @removeModel)
    @listenTo(@container, 'add', @addModel)

    super(options)

  renderPage: (page, collection) =>
    @createPage(page, collection) unless @pages[page]
    return if @pages[page].rendered

    $pageEl = @getPageEl(page)
    if $pageEl.length
      $pageEl.removeClass('hide')
    else
      $pageEl = @pages[page].view.render().$el.addClass("page-#{page}")
      @$el.append($pageEl)

    if page isnt @currentPage
      if @pages[@currentPage]
        @getPageEl(@currentPage).addClass('hide')
        @pages[@currentPage].rendered = false
      @currentPage = page

    @pages[page].rendered = true
    @trigger('renderPage', page)
    @

  refresh: (page = @currentPage, options) ->
    options ?= {}
    if @pages[page]
      @pages[page].rendered = false
      @removePage(page) if @pages[page].collection.dirty

    @container.fetch page, silent: true, success: (collection) =>
      @renderPage(page, collection)
      options.success?(page)
    @

  removePage: (page) =>
    return @ unless @pages[page]

    @pages[page].view.remove()
    delete @pages[page]
    @

  addModel: (page, model) =>

  removeModel: (page, model) =>

  createPage: (page, collection) ->
    @pages[page] =
      collection: collection
      view: @_render(@collectionView, _.extend(@options, collection: collection))
      rendered: false

  getPageEl: (page) ->
    @$(".page-#{page}")
