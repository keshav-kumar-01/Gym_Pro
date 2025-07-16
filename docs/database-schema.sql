-- GymFlow Pro Database Schema
-- Supabase SQL Tables

-- Enable RLS (Row Level Security)
-- You can modify these policies based on your security requirements

-- Members table
CREATE TABLE members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    membership_type VARCHAR(20) NOT NULL CHECK (membership_type IN ('Basic', 'Standard', 'Premium', 'VIP')),
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Suspended', 'Expired')),
    emergency_contact VARCHAR(100),
    last_visit TIMESTAMP,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trainers table
CREATE TABLE trainers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    certification TEXT,
    experience INTEGER DEFAULT 0,
    hourly_rate DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'On Leave')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
    duration INTEGER NOT NULL, -- in minutes
    capacity INTEGER NOT NULL,
    schedule VARCHAR(100), -- e.g., "Mon, Wed, Fri - 7:00 AM"
    room VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Cancelled', 'Full')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Equipment table
CREATE TABLE equipment (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(100),
    purchase_date DATE,
    purchase_cost DECIMAL(10,2),
    condition VARCHAR(20) NOT NULL CHECK (condition IN ('Excellent', 'Good', 'Fair', 'Poor', 'Out of Service')),
    maintenance_frequency VARCHAR(20), -- Weekly, Monthly, etc.
    location VARCHAR(100),
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Operational' CHECK (status IN ('Operational', 'Maintenance Due', 'Under Maintenance', 'Out of Order')),
    usage_hours INTEGER DEFAULT 0,
    max_life_hours INTEGER DEFAULT 10000,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class enrollments table (many-to-many relationship)
CREATE TABLE class_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Dropped', 'Completed')),
    UNIQUE(class_id, member_id)
);

-- Attendance table
CREATE TABLE attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    check_in_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    check_out_time TIMESTAMP WITH TIME ZONE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('Cash', 'Card', 'Transfer', 'Online')),
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Completed' CHECK (status IN ('Pending', 'Completed', 'Failed', 'Refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Equipment maintenance table
CREATE TABLE equipment_maintenance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
    maintenance_date DATE DEFAULT CURRENT_DATE,
    description TEXT,
    cost DECIMAL(10,2),
    performed_by VARCHAR(100),
    next_maintenance_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gym settings table
CREATE TABLE gym_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO gym_settings (setting_key, setting_value, description) VALUES
('gym_name', 'FitLife Gym', 'Name of the gym'),
('gym_slogan', 'Transform Your Life', 'Gym slogan or tagline'),
('gym_logo_url', NULL, 'URL to gym logo image'),
('theme_mode', 'light', 'Default theme mode (light/dark)'),
('primary_color', '#1976d2', 'Primary theme color'),
('secondary_color', '#dc004e', 'Secondary theme color'),
('business_hours', '6:00 AM - 10:00 PM', 'Operating hours'),
('contact_email', 'info@fitlifegym.com', 'Contact email'),
('contact_phone', '+1 (555) 123-4567', 'Contact phone number'),
('address', '123 Fitness Street, Health City, HC 12345', 'Gym address');

-- Create indexes for better performance
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_trainers_email ON trainers(email);
CREATE INDEX idx_attendance_member_id ON attendance(member_id);
CREATE INDEX idx_attendance_check_in_time ON attendance(check_in_time);
CREATE INDEX idx_payments_member_id ON payments(member_id);
CREATE INDEX idx_equipment_status ON equipment(status);
CREATE INDEX idx_equipment_next_maintenance ON equipment(next_maintenance_date);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_settings ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication setup)
-- Example: Allow authenticated users to read all records
CREATE POLICY "Allow authenticated users to read members" ON members
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read trainers" ON trainers
    FOR SELECT USING (auth.role() = 'authenticated');

-- Add more policies as needed for your specific use case

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trainers_updated_at BEFORE UPDATE ON trainers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON equipment
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
