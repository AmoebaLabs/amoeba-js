#= require ./collection

class Amoeba.View.PaginatedCollection extends Amoeba.View
  collectionView: Amoeba.View.Collection
  constructor: (options = {}) ->
    @pages = {}
    @currentPage = options.page or 1
    @collectionView = options.collectionView or @collectionView
    @container = options.container
    super(options)

    @listenTo(@container, 'add', @add)
    @listenTo(@container, 'remove', @remove)
    @listenTo(@container, 'removePage', @removePage)

  render: (page, collection) =>
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
    @trigger('render', page)
    @

  refresh: (page = @currentPage) ->
    if @pages[page]
      @pages[page].rendered = false
      @removePage(page) if @pages[page].collection.dirty

    @container.fetch page, silent: true, success: (collection) =>
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
      view: @_render(@collectionView, _.extend(@options, collection: collection))
      rendered: false

  getPageEl: (page) ->
    @$(".page-#{page}")
