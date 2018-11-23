export class App {
  /**
   * @description
   * extracts the first argument
   * from the 'argv' array
   * @param {string[]} args
   * @returns {string}
   */

  public static parseProcessArgs(args: string[]): string {
    if (args.length < 3) {
      throw new Error('Missing url parameter.');
    }

    return args[2];
  }
}