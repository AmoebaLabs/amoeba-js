describe 'Amoeba.LookupContext', ->
  describe '#find', ->
    it 'requires a template passed', ->
      context = new Amoeba.LookupContext()
      ( -> context.find()).should.throw 'A template is required'

    describe 'explicit', ->
      it 'should find the View if passed in', ->
        context = new Amoeba.LookupContext()
        context.find(Amoeba.View).should.equal Amoeba.View

    describe 'implicit', ->
      describe 'with a viewPath', ->
        context = undefined
        Foo =
          Bar:
            Baz: Amoeba.View

        beforeEach ->
          context = new Amoeba.LookupContext(Foo)

        it 'should go up the namespace tree', ->
          context.find('Bar.Baz').should.equal Amoeba.View

        it 'should throw an error if the namespace is invalid', ->
          ( -> context.find('Bar.Boo')).should.throw 'Cannot find template Foo.Bar'

      describe 'without a viewPath', ->
        context = undefined

        beforeEach ->
          context = new Amoeba.LookupContext()

        it 'should throw an error if the base cannot be found', ->
          ( -> context.find('Foo')).should.throw 'Cannot find template Foo'

        it 'should look up the base with the passed in context', ->
          Foo =
            Bar: Amoeba.View
          context.find('Bar', Foo).should.equal Amoeba.View

        it 'should look up the base via window if no context', ->
          window.Foo = Amoeba.View
          context.find('Foo').should.equal Amoeba.View
          delete window.Foo

        it 'should go up the namespace tree based on the first namespace', ->
          Foo =
            Bar:
              Baz: Amoeba.View

          context.find('Bar.Baz', Foo).should.equal Amoeba.View

        it 'should throw an error if the namespace is invalid', ->
          Foo = {}
          ( -> context.find('Bar', Foo)).should.throw 'Cannot find template Foo.Bar'
