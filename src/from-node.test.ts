import fs from 'fs';
import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { fromNode } from './from-node';

describe('fromNode', function () {

    it('creates a readerfuture from a node style callback', function (done) {

        fromNode((done) => fs.readFile('./src/constants.ts', 'utf8', done)).fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(typeof res).to.equal('string');
                done();
            },
        )
            .with({})
            .promise();

    });

});
