const UserProfile = async () => {
  if (process.env.NODE_ENV !== "production") {
    const user = {
      _id: "6582eee98cbc3c4e7dc544a9",
      firstName: "abraham",
      lastName: "faust",
      userName: "abraham faust",
      password: "hbgfcuyguihughvghvjhb",
      email: "faustabraham@gmail.com",
      img: "https://lh3.googleusercontent.com/a/ACg8ocL7XooXneAIMc03vsjuxiAoAh0Kaud_p56IYXQPGzGrvpvS=s96-c",
      __v: 0,
    };
    const userString = JSON.stringify(user);
    localStorage.setItem("userDetails", userString);
  }

  const user = await localStorage.getItem("userDetails");
  const userParse = await JSON.parse(user);

  return userParse;
};

export default UserProfile();
