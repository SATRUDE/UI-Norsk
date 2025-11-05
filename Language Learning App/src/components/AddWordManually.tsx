import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface AddWordManuallyProps {
  folderName: string;
  onBack: () => void;
  onAddWord: (norwegian: string, english: string) => void;
}

export function AddWordManually({ folderName, onBack, onAddWord }: AddWordManuallyProps) {
  const [norwegian, setNorwegian] = useState('');
  const [english, setEnglish] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    setIsTranslating(true);
    // Simulate AI translation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (norwegian && !english) {
      // Mock translation from Norwegian to English
      setEnglish(norwegian);
    } else if (english && !norwegian) {
      // Mock translation from English to Norwegian
      setNorwegian(english);
    }
    
    setIsTranslating(false);
  };

  const handleAdd = () => {
    if (norwegian.trim() && english.trim()) {
      onAddWord(norwegian.trim(), english.trim());
      setNorwegian('');
      setEnglish('');
      onBack();
    }
  };

  const canTranslate = (norwegian && !english) || (english && !norwegian);
  const canAdd = norwegian.trim() && english.trim();

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2>Add Word to {folderName}</h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="norwegian">Norwegian</Label>
          <Input
            id="norwegian"
            value={norwegian}
            onChange={(e) => setNorwegian(e.target.value)}
            placeholder="Enter Norwegian word or phrase"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="english">English</Label>
          <Input
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="Enter English translation"
          />
        </div>

        {canTranslate && (
          <Button 
            onClick={handleTranslate}
            disabled={isTranslating}
            variant="outline"
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isTranslating ? 'Translating...' : 'AI Translate'}
          </Button>
        )}

        <Button 
          onClick={handleAdd}
          disabled={!canAdd}
          className="w-full"
        >
          Add Word
        </Button>
      </div>
    </div>
  );
}
