
/* lexical grammar */
%lex
%%

"Name"                 return "TOKEN_Name"
"Set"                  return "TOKEN_Set"
"Move"                 return "TOKEN_Move"
"Solved"               return "TOKEN_Solved"
"End"                  return "TOKEN_End"
[A-Za-z][A-Za-z0-9_]*  return "IDENTIFIER"
[0-9]+                 return "INTEGER"
"#"[^\r\n]*            /* ignore comment */
[ ]+                   return "SPACE"
\r?[\n]                return "LINEFEED"
<<EOF>>                return "EOF"
.                      return "INVALID"

/lex

%% /* language grammar */

expressions
    : DEFINITION_FILE EOF
        { return $1; }
    ;

NEWLINE
    : LINEFEED
    | SPACE LINEFEED
    ;

NUM_IDENTIFIER
    : IDENTIFIER
    | INTEGER IDENTIFIER { $$ = "" + $INTEGER + $IDENTIFIER }
    ;

MOVE_IDENTIFIER
    : NUM_IDENTIFIER
       { if (!/^[1-9]?[0-9]*[A-Za-z][A-Za-z_]*$/.test($NUM_IDENTIFIER))
           throw new Error("Illegal move syntax " + $NUM_IDENTIFIER) ;
       }
    ;

NAME_DEFINITION
    : TOKEN_Name SPACE NUM_IDENTIFIER
        {$$ = $NUM_IDENTIFIER;}
    ;

ORBIT_DEFINITION
    : TOKEN_Set SPACE IDENTIFIER SPACE INTEGER SPACE INTEGER
        {$$ = [$IDENTIFIER, {numPieces: parseInt($5), orientations: parseInt($7)}];}
    ;

ORBIT_DEFINITIONS
    : ORBIT_DEFINITION
        {$$ = {};               $$[$ORBIT_DEFINITION[0]] = $ORBIT_DEFINITION[1];}
    | ORBIT_DEFINITIONS INTERSTITIAL ORBIT_DEFINITION
        {$$ = $ORBIT_DEFINITIONS; $$[$ORBIT_DEFINITION[0]] = $ORBIT_DEFINITION[1];}
    ;

INTERSTITIAL
    : NEWLINE
    | INTERSTITIAL NEWLINE
    ;

OPTIONAL_NEWLINES
    :
    | INTERSTITIAL
    ;

NUMBERS
    :
        {$$ = [];}
    | INTEGER
        {$$ = [parseInt($INTEGER)];}
    | NUMBERS SPACE INTEGER
        {$$ = $NUMBERS.concat([parseInt($INTEGER)]);}
    ;

PERMUTATION
    : NUMBERS NEWLINE
        {$$ = $NUMBERS.map(function(x) {return x - 1;});}
    ;

DEFINITION
    : IDENTIFIER NEWLINE PERMUTATION
        {
            $$ = [$IDENTIFIER, {permutation: $PERMUTATION, orientation: []}];
            for (var i = 0; i < $PERMUTATION.length; i++) {
                $$[1].orientation.push(0);
            }
        }
    | IDENTIFIER NEWLINE PERMUTATION NUMBERS NEWLINE
        {$$ = [$IDENTIFIER, {permutation: $PERMUTATION, orientation: $NUMBERS}];}
    ;

DEFINITIONS
    : DEFINITION
        {$$ = {};           $$[$DEFINITION[0]] = $DEFINITION[1];}
    | DEFINITIONS DEFINITION
        {$$ = $DEFINITIONS; $$[$DEFINITION[0]] = $DEFINITION[1];}
    ;

START_PIECES
    : TOKEN_Solved NEWLINE DEFINITIONS TOKEN_End
        {$$ = $DEFINITIONS}
    ;

MOVE
    : TOKEN_Move SPACE MOVE_IDENTIFIER NEWLINE DEFINITIONS TOKEN_End
        {$$ = [$MOVE_IDENTIFIER, $DEFINITIONS];}
    ;

MOVES
    : MOVE
        {$$ = {};     $$[$MOVE[0]] = $MOVE[1];}
    | MOVES INTERSTITIAL MOVE
        {$$ = $MOVES; $$[$MOVE[0]] = $MOVE[1];}
    ;

DEFINITION_FILE
    : OPTIONAL_NEWLINES NAME_DEFINITION INTERSTITIAL ORBIT_DEFINITIONS INTERSTITIAL START_PIECES INTERSTITIAL MOVES OPTIONAL_NEWLINES
        {$$ = {name: $NAME_DEFINITION, orbits: $ORBIT_DEFINITIONS, moves: $MOVES, startPieces: $START_PIECES};}
    ;
