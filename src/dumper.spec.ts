import {assert, expect} from 'chai';
import {Crawler} from "./crawler";
import {Http} from "./http";
import {stub} from "sinon";
import {of} from "rxjs/index";
import {Dumper} from "./dumper";
import * as fs from "fs";
import {writeFileSync} from "fs";

describe('Dumper', () => {
  describe('text', () => {
    it('should call \'writeFileSync\' with the correct arguments', () => {

      const mockPath = Dumper.targetTextPath;

      const mockData = ['a', 'b', 'c'];

      const expectedTextArg = 'a\nb\nc';

      const spyInst = stub(fs, 'writeFileSync')
        .callsFake((path: string, data: string) => {});

      Dumper.text(mockData);

      assert.equal(spyInst.called, true);
      assert.equal(spyInst.callCount, 1);
      // individually testing arguments would improve the test readability
      assert.equal(spyInst.calledWith(mockPath, expectedTextArg), true);

      spyInst.restore();
    });
  });

  describe('xml', () => {
    // todo: implement xml method test
  });
});