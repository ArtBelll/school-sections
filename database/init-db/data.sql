create table sections (
  id      integer primary key,
  name    text,
  isSport integer
);

create table section_student (
  sectionId integer,
  studentId integer
);

create table students (
  id             integer primary key,
  firstName      text,
  lastName       text,
  classNumber    integer,
  classCharacter text
);
