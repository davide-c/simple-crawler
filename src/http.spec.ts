import {assert} from 'chai';
import {Crawler} from "./crawler";
import {Http} from "./http";
import {stub} from "sinon";

let crawler: Crawler;

beforeEach(() => {
  crawler = new Crawler();
});

describe('Http', () => {
  describe('get', () => {
    it('should call \'determineProtocol\' method', () => {
      const mockUrl = 'https://mockurl';

      const spyInst = stub(Http, 'determineProtocol')
        .callsFake((url: string): boolean => true);

      Http
        .get(mockUrl)
        .subscribe(() => {});

      assert.equal(spyInst.called, true);
      assert.equal(spyInst.callCount, 1);
      assert.equal(spyInst.calledWith(mockUrl), true);

      spyInst.restore();
    });
  });

  describe('determineProtocol', () => {
    it('should return the corret boolean value when providing an http url', () => {
      const mockUrl = 'http://mockurl';

      const result = Http.determineProtocol(mockUrl);

      assert.equal(result, false);
    });

    it('should return the corret boolean value when providing an https url', () => {
      const mockUrl = 'https://mockurl';

      const result = Http.determineProtocol(mockUrl);

      assert.equal(result, true);
    });

    // todo: also expect errrors to be thrown..
    // it('should throw the correct error when ...', () => {
  });
});