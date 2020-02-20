import * as chai from 'chai';

export const shouldHaveRun = new chai.AssertionError('expected program to run');
export const shouldHaveFailed = new chai.AssertionError('expected program to fail');

export const throwErr = (err: Error) => () => {
    throw err;
};
