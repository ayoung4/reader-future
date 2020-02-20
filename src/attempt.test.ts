import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { attempt } from './attempt';

describe('attempt', function () {

    const val = 10;
    const fn = (x: number) => x + 3;

    it('creates a readerfuture that runs', function (done) {

        attempt(fn).fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(res).to.equal(fn(val));
                done();
            },
        )
            .with(val)
            .promise();

    });

});