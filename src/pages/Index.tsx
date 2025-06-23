
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Users, Star, MessageCircle, ShoppingCart, Calendar, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <ChefHat className="h-8 w-8 text-orange-500" />,
      title: "AI-Powered Menu",
      description: "Get personalized dish recommendations based on your preferences and dietary needs."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-orange-500" />,
      title: "Smart Assistant",
      description: "Chat with our AI assistant for instant help with orders, reservations, and menu questions."
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Quick Reservations",
      description: "Book your table in seconds with our intelligent reservation system."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Social Experience",
      description: "Share meals, rate dishes, and connect with other food enthusiasts."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "The AI recommendations were spot on! Found my new favorite dish through the chatbot.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c2cd?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Mike Chen", 
      rating: 5,
      comment: "Seamless ordering experience. The voice feature made it so easy to customize my order.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Best restaurant website I've used. The chatbot helped me find perfect vegan options!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200 px-4 py-2 text-sm font-medium">
              🚀 AI-Powered Restaurant Experience
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                SmartBite
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience dining reimagined with AI-powered recommendations, intelligent ordering, 
              and seamless reservations. Your perfect meal is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-scale"
                onClick={() => navigate('/menu')}
              >
                <ChefHat className="mr-2 h-5 w-5" />
                Explore Menu
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover-scale"
                onClick={() => navigate('/reservations')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Table
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartBite?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing the dining experience with cutting-edge AI technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale group">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied diners who love our smart dining experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Smart Dining?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the future of restaurant experiences today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover-scale"
              onClick={() => navigate('/orders')}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Order Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-6 text-lg font-semibold transition-all duration-300 hover-scale"
              onClick={() => navigate('/profile')}
            >
              <User className="mr-2 h-5 w-5" />
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>

      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* ChatBot */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
