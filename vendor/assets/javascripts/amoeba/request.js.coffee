Amoeba.Request =
  ajax: $.ajax
  request: (model, options) ->
    success = options.success
    options.success = (xhr) ->
      success?(model, xhr)

    params =
      data: model.toJson()
      url: model.url

    Amoeba.Request.ajax($.extend(params, options))

  post: (model, options) ->
    Amoeba.Request.request(model, $.extend(options, type: 'POST'))

  put: (model, options) ->
    Amoeba.Request.request(model, $.extend(options, type: 'PUT'))

  delete: (model, options) ->
    Amoeba.Request.request(model, $.extend(options, type: 'DELETE'))

  get: (model, options) ->
    Amoeba.Request.request(model, $.extend(options, type: 'GET'))
