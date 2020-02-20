import * as F from 'fluture';

import { Of } from './constants';
import { ReaderFutureInstance } from './instance';

export const of: Of = (r) => new ReaderFutureInstance(() => F.of(r));
