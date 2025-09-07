-- Create social connections table
CREATE TABLE IF NOT EXISTS retail_b2c.social_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    platform_id VARCHAR(255) NOT NULL,
    platform_username VARCHAR(255),
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    is_connected BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, platform),
    CONSTRAINT valid_platform CHECK (platform IN ('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'google', 'github'))
);

-- Create index for user_id
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON retail_b2c.social_connections(user_id);

-- Create index for platform
CREATE INDEX IF NOT EXISTS idx_social_connections_platform ON retail_b2c.social_connections(platform);

-- Create social posts table
CREATE TABLE IF NOT EXISTS retail_b2c.social_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    media_url TEXT,
    scheduled_at TIMESTAMPTZ,
    posted_at TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'draft',
    engagement JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_status CHECK (status IN ('draft', 'scheduled', 'posted', 'failed')),
    CONSTRAINT valid_platform CHECK (platform IN ('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'google', 'github'))
);

-- Create indexes for social posts
CREATE INDEX IF NOT EXISTS idx_social_posts_user_id ON retail_b2c.social_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON retail_b2c.social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_at ON retail_b2c.social_posts(scheduled_at);

-- Create social analytics table
CREATE TABLE IF NOT EXISTS retail_b2c.social_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    posts INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, platform),
    CONSTRAINT valid_platform CHECK (platform IN ('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'google', 'github'))
);

-- Create index for social analytics
CREATE INDEX IF NOT EXISTS idx_social_analytics_user_id ON retail_b2c.social_analytics(user_id);

-- Create social engagement metrics table
CREATE TABLE IF NOT EXISTS retail_b2c.social_engagement_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    
    UNIQUE(user_id, platform, date),
    CONSTRAINT valid_platform CHECK (platform IN ('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'google', 'github'))
);

-- Create index for social engagement metrics
CREATE INDEX IF NOT EXISTS idx_social_engagement_user_id ON retail_b2c.social_engagement_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_social_engagement_date ON retail_b2c.social_engagement_metrics(date);

-- Enable RLS
ALTER TABLE retail_b2c.social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail_b2c.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail_b2c.social_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE retail_b2c.social_engagement_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for social_connections
CREATE POLICY "Users can view their own social connections" ON retail_b2c.social_connections
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own social connections" ON retail_b2c.social_connections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social connections" ON retail_b2c.social_connections
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social connections" ON retail_b2c.social_connections
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for social_posts
CREATE POLICY "Users can view their own social posts" ON retail_b2c.social_posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own social posts" ON retail_b2c.social_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social posts" ON retail_b2c.social_posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social posts" ON retail_b2c.social_posts
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for social_analytics
CREATE POLICY "Users can view their own social analytics" ON retail_b2c.social_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert social analytics" ON retail_b2c.social_analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update social analytics" ON retail_b2c.social_analytics
    FOR UPDATE USING (true);

-- Create policies for social_engagement_metrics
CREATE POLICY "Users can view their own engagement metrics" ON retail_b2c.social_engagement_metrics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert engagement metrics" ON retail_b2c.social_engagement_metrics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update engagement metrics" ON retail_b2c.social_engagement_metrics
    FOR UPDATE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION retail_b2c.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_social_connections_updated_at 
    BEFORE UPDATE ON retail_b2c.social_connections 
    FOR EACH ROW EXECUTE FUNCTION retail_b2c.update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at 
    BEFORE UPDATE ON retail_b2c.social_posts 
    FOR EACH ROW EXECUTE FUNCTION retail_b2c.update_updated_at_column();