import React, { useState, useEffect } from 'react';

const AgentApp = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  // Start/stop microphone streaming
  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Start microphone stream in the Electron backend
      await window.electron.startMicStream();
    }
  };

  // Listen for speech results from Electron
  useEffect(() => {
    const handleSpeechResult = (result: string) => {
        setTranscription(result);
    };

    window.electron.onSpeechResult(handleSpeechResult);

    return () => {
      // Cleanup when component is unmounted
      window.electron.onSpeechResult(null);
    };
  }, []);

  return (
    <div>
      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <h3>Transcription:</h3>
      <p>{transcription}</p>
    </div>
  );
};




export default AgentApp