// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

function transformFolderName(folderName: string): string {
  return folderName
    .toLowerCase()
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100000000
  );

  function runStatusBarFunction() {
    // TODO: fetch command from settings
    if (vscode.workspace.name) {
      statusBarItem.text = transformFolderName(vscode.workspace.name);
      statusBarItem.show();
    } else {
      const path = context
        .asAbsolutePath("/")
        .split("/")
        .filter(p => !!p);

      statusBarItem.text = transformFolderName(path[path.length - 1]);
      statusBarItem.show();
    }
  }

  let disposable = vscode.commands.registerCommand(
    "extension.foldername",
    runStatusBarFunction
  );
  context.subscriptions.push(statusBarItem);
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
