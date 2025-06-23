
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Star, Filter, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: string[];
  rating: number;
  isPopular: boolean;
}

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages'];

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Truffle Pasta Delight',
      description: 'Handmade pasta with truffle cream sauce, parmesan, and fresh herbs',
      price: 28.99,
      image: 'https://images.unsplash.com/photo-1621489853438-62395ea66ba7?w=400&h=300&fit=crop',
      category: 'Main Courses',
      dietary: ['Vegetarian'],
      rating: 4.8,
      isPopular: true
    },
    {
      id: '2',
      name: 'Grilled Atlantic Salmon',
      description: 'Fresh salmon with lemon herb butter, seasonal vegetables, and quinoa',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      category: 'Main Courses',
      dietary: ['Gluten-Free', 'Keto'],
      rating: 4.9,
      isPopular: true
    },
    {
      id: '3',
      name: 'Art Margherita Pizza',
      description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, and basil',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      category: 'Main Courses',
      dietary: ['Vegetarian'],
      rating: 4.7,
      isPopular: false
    },
    {
      id: '4',
      name: 'Crispy Calamari',
      description: 'Golden fried squid rings with marinara sauce and lemon aioli',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1559847844-d427b5e4e4f6?w=400&h=300&fit=crop',
      category: 'Appetizers',
      dietary: [],
      rating: 4.6,
      isPopular: false
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, vanilla ice cream, and berry coulis',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      category: 'Desserts',
      dietary: ['Vegetarian'],
      rating: 4.9,
      isPopular: true
    },
    {
      id: '6',
      name: 'Craft Beer Selection',
      description: 'Local brewery craft beer - rotating seasonal selection',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop',
      category: 'Beverages',
      dietary: [],
      rating: 4.5,
      isPopular: false
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Menu</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 
                    "bg-gradient-to-r from-orange-600 to-red-600 text-white" : 
                    "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  }
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                    Popular
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {item.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((diet) => (
                      <Badge key={diet} variant="secondary" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    ${item.price}
                  </span>
                  <Button
                    onClick={() => addToCart(item.id)}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Cart Button */}
      {getCartCount() > 0 && (
        <Button className="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300 z-40">
          <ShoppingCart className="h-6 w-6" />
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
            {getCartCount()}
          </Badge>
        </Button>
      )}

      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        onClick={() => setIsChatOpen(true)}
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Menu;
