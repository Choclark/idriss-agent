import { PythonShell } from "python-shell";

interface PythonShellOptions {
  mode: 'text';
  pythonPath: string;
  pythonOptions: string[];
  args: string[]; // Changed 'argv' to 'args'
}

const options: PythonShellOptions = {
  mode: "text",
  pythonPath: '/Users/admin/AppData/Local/Programs/Python/Python313/python.exe',
  pythonOptions: ['-u'], // get print results in real-time
  args: ['value1', 'value2', 'value3'],  // Use 'args' instead of 'argv'
};

console.log("Arguments being passed to Python:", options.args);

PythonShell.run('src/PythonAssistance/main.py', options).then((results: string[] | undefined) => {
  results?.forEach((message: string) => {
    console.log(message);
  });
}).catch((err: Error) => {
  throw err;
});
