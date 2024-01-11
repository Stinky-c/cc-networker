import * as tstl from "@jackmacwindows/typescript-to-lua";
import * as ts from "typescript";

/*
  TODO
  make this less shit, 
*/
const myIdentifierStart = "@local-";

type libTypes = "lib" | "test";
const plugin: tstl.Plugin = {
  // moduleResolution(
  //   moduleIdentifier: string,
  //   requiringFile: string,
  //   options: tstl.CompilerOptions,
  //   emitHost: tstl.EmitHost
  // ) {
  //   const rewriteHandler = {
  //     ["lib"]: (x: string) => {
  //       return `lib.${x}`;
  //     },
  //     ["test"]: (x: string) => {
  //       return x;
  //     },
  //   };

  //   if (moduleIdentifier.startsWith(myIdentifierStart)) {
  //     let slashPos = moduleIdentifier.indexOf("/");
  //     let modType = moduleIdentifier.slice(myIdentifierStart.length, slashPos);
  //     let x = rewriteHandler[modType](moduleIdentifier.slice(slashPos + 1));
  //     console.log(x,moduleIdentifier);
  //     return x;
  //   } else {
  //     return moduleIdentifier;
  //   }
  // },
  afterEmit(
    program: ts.Program,
    options: tstl.CompilerOptions,
    emitHost: tstl.EmitHost,
    result: tstl.EmitFile[]
  ) {
    for (const emittedFile of result) {
      let newOut = emittedFile.code.replace(
        `"@local-lib/basalt"`,
        `"lib.basalt"`
      );

      console.log(newOut === emittedFile.code);
      emitHost.writeFile(emittedFile.outputPath, newOut, false);
    }
  },
};

// export default plugin;

export default {};