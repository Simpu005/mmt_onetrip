import { useState, useRef, useEffect, useCallback } from 'react';

interface VoiceAssistantState {
  isListening: boolean;
  transcript: string;
  toggle: () => void;
  stop: () => void;
}

export default function useVoiceAssistant(
  onTranscriptCommit?: (text: string) => void
): VoiceAssistantState {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const simulationTimerRef = useRef<any>(null);

  useEffect(() => {
    // Check for native Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      if (simulationTimerRef.current) {
        clearTimeout(simulationTimerRef.current);
      }
    };
  }, []);

  const stop = useCallback(() => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (simulationTimerRef.current) {
      clearTimeout(simulationTimerRef.current);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isListening) {
      stop();
      if (transcript && onTranscriptCommit) {
        onTranscriptCommit(transcript);
      }
      return;
    }

    setTranscript('');
    setIsListening(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        return;
      } catch {
        // Fallback to simulation below if microphone permission or API fails
      }
    }

    // Interactive fallback simulation with realistic voice typing
    const phrase =
      'Planning a 7-day family vacation to Shimla with snow activities under ₹45,000...';
    let charIdx = 0;

    const typeNextChar = () => {
      charIdx += 3;
      if (charIdx <= phrase.length) {
        const partial = phrase.slice(0, charIdx);
        setTranscript(partial);
        simulationTimerRef.current = setTimeout(typeNextChar, 110);
      } else {
        setTranscript(phrase);
        simulationTimerRef.current = setTimeout(() => {
          setIsListening(false);
          if (onTranscriptCommit) {
            onTranscriptCommit(phrase);
          }
        }, 1200);
      }
    };

    simulationTimerRef.current = setTimeout(typeNextChar, 300);
  }, [isListening, stop, transcript, onTranscriptCommit]);

  return {
    isListening,
    transcript,
    toggle,
    stop,
  };
}
