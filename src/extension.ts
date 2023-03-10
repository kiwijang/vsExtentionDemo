// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { convetTool } from "./convert";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "hiworld" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("hiworld.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from hiworld!");
  });

  let disposable2 = vscode.commands.registerCommand(
    "hiworld.rc",
    async (uri: vscode.Uri) => {
      await vscode.commands.executeCommand("workbench.action.togglePanel");
      const folderPath = uri.fsPath;
      const arr = folderPath.split("\\");
      arr.pop();
      arr.push("output");
      convetTool(folderPath, arr.join("\\"));

      vscode.window.showInformationMessage(
        "產生成功 " + folderPath + "==>" + arr.join("\\")
      );
    }
  );

  context.subscriptions.push(disposable, disposable2);
}

// This method is called when your extension is deactivated
export function deactivate() {}
