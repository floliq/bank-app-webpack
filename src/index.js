import "babel-polyfill";

import { el, setChildren } from "redom";
import "./index.scss";
import Navigo from "navigo";

const router = new Navigo("/");

const mainPage = () => {
  const container = el(
    "div",
    {
      className: "container py-4 px-3 mx-auto",
    },
    [
      el("h1", "Hello, Bootstrap and Webpack!"),
      el("button", { className: "btn btn-primary" }, "Primary button"),
    ]
  );

  return container;
};

const main = el("main");

setChildren(window.document.body, [main]);

router.on("/", () => {
  setChildren(main, [mainPage()]);
});

router.resolve();
