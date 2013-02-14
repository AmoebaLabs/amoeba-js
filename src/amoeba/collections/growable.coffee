class Amoeba.Collection.Growable extends Backbone.Collection
  urlPageQuery: 'page'
  reset: ->
    @nextPage = undefined
    super
  hasMorePages: ->
    _.result(@, 'nextPage')?
  fetch: (options = {}) ->
    url = _.result(@, 'url')

    throw 'No url specified' unless url

    query = "#{@urlPageQuery}=#{_.result(@, 'nextPage')}"
    _.extend(options,
      url: Amoeba.Util.appendQueryParam(url, query)
      update: true
      remove: false
    )

    super(options)
