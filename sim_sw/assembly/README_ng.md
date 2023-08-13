
# WepSIM Assembler Next-Generation (asm-ng)

## Table of contents

- Current State:
  - [TODO: known issues](#asmng-todo)
  - [DONE: now testing](#asmng-done)
- Organization:
  - [Prepare to compile](#asmng-prepare0)
  - [Compile to JSON object](#asmng-src2obj)
  - [Load JSON object in memory](#asmng-obj2bin)


## 1) Current State

<a name="asmng-todo"/>

### A) Known Issues (TODO list)

+ [1] If there are several 'candidates' instruction select the best fit
  * Example:
    ```
    li $1 0x123   <- instruction register inm
    li $1 lab1    <- instruction register address
    ```

+ [2] Review the pending labels (forth and back)
  * Example:
    ```
    loop1: beq $t0 $t1 end1
           ...
           b loop1
     end1: ...
    ```

+ [3] Replace pseudoinstruction with the instructions(s)...
  *  Example:
    ```
    li reg 0x12345678 <- lui reg 0x1234 + add reg reg 0x5678
    ```

<a name="asmng-done"/>

### B) DONE: now testing

+ Assembler-NG (next generation) can transform from source to JSON object
  * .data section
  * .text section
    * No pseudo-instruction supported right now
    * No multiple definition for one instruction is supported right now
+ Assembler-NG (next generation) can transform from JSON object to main memory content (binary)
  * .data section
  * .text section


## 2) Organization

<a name="asmng-prepare0"/>

### A) Prepare to compile

+ Prepare context from firmware (CU_data) and source code (asm_source) build the context object to be used in next steps:
  * wsasm_prepare_context(CU_data, asm_source)
  * pass 0: prepare context 


<a name="asmng-src2obj"/>

### B) Compile to JSON object

+ Compile assembly to JSON object:
  * wsasm_src2obj(CU_data, asm_source)
  * Three main steps:
    + pass 1: compile assembly (PENDING ~10%)
      * wsasm_compile_src2obj(context, ret): read several .data/.kdata/.text/... segments and build the JSON object.
        * wsasm_src2obj_data(context, ret): read the .data segment and build the associated JSON object fragment.
        * wsasm_src2obj_text(context, ret): read the .text segment and build the associated JSON object fragment.
          * wsasm_src2obj_text_instr_op(context, ret, elto): read instructions' fields
          * wsasm_src2obj_text_candidates(context, ret, elto): find in firmware the first definition that match the read instruction
          * wsasm_encode_instruction(context, ret, elto): encode in binary (string) an instruction.
    + pass 2: replace pseudo-instructions (PENDING ~100%)
      * wsasm_resolve_pseudo(context, ret): replace pseudo-instructions
    + pass 3: check that all used labels are defined in the text (PENDING ~50%)
      * wsasm_resolve_labels(context, ret): check that all used labels are defined in the text
+ *elto* represents any element from the assembly.
  * For example:
 ```
<source>            -> <eltos>
                    ->
*l1:                -> [
 l2:   .word 0x2,*  ->   { "l1,l2", ".word", 4, 0x2, ... }, // elto
      *      0x4 *  ->   { ""     , ".word", 4, 0x4, ... }, // elto
*l3:  .byte 1*      ->   { "l3",    ".byte", 1, 0x1, ... }, // elto
            2*      ->   { "",      ".byte", 1, 0x2, ... }  // elto
                    -> ]
```
  * *wsasm_new_objElto(base_elto)* builds a new empty object (when base_elto is null).
  * Two special attributes:
    * elto.byte_size: number of bytes (integer)
    * elto.value: value in binary (string)


<a name="asmng-obj2bin"/>

### C) Load JSON object in memory

+ Load JSON object into main memory:
  * wsasm_obj2mem(ret)


