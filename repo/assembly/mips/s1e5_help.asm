
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
         li  $t1 0
         li  $t2 0

      ### if-then (full assembly version) ###########################

         # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
         # notify: TIP: if-then
         # notify: <li> In high-level:
         # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
         # notify:   int a=1;
         # notify:   int b=2;
         # notify: 
         # notify:   if (a < b):
         # notify:       a = b;            </pre>
         # notify: <li> In low-level:
         # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
         # notify:        li  $t1 1
         # notify:        li  $t2 2
         # notify:  if_1: blt $t1 $t2 t_1
         # notify:        b   e_1
         # notify:   t_1: move $t1 $t2
         # notify:   e_1:                   </pre>

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

         # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
         # notify: TIP: if-then
         # notify: High-level:
         # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
	 # notify: int a=1;
	 # notify: int b=2;
	 # notify:
         # notify: if (a < b):
	 # notify:     a = b;        </pre>
         # notify: Low-level:
         # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
	 # notify:       li t1 1
	 # notify:       li t2 2
	 # notify: if_2: bge t1 t2 e_2
	 # notify: t_2: mv t1 t2
	 # notify: e_2:              </pre>

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

         # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
         # notify: TIP: if-then
         # notify: <li> In high-level:
         # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
         # notify: int a=1;
         # notify: int b=2;
         # notify: 
         # notify: if (a < b):
         # notify:     &lt;assembly for action 1&gt;
         # notify: else:
         # notify:     &lt;assembly for action 2&gt;   </pre>
         # notify: <li> In low-level:
         # notify: <pre  class="font-monospace my-4 overflow-visible lh-base">
         # notify:       li  t1 1
         # notify:       li  t2 2
         # notify: if_3: bge t1 t2 l_3
         # notify:  t_3: &lt;assembly for action 1&gt;
         # notify:       beq x0 x0 end_3
         # notify:  l_3: &lt;assembly for action 2&gt;
         # notify:       beq x0 x0 end_3
         # notify:  end_3:                    </pre>


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

