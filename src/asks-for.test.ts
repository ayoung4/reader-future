import * as chai from 'chai';
import * as F from 'fluture';

import { throwErr, shouldHaveRun } from './constants.test';
import { asksFor } from './asks-for';

describe('asks for', function () {

    it('creates a readerfuture from a future returning function', function (done) {

        const val = 10;

        asksFor((x) => F.of(x)).fold(
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
