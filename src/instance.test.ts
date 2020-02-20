import * as chai from 'chai';
import * as F from 'fluture';

import { ReaderFutureInstance } from './instance';
import { throwErr, shouldHaveRun, shouldHaveFailed } from './constants.test';

const fn = (x: number) => x + 3;
const identity = <T>(x: T) => x;
const pipe = <T, U, V>(f: (t: T) => U, g: (u: U) => V) => (t: T) => g(f(t));

describe('reader instance', function () {

    const val = 10;

    const ok = new ReaderFutureInstance(() => F.of(val));
    const failure = new ReaderFutureInstance(() => F.reject(val));

    describe('map', function () {

        it('has identity', function (done) {

            ok
                .map(identity)
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(val);
                        done();
                    },
                )
                .with({})
                .promise();

        });

        it('applies a function to the value', function (done) {

            ok
                .map(fn)
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(fn(val));
                        done();
                    },
                )
                .with({})
                .promise();

        });

    });

    describe('leftmap', function () {

        it('has identity', function (done) {

            failure
                .leftMap(identity)
                .fold(
                    (res) => {
                        chai.expect(res).to.equal(val);
                        done();
                    },
                    throwErr(shouldHaveFailed),
                )
                .with({})
                .promise();

        });

        it('applies a function to the failure reason', function (done) {

            failure
                .leftMap(fn)
                .fold(
                    (res) => {
                        chai.expect(res).to.equal(fn(val));
                        done();
                    },
                    throwErr(shouldHaveFailed),
                )
                .with({})
                .promise();

        });

    });

    describe('bimap', function () {

        it('has identity', function (done) {

            ok
                .bimap(identity, identity)
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(val);
                        done();
                    },
                )
                .with({})
                .promise();

        });

        it('applies the lmapper function to the failure reason', function (done) {

            failure
                .bimap(fn, identity)
                .fold(
                    (res) => {
                        chai.expect(res).to.equal(fn(val));
                        done();
                    },
                    throwErr(shouldHaveFailed),
                )
                .with({})
                .promise();

        });

        it('applies the rmapper function to the value', function (done) {

            ok
                .bimap(identity, fn)
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(fn(val));
                        done();
                    },
                )
                .with({})
                .promise();

        });

    });

    describe('contramap', function () {

        it('has identity', function (done) {

            ok
                .contramap(() => ({}))
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(val);
                        done();
                    },
                )
                .with({})
                .promise();

        });

        it('applies a function that returns the input', function (done) {

            new ReaderFutureInstance(pipe(fn, F.of))
                .contramap(() => val)
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(fn(val));
                        done();
                    },
                )
                .with({})
                .promise();

        });

    });

    describe('chain', function () {

        const val = 10;

        it('has identity', function (done) {

            ok
                .chain((x) => new ReaderFutureInstance(() => F.of(x)))
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(val);
                        done();
                    },
                )
                .with({})
                .promise();

        });

        it('applies a readerfuture returning function to the value', function (done) {

            ok
                .chain((x) => new ReaderFutureInstance(() => F.of(fn(x))))
                .fold(
                    throwErr(shouldHaveRun),
                    (res) => {
                        chai.expect(res).to.equal(fn(val));
                        done();
                    },
                )
                .with({})
                .promise();

        });

    });

});