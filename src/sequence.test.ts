import * as chai from 'chai';

import { throwErr, shouldHaveRun, shouldHaveFailed } from './constants.test';
import { sequence } from './sequence';
import { of } from './of';
import { fail } from './fail';

describe('sequence', function () {

    it('creates a readerfuture that runs an sequence of readerfutures and returns an array of results', function (done) {

        sequence([
            of(6),
            of('123'),
            of(7),
        ])
            .fold(
                throwErr(shouldHaveRun),
                ([six, onetwothree, seven]) => {
                    chai.expect(six).to.equal(6);
                    chai.expect(onetwothree).to.equal('123');
                    chai.expect(seven).to.equal(7);
                    done();
                },
            )
            .with({})
            .promise();

    });

    it('fails with the first failure produced by the sequence', function (done) {

        sequence([
            of(6),
            fail('123'),
            of(6),
        ])
            .fold(
                (onetwothree) => {
                    chai.expect(onetwothree).to.equal('123');
                    done();
                },
                throwErr(shouldHaveFailed),
            )
            .with({})
            .promise();

    });

});
