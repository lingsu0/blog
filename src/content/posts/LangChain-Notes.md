---
title: "LangChain架构笔记"
published: 2026-03-20
description: '记录LangChain的学习内容'
image: ''
tags: [LangChain , RAG , Prompt]
category: AI开发
draft: false
---

## 概述

LangChain 是一个用于构建基于大语言模型应用的框架。本文记录了一个基础的 LangChain 使用示例：通过链式调用实现英译中的翻译功能。

## 完整代码

```python
from langchain_community.chat_models.tongyi import ChatTongyi
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

model = ChatTongyi(
    model="qwen3-max"
    # api_key="",
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "请将下面一段英文翻译成中文：{text}"),
])

chain = prompt | model | StrOutputParser()

result = chain.invoke(
    {"text": "I love programming."}
)

print(result)
```

## 代码说明

### 1. 导入必要模块

代码引入了三个核心组件：

- **`ChatTongyi`**：通义千问的聊天模型接口，来自 `langchain_community` 社区包
- **`ChatPromptTemplate`**：用于构建结构化的聊天提示模板
- **`StrOutputParser`**：将模型输出解析为字符串格式

### 2. 初始化模型

通过 `ChatTongyi` 实例化通义千问模型：

- `model` 参数指定使用的模型版本（此处为 `qwen3-max`）
- `api_key` 参数可选择性地配置 API 密钥（若环境变量已配置则可省略）

### 3. 构建提示模板

使用 `ChatPromptTemplate.from_messages()` 定义对话结构：

- **系统消息 (`system`)**：设定助手的基本角色为"有用的助手"
- **用户消息 (`human`)**：定义具体任务——将英文翻译为中文，其中 `{text}` 是动态变量占位符

### 4. 创建处理链

通过管道操作符 `|` 将各个组件串联起来：

```
prompt → model → StrOutputParser
```

这种链式结构使得数据流清晰，每个组件的输出自动传递给下一个组件。

### 5. 执行调用

使用 `chain.invoke()` 方法执行整个链条：

- 传入字典格式的输入数据 `{"text": "I love programming."}`
- 该字典的键对应提示模板中的 `{text}` 占位符

### 6. 输出结果

打印最终翻译结果，例如：`"我热爱编程。"`

## 核心概念总结

| 组件 | 作用 |
|------|------|
| Model（模型） | 负责生成响应的大语言模型 |
| Prompt（提示） | 定义输入模板的结构 |
| Output Parser（输出解析器） | 处理模型原始输出为可用格式 |
| Chain（链） | 将多个组件组合成可执行的工作流 |

## 扩展阅读

- 可以尝试更换其他模型（如 OpenAI、Claude 等）
- 结合 RAG（检索增强生成）实现基于知识库的问答
- 使用更多类型的输出解析器处理 JSON、列表等结构化数据

# 参考文档

[LangChain 官方文档](https://python.langchain.com/en/latest/)