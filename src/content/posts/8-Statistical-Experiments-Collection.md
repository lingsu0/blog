---
title: "统计分析实验代码合集"
published: 2026-05-27
description: 8个统计分析实验的完整代码总结，涵盖从数据生成到高级统计分析
image: ''
tags: [Python, 数据分析]
category: 统计分析
draft: false
lang: zh-CN
---

# 📊 统计分析实验代码合集

欢迎访问这份统计分析实验代码总结！这里包含了8个完整的统计分析实验，涵盖从数据生成到高级统计分析的完整流程。

---

## 📋 目录导航

| 实验编号 | 实验名称 | 主要内容 |
|---------|---------|---------|
| 1️⃣ | 三种抽样方法的对比实践 | 数据生成、统计量计算 |
| 2️⃣ | 巧克力感官与成分数据分析 | 描述性统计、分布形态分析 |
| 3️⃣ | 牧草多品种多地点试验可视化 | 直方图、核密度图、箱线图、小提琴图 |
| 4️⃣ | 城市气象多要素观测数据分析 | 分组统计、热力图、Q-Q图 |
| 5️⃣ | 玉米产量数据分析 | 点估计、区间估计、t检验 |
| 6️⃣ | 药物试验数据分析 | 方差齐性检验、独立/配对t检验 |
| 7️⃣ | 教学方法效果分析 | 单因素方差分析、Tukey多重比较 |
| 8️⃣ | 紫花苜蓿干草产量分析 | 双因素方差分析 |

---

## 🧪 实验一：三种抽样方法的对比实践

<div style="background-color: #e6f7ff; padding: 15px; border-left: 4px solid #1890ff; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习如何生成模拟数据并计算总体统计量
</div>

### 📝 主要内容

- ✅ 生成5000名学生的校园消费模拟数据
- 🏷️ 数据字段包括：学号、性别、年级、学院、月消费金额
- 📊 计算总体统计量

### 💻 核心代码

```python
import pandas as pd
import numpy as np
import random

# 设置随机种子，确保结果可复现
np.random.seed(2026)
random.seed(2026)

# 生成5000名学生的模拟数据
n_students = 5000

# 生成学号
student_ids = [f"2026{str(i).zfill(4)}" for i in range(1, n_students+1)]

# 生成性别（假设男女比例1:1）
genders = np.random.choice(['男', '女'], n_students, p=[0.5, 0.5])

# 生成年级（大一大二各30%，大三大四各20%）
grades = np.random.choice(['大一', '大二', '大三', '大四'], n_students, 
                          p=[0.3, 0.3, 0.2, 0.2])

# 生成学院（6个学院）
colleges = np.random.choice(['计算机', '经管', '人文', '理学', '工学', '医学'], 
                           n_students, p=[0.2, 0.2, 0.15, 0.15, 0.2, 0.1])

# 生成月消费金额（正态分布，不同年级有差异）
consumption = []
for grade in grades:
    if grade == '大一':
        consumption.append(np.random.normal(1500, 200))
    elif grade == '大二':
        consumption.append(np.random.normal(1800, 300))
    elif grade == '大三':
        consumption.append(np.random.normal(2000, 400))
    else:  # 大四
        consumption.append(np.random.normal(2200, 500))

consumption = np.round(consumption, 2)

# 创建DataFrame
data = pd.DataFrame({
    '学号': student_ids,
    '性别': genders,
    '年级': grades,
    '学院': colleges,
    '月消费金额': consumption
})

# 计算总体统计量
population_mean = data['月消费金额'].mean()
population_std = data['月消费金额'].std()

print(f"总体学生数: {len(data)}")
print(f"总体月消费均值: {population_mean:.2f}元")
print(f"总体月消费标准差: {population_std:.2f}元")
print("\n各年级人数分布:")
print(data['年级'].value_counts())
```

### 📈 统计结果

| 指标 | 数值 |
|------|------|
| 🧑‍🎓 总体学生数 | 5000 |
| 💰 总体月消费均值 | 1834.95元 |
| 📊 总体月消费标准差 | 424.90元 |

### 💾 数据导出

将生成的数据保存为CSV文件：`学生校园消费数据集.csv`

---

## 🍫 实验二：巧克力感官与成分数据分析

<div style="background-color: #fff7e6; padding: 15px; border-left: 4px solid #fa8c16; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习描述性统计、离散趋势分析和分布形态分析
</div>

### 📦 数据集

- 市售巧克力感官与成分数据集（10种产品）
- 变量包括：外观评分、香气评分、苦味强度评分、顺滑度评分、整体喜好度评分、可可含量、糖含量、脂肪含量、每100克能量

### 💻 基础代码

```python
import pandas as pd
import numpy as np

# 读取数据集
df = pd.read_csv('市售巧克力感官与成分数据集.csv')
df.head()  # 查看前几行数据
```

### 🔍 分析内容

#### 📏 1. 集中趋势分析

```python
# 计算均值、中位数、众数
df['整体喜好度评分'].mean()
df['整体喜好度评分'].median()
df['整体喜好度评分'].mode()

# 计算四分位数
df['苦味强度评分'].quantile(0.25)
df['苦味强度评分'].quantile(0.50)
df['苦味强度评分'].quantile(0.75)
```

#### 📐 2. 离散趋势分析

```python
# 计算方差、标准差、极差
df['整体喜好度评分'].var(ddof=1)
df['整体喜好度评分'].std(ddof=1)
df['整体喜好度评分'].max() - df['整体喜好度评分'].min()

# 计算变异系数
sugar_cv = (df['糖含量(%)'].std(ddof=1) / df['糖含量(%)'].mean()) * 100
```

#### 📈 3. 分布形态分析

```python
from scipy import stats

# 计算偏度系数
skew = stats.skew(df['顺滑度评分'], bias=False)

# 计算峰度系数
fat_kurtosis = stats.kurtosis(df['脂肪含量(%)'], bias=False)
```

### 🎯 主要发现

<div style="background-color: #f6ffed; padding: 15px; border-left: 4px solid #52c41a; border-radius: 4px; margin: 15px 0;">
    <ul>
        <li>✅ 整体喜好度评分均值约7.47，中位数7.55，呈轻微左偏</li>
        <li>✅ 可可含量平均66.2%，中位数67.5%</li>
        <li>✅ 顺滑度评分偏度系数接近0，分布基本对称</li>
        <li>✅ 脂肪含量超额峰度系数为负，呈平峰分布</li>
    </ul>
</div>

### 💭 讨论要点

- 💡 香气评分显著正偏，多数产品香气评价较低
- 💡 标准差和极差结合可全面控制产品质量稳定性
- 💡 能量值呈平峰分布，产品间差异大，可开发细分市场产品

---

## 🌿 实验三：牧草多品种多地点试验可视化

<div style="background-color: #f6ffed; padding: 15px; border-left: 4px solid #52c41a; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习数据可视化，包括直方图、核密度图、箱线图和小提琴图
</div>

### 📦 数据集

- 牧草多品种多地点试验数据集

### 💻 基础代码

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = 'SimHei'
plt.rcParams['axes.unicode_minus'] = False

# 读取数据
df = pd.read_csv('牧草多品种多地点试验数据集.csv')
```

### 🎨 可视化内容

#### 📊 补充：粗蛋白含量核密度图

```python
# 粗蛋白含量核密度图
plt.figure(figsize=(8, 5))
sns.kdeplot(df['粗蛋白含量(%)'], fill=True)
plt.title('粗蛋白含量核密度图')
plt.xlabel('粗蛋白含量(%)')
plt.ylabel('密度')
plt.grid(True, alpha=0.3)
plt.show()
```

#### 📈 1. 直方图与核密度估计（干草产量）

```python
# 绘制多个子图进行比较
plt.figure(figsize=(12, 10))

# 直方图（bins=10）
plt.subplot(2, 2, 1)
plt.hist(df['干草产量(kg/亩)'], bins=10, edgecolor='black', alpha=0.7)
plt.title('直方图 (bins=10)')
plt.xlabel('干草产量(kg/亩)')
plt.ylabel('频数')
plt.grid(True, alpha=0.3)

# 直方图（bins=20）
plt.subplot(2, 2, 2)
plt.hist(df['干草产量(kg/亩)'], bins=20, edgecolor='black', alpha=0.7, color='orange')
plt.title('直方图 (bins=20)')
plt.xlabel('干草产量(kg/亩)')
plt.ylabel('频数')
plt.grid(True, alpha=0.3)

# 核密度估计（默认带宽）
plt.subplot(2, 2, 3)
sns.kdeplot(df['干草产量(kg/亩)'], fill=True)
plt.title('核密度图 (默认带宽)')
plt.xlabel('干草产量(kg/亩)')
plt.ylabel('密度')
plt.grid(True, alpha=0.3)

# 核密度估计（带宽调整）
plt.subplot(2, 2, 4)
sns.kdeplot(df['干草产量(kg/亩)'], bw_adjust=0.5, fill=True, color='red')
plt.title('核密度图 (带宽=0.5)')
plt.xlabel('干草产量(kg/亩)')
plt.ylabel('密度')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

#### 📦 2. 箱线图

```python
# 按试验地点分组的箱线图
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='试验地点', y='干草产量(kg/亩)', palette='Set2')
plt.title('不同试验地点的干草产量分布')
plt.xlabel('试验地点')
plt.ylabel('干草产量(kg/亩)')
plt.tight_layout()
plt.show()

# 单变量箱线图
plt.boxplot(df['鲜草产量(kg/亩)'])
plt.title('鲜草产量箱线图')
plt.ylabel('鲜草产量(kg/亩)')
plt.show()
```

#### 🎻 3. 小提琴图

```python
# 按草种类型分组的小提琴图
plt.figure(figsize=(8, 6))
sns.violinplot(data=df, x='草种类型', y='分蘖数(个/株)', palette='Set2')
plt.title('不同草种类型的分蘖数分布')
plt.xlabel('草种类型')
plt.ylabel('分蘖数(个/株)')
plt.show()

# 同时显示箱线图和小提琴图（对比展示）
plt.figure(figsize=(12, 5))

# 左子图：箱线图
plt.subplot(1, 2, 1)
plt.boxplot(df['酸性洗涤纤维含量(%)'], 
           patch_artist=True,
           boxprops=dict(facecolor='skyblue', alpha=0.7),
           medianprops=dict(color='red', linewidth=2))
plt.title('酸性洗涤纤维含量 - 箱线图', fontsize=12)
plt.xlabel('')
plt.ylabel('含量(%)')
plt.grid(True, alpha=0.3, axis='y')

# 右子图：小提琴图
plt.subplot(1, 2, 2)
sns.violinplot(data=df, y='酸性洗涤纤维含量(%)', 
              color='lightcoral', inner='quartile')
plt.title('酸性洗涤纤维含量 - 小提琴图', fontsize=12)
plt.xlabel('')
plt.ylabel('含量(%)')
plt.grid(True, alpha=0.3, axis='y')

plt.suptitle('酸性洗涤纤维含量分布对比', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()
```

### 🎯 主要发现

<div style="background-color: #fff7e6; padding: 15px; border-left: 4px solid #fa8c16; border-radius: 4px; margin: 15px 0;">
    <ul>
        <li>✅ 粗蛋白含量核密度图呈双峰分布</li>
        <li>✅ 不同试验地点干草产量有明显差异</li>
        <li>✅ 禾本科分蘖数整体水平高于豆科</li>
        <li>✅ 箱线图适合快速识别异常值和统计摘要，小提琴图更直观展示分布形态</li>
    </ul>
</div>

---

## 🌤️ 实验四：城市气象多要素观测数据分析

<div style="background-color: #e6f7ff; padding: 15px; border-left: 4px solid #1890ff; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习分组统计、热力图可视化和Q-Q图检验正态性
</div>

### 📦 数据集

- 城市气象多要素观测数据集（2023年全年数据）
- 变量包括：日期、季节、日最高温、日最低温、日平均相对湿度、日累计降水量、日平均风速、日日照时数

### 💻 基础代码

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# 设置中文字体
plt.rcParams['font.sans-serif'] = 'SimHei'
plt.rcParams['axes.unicode_minus'] = False

# 读取数据
df = pd.read_csv('城市气象多要素观测数据集.csv')
df  # 查看数据集
```

### 🔍 分析内容

#### 📊 1. 按季节分组统计

```python
# 按季节分组计算平均值
season_avg = df.groupby('季节')[['日最高温(°C)', '日平均相对湿度(%)', '日日照时数(小时)']].mean()
```

#### 🔥 2. 热力图可视化

```python
# 绘制热力图
plt.figure(figsize=(8, 6))
sns.heatmap(season_avg, cmap='coolwarm', annot=True, fmt='.1f', cbar_kws={'label': '平均值'})
plt.title('各季节气象要素平均值热力图')
plt.xlabel('气象要素')
plt.ylabel('季节')
```

#### 📈 3. Q-Q图检验正态性

```python
from scipy import stats

# 降水量Q-Q图
stats.probplot(df['日累计降水量(mm)'], dist='norm', plot=plt)

# 风速Q-Q图
stats.probplot(df['日平均风速(m/s)'], dist='norm', plot=plt)
```

---

## 🌽 实验五：玉米产量数据分析

<div style="background-color: #fff7e6; padding: 15px; border-left: 4px solid #fa8c16; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习点估计、区间估计和单样本t检验
</div>

### 📦 数据集

- 玉米产量数据（corn_yield_2023.csv）

### 💻 基础代码

```python
import pandas as pd
import numpy as np
from scipy import stats

# 读取数据
df = pd.read_csv('corn_yield_2023.csv')
yield_data = df['单位面积产量']
print(type(yield_data))
print(type(df))
```

### 🔍 分析内容

#### 📏 1. 描述性统计

```python
sample_size = len(yield_data)
mean_yield = yield_data.mean()
std_yield = yield_data.std(ddof=1)
```

#### 📈 2. 点估计与区间估计

```python
# 点估计
丰玉7号总体平均亩产的点估计值 = mean_yield

# 区间估计（95%置信水平）
confidence_level = 0.95
alpha = 1 - confidence_level
dof = sample_size - 1
t_critical = stats.t.ppf(1 - alpha/2, dof)
std_error = std_yield / np.sqrt(sample_size)
margin_of_error = t_critical * std_error
confidence_interval = (mean_yield - margin_of_error, mean_yield + margin_of_error)
```

#### 🧪 3. 单样本t检验

```python
# 对比理论亩产650kg
theoretical_mean = 650
alpha = 0.05

t_stat, p_value = stats.ttest_1samp(yield_data, popmean=theoretical_mean, alternative='two-sided')
```

### 📊 统计结果

| 指标 | 数值 |
|------|------|
| 📦 样本量 | 20 |
| 📈 样本均值 | 约659.86 kg/亩 |
| 📊 样本标准差 | 约28.80 |
| 📐 置信区间 | (646.38, 673.34) |
| 🧪 t检验p值 | 约0.14（大于0.05，差异不显著） |

### 🎯 结论

当前样本与理论值650kg/亩无显著差异，建议扩大区域试验以获取更可靠数据。

---

## 💊 实验六：药物试验数据分析

<div style="background-color: #f6ffed; padding: 15px; border-left: 4px solid #52c41a; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习方差齐性检验、独立双样本t检验和配对t检验
</div>

### 📦 数据集

1. 药物试验独立样本（drug_trial_independent.csv）
2. 药物试验配对样本（drug_trial_paired.csv）

### 💻 基础代码

```python
import numpy as np
import pandas as pd
import scipy.stats as stats

# 读取独立样本数据
df = pd.read_csv('drug_trial_independent.csv')
group1 = df['A']
group2 = df['B']
alpha = 0.05
```

### 🔍 分析内容

#### 📊 1. 独立双样本分析

##### 📐 方差齐性检验（F检验）

```python
# 计算无偏样本方差
var1 = group1.var(ddof=1)
var2 = group2.var(ddof=1)

# 确定F统计量（较大的方差作分子，较小的方差作分母）
if var1 > var2:
    f_stat = var1 / var2
    df1, df2 = len(group1)-1, len(group2)-1
else:
    f_stat = var2 / var1
    df1, df2 = len(group2)-1, len(group1)-1

# 计算p值
p_right = 1 - stats.f.cdf(f_stat, df1, df2)
p_left = stats.f.cdf(1/f_stat, df2, df1)
p_value_f = 2 * min(p_right, p_left)
```

##### 🧪 独立双样本t检验

```python
# 根据方差齐性结果选择t检验方法
equal_var = p_value_f > alpha
t_stat, p_value_t = stats.ttest_ind(group1, group2, equal_var=equal_var)
```

#### 🔗 2. 配对样本分析

```python
# 配对t检验
t_stat, p_value = stats.ttest_rel(A, B)
```

### 📊 统计结果

<div style="background-color: #e6f7ff; padding: 15px; border-left: 4px solid #1890ff; border-radius: 4px; margin: 15px 0;">
    <ul>
        <li>✅ 独立样本：F检验p值约0.59，方差齐性；t检验p值约0.0073，组间差异显著</li>
        <li>✅ 配对样本：p值接近0，差异显著</li>
    </ul>
</div>

---

## 👩‍🏫 实验七：教学方法效果分析

<div style="background-color: #f6ffed; padding: 15px; border-left: 4px solid #52c41a; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习单因素方差分析和Tukey HSD多重比较
</div>

### 📦 数据集

- 教学方法效果数据（teaching_method_effect.csv）
- 三种教学方法（1、2、3）的学生成绩

### 💻 基础代码

```python
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# 读取数据
data = pd.read_csv('teaching_method_effect.csv')
data  # 查看数据
```

### 🔍 分析内容

#### 📊 1. 描述性统计

```python
# 按教学方法分组统计
count = data.groupby('method')['score'].count()
mean = data.groupby('method')['score'].mean()
std = data.groupby('method')['score'].std()
```

#### 📈 2. 正态性检验（Q-Q图）

```python
# 对每个组绘制Q-Q图
group1 = data[data['method'] == 1]['score']
stats.probplot(group1, dist='norm', plot=plt)
plt.title('Q-Q Plot (Method 1)')
```

#### 🧪 3. 单因素方差分析

```python
from scipy import stats

F, p = stats.f_oneway(group1, group2, group3)
```

#### 📦 4. Tukey HSD多重比较

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

tukey_result = pairwise_tukeyhsd(
    endog=data['score'],
    groups=data['method'],
    alpha=0.05
)
```

### 📊 统计结果

| 指标 | 数值 |
|------|------|
| 📊 方法1均值 | 约73.63 |
| 📊 方法1标准差 | 约7.68 |
| 📊 方法2均值 | 约78.14 |
| 📊 方法2标准差 | 约6.78 |
| 📊 方法3均值 | 约84.84 |
| 📊 方法3标准差 | 约4.93 |
| 🧪 F统计量 | 约14.78 |
| 🧪 p值 | 约0.0000 |

<div style="background-color: #fff7e6; padding: 15px; border-left: 4px solid #fa8c16; border-radius: 4px; margin: 15px 0;">
    <ul>
        <li>✅ Tukey检验：方法3显著优于方法1和方法2</li>
    </ul>
</div>

---

## 🌾 实验八：紫花苜蓿干草产量分析

<div style="background-color: #e6f7ff; padding: 15px; border-left: 4px solid #1890ff; border-radius: 4px; margin: 15px 0;">
    <strong>💡 实验目的</strong>：学习双因素无交互方差分析和Tukey多重比较
</div>

### 📦 数据集

- 紫花苜蓿干草产量数据（紫花苜蓿干草产量.csv）
- 因素：灌溉方式（A1充分、A2中度亏缺、A3重度亏缺）、种植密度（B1-B4）

### 💻 基础代码

```python
import pandas as pd
import numpy as np
from statsmodels.formula.api import ols
from statsmodels.stats.anova import anova_lm
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# 读取数据
df = pd.read_csv('紫花苜蓿干草产量.csv')
df  # 查看数据
```

### 🔍 分析内容

#### 📊 1. 描述性统计

```python
# 按灌溉方式分组
irrigation_desc = df.groupby('灌溉方式')['干草产量'].describe()[['count', 'mean', 'std']]

# 按种植密度分组
density_desc = df.groupby('种植密度')['干草产量'].describe()[['count', 'mean', 'std']]
```

#### 🧪 2. 双因素无交互方差分析

```python
from statsmodels.formula.api import ols
from statsmodels.stats.anova import anova_lm

# 方法一：不使用Q()函数（当字段名无特殊字符时）
model = ols(formula='干草产量 ~ 灌溉方式+种植密度', data=df).fit()
anova_table = anova_lm(model, typ=2)  # typ=2 表示使用Type II平方和
print("===== 双因素方差分析结果 =====")
print(anova_table)

# 方法二：使用Q()函数处理中文字段名（更稳健）
model = ols(formula='Q("干草产量") ~ C(Q("灌溉方式"))+C(Q("种植密度"))', data=df).fit()
anova_table = anova_lm(model, typ=2)
print("===== 双因素方差分析结果 =====")
print(anova_table)
```

#### 📦 3. Tukey HSD多重比较

```python
from statsmodels.stats.multicomp import pairwise_tukeyhsd

# 对灌溉方式进行多重比较
tukey = pairwise_tukeyhsd(endog=df["干草产量"], groups=df["灌溉方式"], alpha=0.05)

# 对种植密度进行多重比较
tukey = pairwise_tukeyhsd(endog=df["干草产量"], groups=df["种植密度"], alpha=0.05)
```

### 📊 统计结果

| 指标 | 数值 |
|------|------|
| 🌱 充分灌溉平均产量 | 约1246.47 kg/亩 |
| 🌱 中度亏缺灌溉平均产量 | 约1041.59 kg/亩 |
| 🌱 重度亏缺灌溉平均产量 | 约821.08 kg/亩 |
| 🧪 灌溉方式F统计量 | 约359.19 |
| 🧪 种植密度F统计量 | 约23.71 |

<div style="background-color: #f6ffed; padding: 15px; border-left: 4px solid #52c41a; border-radius: 4px; margin: 15px 0;">
    <ul>
        <li>✅ 灌溉方式p值：5.68e-07（显著）</li>
        <li>✅ 种植密度p值：9.99e-04（显著）</li>
        <li>✅ Tukey检验：三种灌溉方式间差异均显著</li>
    </ul>
</div>

### 💡 双因素方差分析优势

- ✅ 可同时考察多个栽培因子
- ✅ 排除混杂干扰
- ✅ 更符合农业生产实际

---

## 🛠️ 技术栈总结

所有实验都使用了以下Python库：

### 📦 核心库

- **数据处理**：`pandas`、`numpy`
- **统计分析**：`scipy.stats`
- **数据可视化**：`matplotlib`、`seaborn`
- **高级统计**：`statsmodels`（用于方差分析和多重比较）

### 📊 主要统计方法覆盖

1. ✅ 描述性统计（均值、中位数、众数、方差、标准差）
2. ✅ 集中趋势与离散趋势分析
3. ✅ 分布形态分析（偏度、峰度）
4. ✅ 数据可视化（直方图、核密度估计、箱线图、小提琴图、热力图、Q-Q图）
5. ✅ 参数估计（点估计、区间估计）
6. ✅ 假设检验（单样本t检验、独立双样本t检验、配对t检验）
7. ✅ 方差分析（单因素ANOVA、双因素无交互ANOVA）
8. ✅ 多重比较（Tukey HSD）
9. ✅ 方差齐性检验（F检验）

### 🎯 实验设计特点

- ✅ 涵盖了从数据生成到高级统计分析的完整流程
- ✅ 涉及多个领域：教育、农业、医药、气象
- ✅ 注重结果解释与实际应用结合
