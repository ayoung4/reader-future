import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { asks } from './asks';

describe('asks', function () {

    it('creates a readerfuture that the result of applying a function to the env', function (done) {

        const val = 10;
        const fn = (x: number) => x + 3;

        asks(fn).fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(res).to.equal(13);
                done();
            },
        )
            .with(val)
            .promise();

    });

});
