import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Check, X, RotateCcw } from 'lucide-react';
import { Folder, Word } from '../types';
import { Progress } from './ui/progress';

interface TestModeProps {
  folder: Folder;
  onBack: () => void;
}

export function TestMode({ folder, onBack }: TestModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [testWords, setTestWords] = useState<Word[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Shuffle words for the test
    const shuffled = [...folder.words].sort(() => Math.random() - 0.5);
    setTestWords(shuffled);
  }, [folder.words]);

  const currentWord = testWords[currentIndex];
  const totalWords = testWords.length;
  const progress = ((currentIndex + (showAnswer ? 1 : 0)) / totalWords) * 100;

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
    moveToNext();
  };

  const handleIncorrect = () => {
    setIncorrectCount(incorrectCount + 1);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex + 1 < totalWords) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetTest = () => {
    const shuffled = [...folder.words].sort(() => Math.random() - 0.5);
    setTestWords(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const accuracy = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 0;
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2>Test Complete!</h2>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Folders
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-2">{accuracy}%</div>
              <p className="text-gray-600">Accuracy</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">Correct</span>
                </div>
                <p className="text-2xl">{correctCount}</p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <X className="h-5 w-5 text-red-600" />
                  <span className="text-red-600">Incorrect</span>
                </div>
                <p className="text-2xl">{incorrectCount}</p>
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button onClick={resetTest}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back to Folders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No words available for testing.</p>
        <Button className="mt-4" onClick={onBack}>
          Back to Folders
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2>{folder.name}</h2>
        </div>
        <div className="text-gray-600">
          {currentIndex + 1} / {totalWords}
        </div>
      </div>

      <Progress value={progress} className="mb-6" />

      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">Norwegian</p>
            <h3 className="text-4xl mb-8">{currentWord.norwegian}</h3>

            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} size="lg">
                Show Answer
              </Button>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-2">English</p>
                <h3 className="text-4xl mb-8 text-blue-600">{currentWord.english}</h3>
                
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleIncorrect}
                    variant="outline"
                    size="lg"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="mr-2 h-5 w-5" />
                    Incorrect
                  </Button>
                  <Button
                    onClick={handleCorrect}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Correct
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 text-sm text-gray-600 pt-6 border-t">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>{correctCount} correct</span>
            </div>
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-600" />
              <span>{incorrectCount} incorrect</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
