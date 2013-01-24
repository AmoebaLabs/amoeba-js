describe 'Amoeba.LookupContext', ->
  describe '#new', ->
    it 'needs a view path', ->
      ( -> new Amoeba.LookupContext()).should.throw 'Cannot find view path'

  describe '#find', ->
    Foo = undefined

    beforeEach ->
      Foo =
        Bar:
          Baz: Amoeba.View

    it 'should go up the namespace tree', ->
      context = new Amoeba.LookupContext(Foo)

      context.find('Bar.Baz').should.equal Amoeba.View
