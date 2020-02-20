import * as F from 'fluture';

export class ReaderFutureInstance<T, L, R> {
    comp: (t: T) =>  F.FutureInstance<L, R>;
    constructor(fn: (t: T) => F.FutureInstance<L, R>) {
        this.comp = fn;
    }
    with(t: T) {
        return this.comp(t);
    }
    map<U>(fn: (r: R) => U): ReaderFutureInstance<T, L, U> {
        return new ReaderFutureInstance((t) =>
            this.comp(t).map(fn))
    }
    leftMap<U>(fn: (l: L) => U): ReaderFutureInstance<T, U, R> {
        return new ReaderFutureInstance((t) =>
            this.comp(t).bimap(fn, (x) => x));
    }
    bimap<U, V>(lmapper: (l: L) => U, rmapper: (r: R) => V): ReaderFutureInstance<T, U, V> {
        return new ReaderFutureInstance((t) =>
            this.comp(t).bimap(lmapper, rmapper));
    }
    contramap<U>(fn: (u: U) => T): ReaderFutureInstance<U, L, R> {
        return new ReaderFutureInstance((t) =>
            this.comp(fn(t)));
    }
    chain<U>(fn: (r: R) => ReaderFutureInstance<T, L, U>): ReaderFutureInstance<T, L, U> {
        return new ReaderFutureInstance((t) =>
            this.comp(t).chain((r) => fn(r).with(t)));
    }
    and<U>(other: ReaderFutureInstance<T, L, U>): ReaderFutureInstance<T, L, U> {
        return new ReaderFutureInstance((t) =>
            this.comp(t).and(other.with(t)));
    }
    or(other: ReaderFutureInstance<T, L, R>): ReaderFutureInstance<T, L, R> {
        return new ReaderFutureInstance((t) =>
            this.comp(t).or(other.with(t)));
    }
    fold<U>(lmapper: (l: L) => U, rmapper: (r: R) => U): ReaderFutureInstance<T, L, U> {
        return new ReaderFutureInstance((t) => this.comp(t).fold(lmapper, rmapper));
    }
}
