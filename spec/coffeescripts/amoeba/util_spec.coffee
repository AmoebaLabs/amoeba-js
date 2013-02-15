describe 'Amoeba.Util', ->
  describe '#appendQueryParam', ->
    it 'should append the page parameter to a new query string', ->
      url = Amoeba.Util.appendQueryParam '/test', 'page=1'

      url.should.equal '/test?page=1'

    it 'should append the page parameter to an existing query string', ->
      url = Amoeba.Util.appendQueryParam '/test?foo=bar', 'page=1'

      url.should.equal '/test?foo=bar&page=1'
