import {BlockMove} from "alg"
// TODO: Properly handle freezing
export class OrbitTransformation {
  permutation: number[]
  orientation: number[]
}
// TODO: Use a list instead of an object for performance?
export class Transformation {
  [/* orbit name */key: string]: OrbitTransformation
}

export class OrbitDefinition {
  numPieces: number
  orientations: number
}
export class KPuzzleDefinition {
  name: string
  orbits: {[/* orbit name */key: string]: OrbitDefinition}
  startPieces: Transformation // TODO: Expose a way to get the transformed start pieces.
  moves: {[/* move name */key: string]: Transformation}
  svg?: string
}

export function Combine(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): Transformation {
  var newTrans: Transformation = <Transformation>{};
  for (var orbitName in def.orbits) {
    var oDef = def.orbits[orbitName];
    var o1 = t1[orbitName];
    var o2 = t2[orbitName];

    var newPerm = new Array(oDef.numPieces);
    var newOri = new Array(oDef.numPieces);
    for (var idx = 0; idx < oDef.numPieces; idx++) {
      // We subtract 1 to translate from location to index.
      newOri[idx] = (o1.orientation[o2.permutation[idx]-1] + o2.orientation[idx])
                                                         % oDef.orientations ;
      newPerm[idx] = o1.permutation[o2.permutation[idx]-1] ;
    }
    newTrans[orbitName] = {permutation: newPerm, orientation: newOri};
  }

  return newTrans;
}

export function Multiply(def: KPuzzleDefinition, t: Transformation, amount: number): Transformation {
  if (amount < 0) {
    return Multiply(def, Invert(def, t), -amount);
  }
  if (amount === 0) {
    return IdentityTransformation(def);
  }
  if (amount === 1) {
    return t;
  }
  var halfish = Multiply(def, t, Math.floor(amount/2));
  var twiceHalfish = Combine(def, halfish, halfish);
  if (amount % 2 === 0) {
    return twiceHalfish;
  } else {
    return Combine(def, t, twiceHalfish);
  }
}

export function IdentityTransformation(definition: KPuzzleDefinition): Transformation {
  var transformation = <Transformation>{};
  for (var orbitName in definition.orbits) {
    var orbitDefinition = definition.orbits[orbitName];
    var newPermutation = new Array(orbitDefinition.numPieces);
    var newOrientation = new Array(orbitDefinition.numPieces);
    for (var i = 0; i < orbitDefinition.numPieces; i ++) {
      newPermutation[i] = i;
      newOrientation[i] = 0;
    }
    var orbitTransformation = {permutation: newPermutation, orientation: newOrientation};
    transformation[orbitName] = orbitTransformation;
  }
  return transformation;
}

export function Invert(def: KPuzzleDefinition, t: Transformation): Transformation {
  var newTrans: Transformation = <Transformation>{};
  for (var orbitName in def.orbits) {
    var oDef = def.orbits[orbitName];
    var o = t[orbitName];

    var newPerm = new Array(oDef.numPieces);
    var newOri = new Array(oDef.numPieces);
    for (var idx = 0; idx < oDef.numPieces; idx++) {
      var fromIdx = (o.permutation[idx] as number) - 1;
      newPerm[fromIdx] = idx + 1;
      newOri[fromIdx] = (oDef.orientations - o.orientation[idx]) % oDef.orientations;
    }
    newTrans[orbitName] = {permutation: newPerm, orientation: newOri};
  }
  return newTrans;
}

export function EquivalentTransformations(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): boolean {
  for (var orbitName in def.orbits) {
    var oDef = def.orbits[orbitName];
    var o1 = t1[orbitName];
    var o2 = t2[orbitName];

    for (var idx = 0; idx < oDef.numPieces; idx++) {
      if (o1.orientation[idx] !== o2.orientation[idx]) {
        return false;
      }
      if (o1.permutation[idx] !== o2.permutation[idx]) {
        return false;
      }
    }
  }
  return true;
}

export function EquivalentStates(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): boolean {
  // Turn transformations into states.
  // This accounts for indistinguishable pieces.
  return EquivalentTransformations(
    def,
    Combine(def, def.startPieces, t1),
    Combine(def, def.startPieces, t2)
  );
}

export class KPuzzle {
  public state: Transformation
  constructor(public definition: KPuzzleDefinition) {
    this.state = IdentityTransformation(definition);
  }

  serialize(): string {
    var output = ""
    for (var orbitName in this.definition.orbits) {
      output += orbitName + "\n";
      output += this.state[orbitName].permutation.join(" ") + "\n";
      output += this.state[orbitName].orientation.join(" ") + "\n";
    }
    output = output.slice(0, output.length - 1); // Trim last newline.
    return output;
  }

  applyBlockMove(BlockMove: BlockMove) {
    var move = this.definition.moves[BlockMove.family];
    if (!move) {
      throw `Unknown move: ${BlockMove.family}`
    }
    var multiple = Multiply(this.definition, move, BlockMove.amount);
    this.state = Combine(this.definition, this.state, multiple);
  }

  applyMove(moveName: string): this {
    var move = this.definition.moves[moveName];
    if (!move) {
      throw `Unknown move: ${moveName}`
    }

    this.state = Combine(this.definition, this.state, move);
    return this;
  }

  // TODO: Implement
  // parseState(): this {}

  // TODO: Alg parsing

  // TODO: Implement.
  // invert(): this {}
}
