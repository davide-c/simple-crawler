import {assert} from 'chai';
import {App} from "./app";

describe('App', () => {
  describe('parseUrl', () => {
    it('should return the third argument of the given array', () => {
      const mockData = ['a', 'b', 'c'];
      const result = App.parseProcessArgs(mockData);
      assert.equal(result, 'c');
    });
  });
});