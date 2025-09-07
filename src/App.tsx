import React from "react";
// i18n initialization
import "./i18n";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from 'react';
import { AuthProvider } from "@/contexts/AuthContext";

import WorkspaceInterface from "@/components/WorkspaceInterface";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ShutterstockSettings } from "./components/ShutterstockSettings";
import MediaTest from "./pages/MediaTest";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SMENavbar } from "./components/sme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const LoadingFallback = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
    <div className="text-teal-500">Loading...</div>
  </div>
);

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Main marketplace routes with navigation */}
              <Route path="/" element={
                <>
                  <SMENavbar />
                  <Index />
                </>
              } />
              <Route path="/products" element={
                <>
                  <SMENavbar />
                  <ProductListing />
                </>
              } />
              <Route path="/products/:id" element={
                <>
                  <SMENavbar />
                  <ProductDetail />
                </>
              } />
              <Route path="/cart" element={
                <>
                  <SMENavbar />
                  <Cart />
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <SMENavbar />
                  <Checkout />
                </>
              } />
              <Route path="/login" element={
                <>
                  <SMENavbar />
                  <Login />
                </>
              } />
              <Route path="/signup" element={
                <>
                  <SMENavbar />
                  <Signup />
                </>
              } />
              {/* Admin routes without navigation */}
              <Route path="/admin">
                <Route path="workspace" element={<WorkspaceInterface />} />
                <Route path="settings" element={<ShutterstockSettings />} />
              </Route>
              <Route path="/media-test" element={<MediaTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
