describe 'Amoeba.View', ->
  template = (obj) ->
    "<div>#{obj.name}</div>"

  class TestView extends Amoeba.View
    template: template

  describe '#new', ->
    it 'should replace the template with an amoeba template', ->
      spy = sinon.spy(Amoeba, 'Template')

      new TestView()

      spy.should.have.been.calledWithNew
      spy.should.have.been.calledWith(template)

    it 'should have a reference to its parent view', ->
      parent = new TestView()
      view = new TestView(parent: parent)

      view.parent.should.equal parent

    it 'should have a reference to its local variables', ->
      view = new TestView(locals:
        foo: 'bar'
      )

      view.locals.foo.should.equal 'bar'

  describe '#_render', ->
    beforeEach ->
      Amoeba.app = new Amoeba.App(viewPath: 'test')
      view = TestView
      lookupContext = Amoeba.app.lookupContext
      sinon.stub(lookupContext, 'find').returns(view)

    it 'set the parent as itself when rendering', ->
      parent = new TestView()

      view = parent._render('TestView')
      view.parent.should.equal parent
