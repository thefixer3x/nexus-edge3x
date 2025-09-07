import { createRetailClient } from '@/lib/supabase/supabaseClientRetail';
import { 
  FacebookAuthProvider, 
  GoogleAuthProvider, 
  TwitterAuthProvider,
  GithubAuthProvider 
} from 'firebase/auth';

// Social platform types
export interface SocialConnection {
  id: string;
  userId: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'google' | 'github';
  platformId: string;
  platformUsername: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  isConnected: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialPost {
  id: string;
  userId: string;
  platform: string;
  content: string;
  mediaUrl?: string;
  scheduledAt?: string;
  postedAt?: string;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  engagement?: {
    likes?: number;
    shares?: number;
    comments?: number;
  };
}

export interface SocialAnalytics {
  platform: string;
  followers: number;
  following: number;
  posts: number;
  engagementRate: number;
  reach: number;
  impressions: number;
  lastUpdated: string;
}

// Social connection service
class SocialConnectionService {
  private supabase = createRetailClient();

  // Get all social connections for a user
  async getUserConnections(userId: string): Promise<SocialConnection[]> {
    const { data, error } = await this.supabase
      .from('social_connections')
      .select('*')
      .eq('user_id', userId)
      .eq('is_connected', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as SocialConnection[];
  }

  // Connect to a social platform
  async connectToPlatform(
    userId: string,
    platform: string,
    platformId: string,
    platformUsername: string,
    accessToken: string,
    refreshToken?: string,
    expiresAt?: number
  ): Promise<SocialConnection> {
    const { data, error } = await this.supabase
      .from('social_connections')
      .upsert({
        user_id: userId,
        platform,
        platform_id: platformId,
        platform_username: platformUsername,
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
        is_connected: true,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data as SocialConnection;
  }

  // Disconnect from a social platform
  async disconnectFromPlatform(userId: string, platform: string): Promise<void> {
    const { error } = await this.supabase
      .from('social_connections')
      .update({ 
        is_connected: false,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('platform', platform);

    if (error) throw error;
  }

  // Get social analytics for a user
  async getUserAnalytics(userId: string): Promise<SocialAnalytics[]> {
    const { data, error } = await this.supabase
      .from('social_analytics')
      .select('*')
      .eq('user_id', userId)
      .order('last_updated', { ascending: false });

    if (error) throw error;
    return data as SocialAnalytics[];
  }

  // Schedule a social post
  async schedulePost(
    userId: string,
    platform: string,
    content: string,
    mediaUrl?: string,
    scheduledAt?: string
  ): Promise<SocialPost> {
    const { data, error } = await this.supabase
      .from('social_posts')
      .insert({
        user_id: userId,
        platform,
        content,
        media_url: mediaUrl,
        scheduled_at: scheduledAt,
        status: scheduledAt ? 'scheduled' : 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data as SocialPost;
  }

  // Get scheduled posts for a user
  async getScheduledPosts(userId: string): Promise<SocialPost[]> {
    const { data, error } = await this.supabase
      .from('social_posts')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['draft', 'scheduled'])
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return data as SocialPost[];
  }

  // Update post status
  async updatePostStatus(
    postId: string,
    status: 'posted' | 'failed',
    postedAt?: string
  ): Promise<void> {
    const { error } = await this.supabase
      .from('social_posts')
      .update({
        status,
        posted_at: postedAt,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId);

    if (error) throw error;
  }

  // Get social engagement data
  async getEngagementData(userId: string, days: number = 30): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('social_engagement_metrics')
      .select('*')
      .eq('user_id', userId)
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  }
}

// Export singleton instance
export const socialConnectionService = new SocialConnectionService();

// Social platform configuration
export const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    scopes: ['public_profile', 'email', 'pages_manage_posts', 'pages_read_engagement'],
    apiEndpoint: 'https://graph.facebook.com/v18.0'
  },
  twitter: {
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    apiEndpoint: 'https://api.twitter.com/2'
  },
  instagram: {
    name: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    scopes: ['instagram_basic', 'instagram_content_publish', 'pages_manage_posts'],
    apiEndpoint: 'https://graph.instagram.com'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    scopes: ['r_liteprofile', 'r_emailaddress', 'w_member_social'],
    apiEndpoint: 'https://api.linkedin.com/v2'
  },
  youtube: {
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    scopes: ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/userinfo.profile'],
    apiEndpoint: 'https://www.googleapis.com/youtube/v3'
  },
  google: {
    name: 'Google',
    icon: 'google',
    color: '#4285F4',
    scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    apiEndpoint: 'https://www.googleapis.com/oauth2/v2'
  },
  github: {
    name: 'GitHub',
    icon: 'github',
    color: '#333333',
    scopes: ['user', 'public_repo'],
    apiEndpoint: 'https://api.github.com'
  }
};

// Utility functions
export const socialUtils = {
  // Format engagement numbers
  formatEngagementNumber: (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  // Calculate engagement rate
  calculateEngagementRate: (engagements: number, followers: number): number => {
    if (followers === 0) return 0;
    return (engagements / followers) * 100;
  },

  // Get platform color
  getPlatformColor: (platform: string): string => {
    return SOCIAL_PLATFORMS[platform as keyof typeof SOCIAL_PLATFORMS]?.color || '#666666';
  }
};