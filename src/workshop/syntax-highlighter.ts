// Shared Syntax Highlighter Utility
import Prism from "prismjs";

export class SyntaxHighlighter {
  public static highlightTypeScript(code: string): string {
    // Clean the code
    const cleanedCode = code.replace(/\/\/# sourceMappingURL=.*$/, "");

    // Check if TypeScript language is available, fallback to JavaScript
    const language = Prism.languages.typescript || Prism.languages.javascript;
    const languageName = Prism.languages.typescript ? "typescript" : "javascript";

    return language ? Prism.highlight(cleanedCode, language, languageName) : cleanedCode;
  }

  public static highlightJavaScript(code: string): string {
    const language = Prism.languages.javascript;
    return language ? Prism.highlight(code, language, "javascript") : code;
  }
}
