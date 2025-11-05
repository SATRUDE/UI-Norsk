import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { X, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DetectedWord {
  id: string;
  norwegian: string;
  english: string;
  selected: boolean;
}

interface CameraCaptureProps {
  folderName: string;
  onBack: () => void;
  onAddWords: (words: { norwegian: string; english: string }[]) => void;
}

export function CameraCapture({ folderName, onBack, onAddWords }: CameraCaptureProps) {
  const [mode, setMode] = useState<'camera' | 'results'>('camera');
  const [detectedWords, setDetectedWords] = useState<DetectedWord[]>([]);

  const handleTakePhoto = () => {
    // Simulate photo capture and word detection
    const mockDetectedWords: DetectedWord[] = [
      { id: crypto.randomUUID(), norwegian: 'hund', english: 'dog', selected: false },
      { id: crypto.randomUUID(), norwegian: 'katt', english: 'cat', selected: false },
      { id: crypto.randomUUID(), norwegian: 'bil', english: 'car', selected: false },
      { id: crypto.randomUUID(), norwegian: 'hus', english: 'house', selected: false },
      { id: crypto.randomUUID(), norwegian: 'tre', english: 'tree', selected: false },
      { id: crypto.randomUUID(), norwegian: 'blomst', english: 'flower', selected: false },
    ];

    setDetectedWords(mockDetectedWords);
    setMode('results');
    toast.success('Words detected!');
  };

  const handleToggleWord = (id: string) => {
    setDetectedWords(detectedWords.map(word =>
      word.id === id ? { ...word, selected: !word.selected } : word
    ));
  };

  const handleAddSelected = () => {
    const selectedWords = detectedWords
      .filter(word => word.selected)
      .map(word => ({ norwegian: word.norwegian, english: word.english }));

    if (selectedWords.length === 0) {
      toast.error('Please select at least one word');
      return;
    }

    onAddWords(selectedWords);
    toast.success(`Added ${selectedWords.length} word${selectedWords.length > 1 ? 's' : ''} to ${folderName}`);
    onBack();
  };

  if (mode === 'camera') {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* Mock camera view - full screen black background */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Mock camera viewfinder */}
          <div className="text-white text-center">
            <Camera className="h-24 w-24 mx-auto mb-4 opacity-30" />
            <p className="opacity-50">Camera View</p>
          </div>

          {/* Take Photo Button - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <Button
              onClick={handleTakePhoto}
              size="lg"
              className="w-full h-14 bg-white text-black hover:bg-gray-200"
            >
              <Camera className="mr-2 h-5 w-5" />
              Take Photo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Results view - similar to ImportFromArticle
  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2>Detected Words</h2>
        <Button variant="ghost" size="icon" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-3 mb-6">
        <p className="text-sm text-gray-600">
          Words from Photo ({detectedWords.filter(w => w.selected).length} selected)
        </p>

        <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
          {detectedWords.map((word) => (
            <div
              key={word.id}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleToggleWord(word.id)}
            >
              <Checkbox
                checked={word.selected}
                onCheckedChange={() => handleToggleWord(word.id)}
              />
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Norwegian</p>
                  <p>{word.norwegian}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">English</p>
                  <p>{word.english}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed button at bottom */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t">
        <div className="container mx-auto max-w-6xl">
          <Button
            onClick={handleAddSelected}
            disabled={!detectedWords.some(w => w.selected)}
            className="w-full"
          >
            Add Selected to {folderName}
          </Button>
        </div>
      </div>
    </div>
  );
}
