#### 实现

```
// Parenthesis matcher Turing Machine
// test tapes 

states s1 s2 s3  // list of state names, first is starting state
symbols ( ) 0 1 2 // list of symbols (- is blank cell)

tape test1 (
result1 test1 0

tape test2 )
result1 test2 0

tape test3 ( )
result1 test3 1

tape test4 ( ) ) )
result1 test4 0

tape test5 ( ( ( )
result1 test5 0

tape test6 ( ) ( ( ( ) ( ( ( ) ) ( ) ) )
result1 test6 0

tape test7 ( ( ( ( ( ( ) ( ( ) ) ) ) ) ) )
result1 test7 1

// specify transistions: action state symbol state' write move
//    state = the current state of the FSM
//    symbol = the symbol read from the current cell
//    state' = state on the next cycle 
//    write = symbol to be written into the current cell
//    move = tape movement ("l"=left, "r"=right, "-"=stay put)
action s1 ( s1     ( l
action s1 ) s2     1 r
action s1 - s3     - r
action s1 1 s1     1 l
action s2 ( s1     1 l
action s2 1 s2     1 r
action s2 - *halt* 0 -
action s3 1 s3     1 r
action s3 ) *halt* 0 -
action s3 ( *halt* 0 -
action s3 - *halt* 1 -
```

