import {assert, expect} from 'chai';
import {Crawler} from "./crawler";
import {Http} from "./http";
import {stub} from "sinon";
import {of} from "rxjs/index";
import {Dumper} from "./dumper";

let crawler: Crawler;

beforeEach(() => {
  crawler = new Crawler();
});

describe('Crawler', () => {
  describe('run', () => {
    it('should call http get method with the provided value', () => {
      const mockUrl = 'https://mockurl';

      const spyInst = stub(Http, 'get')
        .callsFake((url: string) => of(''));

      const spyInst1 = stub(crawler, 'processBody')
        .callsFake((body: string) => {});

      crawler.run(mockUrl);

      assert.equal(spyInst.called, true);

      assert.equal(spyInst.calledWith(mockUrl), true);

      assert.equal(spyInst1.called, true);

      spyInst.restore();
      spyInst1.restore();
    });
  });

  describe('removeComments', () => {
    it('should remove html comments', () => {
      const mockHtml = '<div><a></a><!-- mock comment block <a href="">--></div>';

      const expectedHtml = '<div><a></a></div>';

      const result = crawler.removeComments(mockHtml);

      assert.equal(result, expectedHtml);
    });
  });

  describe('findUrls', () => {
    it('should extract urls', () => {
      const mockUrl0 = 'https://mockUrl0';
      const mockUrl1 = '/mockUrl1';

      const mockHtml = `<div>
        <a href="${mockUrl0}"></a>
        <a class="test" href="${mockUrl1}"></a>
        <a class="test" href="${mockUrl1}"></a>
      </div>`;

      const expected = [mockUrl0, mockUrl1, mockUrl1];

      const result = crawler.findUrls(mockHtml);

      expect(result).to.eql(expected);
    });
  });

  describe('processBody', () => {
    it('call once \'removeComments\' and \'findUrl\' methods', () => {
      const mockHtml = '<div><a><!-- --></a></div>';
      const mockFilteredHtml = '<div><a></a></div>';

      const spyInst0 = stub(crawler, 'removeComments')
        .callsFake((url: string): string => mockFilteredHtml);

      const spyInst1 = stub(crawler, 'findUrls')
        .callsFake((url: string): string[] => []);

      const spyInst2 = stub(Dumper, 'text')
        .callsFake((data: string[]) => {});

      const spyInst3 = stub(Dumper, 'xml')
        .callsFake((urls: string[]) => {});

      crawler.processBody(mockHtml);

      assert.equal(spyInst0.called, true);
      assert.equal(spyInst0.callCount, 1);
      assert.equal(spyInst0.calledWith(mockHtml), true);

      assert.equal(spyInst1.called, true);
      assert.equal(spyInst1.callCount, 1);
      assert.equal(spyInst1.calledWith(mockFilteredHtml), true);

      assert.equal(spyInst2.called, true);
      assert.equal(spyInst2.callCount, 1);

      assert.equal(spyInst3.called, true);
      assert.equal(spyInst3.callCount, 1);

      spyInst0.restore();
      spyInst1.restore();
      spyInst2.restore();
      spyInst3.restore();
    });
  });
});