import { FromFuture } from './constants';
import { ReaderFutureInstance } from './instance';

export const fromFuture: FromFuture = (f) =>
    new ReaderFutureInstance(() => f);
