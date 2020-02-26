import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { ask } from './ask';

describe('ask', function () {

    it('creates a readerfuture that returns the env', function (done) {

        const val = 10;

        ask<number>().fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(res).to.equal(val);
                done();
            },
        )
            .with(val)
            .promise();

    });

});
