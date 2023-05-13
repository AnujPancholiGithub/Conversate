export const getSender = (loggedUser, users) => {
  console.log("logged user ID", loggedUser);
  return users[0].id === loggedUser.id ? users[1].name : users[0].name;
};
