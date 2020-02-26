import * as F from 'fluture';
import * as chai from 'chai';

import { throwErr, shouldHaveRun, shouldHaveFailed } from './constants.test';
import { fromPromise } from './from-promise';

describe('fromPromise', function () {

    it('creates a readerfuture from a promise that returns the provided value', function (done) {

        fromPromise(() => Promise.resolve(6)).fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(res).to.equal(6);
                done();
            },
        )
            .with({})
            .promise();

    });

    it('creates a readerfuture from a promise that fails with the provided value', function (done) {

        fromPromise(() => Promise.reject(6)).fold(
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
