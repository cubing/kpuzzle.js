import {KPuzzleDefinition} from "./kpuzzle"
import {parse as jison_parse} from "./jison_parser";

function FixMoves(def: KPuzzleDefinition) {
   for (var moveName in def.moves) {
      var move = def.moves[moveName] ;
      for (var orbitName in def.orbits) {
         var moveOrbit = move[orbitName] ;
         var oldOrientation = moveOrbit.orientation ;
         var perm = moveOrbit.permutation ;
         var newOrientation = new Array(oldOrientation.length) ;
         for (var i=0; i<perm.length; i++)
            newOrientation[i] = oldOrientation[perm[i]-1] ;
         moveOrbit.orientation = newOrientation ;
      }
   }
   return def ;
}

export function parse(s: string): KPuzzleDefinition {
  return FixMoves(<KPuzzleDefinition>jison_parse(s));
}
