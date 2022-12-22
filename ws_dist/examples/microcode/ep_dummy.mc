
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

begin
{
   fetch:  (T2, C0),
           (TA, R, BW=11, M1=1, C1=1),
           (M2, C2, T1, C3),
           (A0, B=0, C=0)
}

test {
       co=010110,
       nwords=1,
       {
           (),
           (),
           (),
           (),
           (),
           (),
           (),
           (),
           (),
           (),
           (A0=1, B=1, C=0)
       }
}

registers
{
     29=($sp, $29) (stack_pointer)
}

