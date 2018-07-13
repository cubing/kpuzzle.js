import {KPuzzleDefinition} from "./kpuzzle"
import {parse as jison_parse} from "./jison_parser";

export function parse(s: string): KPuzzleDefinition {
  return <KPuzzleDefinition>jison_parse(s);
}
