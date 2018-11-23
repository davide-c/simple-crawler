import {writeFileSync} from 'fs';
import * as js2xmlparser from 'js2xmlparser';
import {ISiteMapUrllNode} from "./sitemap-url-node.interface";

/**
 * I have used a static class due to time constraints,
 * The dumper output path should be configurable through
 * a yaml config file. Also it should be possible to override
 * the target path with a 'path' argument.
 */

export class Dumper {
  public static targetTextPath = `${process.cwd()}/out/output.txt`;
  public static targetXmlPath = `${process.cwd()}/out/output.xml`;

  /**
   * @description
   * converts a 2d array in a newline separated string
   * which is written at the default path
   * @param {string[]} data
   */
  public static text (data: string[]): void {
    const text = data
      .filter((url: string) => url !== '')
      .join('\n');

    writeFileSync(Dumper.targetTextPath, text);
  }

  public static xml (urls: string[]): void {
    const options = { declaration: { include: true, encoding: "UTF-8", version: "1.0" } };

    const sitemap = {
      url: [
        ... urls.map((url: string) => ({loc: url}))
      ]
    };

    const xml = js2xmlparser.parse('sitemap', sitemap, options);

    writeFileSync(Dumper.targetXmlPath, xml);
  }
}