
describe('Amoeba.View.PaginatedCollection', function() {
  var container, view;
  container = view = void 0;
  beforeEach(function() {
    container = new Amoeba.Collection.Container;
    container.resetPage(1, [
      {
        id: 1
      }
    ]);
    return view = new Amoeba.View.PaginatedCollection({
      container: container
    });
  });
  it('should have a default current page of 1', function() {
    view = new Amoeba.View.PaginatedCollection({
      container: container
    });
    return view.currentPage.should.equal(1);
  });
  it('should load up the page if passed in', function() {
    view = new Amoeba.View.PaginatedCollection({
      page: 5,
      container: container
    });
    return view.currentPage.should.equal(5);
  });
  describe('#render', function() {
    it('should create the page', function() {
      var spy;
      spy = sinon.spy(view, 'createPage');
      view.render(1, container.pages[1]);
      view.pages[1].should.not.be.undefined;
      return spy.should.have.been.calledWith(1, container.pages[1]);
    });
    it('should not rerender the page', function() {
      var spy;
      view.render(1, container.pages[1]);
      spy = sinon.spy(view, 'getPageEl');
      view.render(1, container.pages[1]);
      return spy.should.not.have.been.called;
    });
    it('should show the new page if it exists', function() {
      var $page;
      view.render(1, container.pages[1]);
      $page = view.getPageEl(1).addClass('hide');
      view.refresh();
      return $page.hasClass('hide').should.be["false"];
    });
    it('should add the page number to the new el', function() {
      view.render(1, container.pages[1]);
      return view.getPageEl(1).hasClass('page-1').should.be["true"];
    });
    it('should append the new page if it does not exist', function() {
      view.render(1, container.pages[1]);
      return view.$('.page-1').should.exist;
    });
    describe('swtiching pages', function() {
      beforeEach(function() {
        container.resetPage(2, [
          {
            id: 2
          }
        ]);
        view.refresh();
        return view.render(2, container.pages[2]);
      });
      it('should hide the current page', function() {
        view.getPageEl(1).hasClass('hide').should.be["true"];
        return view.pages[1].rendered.should.be["false"];
      });
      return it('should change the current page', function() {
        return view.currentPage.should.equal(2);
      });
    });
    it('should render the new page', function() {
      view.render(1, container.pages[1]);
      return view.pages[1].rendered.should.be["true"];
    });
    return it('should trigger a render event', function() {
      var callback;
      callback = sinon.spy();
      view.on('render', callback);
      view.render(1, container.pages[1]);
      return callback.should.have.been.calledWith(1);
    });
  });
  describe('#refresh', function() {
    describe('existing page', function() {
      beforeEach(function() {
        return view.refresh();
      });
      it('should remove the page if the collection is dirty', function() {
        var spy;
        container.pages[1].dirty = true;
        spy = sinon.spy(view, 'removePage');
        sinon.stub(container, 'fetch');
        view.refresh();
        return spy.should.have.been.calledWith(1);
      });
      return it('should mark the page as unrendered', function() {
        var spy;
        spy = sinon.spy(view, 'getPageEl');
        view.refresh();
        return spy.should.have.been.calledWith(1);
      });
    });
    it('should fetch the page', function() {
      var spy;
      spy = sinon.spy(container, 'fetch');
      view.refresh();
      return spy.should.have.been.calledWithMatch(1, {
        silent: true
      });
    });
    return it('should render the page', function() {
      var spy;
      spy = sinon.spy(view, 'render');
      view.refresh();
      return spy.should.have.been.calledWith(1, container.pages[1]);
    });
  });
  describe('#removePage', function() {
    beforeEach(function() {
      return view.refresh();
    });
    it('should show the zero state when there is no more models');
    it('should be called when the container removes a page', function() {
      container.remove(1);
      return expect(view.pages[1]).to.be.undefined;
    });
    return it('should remove the view', function() {
      var spy;
      spy = sinon.spy(view.pages[1].view, 'remove');
      view.removePage(1);
      spy.should.have.been.called;
      return view.getPageEl(1).should.not.exist;
    });
  });
  return describe('#createPage', function() {
    it('should render the view', function() {
      var spy;
      spy = sinon.spy(view, '_render');
      view.createPage(1, container.pages[1]);
      spy.should.have.been.called;
      return view.pages[1].view.collection.should.equal(container.pages[1]);
    });
    return it('should not be rendered', function() {
      view.createPage(1, container.pages[1]);
      return view.pages[1].rendered.should.be["false"];
    });
  });
});
