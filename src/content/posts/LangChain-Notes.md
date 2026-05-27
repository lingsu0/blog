---
title: "LangChain 学习笔记：Chain、Prompt 和输出方式"
published: 2026-03-20
description: 'LangChain 核心组件与 Chain 调用详解'
image: ''
tags: [LangChain, Prompt, Chain]
category: AI应用开发
draft: false
---

## 概述

LangChain 是一个用于构建基于大语言模型（LLM）应用程序的开发框架。本文通过一个完整的英译中翻译示例，系统梳理 LangChain 的核心组件与链式调用（Chain）的使用方法。

## 完整代码

以下代码演示了如何使用 LangChain 实现英译中翻译功能：

```python
from langchain_community.chat_models.tongyi import ChatTongyi
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 初始化通义千问模型
model = ChatTongyi(
    model="qwen3-max"
    # api_key="",  # 可通过环境变量或此处配置 API 密钥
)

# 构建提示模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "请将下面一段英文翻译成中文：{text}"),
])

# 创建处理链
chain = prompt | model | StrOutputParser()

# 执行翻译
result = chain.invoke(
    {"text": "I love programming."}
)

print(result)
```

## 代码详解

### 1. 导入核心模块

代码引入了 LangChain 的三个核心组件：

- **`ChatTongyi`**：通义千问（Qwen）的聊天模型接口，来自 `langchain_community` 社区扩展包
- **`ChatPromptTemplate`**：用于构建结构化的聊天提示模板，支持动态变量插值
- **`StrOutputParser`**：将模型的原始输出解析为字符串格式，便于后续处理

### 2. 初始化语言模型

通过 `ChatTongyi` 类实例化通义千问模型：

- **`model`** 参数：指定使用的模型版本（此处为 `qwen3-max`）
- **`api_key`** 参数：用于配置 API 密钥。若已在环境变量中设置（如 `DASHSCOPE_API_KEY`），则可省略此参数

### 3. 构建提示模板

使用 `ChatPromptTemplate.from_messages()` 方法定义对话结构：

- **系统消息（`system`）**：设定 AI 助手的基础角色定位——"有用的助手"
- **用户消息（`human`）**：定义具体任务指令——将英文翻译为中文。其中 `{text}` 为动态变量占位符，可在运行时替换实际内容

### 4. 创建处理链（Chain）

通过管道操作符 `|` 将各组件串联成完整的工作流：

```python
prompt → model → StrOutputParser
```

这种链式表达的优势在于：
- **数据流向清晰**：每个组件的输出自动作为下一个组件的输入
- **代码简洁优雅**：避免嵌套调用，提升可读性
- **易于扩展**：可随时在链中插入新的处理步骤

### 5. 执行调用

使用 `chain.invoke()` 方法触发整个处理链的执行：

- 传入字典格式的输入数据 `{"text": "I love programming."}`
- 字典的键（`"text"`）需与提示模板中的占位符（`{text}`）严格对应

### 6. 输出结果

打印最终翻译结果，示例输出为：

```
我热爱编程。
```

## 核心概念总结

| 组件 | 功能说明 |
|------|----------|
| **Model（模型）** | 负责生成文本响应的语言模型，如 GPT、Qwen 等 |
| **Prompt（提示）** | 定义输入模板的结构，控制向模型传递信息的方式 |
| **Output Parser（输出解析器）** | 将模型的原始输出转换为可用的数据格式（如字符串、JSON 等） |
| **Chain（链）** | 将多个组件组合成可执行的工作流，实现复杂的数据处理管道 |

## 扩展：链式调用的输出方式

LangChain 的 `Runnable` 接口（通过 `|` 操作符创建的链对象）提供了多种执行方法，以适应不同的应用场景。下面逐一介绍：

### 1. `invoke()` — 同步调用

最常用的执行方式，一次性获取完整的生成结果。适用于需要等待全部内容生成完毕的场景。

```python
# 同步调用，等待模型返回完整响应
result = chain.invoke({"text": "I love programming."})
print(result)  # 输出：我热爱编程。
```

**核心特点**：
- 阻塞式调用，直到模型生成完毕才返回结果
- 返回经过解析后的最终结果（如字符串）
- 适合离线任务、批量处理、简单脚本等场景

### 2. `stream()` — 流式输出

逐块（chunk）返回模型生成的内容，适用于需要实时显示生成进度的场景（如聊天界面）。

```python
# 流式输出，逐块获取生成内容
for chunk in chain.stream({"text": "I love programming."}):
    print(chunk, end="", flush=True)
# 输出：我热爱编程。（逐字/逐词显示）
```

**核心特点**：
- 返回一个生成器（Generator），每次 yield 一小部分内容
- 可以实现"打字机效果"，显著提升用户体验
- 适合聊天机器人、实时内容展示等场景

**与 `astream()` 的区别**：
- `stream()` 是**同步**流式方法，适用于普通函数
- `astream()` 是**异步**流式方法，需要在 `async` 函数中配合 `async for` 使用：

```python
async for chunk in chain.astream({"text": "I love programming."}):
    print(chunk, end="", flush=True)
```

### 3. `batch()` — 批量处理

一次性处理多个输入请求，返回结果列表。适用于需要并行处理多个任务的场景。

```python
# 批量处理多个输入
inputs = [
    {"text": "I love programming."},
    {"text": "Hello, world!"},
    {"text": "Machine learning is amazing."}
]

results = chain.batch(inputs)
for i, result in enumerate(results):
    print(f"{i+1}. {result}")
# 输出：
# 1. 我热爱编程。
# 2. 你好，世界！
# 3. 机器学习令人惊叹。
```

**核心特点**：
- 默认采用并发执行策略，大幅提升处理效率
- 可通过 `config` 参数控制并发数量：`chain.batch(inputs, config={"max_concurrency": 5})`
- 返回结果列表，顺序与输入列表严格对应

**异步版本**：`abatch()` 方法用于异步环境下的批量处理

### 4. `ainvoke()` — 异步调用

`invoke()` 的异步版本，适用于异步编程环境（如 FastAPI、aiohttp 等）。

```python
async def translate():
    result = await chain.ainvoke({"text": "I love programming."})
    print(result)
```

### 方法对比总览

| 方法 | 执行类型 | 返回值 | 典型应用场景 |
|------|----------|--------|--------------|
| `invoke()` | 同步 | 单个完整结果 | 简单调用、离线批处理 |
| `ainvoke()` | 异步 | 单个完整结果 | 异步应用、Web 服务 |
| `stream()` | 同步流式 | 生成器（逐块内容） | 实时显示、聊天界面 |
| `astream()` | 异步流式 | 异步生成器 | 异步实时显示 |
| `batch()` | 同步批量 | 结果列表 | 批量数据处理 |
| `abatch()` | 异步批量 | 结果列表（协程） | 异步批量处理 |

### 实际使用建议

根据具体场景选择合适的方法：

- **简单脚本 / 调试测试**：使用 `invoke()`，代码最简洁
- **聊天机器人 / 交互式应用**：使用 `stream()` 或 `astream()`，提供流畅的用户体验
- **数据处理管道 / 批量翻译**：使用 `batch()`，充分利用并发能力
- **异步 Web 服务**：使用 `ainvoke()` 或 `astream()`，与非阻塞架构完美契合

## 扩展阅读

- **更换模型提供商**：尝试使用其他模型（如 OpenAI GPT、Anthropic Claude 等），只需替换模型初始化代码，链式调用逻辑无需修改
- **结合 RAG 技术**：与检索增强生成（Retrieval-Augmented Generation）结合，实现基于私有知识库的智能问答
- **结构化输出**：探索更多输出解析器（如 `JsonOutputParser`、`ListOutputParser`），处理 JSON、列表等结构化数据

## 参考文档

- [LangChain 官方文档（Python）](https://python.langchain.com/en/latest/)