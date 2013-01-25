describe 'Backbone.sync', ->
  syncStub = attributes = model = undefined

  beforeEach ->
    attributes = id: 5, name: 'Pete Abred'
    model = new Backbone.Model(attributes)
    syncStub = sinon.stub(Backbone, 'originalSync')

  afterEach ->
    Backbone.originalSync.restore()

  describe 'creating, updating, or patching', ->
    it 'should serialize the model', ->
      model.save()
      syncStub.should.have.been.calledWithMatch('update', {}, data: JSON.stringify(attributes))

    it 'should wrap the serialized model in the paramRoot, if specified', ->
      model.paramRoot = 'user'
      model.save()

      data = JSON.stringify(user: attributes)
      syncStub.should.have.been.calledWithMatch('update', {}, data: data)

    it 'should request with json', ->
      model.save()
      syncStub.should.have.been.calledWithMatch('update', {}, contentType: 'application/json')

    it 'should merge optional data with the model', ->
      model.save {}, data:
        company: 'Bobby Meyer'

      data = JSON.stringify(_.extend(
        company: 'Bobby Meyer'
      , attributes))
      syncStub.should.have.been.calledWithMatch('update', {}, data: data)
