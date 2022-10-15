const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Employee Management System Backend Api Running"));

//-------------------Admin---------------------
app.use("/api/admin", require("./routes/Admin.routes"));

//-------------------Project---------------------
app.use("/api/project", require("./routes/Project.route"));

//-------------------Sprint---------------------
app.use("/api/sprint", require("./routes/Sprint.route"));

//-------------------Employee---------------------
app.use("/api/employee", require("./routes/Employee.route"));

//-------------------Product Manager---------------------
app.use("/api/projectmanager", require("./routes/ProjectManager.route"));


// //-------------------Employee---------------------
// app.use("/api/employees", require("././controllers/Employee.controller"));

//-------------------Documentation---------------------
app.use("/api/documentation", require("././controllers/Documentation.controller"));

// //-------------------Issue---------------------
// app.use("/api/issue", require("././controllers/Issue.controller"));

//-------------------Issues---------------------
app.use("/api/issue", require("./routes/Issue.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
