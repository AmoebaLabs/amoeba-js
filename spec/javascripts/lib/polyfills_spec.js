
describe('polyfills', function() {
  describe('Object.keys', function() {
    return it('should return the keys of an object', function() {
      var object;
      object = {
        foo: 'bar',
        bar: 'baz',
        baz: 'boo'
      };
      return Object.keys(object).should.eql(['foo', 'bar', 'baz']);
    });
  });
  return describe('Function.bind', function() {
    var Other, fn, self;
    self = fn = void 0;
    Other = (function() {

      function Other() {}

      return Other;

    })();
    beforeEach(function() {
      return self = this;
    });
    it('should bind the function to the given context', function() {
      fn = (function() {
        return this.should.equal(self);
      }).bind(this);
      return fn.call(Other);
    });
    return it('should call the bound function with the calling arguments', function() {
      fn = (function(arg) {
        return arg.should.equal('foo');
      }).bind(this);
      return fn.call(Other, 'foo');
    });
  });
});
