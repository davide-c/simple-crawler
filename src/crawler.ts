import {Http} from "./http";
import { writeFileSync, readFileSync } from 'fs';
import {Dumper} from "./dumper";

export class Crawler {
  /**
   * @description
   * Runs the crawler using the given process url
   */
  public run (url: string): void {
    Http
      .get(url)
      .subscribe(
        (responseBody: string) => this.processBody(responseBody),
        (err) => {
          throw new Error('Request error.');
        }
      );
  }

  /**
   * @description
   * removes multiple html comments '<!-- -->'
   * and their content from the given string
   * @param {string} body
   * @returns {string}
   */
  public removeComments(body: string): string {
    return body.replace(/<!--[\s\S]*?-->/g, '');
  }

  /**
   * @description
   * extracts the urls with a regex
   * @param {string} body
   * @returns {string[]}
   */
  public findUrls(body: string): string[] {
    const found: string[] = [];

    const regex = /<a [^>]*?href="(.*?)"/g;

    let match;

    while (match = regex.exec(body)) {
      found.push(match[1]);
    }
    return found;
  }

  /**
   * @description
   * processes the fetched body
   * and extracts all the urls.
   * @param {string} body
   */
  public processBody (body:string):void {
    body = this.removeComments(body);

    const found = this.findUrls(body);

    Dumper.text(found);

    Dumper.xml(found);
  }
}