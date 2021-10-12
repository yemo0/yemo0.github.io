# 

title: pprof 使用
date: 2021-10-05T00:39:17
tags: [go，pprof]

`Profiling` 一般翻译为 画像，在计算机领域，我们可以将其理解为当前应用状态的画像。当程序性能不佳时，我们希望知道应用在 什么地方 耗费了 多少 CPU、memory。下面将介绍如何使用这一工具。

## 1. Go语言项目中的性能优化主要有以下几个方面

- CPU profile：报告程序的 CPU 使用情况，按照一定频率去采集应用程序在 CPU 和寄存器上面的数据
- Memory Profile（Heap Profile）：报告程序的内存使用情况
- Block Profiling：报告 goroutines 不在运行状态的情况，可以用来分析和查找死锁等性能瓶颈
- Goroutine Profiling：报告 goroutines 的使用情况，有哪些 goroutine，它们的调用关系是怎样的

### Go语言内置了获取程序的运行数据的工具，包括以下两个标准库：

- `runtime/pprof`：采集工具型应用运行数据进行分析

- `net/http/pprof`：采集服务型应用运行时数据进行分析

  pprof开启后，每隔一段时间（10ms）就会收集下当前的堆栈信息，获取各个函数占用的CPU以及内存资源；最后通过对这些采样数据进行分析，形成一个性能分析报告。

  注意，我们只应该在性能测试的时候才在代码中引入pprof。

## 2. 工具型应用

如果应用程序是执行一段时间就推出，最好的办法是应用退出时把 profiling 的报告保存到文件中，进行分析可以使用`runtime/pprof`库

```
import "runtime/pprof"
```

### CPU性能分析

开启CPU性能分析：

```go
pprof.StartCPUProfile(w io.Writer)
```

停止CPU性能分析：

```go
pprof.StopCPUProfile()
```

### 内存性能分析

记录程序的堆栈信息

```go
pprof.WriteHeapProfile(w io.Writer)
```

`go tool pprof`默认是使用`-inuse_space`进行统计，还可以使用`-inuse-objects`查看分配对象的数量。

### 演示

```
package main

import (
	"fmt"
	"os"
	"runtime/pprof"
	"time"
)

func problem() {
	for {}
}

func main() {
	file, err := os.OpenFile("./cpu.pprof", os.O_CREATE|os.O_RDWR, 0666)
	if err != nil {
		fmt.Println("OpenFile error: " + err.Error())
		return
	}

	for i := 0; i < 5; i++ {
		go problem()
	}

	pprof.StartCPUProfile(file)
	defer func() {
		pprof.StopCPUProfile()
		file.Close()
	}()
	time.Sleep(time.Second * 30)
}
```

查看

```
❯ go tool pprof cpu.pprof 
File: main
Type: cpu
Time: Oct 8, 2021 at 4:21pm (UTC)
Duration: 30.18s, Total samples = 80.50s (266.76%)
Entering interactive mode (type "help" for commands, "o" for options)
(pprof) top
Showing nodes accounting for 80.50s, 100% of 80.50s total
      flat  flat%   sum%        cum   cum%
    79.96s 99.33% 99.33%     80.50s   100%  main.problem
     0.54s  0.67%   100%      0.54s  0.67%  runtime.asyncPreempt
# 查看详情
(pprof) list main.problem
Total: 80.50s
ROUTINE ======================== main.problem in /home/yemo/GoStudy/pprof/main.go
    79.96s     80.50s (flat, cum)   100% of Total
      10ms       10ms      1:package main
         .          .      2:
         .          .      3:import (
         .          .      4:   "fmt"
         .          .      5:   "os"
         .          .      6:   "runtime/pprof"
         .          .      7:   "time"
         .          .      8:)
         .          .      9:
         .          .     10:func problem() {
    79.95s     80.49s     11:   for {
         .          .     12:
         .          .     13:   }
         .          .     14:}
         .          .     15:
         .          .     16:func main() {
```

### 更多操作

```
(pprof) help
  Commands:
    callgrind        Outputs a graph in callgrind format
    comments         Output all profile comments
    disasm           Output assembly listings annotated with samples
    dot              Outputs a graph in DOT format
    eog              Visualize graph through eog
    evince           Visualize graph through evince
    gif              Outputs a graph image in GIF format
    gv               Visualize graph through gv
    kcachegrind      Visualize report in KCachegrind
    list             Output annotated source for functions matching regexp
    pdf              Outputs a graph in PDF format
    peek             Output callers/callees of functions matching regexp
    png              Outputs a graph image in PNG format
    proto            Outputs the profile in compressed protobuf format
    ps               Outputs a graph in PS format
    raw              Outputs a text representation of the raw profile
    svg              Outputs a graph in SVG format
    tags             Outputs all tags in the profile
    text             Outputs top entries in text form
    top              Outputs top entries in text form
    topproto         Outputs top entries in compressed protobuf format
    traces           Outputs all profile samples in text form
    tree             Outputs a text rendering of call graph
    web              Visualize graph through web browser
    weblist          Display annotated source in a web browser
    o/options        List options and their current values
    q/quit/exit/^D   Exit pprof

  Options:
    call_tree        Create a context-sensitive call tree
    compact_labels   Show minimal headers
    divide_by        Ratio to divide all samples before visualization
    drop_negative    Ignore negative differences
    edgefraction     Hide edges below <f>*total
    focus            Restricts to samples going through a node matching regexp
    hide             Skips nodes matching regexp
    ignore           Skips paths going through any nodes matching regexp
    intel_syntax     Show assembly in Intel syntax
    mean             Average sample value over first value (count)
    nodecount        Max number of nodes to show
    nodefraction     Hide nodes below <f>*total
    noinlines        Ignore inlines.
    normalize        Scales profile based on the base profile.
    output           Output filename for file-based outputs
    prune_from       Drops any functions below the matched frame.
    relative_percentages Show percentages relative to focused subgraph
    sample_index     Sample value to report (0-based index or name)
    show             Only show nodes matching regexp
    show_from        Drops functions above the highest matched frame.
    source_path      Search path for source files
    tagfocus         Restricts to samples with tags in range or matched by regexp
    taghide          Skip tags matching this regexp
    tagignore        Discard samples with tags in range or matched by regexp
    tagshow          Only consider tags matching this regexp
    trim             Honor nodefraction/edgefraction/nodecount defaults
    trim_path        Path to trim from source paths before search
    unit             Measurement units to display

  Option groups (only set one per group):
    granularity      
      functions        Aggregate at the function level.
      filefunctions    Aggregate at the function level.
      files            Aggregate at the file level.
      lines            Aggregate at the source code line level.
      addresses        Aggregate at the address level.
    sort             
      cum              Sort entries based on cumulative weight
      flat             Sort entries based on own weight
  :   Clear focus/ignore/hide/tagfocus/tagignore

  type "help <cmd|option>" for more information
```



## 3. 服务形应用

如果应用程序是一直运行，那么可以使用`net/http/pprof`库，它能够在提供 HTTP 服务进行分析。

```go
_ "net/http/pprof"
```

如果使用自定义Mux，则需要手动注册一些路由规则：

```go
r.HandleFunc("/debug/pprof/", pprof.Index)
r.HandleFunc("/debug/pprof/cmdline", pprof.Cmdline)
r.HandleFunc("/debug/pprof/profile", pprof.Profile)
r.HandleFunc("/debug/pprof/symbol", pprof.Symbol)
r.HandleFunc("/debug/pprof/trace", pprof.Trace)
```

如果使用的是gin框架，那么推荐使用[github.com/gin-contrib/pprof](https://github.com/gin-contrib/pprof)，在代码中通过以下命令注册pprof相关路由。

```go
pprof.Register(router)
```

![](https://s3.bmp.ovh/imgs/2021/10/2a58d816089c56ed.png)

### 演示

```
import (
	"net/http"
	_ "net/http/pprof"
)

func main() {
	http.ListenAndServe(":8080", nil)
}
```

访问 `http://192.168.2.36:8080/debug/pprof/` 如上图。

#### 结构体字段解释

看到这里是调用Go底层的runtime.MemStats结构体获取，该结构体相关字段解释如下。 [原文链接](https://blog.csdn.net/skh2015java/article/details/102748222)

```

Alloc uint64 //golang语言框架堆空间分配的字节数
TotalAlloc uint64 //从服务开始运行至今分配器为分配的堆空间总 和，只有增加，释放的时候不减少
Sys uint64 //服务现在系统使用的内存
Lookups uint64 //被runtime监视的指针数
Mallocs uint64 //服务malloc heap objects的次数
Frees uint64 //服务回收的heap objects的次数
HeapAlloc uint64 //服务分配的堆内存字节数
HeapSys uint64 //系统分配的作为运行栈的内存
HeapIdle uint64 //申请但是未分配的堆内存或者回收了的堆内存（空闲）字节数
HeapInuse uint64 //正在使用的堆内存字节数
HeapReleased uint64 //返回给OS的堆内存，类似C/C++中的free。
HeapObjects uint64 //堆内存块申请的量
StackInuse uint64 //正在使用的栈字节数
StackSys uint64 //系统分配的作为运行栈的内存
MSpanInuse uint64 //用于测试用的结构体使用的字节数
MSpanSys uint64 //系统为测试用的结构体分配的字节数
MCacheInuse uint64 //mcache结构体申请的字节数(不会被视为垃圾回收)
MCacheSys uint64 //操作系统申请的堆空间用于mcache的字节数
BuckHashSys uint64 //用于剖析桶散列表的堆空间
GCSys uint64 //垃圾回收标记元信息使用的内存
OtherSys uint64 //golang系统架构占用的额外空间
NextGC uint64 //垃圾回收器检视的内存大小
LastGC uint64 // 垃圾回收器最后一次执行时间。
PauseTotalNs uint64 // 垃圾回收或者其他信息收集导致服务暂停的次数。
PauseNs [256]uint64 //一个循环队列，记录最近垃圾回收系统中断的时间
PauseEnd [256]uint64 //一个循环队列，记录最近垃圾回收系统中断的时间开始点。
NumForcedGC uint32 //服务调用runtime.GC()强制使用垃圾回收的次数。
GCCPUFraction float64 //垃圾回收占用服务CPU工作的时间总和。如果有100个goroutine，垃圾回收的时间为1S,那么就占用了100S。
BySize //内存分配器使用情况
```

### 查看内存

```
go tool pprof http://192.168.2.36:8080/debug/pprof/heap
```

```
> help可以查看使用说明
 
> top 可以查看前10个的内存分配情况
 
> tree 以树状显示
 
> png 以图片格式输出
 
> svg 生成浏览器可以识别的svg文件
```

#### 概要文件(cpu使用情况)

默认需要等30s

```
go tool pprof http://192.168.2.36:8080/debug/pprof/profile
```


