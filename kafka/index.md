# kafka使用


## kafka

Kafka是一款流行分布式消息分布订阅系统，除Kafka之外还有MQ、Redis等。我们可以把消息队列视为一个管道，管道的两端分别是消息生产者(producer)和消息消费者(consumer)，消息生产者产生日志等消息后可以发送到管道中，这时消息队列可以驻留在内存或者磁盘上，直到消费者来把它读走为止。

上述就是Kafka的一个概括，我们只需要了解一下Kafka的架构和一些专业术语即可，下面就来介绍一下Kafka 中一些专业术语。

**Producer**：消息生产者，负责把产生的消息发送到Kafka服务器上。

**Consumer**：消息消费者，从Kafka服务器读取消息。

**Consumer Group**：消费者群组，每个消息消费者可以划分为一个特定的群组。

**Topic**：这是Kafka使用中非常重要的一个术语，它相当于消息的"身份标识"，消息生产者产生消息时会给它贴上一个Topic标签，当消息消费者需要读取消息时，可以根据这个Topic读取特定的数据。

**Broker**：Kafka集群中包含的服务器。 --- 来自知乎

## kafka 安装

[kafka下载页面](https://kafka.apache.org/downloads)

下载好解压

```
tar -xzf kafka_2.13-3.0.0.tgz
```


