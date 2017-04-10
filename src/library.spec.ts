import { expect } from "chai";
import "mocha";

import hello from "./library";

describe(`hello`, () => {
  it(`should return "Hello, world!"`, () => {
    expect(hello()).to.equal(`Hello, world!`);
  });
});
