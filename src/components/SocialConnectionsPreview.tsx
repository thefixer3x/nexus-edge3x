import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  MessageCircle, 
  Heart, 
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle,
  XCircle,
  Plus,
  Settings,
  Calendar,
  BarChart3,
  Send,
  Clock,
  AlertCircle
} from 'lucide-react';
import { SMEButton } from '@/components/sme/SMEButton';
import { SMECard, SMECardContent, SMECardHeader } from '@/components/sme/SMECard';
import { socialConnectionService, SOCIAL_PLATFORMS, SocialConnection, SocialPost } from '@/services/socialConnectionService';
import { useAuth } from '@/contexts/AuthContext';

export const SocialConnections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadSocialData();
    }
  }, [user]);

  const loadSocialData = async () => {
    try {
      setLoading(true);
      const [connectionsData, postsData] = await Promise.all([
        socialConnectionService.getUserConnections(user!.id),
        socialConnectionService.getScheduledPosts(user!.id)
      ]);
      setConnections(connectionsData);
      setScheduledPosts(postsData);
    } catch (err) {
      setError('Failed to load social connections');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleConnection = async (platform: string) => {
    try {
      if (connections.some(conn => conn.platform === platform)) {
        // Disconnect
        await socialConnectionService.disconnectFromPlatform(user!.id, platform);
      } else {
        // Connect - this would typically open an OAuth flow
        // For now, we'll simulate a connection
        const newConnection = await socialConnectionService.connectToPlatform(
          user!.id,
          platform,
          `fake-${platform}-id-${Date.now()}`,
          `${platform}-user-${Date.now()}`,
          `fake-access-token-${Date.now()}`,
          `fake-refresh-token-${Date.now()}`,
          Date.now() + 3600000 // 1 hour from now
        );
        setConnections([...connections, newConnection]);
      }
      loadSocialData();
    } catch (err) {
      setError('Failed to update connection');
      console.error(err);
    }
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-seftec-purple" />,
      title: "Global Reach",
      description: "Connect with customers worldwide through integrated social platforms"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-seftec-mint" />,
      title: "Mobile First",
      description: "Optimized for all devices with native social sharing capabilities"
    },
    {
      icon: <Cloud className="w-8 h-8 text-seftec-gold" />,
      title: "Cloud Sync",
      description: "Real-time synchronization across all your connected platforms"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-seftec-purple" />,
      title: "Engagement Tools",
      description: "Built-in tools for customer interaction and community building"
    },
    {
      icon: <Heart className="w-8 h-8 text-seftec-mint" />,
      title: "Brand Building",
      description: "Consistent brand presence across all social channels"
    },
    {
      icon: <Share2 className="w-8 h-8 text-seftec-gold" />,
      title: "Easy Sharing",
      description: "One-click sharing of products, promotions, and updates"
    }
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 text-center animate-pulse">
              <div className="w-10 h-10 rounded-full bg-sme-neutral-200 mx-auto mb-2"></div>
              <div className="h-4 bg-sme-neutral-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Connection Status */}
      <SMECard>
        <SMECardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-xl font-bold text-sme-neutral-900">Social Connections</h3>
          <SMEButton variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Manage
          </SMEButton>
        </SMECardHeader>
        <SMECardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {Object.entries(SOCIAL_PLATFORMS).map(([platformId, platform]) => {
              const isConnected = connections.some(conn => conn.platform === platformId);
              return (
                <div 
                  key={platformId}
                  className={`border rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
                    isConnected 
                      ? 'border-seftec-purple bg-seftec-purple/5' 
                      : 'border-sme-neutral-200 hover:border-sme-primary/50'
                  }`}
                  onClick={() => toggleConnection(platformId)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    isConnected 
                      ? 'bg-seftec-purple text-white' 
                      : 'bg-sme-neutral-100 text-sme-neutral-500'
                  }`}>
                    {platformId === 'facebook' && <Facebook className="w-5 h-5" />}
                    {platformId === 'twitter' && <Twitter className="w-5 h-5" />}
                    {platformId === 'instagram' && <Instagram className="w-5 h-5" />}
                    {platformId === 'linkedin' && <Linkedin className="w-5 h-5" />}
                    {platformId === 'youtube' && <Youtube className="w-5 h-5" />}
                  </div>
                  <div className="text-sm font-medium text-sme-neutral-900">{platform.name}</div>
                  <div className="mt-1">
                    {isConnected ? (
                      <CheckCircle className="w-4 h-4 text-seftec-purple mx-auto" />
                    ) : (
                      <Plus className="w-4 h-4 text-sme-neutral-400 mx-auto" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SMECardContent>
      </SMECard>

      {/* Scheduled Posts */}
      {scheduledPosts.length > 0 && (
        <SMECard>
          <SMECardHeader>
            <h3 className="text-xl font-bold text-sme-neutral-900">Scheduled Posts</h3>
          </SMECardHeader>
          <SMECardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="border border-sme-neutral-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sme-neutral-900 mb-2">{post.content}</p>
                      <div className="flex items-center text-sm text-sme-neutral-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : 'Draft'}
                        <span className="mx-2">•</span>
                        <span className="capitalize">{post.platform}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === 'draft' ? 'bg-sme-neutral-100 text-sme-neutral-700' :
                      post.status === 'scheduled' ? 'bg-seftec-purple/10 text-seftec-purple' :
                      post.status === 'posted' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {post.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SMECardContent>
        </SMECard>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <SMECard key={index} className="hover:shadow-lg transition-shadow duration-300">
            <SMECardContent className="p-6">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-sme-neutral-900 mb-2">{feature.title}</h4>
              <p className="text-sme-neutral-600">{feature.description}</p>
            </SMECardContent>
          </SMECard>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="text-center py-12 bg-gradient-to-r from-seftec-mint/20 to-seftec-gold/20 rounded-xl">
        <h3 className="text-2xl font-bold text-sme-neutral-900 mb-4">Advanced Social Commerce Features</h3>
        <p className="text-lg text-sme-neutral-700 mb-6 max-w-2xl mx-auto">
          Coming soon: Automated posting, social analytics, customer engagement tools, 
          and integrated marketing campaigns across all your social platforms.
        </p>
        <SMEButton variant="primary" size="lg">
          Get Notified When Available
        </SMEButton>
      </div>
    </div>
  );
};