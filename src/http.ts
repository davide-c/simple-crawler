import { Observable, Observer } from 'rxjs';
const http = require('http');
const https = require('https');

export class Http {
  public static get = (url) => {
    return new Observable((observer: Observer<any>) => {

      const transferLib = Http.determineProtocol(url)
        ? https
        : http;

      transferLib
        .get(url, (httpResponse) => {
          let output = '';

          httpResponse.on('data', (chunk) => output += chunk);

          httpResponse.on('end', () => {
            observer.next(output);
            observer.complete();
          });
        })
        .on('error', (error) => {
          observer.error(error);
        });
    });
  };

  public static determineProtocol(url: string): boolean {
    const urlParts = url.split('://');

    if (urlParts.length < 1) {
      throw new Error('Protocol not specified');
    }

    const protocol = urlParts[0];

    if (['http', 'https'].indexOf(protocol) === -1) {
      throw new Error(`Protocol '${protocol}' not supported`);
    }

    return protocol === 'https';
  }
}
