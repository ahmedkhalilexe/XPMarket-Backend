const User = {
  signIn: async (req, res) => {
    res.status(200).json({ message: "test" });
  },
  signUp: async (req, res) => {},
  getAllUsers: (req, res) => {},
  deleteUser: (req, res) => {},
  userOrder: (req, res) => {},
};

module.exports = User;
