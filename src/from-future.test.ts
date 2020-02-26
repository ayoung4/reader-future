import * as F from 'fluture';
import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { fromFuture } from './from-future';

describe('fromFuture', function () {

    it('creates a readerfuture from a future that returns the provided value', function (done) {

        fromFuture(F.of(6)).fold(
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
