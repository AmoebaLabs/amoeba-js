describe 'Amoeba.Helpers', ->
  MyHelper =
    helpMe: ->
      'helped'

  beforeEach ->
    Amoeba.Helpers.register MyHelper

  describe '.register', ->
    it 'should add a helper', ->
      Amoeba.Helpers.helpers.should.eql [MyHelper]

  describe '#new', ->
    it 'should add all the methods of the registered helpers to the instance', ->
      helpers = new Amoeba.Helpers()

      helpers.helpMe.should.be.ok
      helpers.helpMe().should.equal('helped')
