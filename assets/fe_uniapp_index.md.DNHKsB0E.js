import{_ as s,c as n,o as a,a8 as i}from"./chunks/framework.G9cCL05C.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"fe/uniapp/index.md","filePath":"fe/uniapp/index.md","lastUpdated":1745922317000}'),p={name:"fe/uniapp/index.md"},l=i(`<h2 id="uniapp-的生命周期" tabindex="-1">Uniapp 的生命周期 <a class="header-anchor" href="#uniapp-的生命周期" aria-label="Permalink to &quot;Uniapp 的生命周期&quot;">​</a></h2><p>uniapp 的生命周期分为三种：应用生命周期、页面生命周期和组件生命周期。</p><h3 id="应用生命周期" tabindex="-1">应用生命周期 <a class="header-anchor" href="#应用生命周期" aria-label="Permalink to &quot;应用生命周期&quot;">​</a></h3><p>应用生命周期是指应用程序从启动到关闭的整个过程，包裹应用程序的启动、前后台切换、退出等。 应用生命周期仅可在<code>APP.vue</code>中监听，在页面监听无效</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 当 uni-app 初始化完成时触发，全局只触发一次</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onLaunch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 当 uni-app 启动，或从后台进入前台显示时触发，一般用来监听用户是否进入小程序</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onShow</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 当 uni-app 从前台进入后台时触发，一般用来监听用户是否离开小程序</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onHide</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 当 uni-app 报错时触发</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onError</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="页面生命周期" tabindex="-1">页面生命周期 <a class="header-anchor" href="#页面生命周期" aria-label="Permalink to &quot;页面生命周期&quot;">​</a></h3><p>每个页面都有自己的生命周期</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 当页面加载时触发，参数为上个页面传递的数据，常用于接收路由参数、数据初始化、网络请求等操作</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 当其触发时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成,但元素还没开始渲染</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># tab页面不加载</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onLoad</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 页面每次出现在屏幕上都会触发， 包括从下级节点返回露出当前页面</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onShow</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 页面初次渲染完成后就触发，页面只执行一次</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onReady</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 页面隐藏时触发,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onHide</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 页面卸载时触发</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onUnload</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="组件生命周期" tabindex="-1">组件生命周期 <a class="header-anchor" href="#组件生命周期" aria-label="Permalink to &quot;组件生命周期&quot;">​</a></h3><p>组件生命周期与<code>vue</code>标准组件的生命周期相同，这里只简单说明下<code>vue3</code>的生命周期</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在实例初始化之后被调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeCreate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在实例创建完成后被立即调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">created</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在挂载开始之前被调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeMount</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 挂载到实例上去之后调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mounted</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 数据更新时调用，发生在虚拟 DOM 打补丁之前</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeUpdate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">updated</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 实例销毁之前调用。在这一步，实例仍然完全可用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">beforeDestroy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Vue 实例销毁后调用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">destroyed</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="生命周期执行顺序" tabindex="-1">生命周期执行顺序 <a class="header-anchor" href="#生命周期执行顺序" aria-label="Permalink to &quot;生命周期执行顺序&quot;">​</a></h3><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 进入应用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">App</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Launch</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">App</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Show</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onLoad</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onShow</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> beforeCreate</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> created</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> beforeMount</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mounted</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onReady</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#应用后台</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">App</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Hide</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onHide</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#应用关闭</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">APP</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onUnload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> beforeDestroy</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">component</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> destroyed</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#后台重新进入</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">App</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Show</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onLoad</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> onShow</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,13),e=[l];function r(h,t,k,c,b,d){return a(),n("div",null,e)}const F=s(p,[["render",r]]);export{o as __pageData,F as default};
