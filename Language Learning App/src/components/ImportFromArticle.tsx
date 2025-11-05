import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Pin, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PinnedArticle {
  id: string;
  url: string;
  title: string;
}

interface SuggestedWord {
  id: string;
  norwegian: string;
  english: string;
  selected: boolean;
}

interface ImportFromArticleProps {
  folderName: string;
  onBack: () => void;
  onAddWords: (words: { norwegian: string; english: string }[]) => void;
}

export function ImportFromArticle({ folderName, onBack, onAddWords }: ImportFromArticleProps) {
  const [pinnedArticles, setPinnedArticles] = useState<PinnedArticle[]>([]);
  const [pinUrl, setPinUrl] = useState('');
  const [analyzeUrl, setAnalyzeUrl] = useState('');
  const [suggestedWords, setSuggestedWords] = useState<SuggestedWord[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePinArticle = () => {
    if (!pinUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      new URL(pinUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    const newArticle: PinnedArticle = {
      id: crypto.randomUUID(),
      url: pinUrl,
      title: new URL(pinUrl).hostname,
    };

    setPinnedArticles([...pinnedArticles, newArticle]);
    setPinUrl('');
    toast.success('Article pinned!');
  };

  const handleRemovePin = (id: string) => {
    setPinnedArticles(pinnedArticles.filter(a => a.id !== id));
  };

  const handleAnalyzeArticle = async () => {
    if (!analyzeUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      new URL(analyzeUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis with mock data
    setTimeout(() => {
      const mockWords: SuggestedWord[] = [
        { id: crypto.randomUUID(), norwegian: 'utdanning', english: 'education', selected: false },
        { id: crypto.randomUUID(), norwegian: 'forskning', english: 'research', selected: false },
        { id: crypto.randomUUID(), norwegian: 'teknologi', english: 'technology', selected: false },
        { id: crypto.randomUUID(), norwegian: 'innovasjon', english: 'innovation', selected: false },
        { id: crypto.randomUUID(), norwegian: 'samfunn', english: 'society', selected: false },
        { id: crypto.randomUUID(), norwegian: 'utvikle', english: 'develop', selected: false },
        { id: crypto.randomUUID(), norwegian: 'miljø', english: 'environment', selected: false },
        { id: crypto.randomUUID(), norwegian: 'bærekraft', english: 'sustainability', selected: false },
      ];
      
      setSuggestedWords(mockWords);
      setIsAnalyzing(false);
      toast.success('Article analyzed!');
    }, 2000);
  };

  const handleToggleWord = (id: string) => {
    setSuggestedWords(suggestedWords.map(word => 
      word.id === id ? { ...word, selected: !word.selected } : word
    ));
  };

  const handleAddSelected = () => {
    const selectedWords = suggestedWords
      .filter(word => word.selected)
      .map(word => ({ norwegian: word.norwegian, english: word.english }));

    if (selectedWords.length === 0) {
      toast.error('Please select at least one word');
      return;
    }

    onAddWords(selectedWords);
    toast.success(`Added ${selectedWords.length} word${selectedWords.length > 1 ? 's' : ''} to ${folderName}`);
    setSuggestedWords([]);
    setAnalyzeUrl('');
  };

  return (
    <div className="pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2>Import from Article</h2>
      </div>

      {/* Pin Article Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pin className="h-5 w-5" />
            Pin Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pin-url">Article URL</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="pin-url"
                value={pinUrl}
                onChange={(e) => setPinUrl(e.target.value)}
                placeholder="https://example.com/article"
                onKeyDown={(e) => e.key === 'Enter' && handlePinArticle()}
              />
              <Button onClick={handlePinArticle}>
                <Pin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {pinnedArticles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Pinned Articles</p>
              {pinnedArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline flex-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="truncate">{article.title}</span>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePin(article.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Word Extraction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="analyze-url">Article URL</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="analyze-url"
                value={analyzeUrl}
                onChange={(e) => setAnalyzeUrl(e.target.value)}
                placeholder="https://example.com/article"
                onKeyDown={(e) => e.key === 'Enter' && !isAnalyzing && handleAnalyzeArticle()}
              />
              <Button 
                onClick={handleAnalyzeArticle}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {suggestedWords.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Suggested Words ({suggestedWords.filter(w => w.selected).length} selected)
              </p>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {suggestedWords.map((word) => (
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

              <Button 
                onClick={handleAddSelected}
                disabled={!suggestedWords.some(w => w.selected)}
                className="w-full"
              >
                Add Selected to {folderName}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
