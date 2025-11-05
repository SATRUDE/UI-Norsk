import { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import { Plus, PenLine, FileText, Camera } from 'lucide-react';

interface AddWordOptionsProps {
  onAddWord: (norwegian: string, english: string) => void;
  onOpenImport: () => void;
  onOpenManual: () => void;
  onOpenCamera: () => void;
}

export function AddWordOptions({ onAddWord, onOpenImport, onOpenManual, onOpenCamera }: AddWordOptionsProps) {
  const [open, setOpen] = useState(false);

  const handleManualAdd = () => {
    setOpen(false);
    onOpenManual();
  };

  const handleImportArticle = () => {
    setOpen(false);
    onOpenImport();
  };

  const handleTakePhoto = () => {
    setOpen(false);
    onOpenCamera();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Words</DrawerTitle>
          <DrawerDescription>Choose how you'd like to add new words</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-3 pb-8">
          <Button 
            variant="outline" 
            className="w-full justify-start h-14"
            onClick={handleManualAdd}
          >
            <PenLine className="mr-3 h-5 w-5" />
            Add word manually
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start h-14"
            onClick={handleImportArticle}
          >
            <FileText className="mr-3 h-5 w-5" />
            Import from article
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start h-14"
            onClick={handleTakePhoto}
          >
            <Camera className="mr-3 h-5 w-5" />
            Take photo
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
