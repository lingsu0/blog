---
title: "LangChain架构笔记"
published: 2026-03-20
description: '记录LangChain的学习内容'
image: ''
tags: [LangChain , RAG , Prompt]
category: AI开发
draft: false
---

# 通义千问 API 调用示例 - Python 实现

## 概述

本文介绍如何使用 Python 调用阿里云通义千问（Qwen）大模型的 API，实现简单的对话功能。

## 环境准备

### 安装依赖

```bash
pip install openai
```

> 注意：虽然使用的是阿里云的 API，但可以通过 `openai` 库进行调用，因为阿里云提供了兼容 OpenAI 格式的接口。

## 代码解析

### 1. 导入库并创建客户端

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
    # api_key="YOUR_API_KEY" 需要配置环境变量 DASHSCOPE_API_KEY，配置后不需要再传入
)
```

**说明：**
- 导入 `OpenAI` 类
- 创建客户端时指定 `base_url` 为阿里云 DashScope 的兼容模式接口地址

### 2. 调用模型

```python
response = client.chat.completions.create(
    model="qwen3.5-flash",
    messages=[
        {"role": "system", "content": "你是一个 Python 编译专家，并且不说废话简单回答"},
        {"role": "assistant", "content": "我是编程专家，请问你要问什么"},
        {"role": "user", "content": "输出 1-10 的数字，使用 Python 代码"}
    ]
)
```

**参数说明：**
- `model`: 指定使用的模型版本，这里使用的是 `qwen3.5-flash`
- `messages`: 对话消息列表，每条消息包含：
    - `role`: 角色类型（`system`/`assistant`/`user`）
    - `content`: 消息内容

### 3. 处理并输出结果

```python
print(response.choices[0].message.content)
```

**说明：**
- 从响应对象中提取第一个选择的答案内容并打印

## 完整代码

```python
from openai import OpenAI

# 1. 获取 client 对象
client = OpenAI(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

# 2. 调用模型
response = client.chat.completions.create(
    model="qwen3.5-flash",
    messages=[
        {"role": "system", "content": "你是一个 Python 编译专家，并且不说废话简单回答"},
        {"role": "assistant", "content": "我是编程专家，请问你要问什么"},
        {"role": "user", "content": "输出 1-10 的数字，使用 Python 代码"}
    ]
)

# 3. 处理结果
print(response.choices[0].message.content)
```

## 注意事项

1. **API Key 配置**：使用前需要配置 API Key，可以通过环境变量 `DASHSCOPE_API_KEY` 或在代码中传入 `api_key` 参数
2. **模型选择**：根据需求选择合适的模型版本
3. **错误处理**：生产环境建议添加 try-except 进行异常处理

## 参考链接

- [阿里云 DashScope 文档](https://help.aliyun.com/zh/dashscope/)
- [OpenAI Python SDK](https://github.com/openai/openai-python)