import * as F from 'fluture';

import { Parallel } from './constants';
import { ReaderFutureInstance } from './instance';

export const parallel: Parallel = (parallelism, rfs) =>
    new ReaderFutureInstance((t) =>
        F.parallel(parallelism, rfs.map(
            (r) => r.with(t),
        )) as any);
