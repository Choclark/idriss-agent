import { ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";

let projectPath: string | null = null; // Store the selected project path

interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  items: FileInfo[] | null;
}

// Function to get all files in a directory
const getFilesInDirectory = ({dirPath}:{dirPath:string}): FileInfo[] => {
  try {
    const result =  fs.readdirSync(dirPath).map((file) => ({
      name: file,
      path: path.join(dirPath, file),
      isDirectory: fs.lstatSync(path.join(dirPath, file)).isDirectory(),
      items:  null,
    }));
    return result;

  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }

};
export const openFolderDialog = async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"], // Only allow directories
  });

  if (!result.canceled && result.filePaths.length > 0) {
    projectPath = result.filePaths[0]; // Store the selected folder path
    return projectPath;
  }

  return null;
}

// 📌 Open Folder Dialog to Set Project Path
ipcMain.handle("select-project",async (_)=>openFolderDialog());

// 📌 Get Files from the Opened Project
export const getFiles =  async ( {dirPath}:{dirPath?: string}): Promise<FileInfo[]> => {
  if (!projectPath) return []; // No project opened yet

  const targetPath = dirPath && dirPath.trim() !== "" ? dirPath : projectPath; // Default to project path
  return getFilesInDirectory({dirPath:targetPath});
}
ipcMain.handle("get-files",async (_,dirPath:string) => 
getFiles({dirPath})
);

interface CreateItemResponse {
  success: boolean;
  message: string;
}

// IPC handler to create a file or folder based on the fullPath and isDirectory flag
export const createItem = async ( {fullPath,isDirectory}:{fullPath: string, isDirectory: boolean}): Promise<CreateItemResponse> => {
  try {
    if (isDirectory) {
      // Create a directory (folder), recursively if needed
      fs.mkdirSync(fullPath, { recursive: true });
      return { success: true, message: 'Folder created successfully.' };
    } else {
      // Ensure the parent directory exists before creating the file
      const parentDir = path.dirname(fullPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      // Create an empty file
      fs.writeFileSync(fullPath, '', 'utf-8');
      return { success: true, message: 'File created successfully.' };
    }
  } catch (error: any) {
    console.error('Error creating item:', error);
    return { success: false, message: error.message };
  }
}
ipcMain.handle(
  'create-item',
  async (_: Electron.IpcMainInvokeEvent, fullPath: string, isDirectory: boolean) =>
    createItem({fullPath, isDirectory})
);

// console loging

export const consoleLog = async ( {message}:{message: string}) => {
  console.log(message);
}
ipcMain.handle('console-log', 
  async (_: Electron.IpcMainInvokeEvent, message: string) =>
  consoleLog({message}));