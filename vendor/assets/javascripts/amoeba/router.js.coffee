class Amoeba.Router extends Backbone.Router
  render: (partial) ->
    throw "Render already called with #{@currentView}" if @currentView?
    view = Amoeba.app.lookupContext.find(partial)

    Amoeba.app.currentView = @currentView = new view(@)
