import { useState } from 'react';
import { FolderList } from './components/FolderList';
import { WordManager } from './components/WordManager';
import { TestMode } from './components/TestMode';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { AddFolderDialog } from './components/AddFolderDialog';
import { BottomNav } from './components/BottomNav';
import { ImportFromArticle } from './components/ImportFromArticle';
import { AddWordManually } from './components/AddWordManually';
import { CameraCapture } from './components/CameraCapture';
import { Toaster } from './components/ui/sonner';
import { Folder } from './types';
import { BookOpen } from 'lucide-react';

type View = 'folders' | 'manage' | 'test' | 'stats' | 'settings' | 'import' | 'addManually' | 'camera';

export default function App() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentView, setCurrentView] = useState<View>('folders');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const selectedFolder = folders.find(f => f.id === selectedFolderId);

  const handleAddFolder = (name: string) => {
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      words: [],
    };
    setFolders([...folders, newFolder]);
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
  };

  const handleSelectFolder = (folderId: string) => {
    setSelectedFolderId(folderId);
    setCurrentView('manage');
  };

  const handleStartTest = (folderId: string) => {
    setSelectedFolderId(folderId);
    setCurrentView('test');
  };

  const handleAddWord = (norwegian: string, english: string) => {
    if (!selectedFolderId) return;

    setFolders(folders.map(folder => {
      if (folder.id === selectedFolderId) {
        return {
          ...folder,
          words: [
            ...folder.words,
            {
              id: crypto.randomUUID(),
              norwegian,
              english,
            }
          ],
        };
      }
      return folder;
    }));
  };

  const handleAddMultipleWords = (words: { norwegian: string; english: string }[]) => {
    if (!selectedFolderId) return;

    setFolders(folders.map(folder => {
      if (folder.id === selectedFolderId) {
        return {
          ...folder,
          words: [
            ...folder.words,
            ...words.map(word => ({
              id: crypto.randomUUID(),
              norwegian: word.norwegian,
              english: word.english,
            }))
          ],
        };
      }
      return folder;
    }));
  };

  const handleOpenImport = () => {
    setCurrentView('import');
  };

  const handleOpenManual = () => {
    setCurrentView('addManually');
  };

  const handleOpenCamera = () => {
    setCurrentView('camera');
  };

  const handleDeleteWord = (wordId: string) => {
    if (!selectedFolderId) return;

    setFolders(folders.map(folder => {
      if (folder.id === selectedFolderId) {
        return {
          ...folder,
          words: folder.words.filter(w => w.id !== wordId),
        };
      }
      return folder;
    }));
  };

  const handleBackToFolders = () => {
    setCurrentView('folders');
    setSelectedFolderId(null);
  };

  const handleNavChange = (view: 'folders' | 'stats' | 'settings') => {
    setCurrentView(view);
    setSelectedFolderId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
            {currentView === 'folders' && (
              <AddFolderDialog onAddFolder={handleAddFolder} />
            )}
          </div>
        </header>

        <main>
          {currentView === 'folders' && (
            <FolderList
              folders={folders}
              onSelectFolder={handleSelectFolder}
              onStartTest={handleStartTest}
              onDeleteFolder={handleDeleteFolder}
            />
          )}

          {currentView === 'stats' && (
            <Stats folders={folders} />
          )}

          {currentView === 'settings' && (
            <Settings />
          )}

          {currentView === 'manage' && selectedFolder && (
            <WordManager
              folder={selectedFolder}
              onBack={handleBackToFolders}
              onAddWord={handleAddWord}
              onDeleteWord={handleDeleteWord}
              onOpenImport={handleOpenImport}
              onOpenManual={handleOpenManual}
              onOpenCamera={handleOpenCamera}
            />
          )}

          {currentView === 'test' && selectedFolder && (
            <TestMode
              folder={selectedFolder}
              onBack={handleBackToFolders}
            />
          )}

          {currentView === 'import' && selectedFolder && (
            <ImportFromArticle
              folderName={selectedFolder.name}
              onBack={() => setCurrentView('manage')}
              onAddWords={handleAddMultipleWords}
            />
          )}

          {currentView === 'addManually' && selectedFolder && (
            <AddWordManually
              folderName={selectedFolder.name}
              onBack={() => setCurrentView('manage')}
              onAddWord={handleAddWord}
            />
          )}

          {currentView === 'camera' && selectedFolder && (
            <CameraCapture
              folderName={selectedFolder.name}
              onBack={() => setCurrentView('manage')}
              onAddWords={handleAddMultipleWords}
            />
          )}
        </main>
      </div>

      <BottomNav 
        currentView={currentView === 'manage' || currentView === 'test' || currentView === 'import' || currentView === 'addManually' || currentView === 'camera' ? 'folders' : currentView}
        onViewChange={handleNavChange}
      />
      <Toaster />
    </div>
  );
}
