
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
           w3: .word 1, 2, 3, 4, 5

.text
main:
        li  x3  1
        li  x4  4
        la  x5  w3
        li  x7  0

        # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
        # notify: TIP: loop
        # notify: Typical loop elements:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify: * initialization of counters:
        # notify:     li  x1  0
        # notify:     li  x2  5
        # notify: * loop header that checks counters:
        # notify:     loop1: beq x1 x2 end1
        # notify: * loop body:
        # notify:   * action per iteration
        # notify:   * update counters
        # notify:     add x1 x1 x3
        # notify:   * end body
        # notify:     beq x0 x0 loop1
        # notify:     end1: ...
        # notify: </pre>

        # loop initialization
        li  x1  0
        li  x2  5

        # loop header
 loop1: beq x1 x2 end1

        # loop body
        mul x6 x1 x4
        add x6 x6 x5
        lw  x6 0(x6)
        add x7 x7 x6

        # loop next...
        add x1 x1 x3
        beq x0 x0 loop1

        # loop end
  end1: jr ra

