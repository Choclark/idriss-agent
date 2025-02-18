
import { DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";
import { getFiles,openFolderDialog,createItem } from "../utils/fileManager";

 const getFilesTools = new DynamicStructuredTool({
    name:"Get_Files",
    description:"Get all files from a folder",
    schema: z.object({
        dirPath: z.string().describe("directory path of the folder")
      }),
      func:getFiles
})
 const createFileOrFolderTools = new DynamicStructuredTool({
    name:"Create_File",
    description:"Create a  file or a folder",
    schema: z.object({
        fullPath: z.string().describe("The folder path plus the file or folder name"),
        isDirectory: z.boolean().describe("true if the item to create is a folder, false if it is a file"),
      }),
      func:createItem
})

 const openFolderDialogTools = new DynamicStructuredTool({
    name:"Open_Folder_Dialog",
    description:"Open a dialog to select a folder",
    schema: z.object({}),
    func:openFolderDialog
})

export const Filetools = [getFilesTools,createFileOrFolderTools,openFolderDialogTools]