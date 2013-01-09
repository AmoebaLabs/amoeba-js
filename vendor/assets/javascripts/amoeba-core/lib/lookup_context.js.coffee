class Amoeba.LookupContext
  @VIEW_PATH = Amoeba.Views

  find: (template) ->
    view = @constructor.VIEW_PATH
    namespaces = template.split('.')

    (view = view[namespace]) for namespace in namespaces
    view
