import {BlockMove, BareBlockMove} from "alg"
import {KPuzzle} from "../src/kpuzzle"
import {Puzzles} from "../src/puzzle_definitions"

import { expect } from "chai";

describe("applyBlockMove()", () => {
  it("should be able to apply a SiGN move", () => {
    const p = new KPuzzle(Puzzles["333"]);
    p.applyBlockMove(BareBlockMove("U", 1));
    expect(p.state["EDGE"].permutation[0]).to.equal(1);
  });
});
