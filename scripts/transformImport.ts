// transformer1-module
import * as ts from "typescript";
export default function (program: ts.Program, pluginOptions: {}) {
  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      function visitor(node: ts.Node): ts.Node {
        if (
          ts.isImportDeclaration(node) &&
          ts.isStringLiteral(node.moduleSpecifier) &&
          node.moduleSpecifier.text.startsWith("bf-")
        ) {
          let text = node.moduleSpecifier.text;
          node.moduleSpecifier.text = text.slice(3);
        }
        return ts.visitEachChild(node, visitor, ctx);
      }
      return ts.visitEachChild(sourceFile, visitor, ctx);
    };
  };
}
