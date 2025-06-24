
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Download, RefreshCw } from 'lucide-react';
import { useImageGeneration } from '@/hooks/useImageGeneration';

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
}

const ImageGenerator = ({ onImageGenerated }: ImageGeneratorProps) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { generateFoodImage, isGenerating } = useImageGeneration();

  const handleGenerate = async () => {
    if (!dishName.trim() || !description.trim()) {
      return;
    }

    const imageUrl = await generateFoodImage(dishName, description);
    if (imageUrl) {
      setGeneratedImage(imageUrl);
      onImageGenerated?.(imageUrl);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `${dishName.replace(/\s+/g, '-').toLowerCase()}-generated.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-orange-600" />
          AI Food Image Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Dish Name</label>
          <Input
            placeholder="e.g., Truffle Pasta Delight"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            placeholder="e.g., Handmade pasta with truffle cream sauce, parmesan, and fresh herbs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !dishName.trim() || !description.trim()}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Food Image
            </>
          )}
        </Button>

        {generatedImage && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={generatedImage}
                alt={`Generated image of ${dishName}`}
                className="w-full h-64 object-cover rounded-lg border"
              />
              <Badge className="absolute top-2 right-2 bg-green-500">
                AI Generated
              </Badge>
            </div>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGenerator;
