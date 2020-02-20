import * as F from 'fluture';

import { Sequence } from './constants';
import { ReaderFutureInstance } from './instance';

export const sequence: Sequence = (rfs) =>
    new ReaderFutureInstance((t) =>
        F.parallel(1, rfs.map(
            (r) => r.with(t),
        )) as any);
