describe 'polyfills', ->
  describe 'Object.keys', ->
    it 'should return the keys of an object', ->
      object =
        foo: 'bar'
        bar: 'baz'
        baz: 'boo'

      Object.keys(object).should.eql ['foo', 'bar', 'baz']

  describe 'Function.bind', ->
    self = fn = undefined
    class Other

    beforeEach ->
      self = @

    it 'should bind the function to the given context', ->
      fn = (->
        @.should.equal self
      ).bind(@)
      fn.call(Other)

    it 'should call the bound function with the calling arguments', ->
      fn = ( (arg) ->
        arg.should.equal 'foo'
      ).bind(@)
      fn.call(Other, 'foo')
