import {BlockMove} from "alg"
import {KPuzzle} from "../src/kpuzzle"
import {Puzzles} from "../src/puzzle_definitions"

import { expect } from "chai";

describe("applyBlockMove()", () => {
  it("should be able to apply a block move", () => {
    const p = new KPuzzle(Puzzles["333"]);
    p.applyBlockMove(new BlockMove("R", 6));
    expect(p.serialize()).to.equal("CORNERS\n7 1 2 4 3 5 6 0\n0 0 0 0 0 0 0 0\nEDGES\n0 1 2 11 7 5 6 4 8 9 10 3\n0 0 0 0 0 0 0 0 0 0 0 0");
  });
});
