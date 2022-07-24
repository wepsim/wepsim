
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
      ### if-then (full assembly version) ###########################

         # int a=1;
         # int b=2;
         #
         li  $t1 1
         li  $t2 2

         # // if-then
   if_1: # if (a < b)
         #
         blt $t1 $t2 then_1
         b   end_1
 then_1: # {
         #     a = b;
         move $t1 $t2
         # }
  end_1: # <code after if-then...>


      ### if-then (compact assembly version) #########################

         # int a=1;
         # int b=2;
         #
         li  $t1 1
         li  $t2 2

         # // if-then
   if_2: # if (a < b)
         bge $t1 $t2 end_2
#then_2: # {
         #     a = b;
         move $t1 $t2
         # }
  end_2: # <after if code...>


      ### if-then-else (compact assembly version) #####################

         # int a=1;
         # int b=2;
         #
         li  $t1 1
         li  $t2 2

      # // if-then-else
    if_3: # if (a < b)
          bge $t1 $t2 end_3
  then_3: # {
          #    // action1
          # <assembly for action 1>
          # }
          b end_3
          # {
  else_3: #     // action 2
          # <assembly for action 2>
          # }
        # b end_3

   end_3: # <after if code...>


      #################################################################

      #   ...
      jr $ra

