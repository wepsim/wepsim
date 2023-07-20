
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
        w3: .word 1, 2, 3, 4, 5

.text
main:
        li  $3  1
        li  $4  4
        la  $5  w3
        li  $7  0

        # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
        # notify: TIP: loop
        # notify: Typical loop elements:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify: * initialization of counters:
        # notify:     li  $1  0
        # notify:     li  $2  5
        # notify: * loop header that checks counters:
        # notify:     loop1: beq $1 $2 end1
        # notify: * loop body:
        # notify:   * action per iteration
        # notify:   * update counters
        # notify:     add $1 $1 $3
        # notify:   * end body
        # notify:     beq $0 $0 loop1
        # notify:     end1: ...
        # notify: </pre>

        # loop initialization
        li  $1  0
        li  $2  5

        # loop header
 loop1: beq $1 $2 end1

        # loop body
        mul $6 $1 $4
        add $6 $6 $5
        lw  $6 ($6)
        add $7 $7 $6

        # loop next...
        add $1 $1 $3
        b loop1

        # loop end
  end1: jr $ra

