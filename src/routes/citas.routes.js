const router = require("express").Router();
const ctrl = require("../controllers/citas.controller");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

router.get("/", auth, roles([1,2]), ctrl.getAll);
router.post("/", auth, roles([1]), ctrl.create);
router.delete("/:id", auth, roles([1]), ctrl.delete);
module.exports = router;