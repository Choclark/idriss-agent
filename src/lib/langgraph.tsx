
import { ipcMain } from "electron";
import { AgentExecutor } from "langchain/agents";
import { createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Log_In_Console } from "./tool";
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import dotenv from "dotenv";
import { Filetools } from "./FileManageTools";

dotenv.config();
const fireworksKey = process.env.Firwork_API_KEY;
if(!fireworksKey){
  console.error("Fireworks API key not found");
  process.exit(1);
}

const llm = new ChatFireworks({
  model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
  apiKey: fireworksKey,
  maxTokens:1024,
  temperature: 0.7,
  cache:true,
});

// Set up tools for the LangChain agent

// Define the tools the agent will have access to.
const tools = [
   Log_In_Console,  
   ...Filetools,
];
// Handle an IPC call to interact with LangChain


// Prompt template must have "input" and "agent_scratchpad input variables"
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);


// Call the agent with the user's query
const agent =  createToolCallingAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});
ipcMain.handle('run-agent', async (event, query) => {
    try {

    
    const result = await agentExecutor.invoke({
      input: query,	
    });
    
    return result;
  } catch (error) {
    console.error('Error running LangChain agent:', error);
    return 'Error occurred while processing the request.';
  }
});


