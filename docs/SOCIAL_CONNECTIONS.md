# Social Connections Feature

## Overview

The Social Connections feature allows users to integrate their social media accounts with the Seftec.Store platform. This enables seamless sharing of products, automated posting, and social analytics across multiple platforms.

## Architecture

The feature is built on the `retail_b2c` schema in Supabase, maintaining complete separation from the B2B platform while leveraging the shared infrastructure.

### Key Components

1. **Social Connection Service** - Manages OAuth connections and API interactions
2. **Database Tables** - Stores connection data, scheduled posts, and analytics
3. **UI Components** - Provides user interface for managing connections
4. **Backend Functions** - Handles API calls and data synchronization

## Supported Platforms

- Facebook
- Twitter/X
- Instagram
- LinkedIn
- YouTube
- Google
- GitHub

## Database Schema

### social_connections
Stores user social media account connections

```sql
CREATE TABLE retail_b2c.social_connections (
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### social_posts
Stores scheduled and published social media posts

```sql
CREATE TABLE retail_b2c.social_posts (
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### social_analytics
Stores social media analytics data

```sql
CREATE TABLE retail_b2c.social_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    platform VARCHAR(50) NOT NULL,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    posts INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);
```

## Integration with Parent Platform

The B2C platform integrates with the SeftecHub ecosystem through:

1. **Shared Authentication** - Uses the same Supabase auth service
2. **Schema Isolation** - Maintains data separation through `retail_b2c` schema
3. **Cross-Platform APIs** - Can access B2B data when authorized
4. **Unified Infrastructure** - Shares the same database, storage, and edge functions

## Security Considerations

- OAuth tokens are encrypted at rest
- Row Level Security (RLS) ensures users only access their own data
- Access tokens are refreshed automatically when expired
- Service role keys are used only for system operations

## Future Enhancements

- Automated cross-posting across platforms
- AI-powered content suggestions
- Advanced analytics dashboard
- Social listening and monitoring
- Influencer collaboration tools