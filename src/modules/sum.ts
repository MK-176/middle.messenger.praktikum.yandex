export function sum(...args: Array<number>): number {
  if (args.length === 0) {
    throw Error('sum required at least 1 argument')
  }

  return args.reduce((result: number, current: number): number => result + current, 0);
}
