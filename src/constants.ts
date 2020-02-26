import * as F from 'fluture';
import { ValuesType, UnionToIntersection } from 'utility-types';

import { ReaderFutureInstance } from './instance';

export type ReaderFuture<T, L, R> = ReaderFutureInstance<T, L, R>;

export type Empty = () => ReaderFuture<{}, never, void>;

export type Of = <R>(r: R) => ReaderFuture<{}, never, R>;

export type Fail = <L>(l: L) => ReaderFuture<{}, L, never>;

export type Ask = <T extends object>() => ReaderFuture<T, never, T>;

export type Asks = <T extends object, R>(fn: (t: T) => R) => ReaderFuture<T, never, R>;

type ConfigOf<T> = T extends ReaderFuture<infer U, any, any> ? U : never;
type LeftOf<T> = T extends ReaderFuture<any, infer U, any> ? U : never;
type RightOf<T> = T extends ReaderFuture<any, any, infer U> ? U : never;

type SequencedConfig<T extends ReaderFuture<any, any, any>[]> = { [key in keyof T]: ConfigOf<T[key]> };
type SequencedLeft<T extends ReaderFuture<any, any, any>[]> = { [key in keyof T]: LeftOf<T[key]> };
type SequencedRight<T extends ReaderFuture<any, any, any>[]> = { [key in keyof T]: RightOf<T[key]> };

export type Sequence = <T extends ReaderFuture<any, any, any>[]>(rfs: T) =>
    ReaderFuture<
        UnionToIntersection<ValuesType<SequencedConfig<T>>>,
        ValuesType<SequencedLeft<T>>,
        SequencedRight<T>
    >;

export type Parallel = <T extends ReaderFuture<any, any, any>[]>(parallelism: number, rfs: T) =>
    ReaderFuture<
        UnionToIntersection<ValuesType<SequencedConfig<T>>>,
        ValuesType<SequencedLeft<T>>,
        SequencedRight<T>
    >;

export type FromFuture = <L, R>(f: F.FutureInstance<L, R>) => ReaderFuture<{}, L, R>;

export type FromPromise = <L, R>(fn: () => Promise<R>) => ReaderFuture<{}, L, R>;

export type FromNode = <L, R>(fn: (done: F.Nodeback<L, R>) => void) => ReaderFuture<{}, L, R>;

export type Attempt = <T, L, R>(fn: (t: T) => R) => ReaderFuture<T, L, R>;
