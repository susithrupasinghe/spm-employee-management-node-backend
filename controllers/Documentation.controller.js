const Documentation = require("../models/Documentation.model");

//Add feedback To Sprint
const addDocumentation = async (req, res) => {
    const { documentationTitle,description } = req.body;
  
    try {
      const newDocument = new Documentation({ documentationTitle,description });
      //save feedback to the sprintt
      await newDocument
        .save()
        .then(async (createdDocumentation) => {
          const Documentation = await Documentation.findById(req.params.id);
          Documentation.documentationList.unshift(createdDocumentation);
          await Documentation.save();
          res.json(Documentation);
        })
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  module.exports = {
    addDocumentation,
  };