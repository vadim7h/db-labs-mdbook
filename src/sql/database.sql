CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    nickname TEXT UNIQUE NOT NULL,  
    email TEXT UNIQUE NOT NULL,   
    password TEXT NOT NULL,   
    photo TEXT    
);

CREATE TABLE "User_Project" (
    id SERIAL PRIMARY key,
    user_id UUID NOT NULL,
    project_id INTEGER NOT NULL,
    role_id INTEGER,
    team_id INTEGER
);

CREATE TABLE "Project" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL   
);

CREATE TABLE "Team" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    project_id INTEGER NOT NULL
);

CREATE TABLE "Task" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    startDate TIMESTAMPTZ DEFAULT NOW(),
    deadlineDate TIMESTAMPTZ,
    team_id INTEGER NOT NULL
);

CREATE TABLE "Artifact" (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    comment TEXT,
    datetime TIMESTAMPTZ DEFAULT NOW(),
    task_id INTEGER NOT NULL
);

CREATE TABLE "Role" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    project_id INTEGER NOT NULL
);

CREATE TABLE "Role_Action" (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL,
    action_id INTEGER NOT NULL
);

CREATE TABLE "Action" (
    id SERIAL PRIMARY KEY,
    action TEXT UNIQUE NOT NULL
);

CREATE TABLE "Event" (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    role_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    datetime TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_user
    FOREIGN KEY(user_id)
    REFERENCES "User"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_project
    FOREIGN KEY(project_id)
    REFERENCES "Project"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_role
    FOREIGN KEY(role_id)
    REFERENCES "Role"(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_team
    FOREIGN KEY(team_id)
    REFERENCES "Team"(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE "Team" ADD
    CONSTRAINT fk_team_project
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Task" ADD
    CONSTRAINT fk_task_team
    FOREIGN KEY (team_id)
    REFERENCES "Team"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Artifact" ADD
    CONSTRAINT fk_artifact_task
    FOREIGN KEY (task_id)
    REFERENCES "Task"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Role" ADD
    CONSTRAINT fk_role_project
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Role_Action" ADD
    CONSTRAINT fk_role_action_role
    FOREIGN KEY(role_id)
    REFERENCES "Role"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Role_Action" ADD
    CONSTRAINT fk_role_action_action
    FOREIGN KEY(action_id)
    REFERENCES "Action"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Event" ADD
    CONSTRAINT fk_event_user
    FOREIGN KEY(user_id)
    REFERENCES "User"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Event" ADD
    CONSTRAINT fk_event_role
    FOREIGN KEY(role_id)
    REFERENCES "Role"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
