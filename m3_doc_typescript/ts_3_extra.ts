const isStudent = (user: User): user is Student => {
  return "occupation" in user;
};

const isTeacher = (user: User): user is Teacher => {
  return "subject" in user;
};

const logUser = (user: User): void => {
  let extraInfo = "";

  if (isStudent(user)) {
    extraInfo = user.occupation;
  } else if (isTeacher(user)) {
    extraInfo = user.subject;
  }

  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

users.forEach(logUser);
