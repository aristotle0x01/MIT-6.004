#### implementation

```
.include "beta.uasm"

        BR(STEP1)   // start execution with Step 1

        // the array to be sorted
        A:      LONG(10) LONG(56) LONG(27) LONG(69) LONG(73) LONG(99)
                LONG(44) LONG(36) LONG(10) LONG(72) LONG(71) LONG(1)

ALEN = (. - A)/4    // determine number of elements in A

// Please enter your code for each of the steps below...

i = R0        // use R0 to hold the value of i
swapped = R1  // use R1 to hold the value of swapped

STEP1:
      CMOVE(0, swapped)   // swapped = 0
STEP2:
      CMOVE(0, i)         // i = 0
STEP3: 
      ADDC(i, 1, i)        // i = i + 1
	    CMPEQC(i, ALEN, r2)  // i <= ALEN
	    BNE(r2, STEP5)       // jump to step5
STEP4:
      MULC(i, 4, r2)       // i in R0, convert index into byte offset
      // load address is Reg[Ra] + sxt(16-bit) literal
      LD(r2, A, r3)        // loads A[i]
      LD(r2, A-4, r4)      // loads A[i-1]
	    CMPLE(r4, r3, r5)    // A[i-1] <= A[i]
	    BNE(r5, STEP3)       // continue
	    // do the swap
	    ST(r4, A, r2)
	    ST(r3, A-4, r2)
	    CMOVE(1, swapped)
STEP5:
      BNE(swapped, STEP1)
	  
// When step 5 is complete, execution continues with the
// checkoff code.  You must include this code in order to
// receive credit for completing the problem.
.include "checkoff.uasm"
```

