import { AsksFor } from './constants';
import { ReaderFutureInstance } from './instance';

export const asksFor: AsksFor = (fn) =>
    new ReaderFutureInstance((t) => fn(t));
