
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChefHat, ShoppingCart, Calendar, User, Home, Phone, LogOut, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: ChefHat },
    { name: 'Reservations', path: '/reservations', icon: Calendar },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  // Add admin link if user is admin
  if (user && userProfile?.full_name?.includes('admin')) {
    navItems.push({ name: 'Admin', path: '/admin', icon: Settings });
  }

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover-scale transition-transform duration-200"
            onClick={() => handleNavigation('/')}
          >
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                SmartBite
              </h1>
              <Badge className="bg-orange-100 text-orange-800 text-xs px-1 py-0">
                AI-Powered
              </Badge>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  className={`flex items-center space-x-2 transition-all duration-200 ${
                    isActivePath(item.path) 
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white" 
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name || user.email} />
                      <AvatarFallback>
                        {userProfile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {userProfile?.full_name?.includes('admin') && (
                    <DropdownMenuItem onClick={() => handleNavigation('/admin')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
                onClick={() => handleNavigation('/profile')}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    className={`flex items-center space-x-2 justify-start transition-all duration-200 ${
                      isActivePath(item.path) 
                        ? "bg-gradient-to-r from-orange-600 to-red-600 text-white" 
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                );
              })}
              <div className="pt-2 border-t border-orange-100">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.full_name || user.email} />
                        <AvatarFallback>
                          {userProfile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{userProfile?.full_name || user.email}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleNavigation('/profile')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
