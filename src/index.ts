export { ReaderFuture } from './constants'
import { empty } from './empty';
import { of } from './of';
import { fail } from './fail';
import { sequence } from './sequence';
import { parallel } from './parallel';

export default {
    empty,
    of,
    fail,
    sequence,
    parallel,
};
