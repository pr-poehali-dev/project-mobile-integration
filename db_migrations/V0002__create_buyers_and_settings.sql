CREATE TABLE IF NOT EXISTS t_p18459288_project_mobile_integ.buyers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  telegram VARCHAR(255),
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p18459288_project_mobile_integ.settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO t_p18459288_project_mobile_integ.settings (key, value)
VALUES ('course_password', 'welcome')
ON CONFLICT (key) DO NOTHING;
