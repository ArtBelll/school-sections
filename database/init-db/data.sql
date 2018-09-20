create table sections (
  id integer primary key,
  name text,
  is_sport integer
);

create table section_student (
  section_id integer,
  student_id integer
);

create table students (
  id integer primary key,
  first_name text,
  last_name text,
  class_number integer,
  character text
);
