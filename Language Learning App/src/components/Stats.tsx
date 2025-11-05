import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Folder as FolderType } from '../types';
import { BookOpen, Folder, Languages, TrendingUp } from 'lucide-react';

interface StatsProps {
  folders: FolderType[];
}

export function Stats({ folders }: StatsProps) {
  const totalFolders = folders.length;
  const totalWords = folders.reduce((sum, folder) => sum + folder.words.length, 0);
  const averageWordsPerFolder = totalFolders > 0 ? Math.round(totalWords / totalFolders) : 0;
  
  // Find largest and smallest folders
  const foldersSorted = [...folders].sort((a, b) => b.words.length - a.words.length);
  const largestFolder = foldersSorted[0];
  const smallestFolder = foldersSorted[foldersSorted.length - 1];

  return (
    <div className="pb-24">
      <h2 className="mb-6">Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Folders</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalFolders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Words</CardTitle>
            <Languages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalWords}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Average per Folder</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageWordsPerFolder}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Vocabulary Size</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalWords}</div>
            <p className="text-xs text-muted-foreground mt-1">unique words</p>
          </CardContent>
        </Card>
      </div>

      {folders.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Folders by Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foldersSorted.map((folder) => (
                  <div key={folder.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Folder className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{folder.name}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="bg-blue-100 h-2 rounded-full" style={{ width: `${Math.max(folder.words.length * 3, 20)}px` }} />
                      <span className="text-sm text-gray-600 w-8 text-right">{folder.words.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {largestFolder && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Largest Folder</p>
                    <p className="font-medium">{largestFolder.name}</p>
                    <p className="text-sm text-gray-600">{largestFolder.words.length} words</p>
                  </div>
                )}
                
                {smallestFolder && totalFolders > 1 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Smallest Folder</p>
                    <p className="font-medium">{smallestFolder.name}</p>
                    <p className="text-sm text-gray-600">{smallestFolder.words.length} words</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Empty Folders</p>
                  <p className="text-2xl">{folders.filter(f => f.words.length === 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {folders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12 text-gray-500">
            <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No data yet. Start creating folders and adding words to see statistics!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
