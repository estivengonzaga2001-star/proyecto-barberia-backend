const router = require("express").Router();
const ctrl = require("../controllers/cliente.controller");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

// GET
router.get("/", auth, roles([1,2]), ctrl.getAll);
router.get("/:id", auth, roles([1,2]), ctrl.getById);

// POST
router.post("/", auth, roles([1]), ctrl.create);


router.put("/:id", auth, roles([1]), ctrl.update);

// DELETE
router.delete("/:id", auth, roles([1]), ctrl.delete);

module.exports = router;