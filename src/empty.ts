import * as F from 'fluture';

import { Empty } from './constants';
import { ReaderFutureInstance } from './instance';

export const empty: Empty = () => new ReaderFutureInstance(() => F.of(undefined));
