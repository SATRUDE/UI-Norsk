import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { AddWordOptions } from './AddWordOptions';
import { Folder } from '../types';

interface WordManagerProps {
  folder: Folder;
  onBack: () => void;
  onAddWord: (norwegian: string, english: string) => void;
  onDeleteWord: (wordId: string) => void;
  onOpenImport: () => void;
  onOpenManual: () => void;
  onOpenCamera: () => void;
}

export function WordManager({ folder, onBack, onAddWord, onDeleteWord, onOpenImport, onOpenManual, onOpenCamera }: WordManagerProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2>{folder.name}</h2>
        </div>
        <AddWordOptions onAddWord={onAddWord} onOpenImport={onOpenImport} onOpenManual={onOpenManual} onOpenCamera={onOpenCamera} />
      </div>

      {folder.words.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No words yet. Add some words to start learning!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {folder.words.map((word) => (
            <Card key={word.id}>
              <CardContent className="flex items-center justify-between p-4 min-h-[80px]">
                <div className="flex-1 grid grid-cols-2 gap-4 self-center">
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">Norwegian</p>
                    <p>{word.norwegian}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm text-gray-500">English</p>
                    <p>{word.english}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteWord(word.id)}
                  className="self-center"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
