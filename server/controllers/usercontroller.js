const getUser = async (req, res) => {
   res.status(200).json('OK');
}

const registerUser = async (req, res) => {
   res.status(200).json('OK');
}

const loginUser = async (req, res) => {
   res.status(200).json('OK');
}

const logoutUser = (req, res) => {
   req.session.destroy();
   res.sendStatus(200);
}

module.exports = {
   getUser,
   registerUser,
   loginUser,
   logoutUser
}