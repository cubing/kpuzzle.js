import {BlockMove, algToString, Sequence} from "alg"
import {OrbitTransformation, Transformation, OrbitDefinition, KPuzzleDefinition} from "./spec"
import {MoveExpander} from "./move-expander"

export function Combine(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): Transformation {
  var newTrans: Transformation = <Transformation>{};
  for (var orbitName in def.orbits) {
    var oDef = def.orbits[orbitName];
    var o1 = t1[orbitName];
    var o2 = t2[orbitName];

    var newPerm = new Array(oDef.numPieces);
    var newOri = new Array(oDef.numPieces);
    for (var idx = 0; idx < oDef.numPieces; idx++) {
      newOri[idx] = (o1.orientation[o2.permutation[idx]] + o2.orientation[idx])
                                                         % oDef.orientations ;
      newPerm[idx] = o1.permutation[o2.permutation[idx]] ;
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
      var fromIdx = (o.permutation[idx] as number);
      newPerm[fromIdx] = idx;
      newOri[fromIdx] = (oDef.orientations - o.orientation[idx] + oDef.orientations) % oDef.orientations;
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

// TODO: Move other helpers into the definition.
export function stateForBlockMove(def: KPuzzleDefinition, blockMove: BlockMove) {
  // TODO: Optimize this.
  var repMoveString = algToString(new Sequence([new BlockMove(blockMove.outerLayer, blockMove.innerLayer, blockMove.family, 1)]));
  var move:Transformation|undefined = def.moves[repMoveString];
  if (!move) {
      move = new KPuzzle(def).expandSlices(repMoveString, blockMove) ;
  }
  if (!move) {
    throw `Unknown move family: ${blockMove.family}`
  }
  return Multiply(def, move, blockMove.amount);
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

  applyBlockMove(blockMove: BlockMove) {
    this.state = Combine(this.definition, this.state, stateForBlockMove(this.definition, blockMove));
  }

  applyMove(moveName: string): this {
    var move:Transformation|undefined = this.definition.moves[moveName];
    if (!move) {
      move = this.expandSlicesByName(moveName) ;
    }
    if (!move) {
      throw `Unknown move: ${moveName}`
    }

    this.state = Combine(this.definition, this.state, move);
    return this;
  }

  getMoveExpander(create:boolean) {
     var moveExpander = this.definition.moveExpander ;
     if (create && !moveExpander) {
        moveExpander = new MoveExpander() ;
        this.definition.moveExpander = moveExpander ;
     }
     return moveExpander ;
  }
  setFaceNames(faceNames:Array<string>):void {
     var me = this.getMoveExpander(true) ;
     if (me)
        me.setFaceNames(faceNames) ;
  }
  addGrip(grip1:string, grip2:string, nslices:number):void {
     var me = this.getMoveExpander(true) ;
     return me ? me.addGrip(grip1, grip2, nslices, this.definition) : undefined ;
  }
  expandSlices(rep:string, blockMove:BlockMove):Transformation|undefined {
     var me = this.getMoveExpander(false) ;
     return me ? me.expandSlices(rep, blockMove, this.definition) : undefined ;
  }
  expandSlicesByName(mv:string):Transformation|undefined {
     var me = this.getMoveExpander(false) ;
     return me ? me.expandSlicesByName(mv, this.definition) : undefined ;
  }

  // TODO: Implement
  // parseState(): this {}

  // TODO: Alg parsing

  // TODO: Implement.
  // invert(): this {}
}
