import React from 'react';
import { SMEButton } from './SMEButton';
import { SMEBadge } from './SMEBadge';
import { ShoppingCart, User, Search, Menu, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComparisonStore } from '@/stores/comparisonStore';
import { useCartStore } from '@/stores/cartStore';

export const SMENavbar: React.FC = () => {
  const { comparisonProducts, setComparisonOpen } = useComparisonStore();
  const { getItemCount, setCartOpen } = useCartStore();

  return (
    <nav className="bg-white border-b border-sme-neutral-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-seftec-purple to-seftec-mint rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
                </svg>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold font-heading text-sme-neutral-900">
                  Seftec.Store
                </h1>
                <p className="text-xs text-sme-neutral-600 font-body">
                  Part of <a href="https://sme.seftechub.com" target="_blank" rel="noopener noreferrer" className="hover:text-seftec-purple font-medium transition-colors">SefTechHub</a>
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="text-sme-neutral-700 hover:text-sme-primary font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-sme-neutral-700 hover:text-sme-primary font-medium transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              to="/solutions"
              className="text-sme-neutral-700 hover:text-sme-primary font-medium transition-colors duration-200"
            >
              Solutions
            </Link>
            <Link
              to="/support"
              className="text-sme-neutral-700 hover:text-sme-primary font-medium transition-colors duration-200"
            >
              Support
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search icon for mobile */}
            <button className="md:hidden p-2 text-sme-neutral-500 hover:text-sme-primary">
              <Search className="w-5 h-5" />
            </button>

            {/* Comparison */}
            {comparisonProducts.length > 0 && (
              <button
                onClick={() => setComparisonOpen(true)}
                className="relative p-2 text-sme-neutral-500 hover:text-seftec-purple transition-colors duration-200"
              >
                <Scale className="w-6 h-6" />
                <SMEBadge
                  variant="secondary"
                  size="sm"
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {comparisonProducts.length}
                </SMEBadge>
              </button>
            )}

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-sme-neutral-500 hover:text-sme-primary transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <SMEBadge
                  variant="accent"
                  size="sm"
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {getItemCount()}
                </SMEBadge>
              )}
            </button>

            {/* User menu */}
            <button className="p-2 text-sme-neutral-500 hover:text-sme-primary transition-colors duration-200">
              <User className="w-6 h-6" />
            </button>

            {/* Login/Signup buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <SMEButton variant="ghost" size="sm">
                Login
              </SMEButton>
              <SMEButton variant="primary" size="sm">
                Sign Up
              </SMEButton>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-sme-neutral-500 hover:text-sme-primary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
