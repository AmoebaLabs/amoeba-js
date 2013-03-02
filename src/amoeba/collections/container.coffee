class Amoeba.Collection.Container extends Amoeba.Module
  @include Backbone.Events
  urlPageQuery: 'page'
  collection: Backbone.Collection

  constructor: ->
    @pages = {}
    @initialize.apply(@, arguments)

  initialize: ->

  sync: ->
    Backbone.sync.apply(@, arguments)

  parse: (resp) ->
    resp

  resetPage: (page, resp, options = {}) ->
    options = _.clone(options)
    options.parse = true
    if @pages[page]
      @pages[page].reset(@parse(resp), options)
    else
      collection = new @collection()
      collection.page = page
      collection.model = @model if @model
      collection.reset(@parse(resp), options)
      collection.on('all', @_onCollectionEvent, @)
      @pages[page] = collection
    @pages[page].dirty = false
    @pages[page]

  _onCollectionEvent: (event, model, collection) ->
    if event is 'add'
      @trigger('add', collection.page, model, @)
    else if event is 'remove'
      @shift(collection.page)
      @trigger('remove', collection.page, model, @)

  reset: ->
    @remove(page) for page, collection of @pages
    @pages = {}
    @

  shift: (page) ->
    return @ if @perPage and @pages[page].length >= @perPage
    nextPage = page + 1

    if @pages[nextPage]
      @_shift(page, nextPage)
    else
      @fetch nextPage, success: =>
        @_shift(page, nextPage) if @pages[nextPage]
    @remove(oldPage) for oldPage, collection of @pages when oldPage > nextPage
    @

  _shift: (page, nextPage) ->
    collectionToShift = @pages[nextPage]
    shifted = collectionToShift.first()

    if shifted
      collectionToShift.remove(shifted, silent: true)
      @pages[page].add(shifted)

    if collectionToShift.length == 0
      @remove(nextPage)
    else
      collectionToShift.dirty = true

  remove: (page) ->
    return @ unless @pages[page]
    @pages[page].reset()
    @pages[page].off('all', @_onCollectionEvent, @)
    delete @pages[page]
    @trigger('removePage', page, @)
    @

  fetch: (page, options = {}) ->
    options = _.clone(options)
    page = parseInt(page)

    if @pages[page] and not @pages[page].dirty and not options.force
      return options.success?(@pages[page], @, @pages[page].toJSON(), options)

    success = options.success
    options.success = (container, resp) =>
      collection = @resetPage(page, resp, options)
      success?(collection, @, resp, options)

    url = _.result(@, 'url')

    throw 'No url specified' unless url
    options.url = Amoeba.Util.appendQueryParam(url, "#{@urlPageQuery}=#{page}")
    @sync('read', @, options)

  toJSON: (options) ->
    _.map @pages, (collection, page) ->
      obj = {}
      obj[page] = collection.toJSON(options)
      obj
