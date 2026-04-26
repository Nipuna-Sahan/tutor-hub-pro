// Generic CRUD factory to keep route files small
const asyncHandler = require("express-async-handler");

function crud(Model, { listFilter } = {}) {
  return {
    list: asyncHandler(async (req, res) => {
      const filter = listFilter ? listFilter(req) : {};
      const docs = await Model.find(filter).sort({ createdAt: -1 });
      res.json(docs);
    }),
    getOne: asyncHandler(async (req, res) => {
      const doc = await Model.findById(req.params.id);
      if (!doc) {
        res.status(404);
        throw new Error("Not found");
      }
      res.json(doc);
    }),
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    }),
    update: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) {
        res.status(404);
        throw new Error("Not found");
      }
      res.json(doc);
    }),
    remove: asyncHandler(async (req, res) => {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    }),
  };
}

module.exports = { crud };
