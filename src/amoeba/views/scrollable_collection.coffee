#= require ./collection

class Amoeba.View.ScrollableCollection extends Amoeba.View.Collection
  loading: false
  padding: 100

  constructor: ->
    super
    $(window).on("scroll.#{@cid}", @onScroll)

  onScroll: =>
    return true if not @rendered or @loading

    if @needsToLoad() and @collection.hasMorePages()
      @loading = true
      @collection.fetchNextPage success: @onLoad, error: @onLoad

  needsToLoad: ->
    winHeight = $(window).height()
    scrollTop = $(window).scrollTop()
    winBottom = winHeight + scrollTop

    elHeight = @$el.height()
    elOffset = @$el.offset().top
    elBottom = elHeight + elOffset

    elBottom + @padding < winBottom

  onLoad: =>
    @loading = false
