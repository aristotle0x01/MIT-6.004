#### **状态定义**

| current  state | IN   | next state | u    | v    |
| -------------- | ---- | ---------- | ---- | ---- |
| SA000          | 0    | SA000      | 0    | 1    |
| SA000          | 1    | SB001      | 0    | 1    |
| SB001          | 0    | SD010      | 0    | 0    |
| SB001          | 1    | SC011      | 0    | 0    |
| SC011          | 0    | SD010      | 1    | 1    |
| SC011          | 1    | SE110      | 1    | 1    |
| SD010          | 0    | SE110      | 0    | 0    |
| SD010          | 1    | SF111      | 0    | 0    |
| SE110          | 0    | SF111      | 0    | 0    |
| SE110          | 1    | SC011      | 0    | 0    |
| SF111          | 0    | SA000      | 1    | 0    |
| SF111          | 1    | SF111      | 1    | 0    |



#### ROM content

```
location value
0   1
1   5
2   8
3   12
4   24
5   28
6   11
7   27
12  28
13  12
14  2
15  30

unused location, just set to initial state
--
8   1
9   1
10  1
11  1
--
```

