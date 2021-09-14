# go Test测试


| 类型     | 函数名前缀            | 作用                           |
| -------- | --------------------- | ------------------------------ |
| 测试函数 | 函数名前缀为Test      | 测试程序的一些逻辑行为是否正确 |
| 基准函数 | 函数名前缀为Benchmark | 测试函数的性能                 |
| 示例函数 | 函数名前缀为Example   | 为文档提供示例文档             |

### 测试函数

测试函数必须导入`testing`包 。

基本格式

```go
function TestName(t *testing.T) {}
```

其中参数`t`用于报告测试失败和附加的日志信息。 `testing.T`的拥有的方法如下

```go
func (c *T) Error(args ...interface{})
func (c *T) Errorf(format string, args ...interface{})
func (c *T) Fail()
func (c *T) FailNow()
func (c *T) Failed() bool
func (c *T) Fatal(args ...interface{})
func (c *T) Fatalf(format string, args ...interface{})
func (c *T) Log(args ...interface{})
func (c *T) Logf(format string, args ...interface{})
func (c *T) Name() string
func (t *T) Parallel()
func (t *T) Run(name string, f func(t *T)) bool
func (c *T) Skip(args ...interface{})
func (c *T) SkipNow()
func (c *T) Skipf(format string, args ...interface{})
func (c *T) Skipped() bool
```

#### 案例演示

`main.go`

```go
package main

func Sum(a, b int) int {
	return a + b
}
```

`sum_test.go`

```go
package main

import "testing"

func TestSum(t *testing.T)  {
   res := Sum(1, 4)
   if res != 3{
      t.Error("sum is wrong")
   } else {
      t.Log("sum is ok")
   }
}
```

运行go test -v

```go
=== RUN   TestSum
    sum_test.go:10: sum is ok
--- PASS: TestSum (0.00s)
PASS
ok      _/C_/Users/???/Desktop/go/test/testing        0.042s
```

### 测试组

```go
package main

import (
   "reflect"
   "testing"
)

func TestSum(t *testing.T)  {
   type testCase struct {
      a int
      b int
      w int
   }
   testGroup := []testCase{
      {a: 1, b: 2, w: 3},
      {a: 3, b: 2, w: 5},
      {a: 3, b: 2, w: 6},
   }

   for _, v := range testGroup{
      res := Sum(v.a, v.b)
      if !reflect.DeepEqual(res, v.w) {
         t.Error("sum is wrong")
      } else {
         t.Log("sum is ok")
      }
   }
}
```

```go
=== RUN   TestSum
    sum_test.go:32: sum is ok
    sum_test.go:32: sum is ok
    sum_test.go:30: sum is wrong
--- FAIL: TestSum (0.00s)
FAIL
exit status 1
FAIL    _/C_/Users/???/Desktop/go/test/testing        0.043s
```

### 子测试

```go
func TestSum(t *testing.T)  {
	//res := Sum(1, 4)
	//if res != 3{
	//	t.Error("sum is wrong")
	//} else {
	//	t.Log("sum is ok")
	//}

	type testCase struct {
		a int
		b int
		w int
	}
	testGroup := map[string]testCase{
		"case_1": {a: 1, b: 2, w: 3},
		"case_2": {a: 3, b: 2, w: 5},
		"case_3": {a: 3, b: 2, w: 6},
	}

	for k, v := range testGroup{
		t.Run(k, func(t *testing.T) {
			res := Sum(v.a, v.b)
			if !reflect.DeepEqual(res, v.w) {
				t.Error("sum is wrong")
			} else {
				t.Log("sum is ok")
			}
		})
	}
}
```

`go test -run=TestSum/case_1`

```go
testing: warning: no tests to run
PASS
ok      _/C_/Users/???/Desktop/go/test/testing        0.037s
```

### 测试覆盖

Go提供内置功能来检查你的代码覆盖率 ,使用`go test -cover`

使用`-coverprofile`额外参数，将覆盖信息记录输出到文件
