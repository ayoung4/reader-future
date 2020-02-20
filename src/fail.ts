import * as F from 'fluture';

import { Fail } from './constants';
import { ReaderFutureInstance } from './instance';

export const fail: Fail = (l) => new ReaderFutureInstance(() => F.reject(l));
