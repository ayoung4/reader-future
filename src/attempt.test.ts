import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { attempt } from './attempt';

describe('attempt', function () {

    it('creates a readerfuture from an effectful function', function (done) {

        let val = 10;
        const fn = (x: number) => val += x;

        attempt(fn).fold(
            throwErr(shouldHaveRun),
            () => {
                chai.expect(val).to.equal(13);
                done();
            },
        )
            .with(3)
            .promise();

    });

});