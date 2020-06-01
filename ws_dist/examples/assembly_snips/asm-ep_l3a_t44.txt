
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main: 
   # float PI    = 3,1415;
   # int   radio = 4;
   # float longitud;

     li.s     $f0  3.1415
     li       $t0 4

   # longitud = PI * radio;

     mtc1     $t0 $f1   # 4ca2
     cvt.s.w  $f2 $f1   # 4ieee754
     mul.s    $f0 $f2 $f1

