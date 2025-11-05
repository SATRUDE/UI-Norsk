import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Folder, BookOpen, Trash2 } from 'lucide-react';
import { Folder as FolderType } from '../types';

interface FolderListProps {
  folders: FolderType[];
  onSelectFolder: (folderId: string) => void;
  onStartTest: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export function FolderList({ folders, onSelectFolder, onStartTest, onDeleteFolder }: FolderListProps) {
  if (folders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Folder className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>No folders yet. Create one to get started!</p>
      </div>
    );
  }

  const totalWords = folders.reduce((sum, folder) => sum + folder.words.length, 0);

  return (
    <div className="pb-24">
      <div className="mb-6">
        <Button 
          size="lg" 
          className="w-full"
          disabled={totalWords === 0}
        >
          <BookOpen className="mr-2 h-5 w-5" />
          Test All Folders ({totalWords} words)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder) => (
          <Card key={folder.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                {folder.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {folder.words.length} {folder.words.length === 1 ? 'word' : 'words'}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onSelectFolder(folder.id)}
                >
                  Manage
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => onStartTest(folder.id)}
                  disabled={folder.words.length === 0}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Test
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeleteFolder(folder.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
