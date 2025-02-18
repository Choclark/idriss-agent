import { Model, Recognizer } from 'vosk';
import fs from 'fs';
import { Readable } from 'stream';

const path = require('path');
const { spawn } = require('child_process');
const { desktopCapturer } = require('electron');
let recognizer: Recognizer | null = null;

// Initialize Vosk
const modelPath = path.join(__dirname, 'vosk-model'); // Path to the Vosk model
const model = new Model(modelPath);
recognizer = new Recognizer({ model: model, sampleRate: 16000 });

// Handle IPC calls from React
ipcMain.handle('start-mic-stream', async () => {
  // Start the microphone stream and pass audio to Vosk for transcription
  const mediaConstraints = { audio: true, video: false };

  navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then((stream) => {
      // Process the microphone audio here
      const audioTracks = stream.getAudioTracks();
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const inputArray = new Float32Array(inputData.length);
        inputArray.set(inputData);
        recognizer.acceptWaveform(inputArray);
        
        const result = recognizer.result();
        if (result.text) {
          mainWindow?.webContents.send('speech-result', result.text); // Send result to React
        }
      };
    }).catch(err => {
      console.error('Error accessing the microphone: ', err);
    });
});