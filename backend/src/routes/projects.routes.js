const express = require("express");
const { projectUpdateController, projectGetController, projectGetControllerUsingId, projectDeleteController, projectCreateController, updatePositionController } = require("../controllers/projects.controller");
const router = express.Router();

router.post("/", projectCreateController);

router.get("/all", projectGetController);

router.get("/:id", projectGetControllerUsingId);

router.put("/:id", projectUpdateController);

router.patch("/:id/position", updatePositionController);

router.delete("/:id", projectDeleteController);

// router.get("/", (req, res) => {
//   res.send("Hello from Projects API");
// });

module.exports = router;