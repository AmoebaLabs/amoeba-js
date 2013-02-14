#= require ./collection

class Amoeba.View.PaginatedCollection extends Amoeba.View
  subView: Amoeba.View.Collection
  constructor: (options = {}) ->
    @pages = {}
    @currentPage = options.page or 1
    super(options)

    @listenTo(@collection, 'add', @add)
    @listenTo(@collection, 'remove', @remove)
    @listenTo(@collection, 'removePage', @removePage)

  render: (page, collection) =>
    @createPage(page, collection) unless @pages[page]
    return if @pages[page].rendered

    $pageEl = @getPageEl(page)
    if $pageEl
      $pageEl.show()
    else
      $pageEl = @pages[page].render().$el.addClass("page-#{page}")
      @$el.append($pageEl)

    if @pages[@currentPage]
      @getPageEl(@currentPage).hide()
      @pages[@currentPage].rendered = false

    @currentPage = page if page isnt @currentPage

    @pages[page].rendered = true
    @trigger('render', page)
    @

  refresh: (page = @currentPage) ->
    if @pages[page]
      @pages[page].rendered = false
      @removePage(page) if @pages[page].dirty

    @collection.fetch page, silent: true, success: (collection) =>
      @render(page, collection)
    @

  add: (page, model) =>

  remove: (page, model) =>

  removePage: (page) =>
    @pages[page].view.remove()
    delete @pages[page]
    @

  createPage: (page, collection) ->
    @pages[page] =
      collection: collection
      view: @_render(@subView, _.extend(@options, collection: collection))
      rendered: false

  getPageEl: (page) ->
    @$(".page-#{page}")
