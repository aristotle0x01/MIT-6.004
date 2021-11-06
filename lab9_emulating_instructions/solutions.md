#### **implementation**

```
.include "beta.uasm"
.include "checkoff.uasm"

// Handler for opcode 16 and 17 extension:
// LDB(Ra, literal, Rc) and STB(Rc, literal, Ra)

regs:
  RESERVE(32)                // Array used to store register contents

_LONG0:  LONG(0xffffff00)    // ***CMOVE won't work, most time waste debugging here***
_LONG1:  LONG(0xffff00ff)
_LONG2:  LONG(0xff00ffff)
_LONG3:  LONG(0x00ffffff)

UI: 
  save_all_regs(regs)
 
  LD(xp,-4,r0)                    // illegal instruction
  extract_field(r0,31,26,r1)  // extract opcode, bits 31:26
  CMPEQC(r1,0x10,r2)          // OPCODE=16?  
  BT(r2, ldb)                 // yes, handle the ldb instruction.
  CMPEQC(r1,0x11,r2)          // OPCODE=17?
  BT(r2, stb)                 // yes, handle the stb instruction.

  LD(r31,regs,r0)            // Its something else.  Restore regs
  LD(r31,regs+4,r1)          // we've used, and go to the system's
  LD(r31,regs+8,r2)          // Illegal Instruction handler.
  BR(_IllegalInstruction)

ldb:
  extract_field(r0,25,21,r1)  // extract rc field from trapped instruction
  MULC(r1, 4, r1)             // convert to byte offset into regs array
  extract_field(r0,20,16,r2)  // extract ra field from trapped instruction  
  MULC(r2, 4, r2)             // convert to byte offset into regs array
  LD(r1, regs, r3)            // r3 <- regs[rc]
  LD(r2, regs, r4)            // r4 <- regs[ra]
  extract_field(r0,15,0,r5) 
  SHLC(r5, 16, r5)
  SRAC(r5, 16, r5)            // r5 <- SEXT(literal)
  ADD(r4, r5, r5)             // r5 <- EA
  LD(r5, 0, r6)               // r6 <= MDATA
  ANDC(r5, 0x03, r5)
  CMPEQC(r5,0x00,r7)
  BT(r7, sec0)
  CMPEQC(r5,0x01,r7)
  BT(r7, sec1)
  CMPEQC(r5,0x02,r7)
  BT(r7, sec2)
  CMPEQC(r5,0x03,r7)
  BT(r7, sec3)
sec0:
  extract_field(r6,7,0,r6)
  MOVE(r6, r3)
  BF(r31, final)
sec1:
  extract_field(r6,15,8,r6)
  MOVE(r6, r3)
  BF(r31, final)
sec2:
  extract_field(r6,23,16,r6)
  MOVE(r6, r3)
  BF(r31, final)
sec3:
  extract_field(r6,31,24,r6)
  MOVE(r6, r3)
final:
  CMOVE(0x00ff, r10)
  AND(r3, r10, r3)
  ST(r3, regs, r1)   
  restore_all_regs(regs)
  JMP(xp)

stb:
  extract_field(r0,25,21,r1)  // extract rc field from trapped instruction
  MULC(r1, 4, r1)             // convert to byte offset into regs array
  extract_field(r0,20,16,r2)  // extract ra field from trapped instruction
  MULC(r2, 4, r2)             // convert to byte offset into regs array
  LD(r1, regs, r3)            // r3 <- regs[rc]
  LD(r2, regs, r4)            // r4 <- regs[ra]
  extract_field(r0,15,0,r5) 
  SHLC(r5, 16, r5)
  SRAC(r5, 16, r5)            // r5 <- SEXT(literal)
  ADD(r4, r5, r5)             // r5 <- EA
  MOVE(r5, r8)
  LD(r5, 0, r6)               // r6 <= MDATA
  CMOVE(0x00ff, r10)
  AND(r3, r10, r3)
  ANDC(r5, 0x03, r5)
  CMPEQC(r5,0x00,r7)
  BT(r7, tsec0)
  CMPEQC(r5,0x01,r7)
  BT(r7, tsec1)
  CMPEQC(r5,0x02,r7)
  BT(r7, tsec2)
  CMPEQC(r5,0x03,r7)
  BT(r7, tsec3)
tsec0:
  LD(r31, _LONG0, r10)
  AND(r6, r10, r6)
  OR(r6, r3, r6)
  BF(r31, tfinal)
tsec1:
  LD(r31, _LONG1, r10)
  AND(r6, r10, r6)
  SHLC(r3, 8, r3)
  OR(r6, r3, r6)
  BF(r31, tfinal)
tsec2:
  LD(r31, _LONG2, r10)
  AND(r6, r10, r6)
  SHLC(r3, 16, r3)
  OR(r6, r3, r6)
  BF(r31, tfinal)
tsec3:
  LD(r31, _LONG3, r10)
  AND(r6, r10, r6)
  SHLC(r3, 24, r3)
  OR(r6, r3, r6)
tfinal:
  ST(r6, 0, r8)   
  restore_all_regs(regs)
  JMP(xp)

_IllegalInstruction:
  // code to handle an actual illegal instruction goes here...
  // for this lab this code is supplied by checkoff.uasm
  HALT()
```

