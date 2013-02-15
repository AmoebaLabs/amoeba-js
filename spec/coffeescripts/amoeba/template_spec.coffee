describe 'Amoeba.Template', ->
  beforeEach ->
    new Amoeba.App()

  it 'should give the template the render and helpers helper inside the template', ->
    template = (obj) ->
      obj.should.have.property 'render'
      obj.should.have.property 'helpers'

    (new Amoeba.Template(template))()

  describe '#render', ->
    template = renderStub = undefined

    beforeEach ->
      renderStub = sinon.stub(Amoeba.Template::, '_render')

    afterEach ->
      Amoeba.Template::_render.restore()

    describe 'partial', ->
      object = undefined

      beforeEach ->
        object =
          test: 'me!'

      it 'should render the template once', ->
        template = (obj) ->
          obj.render 'partial'

        (new Amoeba.Template(template))(object: object)
        renderStub.should.have.been.calledOnce

      it 'should render the template with the locals passed in', ->
        template = (obj) ->
          obj.render 'partial', locals:
            phrase: obj.object.test

        (new Amoeba.Template(template))(object: object)
        renderStub.should.have.been.calledWith 'partial', phrase: 'me!'

    describe 'partial with a collection', ->
      collection = undefined

      beforeEach ->
        collection = [1, 2, 3]

      it 'should render the template for each object in the collection', ->
        template = (obj) ->
          obj.render 'partial', collection: obj.collection

        (new Amoeba.Template(template))(collection: collection)
        renderStub.should.have.been.calledThrice

      it 'should render the template with the locals given and a reference to the current object', ->
        template = (obj) ->
          obj.render 'partial',
            collection: obj.collection
            locals:
              phrase: 'me!'

        (new Amoeba.Template(template))(collection: collection)
        renderStub.should.have.been.calledWith 'partial',
          phrase: 'me!'
          partial: 1
        renderStub.should.have.been.calledWith 'partial',
          phrase: 'me!'
          partial: 2
        renderStub.should.have.been.calledWith 'partial',
          phrase: 'me!'
          partial: 3
