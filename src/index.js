import 'babel-polyfill';

import { el, setChildren } from "redom";
import "./index.scss";
import Navigo from "navigo";

const router = new Navigo("/");

const mainPage = () => {
  const body = el("h1", "hello");

  return body;
};

const main = el("main");

setChildren(window.document.body, [main]);

router.on("/", () => {
  setChildren(main, [mainPage()]);
});

router.resolve();
