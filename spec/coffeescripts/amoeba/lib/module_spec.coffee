describe 'Amoeba.Module', ->
  Obj = undefined

  beforeEach ->
    class Obj extends Amoeba.Module

  describe '#extend', ->
    Extended = undefined

    beforeEach ->
      Extended =
        method: -> 'called'
        extended: ->

    it 'should extend the object with the others methods', ->
      Obj.extend Extended
      Obj.method().should.equal 'called'

    it 'should call the "extended" method on the injected object', ->
      stub = sinon.stub(Extended, 'extended')
      Obj.extend Extended

      stub.should.have.been.called

  describe '#include', ->
    Included = undefined

    beforeEach ->
      Included =
        method: -> 'called'
        included: ->

    it 'should extend the object with the others methods', ->
      Obj.include Included
      (new Obj()).method().should.equal 'called'

    it 'should call the "included" method on the injected object', ->
      stub = sinon.stub(Included, 'included')
      Obj.include Included

      stub.should.have.been.called
