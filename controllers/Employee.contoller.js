const Employee = require("../models/Employee.model");

//get Employee details by employe Id
const getEmployeeDetailsById = async (req, res) => {

    try {
      //get user details
      //-password : dont return the pasword
      const user = await Employee.findById(req.params.id)
        .select("-password")
        .populate({
          path: "projectsList",
          populate: {
            path: "projectManager",
            select: "name",
          },
        })
        .populate({ path: "attendanceList", model: "Attendence" })
        .populate({
          path: "projectsList",
          populate: {
            path: "sprintList",
            match: { isClosed: false }, //filter not closed sprints
            populate: [
              {
                path: "toDoList",
                model: "Issue",
                match: { assignee: req.params.id },
              },
              {
                path: "inProgressList",
                model: "Issue",
                match: { assignee: req.params.id },
              },
              {
                path: "doneList",
                model: "Issue",
                match: { assignee: req.params.id },
              },
            ],
          },
        });
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  };

  
  module.exports = {
    getEmployeeDetailsById,
  };