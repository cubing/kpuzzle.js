import { BlockMove } from "alg";
export declare class OrbitTransformation {
    permutation: number[];
    orientation: number[];
}
export declare class Transformation {
    [/* orbit name */ key: string]: OrbitTransformation;
}
export declare class OrbitDefinition {
    numPieces: number;
    orientations: number;
}
export declare class KPuzzleDefinition {
    name: string;
    orbits: {
        [/* orbit name */ key: string]: OrbitDefinition;
    };
    startPieces: Transformation;
    moves: {
        [/* move name */ key: string]: Transformation;
    };
    svg?: string;
}
export declare function Combine(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): Transformation;
export declare function Multiply(def: KPuzzleDefinition, t: Transformation, amount: number): Transformation;
export declare function IdentityTransformation(definition: KPuzzleDefinition): Transformation;
export declare function Invert(def: KPuzzleDefinition, t: Transformation): Transformation;
export declare function EquivalentTransformations(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): boolean;
export declare function EquivalentStates(def: KPuzzleDefinition, t1: Transformation, t2: Transformation): boolean;
export default class KPuzzle {
    definition: KPuzzleDefinition;
    state: Transformation;
    constructor(definition: KPuzzleDefinition);
    serialize(): string;
    applyBlockMove(blockMove: BlockMove): void;
    applyMove(moveName: string): this;
}
export declare class SVG {
    kPuzzleDefinition: KPuzzleDefinition;
    element: HTMLElement;
    gradientDefs: SVGDefsElement;
    private originalColors;
    private gradients;
    private svgID;
    constructor(kPuzzleDefinition: KPuzzleDefinition);
    private newGradient;
    private elementID;
    private elementByID;
    draw(definition: KPuzzleDefinition, state: Transformation, nextState?: Transformation, fraction?: number): void;
}
