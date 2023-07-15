
#
# WepSIM (https://wepsim.github.io/wepsim/)
#
# Compile Explorer:
#  * URL:
#       https://godbolt.org/
#  * Options:
#       LX0, .text, Demangle
#  * C Code:
#       #include <stdio.h>
# 
#       // Type your code here, or load an example.
#       int main (int argc, char *argv[])
#       {
#           int i = 10 ;
#           return i ;
#       }
#

.text
main:
        addiu   $sp,$sp,-24
        sw      $fp,20($sp)
        move    $fp,$sp
        sw      $4,24($fp)
        sw      $5,28($fp)
        li      $2,10                 # 0xa
        sw      $2,8($fp)
        lw      $2,8($fp)
        move    $sp,$fp
        lw      $fp,20($sp)
        addiu   $sp,$sp,24
        j       $31
        nop

