class Amoeba.PaginatedCollection extends Backbone.Collection
  urlPageQuery: 'page'
  hasMorePages: ->
    _.result(@, 'nextPage')?
  fetchNextPage: (options = {}) ->
    url = _.result(@, 'url')
    query = "#{@urlPageQuery}=#{_.result(@, 'nextPage')}"
    appendChar = if !~url.indexOf('?') then '?' else '&'

    _.extend(options,
      url: "#{url}#{appendChar}#{query}"
      update: true
      remove: false
    )

    @fetch(options)
