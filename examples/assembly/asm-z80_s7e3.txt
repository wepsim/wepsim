
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
addupto: push IX

         ldi A 0
         inc IX
         dec IX
     b1: jpz f1
         add_a IX
         dec   IX
         jp b1
     f1: ld HL, A
     
         pop IX
         ret
        
 main:  # addupto(2)
        ldi IX 2
        call addupto
        
        # halt
        halt
