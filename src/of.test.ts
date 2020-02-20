import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { of } from './of';

describe('of', function () {

    it('creates a readerfuture that returns the provided value', function (done) {

        of(6).fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(res).to.equal(6);
                done();
            },
        )
            .with({})
            .promise();

    });

});
