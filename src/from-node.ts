import * as F from 'fluture';

import { FromNode } from './constants';
import { ReaderFutureInstance } from './instance';

export const fromNode: FromNode = (fn) =>
    new ReaderFutureInstance(() => F.node(fn));
