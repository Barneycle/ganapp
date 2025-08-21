-- GanApp Database Schema (Simplified)
-- This version removes database-level settings that require superuser privileges

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'organizer', 'participant');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'ongoing', 'completed', 'cancelled');
CREATE TYPE question_type AS ENUM (
  'short_answer', 'paragraph', 'multiple_choice', 'checkbox', 
  'dropdown', 'linear_scale', 'star_rating', 'multiple_choice_grid', 
  'checkbox_grid', 'date', 'time'
);

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  user_type VARCHAR(50) NOT NULL, -- 'psu-student', 'psu-employee', 'outside'
  organization VARCHAR(255),
  position VARCHAR(255),
  role user_role DEFAULT 'participant',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  rationale TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  venue VARCHAR(255),
  banner_url TEXT,
  programme_url TEXT,
  materials_url TEXT,
  certificate_template_url TEXT,
  status event_status DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event sponsors
CREATE TABLE event_sponsors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event speakers
CREATE TABLE event_speakers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Surveys table
CREATE TABLE surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey questions
CREATE TABLE survey_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type question_type NOT NULL,
  is_required BOOLEAN DEFAULT false,
  options JSONB, -- For multiple choice, checkbox, etc.
  scale_min INTEGER DEFAULT 1,
  scale_max INTEGER DEFAULT 5,
  grid_rows JSONB, -- For grid questions
  grid_columns JSONB, -- For grid questions
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey responses
CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey response answers
CREATE TABLE survey_response_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
  question_id UUID REFERENCES survey_questions(id),
  answer_value TEXT,
  answer_options JSONB, -- For multiple choice/checkbox answers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event participants
CREATE TABLE event_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'registered', -- 'registered', 'checked_in', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES users(id),
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  download_url TEXT,
  is_valid BOOLEAN DEFAULT true
);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'info', -- 'info', 'success', 'warning', 'error'
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification preferences table
CREATE TABLE notification_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  event_updates BOOLEAN DEFAULT true,
  survey_reminders BOOLEAN DEFAULT true,
  check_in_confirmations BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_surveys_event_id ON surveys(event_id);
CREATE INDEX idx_survey_questions_survey_id ON survey_questions(survey_id);
CREATE INDEX idx_event_participants_event_id ON event_participants(event_id);
CREATE INDEX idx_event_participants_user_id ON event_participants(user_id);
CREATE INDEX idx_certificates_event_id ON certificates(event_id);
CREATE INDEX idx_certificates_participant_id ON certificates(participant_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Insert a test user for development
INSERT INTO users (email, username, first_name, last_name, user_type, role) 
VALUES ('admin@ganapp.com', 'admin', 'Admin', 'User', 'outside', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert a test event
INSERT INTO events (title, description, start_date, end_date, start_time, end_time, venue, status, created_by)
SELECT 
  'Annual Tech Conference 2024',
  'Join industry leaders and tech enthusiasts for a day of insightful talks, networking, and innovation showcases.',
  '2024-06-15',
  '2024-06-15',
  '09:00:00',
  '17:00:00',
  'Grand Convention Center, Cityville',
  'published',
  u.id
FROM users u WHERE u.email = 'admin@ganapp.com'
ON CONFLICT DO NOTHING;

-- Insert test sponsors for the event
INSERT INTO event_sponsors (event_id, name)
SELECT e.id, 'TechCorp'
FROM events e WHERE e.title = 'Annual Tech Conference 2024'
ON CONFLICT DO NOTHING;

INSERT INTO event_sponsors (event_id, name)
SELECT e.id, 'InnovateX'
FROM events e WHERE e.title = 'Annual Tech Conference 2024'
ON CONFLICT DO NOTHING;

INSERT INTO event_sponsors (event_id, name)
SELECT e.id, 'Future Solutions'
FROM events e WHERE e.title = 'Annual Tech Conference 2024'
ON CONFLICT DO NOTHING;

-- Insert test speakers for the event
INSERT INTO event_speakers (event_id, name)
SELECT e.id, 'Dr. Jane Smith'
FROM events e WHERE e.title = 'Annual Tech Conference 2024'
ON CONFLICT DO NOTHING;

INSERT INTO event_speakers (event_id, name)
SELECT e.id, 'Mr. John Doe'
FROM events e WHERE e.title = 'Annual Tech Conference 2024'
ON CONFLICT DO NOTHING;

INSERT INTO event_speakers (event_id, name)
SELECT e.id, 'Prof. Emily Johnson'
FROM events e WHERE e.title = 'Annual Tech Conference 2024'
ON CONFLICT DO NOTHING;

-- Insert test notification preferences for admin user
INSERT INTO notification_preferences (user_id, email_notifications, push_notifications, event_updates, survey_reminders, check_in_confirmations)
SELECT u.id, true, true, true, true, true
FROM users u WHERE u.email = 'admin@ganapp.com'
ON CONFLICT (user_id) DO NOTHING;
