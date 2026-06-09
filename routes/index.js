const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/NotFoundError");
const { validateUserBody, validateAuthentication } = require("../middlewares/validation");

// Public routes
router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);
router.use("/items", itemRouter);

// Protected routes
router.use(auth);
router.use("/users", userRouter);

// Handle cases when the client requests a non-existent resource
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
