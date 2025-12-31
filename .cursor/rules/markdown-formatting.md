# Markdown 文档格式规范

## 英文术语标记规则

在编写 Markdown 文档时，需要对技术术语、产品名称、工具名称等英文词汇使用反引号（`` ` ``）进行标记，以突出显示并保持格式一致性。

### 需要标记的术语类型

1. **技术术语**：`AI`、`API`、`HTTP`、`JSON`、`Markdown`、`LLM`、`MCP` 等
2. **产品/工具名称**：`Cursor`、`VSCode`、`GitHub`、`ChatGPT`、`Claude`、`Gemini` 等
3. **框架/库名称**：`React`、`Next.js`、`NextJS`、`npm` 等
4. **模式/功能名称**：`Ask` 模式、`Agent` 模式、`Plan` 模式、`Tab` 键等
5. **操作系统/平台**：`Windows`、`macOS`、`Linux`、`WSL`、`SSH` 等
6. **文件格式**：`PNG`、`JPG`、`JSON`、`Markdown` 等（但在文件名中不单独标记，如 `en.json`）

### 不需要标记的情况

1. **标题中的英文**：标题行（以 `#` 开头的行）中的英文不需要加反引号
2. **代码块中的内容**：在代码块（```...```）中的内容不需要标记
3. **URL 中的术语**：URL 地址中的术语不需要标记，如 `https://docs.anthropic.com`
4. **文件路径中的术语**：文件路径和文件名中的术语不需要单独标记，如 `./images/cursor.png`、`en.json`
5. **链接的 URL 部分**：Markdown 链接的 URL 部分（括号内）不需要标记，如 `[文本](https://url.com)`
6. **普通英文单词**：普通英文单词（如 plan、mode 等）不需要标记，除非是特定的技术术语（如 `Plan` 模式）

### 示例

**正确示例：**
- 在使用 `AI` 编辑器 `Cursor` 时，可以通过 `API` 调用 `Claude` 模型
- 使用 `NextJS` 框架开发，配置文件使用 `JSON` 格式
- 在 `Cursor` 中有 `Ask`、`Agent` 和 `Plan` 三种模式
- 链接文本中的术语需要标记：[`Anthropic`（`Claude`）](https://docs.anthropic.com)

**错误示例：**
- 在使用 AI 编辑器 Cursor 时（缺少反引号）
- # Cursor 相关（标题中不需要标记）
- `https://docs.anthropic.com`（URL 不需要标记）
- `en.`json``（文件名中的 json 不应该单独标记，应该是 `en.json`）

### 实施建议

1. 在编写文档时，注意识别技术术语并添加反引号
2. 使用代码检查工具或脚本自动检测和标记
3. 在代码审查时，检查英文术语是否正确标记
4. 保持一致性：同一个术语在整个文档中应该统一使用相同的标记方式

