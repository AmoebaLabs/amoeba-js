Amoeba.Util =
  appendQueryParam: (url, param) ->
    appendChar = if !~url.indexOf('?') then '?' else '&'
    "#{url}#{appendChar}#{param}"
