import {Crawler} from "./crawler";
import {App} from "./app";

const url = App.parseProcessArgs(process.argv);

const cr = new Crawler();

cr.run(url);

