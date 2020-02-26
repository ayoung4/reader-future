export { ReaderFuture } from './constants'
import { empty } from './empty';
import { fromFuture } from './from-future';
import { fromNode } from './from-node';
import { fromPromise } from './from-promise';
import { of } from './of';
import { fail } from './fail';
import { sequence } from './sequence';
import { parallel } from './parallel';

export default {
    empty,
    fromFuture,
    fromNode,
    fromPromise,
    of,
    fail,
    sequence,
    parallel,
};
