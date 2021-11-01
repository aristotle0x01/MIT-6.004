the full two mem stage version

```
During MEM1, we need to generate a stall signal which, inverted to create not_stall, will stall the IF and EXE stages, ensuring that LD/LDR/ST will get two exe cycles. You should add some logic to ensure WR = 0 during MEM1, even when the current instruction is ST (we'll do the actual write during MEM2). The memory address from the ALU is loaded into the new memory address register at the end of MEM1. Make sure stall is 0 during reset.

During MEM2, the memory will use the address calculated during MEM1 to perform the requested memory operation. stall should be 0 during MEM2, so that normal execution will resume in the next cycle.
```

![](https://user-images.githubusercontent.com/2216435/139674360-9805fc11-f8cd-4138-b057-cc22bbec8701.png)

1.i implemented the two mem-stage using a fsm with content

![](https://user-images.githubusercontent.com/2216435/139672963-470e2744-cc41-4e20-b1d4-c02e41944d44.png)

```
0
3
0
0
```

2.i adjust **<u>.repeat 1140</u>** to **<u>.repeat 1565, cycle=10ns</u>**,  with a <u>**benmakr 20.6**</u>

