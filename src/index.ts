import { attempt } from './attempt';
import { ask } from './ask';
import { asks } from './asks';
import { asksFor } from './asks-for';
import { empty } from './empty';
import { fromFuture } from './from-future';
import { fromNode } from './from-node';
import { fromPromise } from './from-promise';
import { of } from './of';
import { fail } from './fail';
import { sequence } from './sequence';
import { parallel } from './parallel';

export { ReaderFuture } from './constants';

export default {
    attempt,
    ask,
    asks,
    asksFor,
    empty,
    fromFuture,
    fromNode,
    fromPromise,
    of,
    fail,
    sequence,
    parallel,
};
