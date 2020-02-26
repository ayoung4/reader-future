import * as F from 'fluture';

import { Ask } from './constants';
import { ReaderFutureInstance } from './instance';

export const ask: Ask = () =>
    new ReaderFutureInstance((t) => F.of(t))
