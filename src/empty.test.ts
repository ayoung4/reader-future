import * as chai from 'chai';

import { throwErr, shouldHaveRun } from './constants.test';
import { empty } from './empty';

describe('empty', function () {

    it('creates a readerfuture that returns void', function (done) {

        empty().fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(res).to.equal(undefined);
                done();
            },
        )
            .with({})
            .promise();

    });

});