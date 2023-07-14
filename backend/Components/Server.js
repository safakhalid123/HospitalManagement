// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/hospital_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB:', error));

  //ortho employee

const Employee = mongoose.model('Employee', new mongoose.Schema({
 empId:String,
  name: String,
  position:String,
  department:String

}));

// Define routes
app.post('/api/employees', async (req, res) => {
  try {
    const { empId, name, position, department } = req.body;
    const employee = new Employee({ empId, name, position, department});
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // const updatedEmployeeDta = req.body;
   const { empId,name,position,department }=req.body;

    const employee = await Employee.findByIdAndUpdate(id, { empId,name,position,department }, { new: true });
    // const employee = await Employee.findByIdAndUpdate(id, { updatedEmployeeDta }, { new: true });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//
// app.put('/api/employees/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { empId,name,position,department } = req.body;
//     const  employee  = await Employee .findByIdAndUpdate(id, { empId,name,position,department }, { new: true });
//     res.json( employee );
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

//

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(200).json({ message: 'User registered successfully' });
});


//


// User model
// const User = mongoose.model('User', new mongoose.Schema({
//   username: String,
//   password: String
// }));

// Register endpoint
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   // Check if the username is already taken
//   const existingUser = await User.findOne({ username });
//   if (existingUser) {
//     return res.status(400).json({ error: 'Username already taken' });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create a new user
//   const user = new User({ username, password: hashedPassword });
//   await user.save();

//   res.status(200).json({ message: 'User registered successfully' });
// });

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create a JWT token
  const token = jwt.sign({ userId: user._id }, 'secret-key');

  res.status(200).json({ token });
});
//logout
app.post('/logout', (req, res) => {
  // Perform any necessary logout actions such as invalidating the session or removing tokens

  // Return a response indicating successful logout
  res.status(200).json({ message: 'Logged out successfully' });
});
// Profile endpoint
app.get('/profile', async (req, res) => {
  // Verify the JWT token
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, 'secret-key');
    const userId = payload.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user's details
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));






// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/hospital_app",{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>{
//     console.log("mongodb connected");

// }).catch((e)=>{
//     console.log(e);
// })
// // Define user schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// // Create user model
// const User = mongoose.model('User', userSchema);

// // Secret key for JWT
// const secretKey = 'your-secret-key';

// // Signup endpoint
// app.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Save the user in the database
//     await newUser.save();

//     res.status(201).json({ message: 'Signup successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Signup failed' });
//   }
// });

// // Signin endpoint
// app.post('/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare the provided password with the hashed password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
//       // Generate a JWT token
//       const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Signin failed' });
//   }
// });

// const employeeSchema = new mongoose.Schema({
//   name:String,
//   age:Number,
//   description:String
   
// });

// const Todo = mongoose.model('Todo', employeeSchema);

// // Routes
// app.get('/api/employees', async (req, res) => {
// try {
//   const todos = await Todo.find();
//   res.json(todos);
// } catch (error) {
//   res.status(500).json({ error: 'Internal server error' });
// }
// });

// app.post('/api/employees', async (req, res) => {
// try {
//   const { name,age,description  } = req.body;
//   const todo = new Todo({ name,age,description });
//   await todo.save();
//   res.json(todo);
// } catch (error) {
//   res.status(500).json({ error: 'Internal server error' });
// }
// });

// app.put('/api/employees/:id', async (req, res) => {
// try {
//   const { id } = req.params;
//   const { name,age, description} = req.body;
//   const todo = await Todo.findByIdAndUpdate(id, { name,age,description }, { new: true });
//   res.json(todo);
// } catch (error) {
//   res.status(500).json({ error: 'Internal server error' });
// }
// });

// app.delete('/api/employees/:id', async (req, res) => {
// try {
//   const { id } = req.params;
//   await Todo.findByIdAndRemove(id);
//   res.json({ message: 'Todo deleted' });
// } catch (error) {
//   res.status(500).json({ error: 'Internal server error' });
// }
// });

// // Start the server
// // const port = 6000;
// // app.listen(port, () => console.log(`Server running on port ${port}`));



// // Start the server
// app.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });

