class Amoeba.Router extends Backbone.Router
  render: (partial, options = {}) ->
    view = Amoeba.app.lookupContext.find(partial)

    Amoeba.app.currentView = @currentView = new view(options)

  removeCurrentView: ->
    @currentView?.remove?()
    @currentView = undefined
