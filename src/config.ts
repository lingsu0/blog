import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// 站点配置
export const siteConfig: SiteConfig = {
	title: "《凌索ling》博客", // 站点标题
	subtitle: "主页", // 站点副标题
	lang: "zh_CN", // 语言代码，例如 'en', 'zh_CN', 'ja' 等
	themeColor: {
		hue: 250, // 主题色相，默认值 0-360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
		fixed: true, // 是否隐藏访客的主题色选择器
	},
	banner: {
		enable: true, // 是否启用横幅图片
		src: "assets/images/demo-banner.png", // 横幅图片路径，相对于 /src 目录。如果以 '/' 开头则相对于 /public 目录
		position: "center", // 图片位置，等同于 object-position，仅支持 'top'、'center'、'bottom'，默认为 'center'
		credit: {
			enable: false, // 是否显示横幅图片的版权信息
			text: "", // 要显示的版权文字
			url: "", // （可选）原始作品或艺术家页面的链接
		},
	},
	toc: {
		enable: true, // 是否在文章右侧显示目录
		depth: 2, // 目录中显示的最大标题深度，范围 1-3
	},
	favicon: [
		// 留空数组使用默认 favicon
		// {
		//   src: '/favicon/icon.png',    // favicon 路径，相对于 /public 目录
		//   theme: 'light',              // （可选）'light' 或 'dark'，仅在为明暗模式设置不同 favicon 时指定
		//   sizes: '32x32',              // （可选）favicon 尺寸，仅在有不同尺寸的 favicon 时指定
		// }
	],
};

// 导航栏配置
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // 内部链接不应包含基础路径，会自动添加
			external: true, // 显示外部链接图标并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png", // 头像图片路径，相对于 /src 目录。如果以 '/' 开头则相对于 /public 目录
	name: "凌索ling", // 显示名称
	bio: "希望有一天可以躺着赚钱", // 个人简介
	links: [
		{
			name: "Twitter",
			icon: "fa6-brands:twitter", // 访问 https://icones.js.org/ 查看图标代码
			// 如果尚未包含，需要安装对应的图标集
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://twitter.com",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://store.steampowered.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/saicaca/fuwari",
		},
	],
};

// 许可证配置
export const licenseConfig: LicenseConfig = {
	enable: true, // 是否启用许可证显示
	name: "CC BY-NC-SA 4.0", // 许可证名称
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 许可证链接
};

// ExpressiveCode 代码块配置
export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景色）会被覆盖，参见 astro.config.mjs 文件
	// 请选择深色主题，因为此博客主题目前仅支持深色背景
	theme: "github-dark",
};
