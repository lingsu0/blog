---
title: Markdown 扩展功能
published: 2024-05-01
updated: 2024-11-29
description: '了解更多 Fuwari 中的 Markdown 功能'
image: ''
tags: [演示, 示例, Markdown, Fuwari]
category: '示例'
draft: false
---

## GitHub 仓库卡片

你可以添加指向 GitHub 仓库的动态卡片，页面加载时，仓库信息会从 GitHub API 获取。

::github{repo="Fabrizz/MMM-OnSpotify"}

使用代码 `::github{repo="<所有者>/<仓库名>"}` 创建 GitHub 仓库卡片。

```markdown
::github{repo="saicaca/fuwari"}
```

## 警告框（Admonitions）

支持以下类型的警告框：`note`（注释）`tip`（提示）`important`（重要）`warning`（警告）`caution`（注意）

:::note
突出显示用户在浏览时也应考虑的信息。
:::

:::tip
帮助用户更成功的可选信息。
:::

:::important
用户成功所必需的关键信息。
:::

:::warning
由于潜在风险，需要用户立即注意的关键内容。
:::

:::caution
某个操作可能带来的负面后果。
:::

### 基本语法

```markdown
:::note
突出显示用户在浏览时也应考虑的信息。
:::

:::tip
帮助用户更成功的可选信息。
:::
```

### 自定义标题

可以自定义警告框的标题。

:::note[我的自定义标题]
这是一个带有自定义标题的注释框。
:::

```markdown
:::note[我的自定义标题]
这是一个带有自定义标题的注释框。
:::
```

### GitHub 语法

> [!TIP]
> [GitHub 语法](https://github.com/orgs/community/discussions/16925) 也同样支持。

```
> [!NOTE]
> GitHub 语法也同样支持。

> [!TIP]
> GitHub 语法也同样支持。
```

### 剧透（Spoiler）

你可以在文本中添加剧透内容。文本也支持 **Markdown** 语法。

内容 :spoiler[被隐藏了 **哎呀**]！

```markdown
内容 :spoiler[被隐藏了 **哎呀**]！

```