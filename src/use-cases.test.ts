import * as chai from 'chai';
import fs from 'fs';

import { throwErr, shouldHaveRun } from './constants.test';
import { ReaderFuture } from './constants';
import { ask } from './ask';
import { asks } from './asks';
import { fromNode } from './from-node';
import { attempt } from './attempt';

describe('use cases', function () {

    it(`can create a program that requires a filename and 
    array and reads the file, splits the contents into lines, 
    pushes each line to the array and then returns the array`, function (done) {

        type Env = {
            items: string[];
            filename: string;
        };

        type Action<T> = ReaderFuture<Env, Error, T>

        type ReadFile = (filename: string) => Action<string>;

        type PushLines = (lines: string[]) => Action<void>;

        type GetLines = Action<string[]>;

        const readFile: ReadFile = (filename) =>
            fromNode((done) => { fs.readFile(filename, 'utf8', done); });

        const pushLines: PushLines = (lines) =>
            attempt(({ items }) => lines.forEach((l) => items.push(l)));

        const getLines: GetLines = asks(({ items }) => items);

        const program: Action<string[]> =
            ask<Env>()
                .map(({ filename }) => filename)
                .chain(readFile)
                .map((contents) => contents.split('\n'))
                .chain(pushLines)
                .and(getLines);

        program.fold(
            throwErr(shouldHaveRun),
            (res) => {
                chai.expect(typeof res).to.equal('object');
                chai.expect(typeof res.length).to.equal('number');
                chai.expect(res.length > 0).to.equal(true);
                done();
            },
        )
            .with({
                items: [],
                filename: './src/constants.ts',
            })
            .promise();

    });

});
