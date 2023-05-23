import React, { useState } from "react";
import "./styles.css";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

export default function App() {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const [isListeningPaused, setListeningPaused] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => {
    if (isListeningPaused) {
      setListeningPaused(false);
      SpeechRecognition.startListening({ continuous: true });
    } else {
      resetTranscript();
      setTextToCopy("");
      setCopied(false);
      setListeningPaused(false);
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const pauseListening = () => {
    setListeningPaused(true);
    SpeechRecognition.stopListening();
  };

  const handleCopy = () => {
    setCopied(true);
  };

  const handleReset = () => {
    resetTranscript();
    setTextToCopy("");
    setCopied(false);
    setListeningPaused(false);
    SpeechRecognition.abortListening();
    window.location.reload(); // Refresh the page
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="container">
      <h1 className="title">Speech To Text Converter</h1>
      <p className="para">Converts speech from microphone to text.</p>
      <div className="main-content" onClick={() => setTextToCopy(transcript)}>
        {transcript}
      </div>
      <div className="btn">
        <button onClick={startListening} className="start-btn">
          {isListeningPaused ? "Start Listening" : "Start Listening"}
        </button>
        <button onClick={pauseListening} className="pause-btn">
          Pause Listening
        </button>
        <button
          onClick={handleCopy}
          className={`copy-btn ${isCopied ? "copied" : ""}`}
          disabled={!transcript}
        >
          {isCopied ? "Copy to Clipboard" : "Copy to Clipboard"}
        </button>
        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}
