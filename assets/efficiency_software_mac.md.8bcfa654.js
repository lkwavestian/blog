import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.b4e1a49c.js";const h=JSON.parse('{"title":"Mac 平台","description":"收录 Mac 平台下的实用软件，提升使用体验","frontmatter":{"description":"收录 Mac 平台下的实用软件，提升使用体验"},"headers":[],"relativePath":"efficiency/software/mac.md","lastUpdated":1714139543000}'),e={name:"efficiency/software/mac.md"},p=l(`<h1 id="mac-平台" tabindex="-1">Mac 平台 <a class="header-anchor" href="#mac-平台" aria-label="Permalink to &quot;Mac 平台&quot;">​</a></h1><h2 id="系统设置" tabindex="-1">系统设置 <a class="header-anchor" href="#系统设置" aria-label="Permalink to &quot;系统设置&quot;">​</a></h2><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 禁止 “Are you sure you want to open this application?” 提示</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.LaunchServices</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">LSQuarantine</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 禁止磁盘映像验证</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.frameworks.diskimages</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">skip-verify</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.frameworks.diskimages</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">skip-verify-locked</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.frameworks.diskimages</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">skip-verify-remote</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 桌面隐藏外部磁盘和可移动介质</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.finder</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ShowExternalHardDrivesOnDesktop</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">false</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.finder</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ShowRemovableMediaOnDesktop</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 显示所有扩展名和隐藏文件</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">AppleShowAllExtensions</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.finder</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">AppleShowAllFiles</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 禁用修改扩展名时的警告</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.finder</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">FXEnableExtensionChangeWarning</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 显示底部地址栏</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.finder</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">ShowPathbar</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 禁止创建 .DS_Store 文件</span></span>
<span class="line"><span style="color:#FFCB6B;">defaults</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">write</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.desktopservices</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">DSDontWriteNetworkStores</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-bool</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="允许打开任何来源的应用" tabindex="-1">允许打开任何来源的应用 <a class="header-anchor" href="#允许打开任何来源的应用" aria-label="Permalink to &quot;允许打开任何来源的应用&quot;">​</a></h3><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">spctl</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--master-disable</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="xcode-command-line-tools" tabindex="-1">Xcode Command Line Tools <a class="header-anchor" href="#xcode-command-line-tools" aria-label="Permalink to &quot;Xcode Command Line Tools&quot;">​</a></h2><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装 Xcode Command Line Tools</span></span>
<span class="line"><span style="color:#FFCB6B;">xcode-select</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 删除 Xcode Command Line Tools</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">rm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-rf</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">/Library/Developer/CommandLineTools</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="homebrew" tabindex="-1">Homebrew <a class="header-anchor" href="#homebrew" aria-label="Permalink to &quot;Homebrew&quot;">​</a></h2><p>Mac 的软件包管理工具，用于安装、卸载和管理各种软件，包括命令行工具、库和应用程序等</p><p>安装</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">/bin/bash</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 国内源完整版安装</span></span>
<span class="line"><span style="color:#FFCB6B;">/bin/zsh</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 极速安装（update 功能需要命令修复）</span></span>
<span class="line"><span style="color:#FFCB6B;">/bin/zsh</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh</span><span style="color:#89DDFF;">)&quot;</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">speed</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>安装教程 <ul><li><a href="https://gitee.com/cunkai/HomebrewCN" target="_blank" rel="noreferrer">Homebrew 国内安装脚本</a></li><li><a href="https://github.com/ineo6/homebrew-install" target="_blank" rel="noreferrer">Homebrew 安装教程</a></li></ul></li></ul><p>常用命令</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 更新 Homebrew</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装指定的软件包</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">packag</span><span style="color:#BABED8;">e</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 卸载指定的软件包</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">uninstall</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">packag</span><span style="color:#BABED8;">e</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 搜索可用的软件包，并显示匹配的结果</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">search</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">quer</span><span style="color:#BABED8;">y</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 列出已安装的软件包</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看可以升级的软件包</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">outdated</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 升级所有软件包到最新版本</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">upgrade</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 升级指定的软件包到最新版本</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">upgrade</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">packag</span><span style="color:#BABED8;">e</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看指定软件包的信息，包括版本号、安装路径、依赖关系等</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">info</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">packag</span><span style="color:#BABED8;">e</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 清理 Homebrew 临时文件和旧版本的软件包</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">cleanup</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看可以清理的 Homebrew 临时文件和旧版本的软件包</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">cleanup</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-n</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p><a href="https://github.com/Homebrew" target="_blank" rel="noreferrer">Github</a><a href="https://brew.sh/index_zh-cn" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="iterm2" tabindex="-1">iTerm2 <a class="header-anchor" href="#iterm2" aria-label="Permalink to &quot;iTerm2&quot;">​</a></h2><p>Mac 上最好用的终端</p><ol><li>支持子窗口</li><li>自动补全</li><li>查看粘贴历史</li><li>自定义配置项</li></ol><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 查看所有的 shell</span></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">/etc/shells</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看当前窗口使用的 shell</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#BABED8;"> $SHELL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看系统用户默认的 shell</span></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">/etc/passwd</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">grep</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 切换系统默认 shell</span></span>
<span class="line"><span style="color:#FFCB6B;">chsh</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">/bin/zsh</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><a href="https://github.com/gnachman/iTerm2" target="_blank" rel="noreferrer">Github</a><a href="https://www.iterm2.com" target="_blank" rel="noreferrer">软件官网</a></p><h3 id="iterm2-常用快捷键" tabindex="-1">iTerm2 常用快捷键 <a class="header-anchor" href="#iterm2-常用快捷键" aria-label="Permalink to &quot;iTerm2 常用快捷键&quot;">​</a></h3><table><thead><tr><th style="text-align:left;">操作</th><th style="text-align:left;">含义</th></tr></thead><tbody><tr><td style="text-align:left;">⌘ + N</td><td style="text-align:left;">新建窗口</td></tr><tr><td style="text-align:left;">⌘ + T</td><td style="text-align:left;">新建 Tab</td></tr><tr><td style="text-align:left;">⌘ + W</td><td style="text-align:left;">关闭 Tab / 窗口</td></tr><tr><td style="text-align:left;">⌘ + ←</td><td style="text-align:left;">切换到上一个 Tab</td></tr><tr><td style="text-align:left;">⌘ + →</td><td style="text-align:left;">切换到下一个 Tab</td></tr><tr><td style="text-align:left;">⌘ + 数字</td><td style="text-align:left;">快速切换 Tab</td></tr><tr><td style="text-align:left;">⌘ + D</td><td style="text-align:left;">垂直分屏</td></tr><tr><td style="text-align:left;">⌘ + Shift + D</td><td style="text-align:left;">水平分屏</td></tr><tr><td style="text-align:left;">⌘ + Enter</td><td style="text-align:left;">切换全屏</td></tr><tr><td style="text-align:left;">⌘ + F</td><td style="text-align:left;">查找</td></tr><tr><td style="text-align:left;">⌘ + /</td><td style="text-align:left;">查看光标的位置</td></tr><tr><td style="text-align:left;">Ctrl + P</td><td style="text-align:left;">上一条命令</td></tr><tr><td style="text-align:left;">Ctrl + R</td><td style="text-align:left;">搜索命令历史</td></tr><tr><td style="text-align:left;">Ctrl + L</td><td style="text-align:left;">清屏</td></tr><tr><td style="text-align:left;">Ctrl + U</td><td style="text-align:left;">清除当前行</td></tr><tr><td style="text-align:left;">Ctrl + W</td><td style="text-align:left;">删除光标前面的一个单词</td></tr><tr><td style="text-align:left;">Ctrl + K</td><td style="text-align:left;">删除光标后面的所有字符</td></tr><tr><td style="text-align:left;">Ctrl + A</td><td style="text-align:left;">移动光标到行首</td></tr><tr><td style="text-align:left;">Ctrl + E</td><td style="text-align:left;">移动光标到行尾</td></tr></tbody></table><h3 id="iterm2-配色方案" tabindex="-1">iTerm2 配色方案 <a class="header-anchor" href="#iterm2-配色方案" aria-label="Permalink to &quot;iTerm2 配色方案&quot;">​</a></h3><ul><li><a href="https://github.com/mbadolato/iTerm2-Color-Schemes" target="_blank" rel="noreferrer">iTerm2-Color-Schemes</a></li><li><a href="https://github.com/MartinSeeler/iterm2-material-design" target="_blank" rel="noreferrer">iTerm2-Material-Design</a></li></ul><h3 id="fig" tabindex="-1">Fig <a class="header-anchor" href="#fig" aria-label="Permalink to &quot;Fig&quot;">​</a></h3><p>终端自动补全命令提示工具</p><ul><li>支持近 300 多种 <code>CLI</code> 工具的补全提示，如 <code>cd git brew npm yarn</code></li><li>支持插件</li><li>支持自定义补全规范</li></ul><p>安装</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--cask</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">fig</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在 <code>vscode</code> 中使用，需修改 <code>editor.accessibilitySupport</code> 为 <code>&quot;off&quot;</code></p><p><a href="https://github.com/withfig/autocomplete" target="_blank" rel="noreferrer">Github</a><a href="https://fig.io/" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="mas-cli" tabindex="-1">mas-cli <a class="header-anchor" href="#mas-cli" aria-label="Permalink to &quot;mas-cli&quot;">​</a></h2><p>Mac App Store 命令行工具</p><p>安装</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">mas</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>常用命令</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 搜索应用程序</span></span>
<span class="line"><span style="color:#FFCB6B;">mas</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">search</span><span style="color:#BABED8;"> [query]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 列出已经安装的应用程序</span></span>
<span class="line"><span style="color:#FFCB6B;">mas</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">list</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 通过应用程序的 ID 进行安装，可以从 search 命令或者应用程序网页中获取</span></span>
<span class="line"><span style="color:#FFCB6B;">mas</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> [app-id]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 升级已经安装的应用程序</span></span>
<span class="line"><span style="color:#FFCB6B;">mas</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">upgrade</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 列出有更新可用的应用程序</span></span>
<span class="line"><span style="color:#FFCB6B;">mas</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">outdated</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><a href="https://github.com/mas-cli/mas" target="_blank" rel="noreferrer">Github</a></p><h2 id="duti-设置默认应用程序" tabindex="-1">duti 设置默认应用程序 <a class="header-anchor" href="#duti-设置默认应用程序" aria-label="Permalink to &quot;duti 设置默认应用程序&quot;">​</a></h2><p>设置默认应用程序的命令行工具</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">duti</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>常用命令</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 查看指定文件类型的默认应用程序</span></span>
<span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-x</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">txt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 更改文件类型的默认应用程序</span></span>
<span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.apple.TextEdit</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">.txt</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>常用的默认应用程序设置</p><blockquote><p>万恶的微信开发者工具修改了很多默认应用程序设置</p><p>有一说一：微信开发者工具只配用来预览，开发还是一边玩去</p></blockquote><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.microsoft.VSCode</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">.ts</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.microsoft.VSCode</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">.js</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.microsoft.VSCode</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">.json</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.microsoft.VSCode</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">.wxml</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"><span style="color:#FFCB6B;">duti</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">com.microsoft.VSCode</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">.wxss</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><a href="https://github.com/moretension/duti" target="_blank" rel="noreferrer">Github</a></p><h2 id="效率神器-alfred" tabindex="-1">效率神器 Alfred <a class="header-anchor" href="#效率神器-alfred" aria-label="Permalink to &quot;效率神器 Alfred&quot;">​</a></h2><ol><li>定位文件、打开文件</li><li>打开网址、书签、App</li><li>自定义搜索</li><li>查看剪贴板历史</li><li>计算器、查词典、运行 <code>shell</code> 命令</li></ol><p><a href="https://www.alfredapp.com" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="mac-微信功能拓展" tabindex="-1">Mac 微信功能拓展 <a class="header-anchor" href="#mac-微信功能拓展" aria-label="Permalink to &quot;Mac 微信功能拓展&quot;">​</a></h2><ol><li>消息防撤回</li><li>免认证登录与多开</li><li>消息处理增强(表情导出、二维码识别等)</li></ol><p>安装</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装 WeChatTweak-CLI</span></span>
<span class="line"><span style="color:#FFCB6B;">brew</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">sunnyyoung/repo/wechattweak-cli</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装 Tweak</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">wechattweak-cli</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 卸载</span></span>
<span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">wechattweak-cli</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--uninstall</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><a href="https://github.com/Sunnyyoung/WeChatTweak-macOS" target="_blank" rel="noreferrer">Github</a></p><h2 id="iina" tabindex="-1">IINA <a class="header-anchor" href="#iina" aria-label="Permalink to &quot;IINA&quot;">​</a></h2><p>视频播放器</p><ol><li>界面简洁、美观，契合 macOS 设计风格</li><li>功能强大，设置以播放体验为中心</li><li>支持鼠标和触控板手势</li><li>在线字幕、缩略图预览、画中画等</li></ol><p><a href="https://github.com/iina/iina" target="_blank" rel="noreferrer">Github</a><a href="https://iina.io/" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="maczip" tabindex="-1">MacZip <a class="header-anchor" href="#maczip" aria-label="Permalink to &quot;MacZip&quot;">​</a></h2><p>专为 macOS 而设计的压缩软件</p><ol><li>界面简洁、美观，完美兼容 Mojave</li><li>支持超过 20 种压缩格式</li><li>批量文件加密</li></ol><p><a href="https://ezip.awehunt.com" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="腾讯柠檬清理" tabindex="-1">腾讯柠檬清理 <a class="header-anchor" href="#腾讯柠檬清理" aria-label="Permalink to &quot;腾讯柠檬清理&quot;">​</a></h2><ol><li>界面简洁清新</li><li>支持垃圾清理、文件查重、软件卸载</li><li>支持微信、QQ、XCode、Sketch 深度扫描清理</li></ol><p><a href="https://lemon.qq.com" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="截图神器-ishot" tabindex="-1">截图神器 IShot <a class="header-anchor" href="#截图神器-ishot" aria-label="Permalink to &quot;截图神器 IShot&quot;">​</a></h2><ol><li>区域截图、窗口截图、多窗口截图、延时截图、长截图、滚动截图</li><li>快速标注(矩形、圆形、横线、箭头、画笔、马赛克、文字标记、序号标签、局部高亮)</li><li>支持截图导圆角、阴影调节</li><li>贴图、取色</li></ol><p><a href="https://www.better365.cn/ishot.html" target="_blank" rel="noreferrer">软件官网</a><a href="https://apps.apple.com/cn/app/ishot-%E6%88%AA%E5%9B%BE-%E5%BD%95%E5%B1%8F-2020%E5%85%A8%E6%96%B0%E9%AB%98%E5%BA%A6/id1485844094" target="_blank" rel="noreferrer">App Store</a></p><h2 id="超级右键-irightmouse" tabindex="-1">超级右键 iRightMouse <a class="header-anchor" href="#超级右键-irightmouse" aria-label="Permalink to &quot;超级右键 iRightMouse&quot;">​</a></h2><ol><li>多种格式的右键新建文件</li><li>快速移动文件</li><li>常用目录设置</li><li>快速打开终端、vscode 等</li></ol><p><a href="https://www.better365.cn/irightmouse.html" target="_blank" rel="noreferrer">软件官网</a><a href="https://apps.apple.com/cn/app/irightmouse-%E8%B6%85%E7%BA%A7%E5%8F%B3%E9%94%AE/id1497428978" target="_blank" rel="noreferrer">App Store</a></p><h2 id="翻译软件-bob" tabindex="-1">翻译软件 Bob <a class="header-anchor" href="#翻译软件-bob" aria-label="Permalink to &quot;翻译软件 Bob&quot;">​</a></h2><ol><li>支持划词、截图、输入翻译</li><li>支持翻译多开</li><li>自动识别语种</li><li>可自定义插件</li></ol><p><a href="https://github.com/ripperhe/Bob" target="_blank" rel="noreferrer">Github</a><a href="https://ripperhe.gitee.io/bob" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="菜单栏图标管理-hidden-bar" tabindex="-1">菜单栏图标管理 Hidden Bar <a class="header-anchor" href="#菜单栏图标管理-hidden-bar" aria-label="Permalink to &quot;菜单栏图标管理 Hidden Bar&quot;">​</a></h2><ol><li>简单易用、支持全局快捷键</li><li>免费开源、支持中文</li></ol><p><a href="https://github.com/dwarvesf/hidden" target="_blank" rel="noreferrer">Github</a><a href="https://apps.apple.com/cn/app/hidden-bar/id1452453066" target="_blank" rel="noreferrer">App Store</a></p><h2 id="音量管理-backgroundmusic" tabindex="-1">音量管理 BackgroundMusic <a class="header-anchor" href="#音量管理-backgroundmusic" aria-label="Permalink to &quot;音量管理 BackgroundMusic&quot;">​</a></h2><ol><li>背景音乐管理</li><li>设置各个应用程序的音量</li><li>录制系统音频</li></ol><p><a href="https://github.com/kyleneideck/BackgroundMusic" target="_blank" rel="noreferrer">Github</a></p><h2 id="窗口管理神器-rectangle" tabindex="-1">窗口管理神器 Rectangle <a class="header-anchor" href="#窗口管理神器-rectangle" aria-label="Permalink to &quot;窗口管理神器 Rectangle&quot;">​</a></h2><p>比系统分屏更强大，支持快捷键分屏、支持三个及以上分屏</p><p><a href="https://github.com/rxhanson/Rectangle" target="_blank" rel="noreferrer">Github</a><a href="https://rectangleapp.com/" target="_blank" rel="noreferrer">软件官网</a></p><h2 id="应用快捷启动神器-thor-launcher" tabindex="-1">应用快捷启动神器 Thor Launcher <a class="header-anchor" href="#应用快捷启动神器-thor-launcher" aria-label="Permalink to &quot;应用快捷启动神器 Thor Launcher&quot;">​</a></h2><p>通过设定快捷键，快速在应用之间切换</p><p><a href="https://apps.apple.com/cn/app/thor-launcher/id1120999687" target="_blank" rel="noreferrer">App Store</a></p><h2 id="快捷键提示-cheatsheet" tabindex="-1">快捷键提示 CheatSheet <a class="header-anchor" href="#快捷键提示-cheatsheet" aria-label="Permalink to &quot;快捷键提示 CheatSheet&quot;">​</a></h2><p>长按 <code>Command</code> 即可查看当前应用的快捷键提示</p><p><a href="https://www.ergonis.com/products/keycue/" target="_blank" rel="noreferrer">软件官网</a><a href="https://github.com/maomao1996/software-backup/tree/main/mac/CheatSheet" target="_blank" rel="noreferrer">安装包</a></p><h2 id="显示器控制-monitorcontrol" tabindex="-1">显示器控制 MonitorControl <a class="header-anchor" href="#显示器控制-monitorcontrol" aria-label="Permalink to &quot;显示器控制 MonitorControl&quot;">​</a></h2><ol><li>控制外接显示器的亮度和音量</li><li>支持键盘控制亮度和音量</li></ol><p><a href="https://github.com/MonitorControl/MonitorControl" target="_blank" rel="noreferrer">Github</a></p>`,93),t=[p];function o(r,c,i,y,b,d){return a(),n("div",null,t)}const u=s(e,[["render",o]]);export{h as __pageData,u as default};
