
describe('Amoeba.Util', function() {
  return describe('#appendQueryParam', function() {
    it('should append the page parameter to a new query string', function() {
      var url;
      url = Amoeba.Util.appendQueryParam('/test', 'page=1');
      return url.should.equal('/test?page=1');
    });
    return it('should append the page parameter to an existing query string', function() {
      var url;
      url = Amoeba.Util.appendQueryParam('/test?foo=bar', 'page=1');
      return url.should.equal('/test?foo=bar&page=1');
    });
  });
});
