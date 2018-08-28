import {SiGNMove, BareSiGNMove} from "alg"
import {KPuzzle} from "../src/kpuzzle"
import {Puzzles} from "../src/puzzle_definitions"

import { expect } from "chai";

describe("applySiGNMove()", () => {
  it("should be able to apply a SiGN move", () => {
    const p = new KPuzzle(Puzzles["333"]);
    p.applySiGNMove(BareSiGNMove("U", 1));
    expect(p.state["EDGE"].permutation[0]).to.equal(3);
  });
});
