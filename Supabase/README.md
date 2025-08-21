# GanApp Database Setup

This directory contains the database schema and setup instructions for the GanApp platform.

## Prerequisites

1. **Supabase Account**: You need a Supabase account and project
2. **Project URL & API Keys**: Your Supabase project credentials

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Set Environment Variables

Create `.env.local` files in both `Apps/Web/` and `Apps/Mobile/` directories:

**Web App** (`Apps/Web/.env.local`):
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Mobile App** (`Apps/Mobile/.env.local`):
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `schema.sql`
4. Click **Run** to execute the schema

### 4. Verify Setup

After running the schema, you should see:
- ✅ All tables created successfully
- ✅ Test data inserted (admin user + sample event)
- ✅ Row Level Security enabled
- ✅ Proper indexes created

## Database Structure

### Core Tables

- **users**: User accounts and profiles
- **events**: Event information and details
- **event_sponsors**: Event sponsorship data
- **event_speakers**: Event speaker information
- **surveys**: Survey definitions
- **survey_questions**: Individual survey questions
- **survey_responses**: Survey submissions
- **event_participants**: Event attendance tracking
- **certificates**: Generated certificates

### Key Features

- **Row Level Security (RLS)**: Data access control
- **Proper Indexing**: Performance optimization
- **Foreign Key Relationships**: Data integrity
- **JSONB Support**: Flexible data storage for surveys

## Testing the Connection

1. Start your web app: `npm run dev`
2. Navigate to the home page
3. Check the "Database Status" section
4. You should see either:
   - ✅ Connected! Loaded X event(s) from database
   - ⚠️ Connected but no events found (if schema not run yet)

## Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your environment variables
2. **"Table doesn't exist"**: Run the schema.sql file
3. **"Permission denied"**: Check RLS policies
4. **"Connection failed"**: Verify your Supabase URL

### Debug Steps

1. Check browser console for errors
2. Verify environment variables are loaded
3. Test connection in Supabase dashboard
4. Check if tables exist in your database

## Next Steps

After successful database setup:

1. **Test Event Creation**: Use the CreateEvent component
2. **Test User Registration**: Use the Registration component
3. **Test Survey Creation**: Use the CreateSurvey component
4. **Implement Authentication**: Add Supabase Auth
5. **Add File Uploads**: Implement Supabase Storage

## Support

If you encounter issues:
1. Check Supabase documentation
2. Review the console logs
3. Verify your project settings
4. Check RLS policies in Supabase dashboard
