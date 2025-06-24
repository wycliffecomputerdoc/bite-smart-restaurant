
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import GoogleMapsEmbed from "@/components/GoogleMapsEmbed";
import { toast } from "sonner";

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Message sent successfully! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for reservations, questions, or feedback
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What's this about?"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 text-lg font-semibold"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Location */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <MapPin className="h-5 w-5 mr-2 text-orange-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">SmartBite Restaurant</p>
                    <p className="text-gray-600">123 Gourmet Street</p>
                    <p className="text-gray-600">Downtown District</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Phone className="h-5 w-5 mr-2 text-orange-600" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium">(555) 123-BITE</p>
                        <p className="text-sm text-gray-600">Main Line</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium">info@smartbite.com</p>
                        <p className="text-sm text-gray-600">General Inquiries</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium">reservations@smartbite.com</p>
                        <p className="text-sm text-gray-600">Reservations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Clock className="h-5 w-5 mr-2 text-orange-600" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Thursday</span>
                      <span>11:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Friday - Saturday</span>
                      <span>11:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>12:00 PM - 9:00 PM</span>
                    </div>
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-800 font-medium">
                        Kitchen closes 30 minutes before closing time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Map */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Find Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <GoogleMapsEmbed
                    address="123 Gourmet Street, Downtown District, New York, NY 10001"
                    className="w-full h-48 mb-4"
                  />
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Contact;
