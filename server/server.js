import express from "express"
import mysql from "mysql"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from "body-parser";
import multer from "multer";
import path from 'path'; 

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"project4",
})

con.connect(function(err) {
    if(err) { 
        console.log("Error in Connection");
        console.log(err);
    } else {
        console.log("SQL server Connected");
    }
})
app.listen(8081, ()=> {
    console.log("Running");
})

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store property images in a specific folder
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

app.use('/uploads', express.static('uploads'));

// Initialize Multer
const upload = multer({ storage: storage });


app.post('/signup', (req, res) => {
    const { firstname,lastname,username,email,contactNo, password, confirmPassword, userType,} = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    // Check if the user already exists (You should implement your own logic here)
    const query = `SELECT * FROM ${userType}s WHERE email = ?`;
    con.query(query, [email], (err, results) => {
      if (err) {
        console.error('Database error: ', err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Insert the user/landlord data into the respective table
      const insertQuery = `INSERT INTO ${userType}s (firstname, lastname, username, email, contact_no, password) VALUES (?, ?, ?, ?, ?, ?)`;
      con.query( insertQuery, [firstname, lastname, username, email, contactNo, password],
        (err) => {
          if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ message: 'Server error' });
          }
          return res.status(200).json({ message: 'Signup successful' });
        }
      );
    });
  });
  
  app.post('/login', (req, res) => {
    const { email, password, userType } = req.body;
    
    // Choose the appropriate table based on the user type
    const tableName = userType === 'user' ? 'users' : 'landlords';
  
    // Query the database for the user
    const query = `SELECT * FROM ${tableName} WHERE email = ? AND password = ?`;
  
    con.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (results.length === 1) {
        // Successful login
        if (userType === 'landlord') {
          const landlordId = results[0].landlord_id; // Assuming there's a "landlord_id" field in the database
          console.log('Logged in as a landlord. Landlord ID:', landlordId);
          return res.status(200).json({ message: 'Login successful', landlordId });
        } else if (userType === 'user') {
          const userId = results[0].user_id; // Assuming there's a "user_id" field in the database
          console.log('Logged in as a user. User ID:', userId);
          return res.status(200).json({ message: 'Login successful', userId });
        } else {
          return res.status(200).json({ message: 'Login successful' });
        }
      } else {
        // Invalid credentials
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });


/* // Create an API endpoint to handle property image uploads
app.post('/properties/add', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const imagePath = req.file.path;
  const { landlord_id, property_type, location, rent, bedrooms, max_members, description } = req.body;

  // Save the imagePath in the 'properties' table
  const sql = 'INSERT INTO properties (landlord_id, property_type, location, rent, bedrooms, max_members, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [landlord_id, property_type, location, rent, bedrooms, max_members, description, imagePath];

  con.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload property.' });
    }
    res.json({ success: 'Property uploaded successfully.' });
  });
}); */

// Create an API endpoint to handle property image uploads
app.post('/properties/add', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  // Log data sent to the server
  console.log('Received data from the frontend:');
  console.log('landlord_id:', req.body.landlord_id);
  console.log('property_type:', req.body.property_type);
  console.log('property_name:', req.body.property_name);
  console.log('location:', req.body.location);
  console.log('rent:', req.body.rent);
  console.log('bedrooms:', req.body.bedrooms);
  console.log('max_members:', req.body.max_members);
  console.log('description:', req.body.description);
  console.log('imagePath:', req.file.path);

  const imagePath = req.file.path;
  const { landlord_id, property_type, property_name, location, rent, bedrooms, max_members, description } = req.body;

  // Save the imagePath in the 'properties' table
  const sql = 'INSERT INTO properties (landlord_id, property_type, property_name, location, rent, bedrooms, max_members, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [landlord_id, property_type, property_name, location, rent, bedrooms, max_members, description, imagePath];

  con.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload property.' });
    }
    res.json({ success: 'Property uploaded successfully.' });
  });
});


app.get('/properties', (req, res) => {
  const landlordId = req.query.landlord_id; // Get landlord_id from query parameters
  // Query the database to retrieve property information based on landlord_id
  const sql = 'SELECT * FROM properties WHERE landlord_id = ?';
  con.query(sql, [landlordId], (err, result) => {
    if (err) {
      console.error('Error fetching properties:', err);
      return res.status(500).json({ error: 'Failed to fetch properties.' });
    }
    res.json(result); // Return the list of properties as JSON
  });
});

// Delete a property by property_id
app.delete('/propertiesdelete/:property_id', (req, res) => {
  const propertyId = req.params.property_id;

  con.query('DELETE FROM properties WHERE property_id = ?', [propertyId], (err, result) => {
    if (err) {
      console.error('Error deleting property:', err);
      res.status(500).json({ error: 'Failed to delete property.' });
    } else {
      res.status(200).json({ message: 'Property deleted successfully.' });
    }
  });
});


app.get('/properties/:property_id', (req, res) => {
  const propertyId = req.params.property_id;
  // Query the database to retrieve the property information based on property_id
  const sql = 'SELECT * FROM properties WHERE property_id = ?';
  con.query(sql, [propertyId], (err, result) => {
    if (err) {
      console.error('Error fetching property:', err);
      return res.status(500).json({ error: 'Failed to fetch property.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Property not found.' });
    }
    // Property data found, return it as JSON
    const property = result[0];
    res.json(property);
  });
});


// Route to update property data, allowing partial updates
app.put('/properties/edit/:property_id', upload.single('image'), (req, res) => {
  const propertyId = req.params.property_id;
  // Extract property data from the request
  const {
    property_type,
    property_name,
    location,
    rent,
    bedrooms,
    max_members,
    description,
  } = req.body;

  // Check if an image was uploaded
  const image = req.file ? req.file.path : undefined;

  // Construct SQL query to update property data
  let sql = 'UPDATE properties SET ';
  let updatedData = [];
  if (property_type) {
    sql += 'property_type = ?, ';
    updatedData.push(property_type);
  }
  if (property_name) {
    sql += 'property_name = ?, ';
    updatedData.push(property_name);
  }
  if (location) {
    sql += 'location = ?, ';
    updatedData.push(location);
  }
  if (rent) {
    sql += 'rent = ?, ';
    updatedData.push(rent);
  }
  if (bedrooms) {
    sql += 'bedrooms = ?, ';
    updatedData.push(bedrooms);
  }
  if (max_members) {
    sql += 'max_members = ?, ';
    updatedData.push(max_members);
  }
  if (description) {
    sql += 'description = ?, ';
    updatedData.push(description);
  }
  if (image) {
    sql += 'image_path = ?, ';
    updatedData.push(image);
  }
  
  // Remove the trailing comma and add the WHERE clause
  sql = sql.slice(0, -2); // Remove trailing comma and space
  sql += ' WHERE property_id = ?';
  updatedData.push(propertyId);

  con.query(sql, updatedData, (err, result) => {
    if (err) {
      console.error('Error updating property:', err);
      return res.status(500).json({ error: 'Failed to update property.' });
    }
    res.status(200).json({ message: 'Property updated successfully.' });
  });
});
