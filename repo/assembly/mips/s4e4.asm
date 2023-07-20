
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_div0
            .word rt_sys

   msgi0:   .asciiz "INT: 0\n"
   msgi1:   .asciiz "FPE: */0\n"

   bucket0: .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            .word 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0


.ktext
sys_print:  li   $0 0
            li   $1 1
            beq  $26 $0 end1
        b5: lb   $27 ($26)
            beq  $27 $0 end1
            out  $27 0x1000
            add  $26 $26 $1
            b  b5
      end1: reti

sys_prt_int: li   $1 1
             # push_byte('\0')
             sb   $0 ($sp)
             sub  $sp $sp $1
             bge  $26 $0 b3
             li  $1  '-'
             out $1  0x1000
             li  $1  -1
             mul $26 $26 $1
         b3: # push_byte(rem(x,10)+48)
             # x = div(x,10)
             li   $1 10
             rem  $27 $26 $1
             div  $26 $26 $1
             li   $1 48
             add  $27 $27 $1
             li   $1 1
             sb   $27 ($sp)
             sub  $sp $sp $1
             bne  $26 $0 b3
         f3: # print_string($sp)
             add  $sp $sp $1
             lb   $27 ($sp)
             beq  $27 $0 f2
             out  $27 0x1000
             b f3
         f2: reti

sys_sbrk:   la  $v0 bucket0
            reti

  rt_i0:    # 1.- interruption
            la  $26 msgi0
            b   sys_print

  rt_div0:  # 2.- exception
            la  $26 msgi1
            b   sys_print

  rt_sys:   # 3.- syscall
            move $26 $a0
            li   $27 1
            beq  $v0 $27 sys_prt_int
            li   $27 4
            beq  $v0 $27 sys_print
            li   $27 9
            beq  $v0 $27 sys_sbrk
            reti


#
#
# void * BLIST = NULL ;
#
.data
        msg_enter:        .asciiz "\n"
        msg_enterenter:   .asciiz "\n\n"
        msg_bucket_ptr:   .asciiz "ptr = "
        msg_bucket_size:  .asciiz "size = "
        msg_walk_mark:    .asciiz "<_____________>"
        msg_null:         .asciiz "NULL"

        .align 4
        BLIST:    .word 0

.text

#
#
# /*
#  *  void * malloc ( size )
#  *  use: a2
#  *  do: alloc a 'size' bucket.
#  *
#  */
# void * malloc ( size )
# {
#   void * s2, s3, s4 ;
#   int rsize ;
#
#   if (size <= 0)
#       return 0 ;
#
#   size = size >> 2 + 1 ;
#   size = size + 2 ;
#
rut_begin_malloc:          # errores
                           beq $a0 $0 rut_end_malloc

                           # R.A.
                           sub  $sp $sp 32
                           sw   $ra 32($sp) # ra
                           sw   $fp 28($sp) # fp
                           sw   $a0 24($sp) # a0
                           sw   $s0 20($sp) # s0
                           sw   $s1 16($sp) # s1
                           sw   $s2 12($sp) # s2
                           addi $fp $sp 32

                           # params crushing
                           srl  $a0 $a0 2
                           addi $a0 $a0 3 # round(1) + header(2)

#
#   s0 = 0 ;
#   s1 = *BLIST ;
#
#   while ( (s1 != 0) && (s1[0] < size) )
#   {
#     s0 = s1 ;
#     s1 = s1[1] ;
#   }
#
                           # search bucket
                           li $s0 0
                           lw $s1 BLIST
                       do: beq  $s1 $0 b_not_found
                           lw   $t0 0($s1)
                           bge  $t0 $a0 b_found
                           move $s0 $s1
                           lw   $s1 4($s1)
                           b do

#   if (s1 == 0)
#   {
#     rsize = 2 * size ;
#
#     brk(4 * rsize) ;
#     if (v0 == 0)
#         return 0 ;
#
#     v0[0] = rsize ;
#     if (s0 != 0)
#     {
#       v0[1] = 0 ;
#       s0[1] = v0 ;
#     }
#     else
#     {
#       v0[1] = *BLIST ;
#       BLIST = v0 ;
#     }
#     s1 = v0 ;
#
              b_not_found: li  $v0 9
                           move $t1 $a0
                           sll  $a0 $a0 3   # request  "4 * 2 * size" bytes
                           syscall
                           move $a0 $t1
                           sll  $t1 $t1 1   # bucket' size "2 * size" words
                           beq  $v0 $0 rut_exit_malloc

                           sw $t1 0($v0)
                           beq $s0 $0 b_elses0
                           sw $zero 4($v0)
                           sw $v0   4($s0)
                           b b_ends0

                 b_elses0: lw $t0 BLIST
                           sw $t0 4($v0)
                           la $t0 BLIST
                           sw $v0 0($t0)

                  b_ends0: move $s1 $v0

#   }
#
#   a1 = s1[0] - size ;
#   if (a1 == 0)
#   {
#     if (s0 == 0)
#         *BLIST = 0 ;
#     else
#         s0[1] = s1[1] ;
#     s2 = s1 ;
#   }
#   else
#   {
#     s2    = s1 + a1 * 4 ;
#     s1[0] = a1 ;
#     s2[0] = size ;
#   }
#
                  b_found: lw   $t0 0($s1)
                           sub  $a1 $t0 $a0
                           bne  $a1 $0 b_go_else

                           beq $s0 $0 b_zblist
                           lw  $s2 4($s1)
                           sw  $s2 4($s0)
                           b   b_endzblist
                 b_zblist: sw  $zero BLIST
              b_endzblist: move $s2 $s1
                           b b_go_ret

                b_go_else: sll  $t1 $a1 2
                           add  $s2 $s1 $t1
                           sw   $a1 0($s1)
                           sw   $a0 0($s2)

#
#   s2[1] = 0 ;
#
#   return (s2 + 8) ;
#
                 b_go_ret: sw   $zero 4($s2)
                           addi $v0 $s2 8

# }
                           # R.A.
          rut_exit_malloc: lw   $s2 12($sp) # s2
                           lw   $s1 16($sp) # s1
                           lw   $s0 20($sp) # s0
                           lw   $a0 24($sp) # a0
                           lw   $fp 28($sp) # fp
                           lw   $ra 32($sp) # ra
                           addi $sp $sp 32

rut_end_malloc:            jr $ra

#
#
#
# /*
#  *  void free ( void * w_ptr )
#  *  use: BLIST, v0, v1, s2
#  *  do: free 'w_ptr' bucket.
#  *
#  */
# void free ( void * ptr )
# {
#   /*
#    *  params stuff
#    */
#   if (ptr <= 0)
#       return ;
#   ptr = ptr - 8 ;
#
rut_begin_free:            # errores
                           beq $a0 $0 rut_end_free
                           la  $1  0x400000
                           ble $a0 $1 rut_end_free

                           # R.A.
                           sub  $sp $sp 32
                           sw   $ra 32($sp) # ra
                           sw   $fp 28($sp) # fp
                           sw   $a0 24($sp) # a0
                           sw   $t0 20($sp) # t0
                           sw   $t1 16($sp) # t1
                           addi $fp $sp 32

                           # params crushing
                           sub  $a0 $a0 8

#   v0 = BLIST
#   v1 = *BLIST
#
#   if ( (v1 == 0) || (ptr < v1) )
#
                           la   $v0 BLIST
                           lw   $v1 BLIST
                           beq  $v1 $0  b_insert_1
                           blt  $a0 $v1 b_insert_1
                           b    b_busca_2

#   {
#     ptr[1]  = *BLIST ;
#     *BLIST  = ptr ;
#
               b_insert_1: sw  $v1 4($a0)
                           sw  $a0 0($v0)
                           beq $v1 $0 rut_exit_free
                           move $v0 $a0 # avoid b_back -> xch order !!!
                           b b_front

#   }
#   else
#   {
#
#     do
#     {
#       v0 = v1 ;
#       v1 = v1[1] ;
#
#       if ( (v1 > ptr) || (v1 == 0) )
#       {
#         ptr[1] = v1 ;
#         v0[1]  = ptr ;
#         break ;
#       }
#
#     } while (1) ;
#
                b_busca_2: move $v0 $v1
                           lw   $v1 4($v1)

                           beq  $v1 $0  b_insert_2
                           bgt  $v1 $a0 b_insert_2
                           b b_busca_2

               b_insert_2: sw $v1 4($a0)
                           sw $a0 4($v0)

#   }
#
#   t1 = ptr + ptr[0] * 4 ;
#   if (v1 == t1)
#   {
#     ptr[0] += v1[0] ;
#     ptr[1]  = v1[1] ;
#   }
#
                  b_front: lw   $t0 0($a0)
                           sll  $t0 $t0 2 # words -> bytes
                           add  $t1 $t0 $a0
                           bne  $v1 $t1 b_back
                           srl  $t0 $t0 2 # bytes -> words

                           lw   $t1 0($v1)
                           add  $t1 $t1 $t0
                           sw   $t1 0($a0)

                           lw $t0 4($v1)
                           sw $t0 4($a0)

#   t1 = v0 + v0[0] * 4 ;
#   if (ptr == t1)
#   {
#     v0[0] += ptr[0] ;
#     v0[1]  = ptr[1] ;
#   }
#
                   b_back: lw   $t0 0($v0)
                           sll  $t0 $t0 2 # word -> size
                           add  $t1 $v0 $t0
                           bne  $a0 $t1 rut_exit_free
                           srl  $t0 $t0 2 # word -> size

                           lw   $t1 0($a0)
                           add  $t0 $t0 $t1
                           sw   $t0 0($v0)

                           lw $t0 4($a0)
                           sw $t0 4($v0)

# }
                           # R.A.
rut_exit_free:             lw   $t1 16($sp) # t1
                           lw   $t0 20($sp) # t0
                           lw   $a0 24($sp) # a0
                           lw   $fp 28($sp) # fp
                           lw   $ra 32($sp) # ra
                           addi $sp $sp 32

rut_end_free:              jr $ra

#
#
#
# /*
#  *  void walk ( void )
#  *  use: BLIST, t0, t1
#  *  do: print bucket's info.
#  *
#  */
# void walk ( void )
# {
#
rut_begin_walk:
                           # R.A.
                           sub  $sp $sp 32
                           sw   $ra 32($sp) # ra
                           sw   $fp 28($sp) # fp
                           sw   $a0 24($sp) # a0
                           sw   $t0 20($sp) # t0
                           sw   $t1 16($sp) # t1
                           addi $fp $sp 32

#
#   t0 = BLIST
#   t1 = *BLIST
#
                           la   $t0 BLIST
                           lw   $t1 BLIST

                           la $a0 msg_walk_mark
                           li $v0 4
                           syscall

                           la $a0 msg_enter
                           li $v0 4
                           syscall

#   if ( t1 == 0 )
#   {
#     printf("NULL\n") ;
#     return ;
#   }
#
                           bne $t1 $0 b_ww_1
                           la $a0 msg_null
                           li $v0 4
                           syscall

                           la $a0 msg_enter
                           li $v0 4
                           syscall

                           b rut_exit_walk

#   while( t1 == 0 )
#   {
#     printf("ptr = %i\n", t1) ;
#     printf("size = %i\n\n", t0) ;
#     t1 = t1[1] ;
#   }
#
                   b_ww_1: beq $t1 $0 rut_exit_walk

                           la $a0 msg_bucket_ptr
                           li $v0 4
                           syscall

                           move $a0 $t1
                           li   $v0 1
                           syscall

                           la $a0 msg_enter
                           li $v0 4
                           syscall

                           la $a0 msg_bucket_size
                           li $v0 4
                           syscall

                           lw   $a0 0($t1)
                           li   $v0 1
                           syscall

                           la $a0 msg_enterenter
                           li $v0 4
                           syscall

                           lw   $t1 4($t1)
                           b b_ww_1

#
                           # R.A.
rut_exit_walk:             lw   $t1 16($sp) # t1
                           lw   $t0 20($sp) # t0
                           lw   $a0 24($sp) # a0
                           lw   $fp 28($sp) # fp
                           lw   $ra 32($sp) # ra
                           addi $sp $sp 32

rut_end_walk:              jr $ra

#
#
#
# /*
#  *  void main ( int argc, char *argv[] )
#  *  use:
#  *  do: little tests.
#  *
#  */
# void main ( int argc, char *argv[] )
# {
#   void * s1, s2, s3 ;
#
#
main:
                           # params argc, argv

#   s1 = malloc(32) ;
#   s2 = malloc(32) ;
#   s3 = malloc(32) ;
#   free(s2) ;
#   free(s3) ;
#   free(s1) ;
#
                           # walk
                           jal rut_begin_walk

                           # malloc
                           li $a0 32
                           jal rut_begin_malloc
                           move $s1 $v0

                           # walk
                           jal rut_begin_walk

                           # malloc
                           li $a0 32
                           jal rut_begin_malloc
                           move $s2 $v0

                           # walk
                           jal rut_begin_walk

                           # malloc
                           li $a0 32
                           jal rut_begin_malloc
                           move $s3 $v0

                           # walk
                           jal rut_begin_walk

                           # free
                           move $a0 $s2
                           jal rut_begin_free

                           # walk
                           jal rut_begin_walk

                           # free
                           move $a0 $s3
                           jal rut_begin_free

                           # walk
                           jal rut_begin_walk

                           # free
                           move $a0 $s1
                           jal rut_begin_free

                           # walk
                           jal rut_begin_walk

# }

#
#
#


