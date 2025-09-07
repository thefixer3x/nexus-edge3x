import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Zap, Shield, Users, TrendingUp, Star, CheckCircle, Globe, Smartphone, Cloud, MessageCircle, Heart, Share2, Play, BarChart3, Package, Award } from 'lucide-react';
import { SMEButton } from '@/components/sme/SMEButton';
import { AIChatSupport } from '@/components/AIChatSupport';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { SocialConnections } from '@/components/SocialConnectionsPreview';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-seftec-purple" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized platform"
    },
    {
      icon: <Shield className="w-8 h-8 text-seftec-mint" />,
      title: "Secure & Trusted",
      description: "Bank-level security to keep your data and transactions safe"
    },
    {
      icon: <Users className="w-8 h-8 text-seftec-gold" />,
      title: "Community Driven",
      description: "Connect with other business owners and grow together"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-seftec-purple" />,
      title: "Smart Analytics",
      description: "AI-powered insights to boost your business performance"
    }
  ];

  const valueProps = [
    {
      icon: <BarChart3 className="w-10 h-10 text-seftec-purple" />,
      title: "Business Intelligence",
      description: "AI-powered analytics to make smarter business decisions"
    },
    {
      icon: <Package className="w-10 h-10 text-seftec-mint" />,
      title: "Global Sourcing",
      description: "Access to thousands of products from verified suppliers"
    },
    {
      icon: <Award className="w-10 h-10 text-seftec-gold" />,
      title: "Quality Assurance",
      description: "Rigorous quality checks and supplier verification"
    }
  ];

  const testimonials = [
    {
      name: "Adebayo Okafor",
      role: "CEO, TechSolutions Ltd",
      content: "Seftec.Store has transformed how we source business equipment. The AI recommendations are spot on!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Chidinma Eze",
      role: "Founder, CreativeHub",
      content: "The integration with our social platforms has helped us reach new customers effortlessly.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emeka Johnson",
      role: "Operations Manager, LogiCorp",
      content: "From procurement to payment, everything is streamlined. Highly recommended for growing businesses.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const stats = [
    { value: "10K+", label: "Businesses Served" },
    { value: "50K+", label: "Products Available" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-seftec-purple/10 to-seftec-mint/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-4xl md:text-6xl font-bold font-heading text-sme-neutral-900 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              The Future of <span className="text-seftec-purple">Business Commerce</span>
            </h1>
            <p className={`text-xl text-sme-neutral-600 mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              AI-powered marketplace with seamless social integration. Connect, grow, and thrive with Nigeria's smartest business platform.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <SMEButton variant="primary" size="lg" asChild>
                <Link to="/products">
                  Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </SMEButton>
              <SMEButton variant="outline" size="lg" asChild>
                <Link to="/signup">
                  Create Account
                </Link>
              </SMEButton>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-sme-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-seftec-purple mb-2">{stat.value}</div>
                <div className="text-sme-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-gradient-to-br from-seftec-mint/10 to-seftec-gold/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-sme-neutral-900 mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-lg text-sme-neutral-600">
              Comprehensive solutions designed to help your business grow and succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-sme-neutral-200 shadow-sm text-center hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-6">
                  {prop.icon}
                </div>
                <h3 className="text-xl font-semibold text-sme-neutral-900 mb-3">{prop.title}</h3>
                <p className="text-sme-neutral-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-sme-neutral-900 mb-4">
              Why Choose Seftec.Store?
            </h2>
            <p className="text-lg text-sme-neutral-600">
              We're redefining business commerce with cutting-edge technology and seamless experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-sme-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-sme-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sme-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-sme-neutral-50">
        <div className="container mx-auto px-4">
          <FeaturedProducts />
        </div>
      </section>

      {/* Social Integration Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-sme-neutral-900 mb-6">
              Connect Your Business to the World
            </h2>
            <p className="text-xl text-sme-neutral-700 mb-10 max-w-2xl mx-auto">
              Seamlessly integrate with your social platforms and expand your reach effortlessly.
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-sme-neutral-200 shadow-sm p-6">
            <SocialConnections />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-sme-neutral-900 mb-4">
              What Business Owners Say
            </h2>
            <p className="text-lg text-sme-neutral-600">
              Join thousands of satisfied businesses growing with Seftec.Store
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-sme-neutral-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-sme-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-sme-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sme-neutral-700 mb-4">"{testimonial.content}"</p>
                <div className="flex text-seftec-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-seftec-mint/20 to-seftec-gold/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-sme-neutral-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-sme-neutral-700 mb-10 max-w-2xl mx-auto">
              Join thousands of Nigerian businesses already growing with Seftec.Store
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SMEButton variant="primary" size="lg" asChild>
                <Link to="/signup">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </SMEButton>
              <SMEButton variant="outline" size="lg" asChild>
                <Link to="/products">
                  Browse Products
                </Link>
              </SMEButton>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Support */}
      <AIChatSupport />
    </div>
  );
};

export default LandingPage;