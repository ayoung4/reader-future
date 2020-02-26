import * as F from 'fluture';

import { Asks } from './constants';
import { ReaderFutureInstance } from './instance';

export const asks: Asks = (fn) =>
    new ReaderFutureInstance((t) => F.of(fn(t)))
