
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFoodImage = async (dishName: string, description: string): Promise<string | null> => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-food-image', {
        body: {
          prompt: description,
          dishName: dishName
        }
      });

      if (error) {
        throw error;
      }

      if (data?.imageUrl) {
        toast.success('Food image generated successfully!');
        return data.imageUrl;
      }

      throw new Error('No image URL returned');
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateFoodImage,
    isGenerating
  };
};
