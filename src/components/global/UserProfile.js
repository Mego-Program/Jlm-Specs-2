const UserProfile = () => {
  const user = localStorage.getItem("userDetails");
  let userParse;

  if (process.env.NODE_ENV === 'production') {
    // Use real data for production
    userParse = JSON.parse(user);
  } else {
    // Use dummy data for development
    userParse = {
      _id: "6582eee98cbc3c4e7dc544a9",
      firstName: "abraham",
      lastName: "faust",
      userName: "abraham faust",
      password: "hbgfcuyguihughvghvjhb",
      email: "faustabraham@gmail.com",
      img: "https://lh3.googleusercontent.com/a/ACg8ocL7XooXneAIMc03vsjuxiAoAh0Kaud_p56IYXQPGzGrvpvS=s96-c",
      __v: 0,
    };
  }

  return userParse; // Return an empty object if userParse is null or undefined
};

export default UserProfile();
