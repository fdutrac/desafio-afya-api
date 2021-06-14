module.exports = {
  jwt: {
    user: {
      secret: process.env.JWT_SECRET,
      expire: 9986400,
    },
  },
};
