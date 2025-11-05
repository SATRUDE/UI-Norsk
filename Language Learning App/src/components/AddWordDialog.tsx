import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus } from 'lucide-react';

interface AddWordDialogProps {
  onAddWord: (norwegian: string, english: string) => void;
}

export function AddWordDialog({ onAddWord }: AddWordDialogProps) {
  const [open, setOpen] = useState(false);
  const [norwegian, setNorwegian] = useState('');
  const [english, setEnglish] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (norwegian.trim() && english.trim()) {
      onAddWord(norwegian.trim(), english.trim());
      setNorwegian('');
      setEnglish('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Word
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Word</DialogTitle>
          <DialogDescription>Enter the Norwegian word and its English translation.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="norwegian">Norwegian</Label>
            <Input
              id="norwegian"
              value={norwegian}
              onChange={(e) => setNorwegian(e.target.value)}
              placeholder="Enter Norwegian word"
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="english">English</Label>
            <Input
              id="english"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              placeholder="Enter English translation"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Word</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
