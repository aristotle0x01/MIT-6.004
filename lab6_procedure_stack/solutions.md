#### implementation

```
////////////////////////////////////////////////////////////////////////////////
// Lab 6
////////////////////////////////////////////////////////////////////////////////

// Include the checkoff program:
.include "checkoff.uasm"

// Leave the following as zero to run ALL the test cases, and get your solution
//   validated if all pass.  If you have trouble with test case N, set it to N
//   to run JUST that test case (for easier debugging):
TestCase:       LONG(0)

// Quicksort-in-place code.  We include the C/Python version here as a comment;
// you can use this as a model for your Beta assembly version:

//def partition(array,left,right):
//    # choose middle element of array as pivot
//    pivotIndex = (left+right) >> 1;
//    pivotValue = array[pivotIndex]
//
//    # swap array[right] and array[pivotIndex]
//    # note that we already store array[pivotIndex] in pivotValue
//    array[pivotIndex] = array[right]
//
//    # elements <= the pivot are moved to the left (smaller indices)
//    storeIndex = left
//    for i in xrange(left,right):  # don't include array[right]
//        temp = array[i]
//        if temp <= pivotValue:
//            array[i] = array[storeIndex]
//            array[storeIndex] = temp
//            storeIndex += 1
//
//    # move pivot to its final place
//    array[right] = array[storeIndex]
//    array[storeIndex] = pivotValue;
//    return storeIndex;

p_array=R2          
p_left=R3
p_right=R4
p_pivotIndex=R5     
p_pivotValue=R6
p_storeIndex=R7

partition:
        PUSH(LP)
        PUSH(BP)
        MOVE(SP, BP)

// Fill in your code here...
// start my code
        PUSH(R1)
        PUSH(R2)
        PUSH(R3)
        PUSH(R4)
        PUSH(R5)
        PUSH(R6)
        PUSH(R7)
        PUSH(R8)
        PUSH(R9)

        // arguments
        LD(BP, -12, p_array)  
        LD(BP, -16, p_left)  
        LD(BP, -20, p_right)
		
        // locals
        ADD(p_left, p_right, R1)
        SHRC(R1, 1, p_pivotIndex)  // p_pivotIndex
        SHLC(p_pivotIndex, 2, R0)  
        ADD(p_array, R0, R0)       // address of array[p_pivotIndex]
        LD(R0, 0, p_pivotValue)    // pivotValue
        
        // array[pivotIndex] = array[right]
        SHLC(p_right, 2, R1)
        ADD(p_array, R1, R1) 
        LD(R1, 0, R8)              // array[p_right]
        SHLC(p_pivotIndex, 2, R0)  
        ADD(p_array, R0, R0)
        ST(R8, 0, R0)  

        // storeIndex = left
        MOVE(p_left, p_storeIndex)
        MOVE(p_left, R0)           // i = R0
loop:
        CMPLT(R0, p_right, R1)
        BF(R1, rtn_q)
        SHLC(R0, 2, R1)
        ADD(p_array, R1, R1)       // array[i]
        LD(R1, 0, R8)              // temp = R8
        CMPLE(R8, p_pivotValue, R1)
        BF(R1, loop1)
        SHLC(p_storeIndex, 2, R1)  
        ADD(p_array, R1, R1)       
        LD(R1, 0, R9)              // array[storeIndex]
        SHLC(R0, 2, R1)
        ADD(p_array, R1, R1)    
        ST(R9, 0, R1)              // array[i] = array[storeIndex]
        SHLC(p_storeIndex, 2, R1)  
        ADD(p_array, R1, R1)  
        ST(R8, 0, R1)              // array[storeIndex] = temp
        ADDC(p_storeIndex, 1, p_storeIndex) // storeIndex += 1
loop1:  
        ADDC(R0, 1, R0)
        BF(R31, loop)

        // move pivot to its final place
rtn_q:    
		SHLC(p_storeIndex, 2, R1)
        ADD(p_array, R1, R1) 
        LD(R1, 0, R8)              // array[p_storeIndex]
        SHLC(p_right, 2, R9)
        ADD(p_array, R9, R9)
        ST(R8, 0, R9)              // array[right] = array[storeIndex]
        ST(p_pivotValue, 0, R1)    // array[storeIndex] = pivotValue
        MOVE(p_storeIndex, R0)
		POP(R9)
        POP(R8)
        POP(R7)
        POP(R6)
        POP(R5)
        POP(R4)
        POP(R3)
        POP(R2)
        POP(R1)
// end my code
        MOVE(BP, SP)
        POP(BP)
        POP(LP)
        JMP(LP)


//def quicksort(array, left, right):
//    if left < right:
//        pivotIndex = partition(array,left,right)
//        quicksort(array,left,pivotIndex-1)
//        quicksort(array,pivotIndex+1,right)

// quicksort(ArrayBase, left, right)
quicksort:
        PUSH(LP)
        PUSH(BP)
        MOVE(SP, BP)

// Fill in your code here...
// start my code
		PUSH(R1) 
        PUSH(R2) 
        PUSH(R3) 
        PUSH(R4)

        LD(BP, -12, p_array)  // R1 = address of array[0]
        LD(BP, -16, R3)  // R3 = left
        LD(BP, -20, R4)  // R4 = right
        CMPLT(R3, R4, R0)
        BF(R0, rtn)

        PUSH(R4)
        PUSH(R3)
        PUSH(p_array) 
        BR(partition, LP) 
        DEALLOCATE(3)
        MOVE(R0, R1)   // R1 = pivotIndex

        // quicksort(array,left,pivotIndex-1)
        SUBC(R1, 1, R4)  // pivotIndex-1
        PUSH(R4)
        PUSH(R3)
        PUSH(p_array) 
        BR(quicksort, LP) 
        DEALLOCATE(3)

        // quicksort(array,pivotIndex+1,right)
        LD(BP, -20, R4)  
        ADDC(R1, 1, R3)
        PUSH(R4)
        PUSH(R3)
        PUSH(p_array) 
        BR(quicksort, LP) 
        DEALLOCATE(3)

rtn:
        POP(R4)
        POP(R3)
        POP(R2)
        POP(R1)
// end my code

        MOVE(BP, SP)
        POP(BP)
        POP(LP)
        JMP(LP)

// Allocate a stack: SP is initialized by checkoff code.
StackBasePtr:
        LONG(StackArea)

.unprotect

StackArea:
        STORAGE(1000)

```

