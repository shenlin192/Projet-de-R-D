# Notes on clang

## Usage
The following command can be used to see the AST
$ clang-3.5 -Xclang -ast-dump -fsyntax-only <file_name>

## clang key words

### Declaration
- `VarDecl`: declare a variable
- `FunctionDecl`: declare a function
- `ParmVarDecl`: declare a function's parameter

### Statement
- `CompoundStmt`: a chunk of statements
- `WhileStmt`:
- `NullStmt`:

### Initialization
- `cinit`: initialize of a variable

### Expression
- `ImplicitCastExpr`: An expression that has an implicit type
- `DeclRefExpr`: eg. parameter of a function
- `postfix`: eg. a++

### Literal
- `IntegerLiteral`: an integer that can be represented in byte code

### Operator
- `BinaryOperator`: takes two operands
- `UnaryOperator`: takes only one operand
- `CompoundAssignOperator`: eg. a += 1;


## C++ knowledge
### lvalue To rvalue:
lvalue is converted into rvalue automatically because some operators require rvalue. For example `int a = 0; int b = a + 1` the second a will be converted into rvalue. rvalue cannot be converted into lvalue but can be producted by a rvalue. Non-const lvalue references cannot be assigned rvalues. For example, the unary '\*' (dereference) operator takes an rvalue argument but produces an lvalue as a result.
