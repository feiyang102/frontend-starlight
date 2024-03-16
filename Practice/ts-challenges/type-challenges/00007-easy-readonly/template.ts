// type MyReadonly<T> = any

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}