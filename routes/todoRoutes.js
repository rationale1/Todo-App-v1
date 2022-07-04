const router = require("express").Router(),
  Todo = require("../models/todoModels"),
  { auth, protect } = require("../middleware/auth");

//   Create Todo
router.post("/", protect, async (req, res, next) => {
  try {
    const { name } = req.body;

    // const todo = new Todo({ name, author, isComplete, user: "null" });

    // await todo.save();

    // res.status(201).json(todo);

    const todo = new Todo({ user: req.userId, name, author: req.user.name });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

// Get All Todos
router.get("/", protect, async (req, res, next) => {
  try {
    // const todo = await Todo.find().sort({ createdAt: -1 });

    // res.status(200).json(todo);

    const todos = await Todo.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

// Delete Todo
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    // const todo = await Todo.findById(id);

    // if (!todo) return res.status(404).json({ message: "Todo Not Found" });

    // await Todo.findByIdAndDelete(id);

    // res.status(200).json({ message: "Todo Successfully Deleted" });

    const todo = await Todo.findById(id);

    if (todo.user.toString() !== req.userId.toString())
      return res.status(401).json({ message: "You can't perform this action" });

    if (todo) {
      await todo.remove();

      return res.status(200).json({ message: "Todo Removed Successfully" });
    } else return res.status(404).json({ message: "Todo Not found" });
  } catch (error) {
    next(error);
  }
});

// Update Todo
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    // const todo = await Todo.findById(id);

    // if (!todo) return res.status(404).json({ message: "Todo Not Found" });

    // const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });

    // res.status(200).json(updatedTodo);

    const { name } = req.body;

    const todo = await Todo.findById(id);

    if (todo.user.toString() !== req.userId.toString())
      return res.status(401).json({ message: "You can't perform this action" });

    if (todo) {
      if (name) todo.name = name;

      const updateTodo = await todo.save();

      res.status(201).json(updateTodo);
    } else return res.status(404).json({ message: "Note Not found" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (todo.user.toString() !== req.userId.toString())
      return res.status(401).json({ message: "You can't perform this action" });

    if (!todo) return res.status(404).json({ message: "Todo Not Found" });

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { isComplete: !todo.isComplete },
      {
        new: true,
        runValidator: true,
      },
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// Export Module
module.exports = router;
