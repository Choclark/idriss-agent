
import { DynamicStructuredTool } from "langchain/tools";
import { z } from "zod";
import { consoleLog } from "../utils/fileManager";
export const Log_In_Console = new DynamicStructuredTool({
  name: "Log_In_Console",
  description: "Log a message to the console",
  schema: z.object({
    message: z.string().describe("The message to log to the console"),
  }),
  func: consoleLog,
})

