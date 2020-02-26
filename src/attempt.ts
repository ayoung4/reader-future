import * as F from 'fluture';

import { Attempt } from './constants';
import { ReaderFutureInstance } from './instance';

export const attempt: Attempt = (fn) =>
    new ReaderFutureInstance((t) => F.attempt(() => fn(t)))
