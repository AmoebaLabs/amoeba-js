#= require ../view

class Amoeba.View.ScrollableCollection extends Amoeba.View.Collection
  loading: false
  padding: 100
  constructor: ->
    super
    $(window).on("scroll.#{@cid}", @onScroll)

  onScroll: =>
    return true if not @rendered or @loading

    winHeight = $(window).height()
    scrollTop = $(window).scrollTop()
    winBottom = winHeight + scrollTop

    elHeight = @$el.height()
    elOffset = @$el.offset().top
    elBottom = elHeight + elOffset

    if elBottom + @padding < winBottom and @collection.hasMorePages()
      @loading = true
      @collection.fetchNextPage success: @onLoad, error: @onLoad

  onLoad: =>
    @loading = false
