import * as chai from 'chai';

import { throwErr, shouldHaveFailed } from './constants.test';
import { fail } from './fail';

describe('fail', function () {

    it('creates a readerfuture that fails with the provided reason', function (done) {

        fail(6).fold(
            (res) => {
                chai.expect(res).to.equal(6);
                done();
            },
            throwErr(shouldHaveFailed),
        )
            .with({})
            .promise();

    });

});