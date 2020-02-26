import * as F from 'fluture';

import { FromPromise } from './constants';
import { ReaderFutureInstance } from './instance';

export const fromPromise: FromPromise = (fn) =>
    new ReaderFutureInstance(() => F.tryP(fn));
