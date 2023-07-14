const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hospital_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(' connected to database');
    // Additional code after successful connection
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

connectToDatabase();
//ortho employ
const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
});
// const Employee = mongoose.model('Employee', employeeSchema);
module.exports = mongoose.model('Employee', employeeSchema);
//
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('User', userSchema);
   




// server.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors=require('cors')

// const app = express();

// // Parse JSON bodies
// app.use(bodyParser.json());

// app.use(cors())

// mongoose.connect("mongodb://127.0.0.1:27017/hospital_app",{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>{
//     console.log("mongodb connected");

// }).catch((e)=>{
//     console.log(e);
// })

// // Create a todo schema and model
// const employeeSchema = new mongoose.Schema({
//     name:String,
//     age:Number,
//     description:String
     
// });

// const Todo = mongoose.model('Todo', employeeSchema);

// // Routes
// app.get('/api/employees', async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/api/employees', async (req, res) => {
//   try {
//     const { name,age,description  } = req.body;
//     const todo = new Todo({ name,age,description });
//     await todo.save();
//     res.json(todo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.put('/api/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name,age, description} = req.body;
//     const todo = await Todo.findByIdAndUpdate(id, { name,age,description }, { new: true });
//     res.json(todo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.delete('/api/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Todo.findByIdAndRemove(id);
//     res.json({ message: 'Todo deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start the server
// const port = 6000;
// app.listen(port, () => console.log(`Server running on port ${port}`));


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/hospital_app",{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>{
//     console.log("mongodb connected");

// })
// // User schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password:String,
// });

// // User model
// const User = mongoose.model('User', userSchema);

// // API route for creating a new user
// app.post('/users', async (req, res) => {
//   try {
//     const { name, email, password} = req.body;

//     // Create a new user instance
//     const newUser = new User({ name, email, password });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create user' });
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


