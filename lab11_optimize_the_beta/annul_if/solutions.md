just the simple two stage version of below:

```
The annul_if signal should be 1 when reset=1 or when pcsel[2:0]!=0, which happens when we're changing the PC from sequential execution. Get this working first -- it won't be faster, but it sets the stage for a speed improvement in the next step
```

1.try re-implement beta, incorporate pc logic into beta maybe more direct to understanding the two stage version

2.you may need to adjust **<u>.repeat 1140</u>** to a larger value, otherwise the checkoff may not have completed before checking your answer, causing error and not passing

