const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../backend/userModel.js');
const app = express();
const port = 3000;

// Ersetzen Sie dies mit Ihrer eigenen MongoDB URI
const mongoUri = 'mongodb://root:root@localhost:27017';

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error('MongoDB Verbindungsfehler:', err));

  const sectionSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['subheading', 'text']
    },
    text: {
      type: String,
      required: true
    }
  });
  
  const blogpostSchema = new mongoose.Schema({
    title: String,
    sections: [sectionSchema],
    author: String,
    date: { type: Date, default: Date.now }
  });
  
  const Blogpost = mongoose.model('Blogpost', blogpostSchema);

app.post('/blogposts', async (req, res) => {
  try {
    const blogpost = new Blogpost(req.body);
    const result = await blogpost.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/blogposts', async (req, res) => {
    try {
      const blogposts = await Blogpost.find();
      res.status(200).json(blogposts);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

app.get('/blogposts/:id', async (req, res) => {
  try {
    const blogpostId = req.params.id;
    const blogpost = await Blogpost.findById(blogpostId);

    if (!blogpost) {
      return res.status(404).send('Blogpost nicht gefunden.');
    }

    res.status(200).json(blogpost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


  app.delete('/blogposts/:id', async (req, res) => {
    try {
      const blogpostId = req.params.id;
      const deletedBlogpost = await Blogpost.findByIdAndDelete(blogpostId);
  
      if (!deletedBlogpost) {
        return res.status(404).send('Blogeintrag nicht gefunden.');
      }
  
      res.status(200).send('Blogeintrag erfolgreich gelöscht.');
    } catch (error) {
      res.status(500).send(error.message);
    }
});
  
app.put('/blogposts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, date } = req.body;
  
    try {
      const updatedBlogpost = await Blogpost.findByIdAndUpdate(id, { title, content, date }, { new: true });
  
      if (!updatedBlogpost) {
        return res.status(404).send('Blogeintrag nicht gefunden.');
      }
  
      res.status(200).json(updatedBlogpost);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

app.post('/login', async (req, res) => {
  // Benutzer anhand der E-Mail finden
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // Überprüfen des Passworts (im Klartext)
    if (req.body.password === user.password) {
      res.send('Erfolgreich eingeloggt');
    } else {
      res.status(400).send('Passwort ist falsch');
    }
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

app.post('/users', (req, res) => {
  createUser(req, res, 'User');
});  
  



async function createUser(req, res, role) {
    try {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        role: role
      });
      const savedUser = await user.save();
      console.log(savedUser); // Zum Debuggen hinzugefügt
      res.status(201).send({ userId: savedUser._id });
    } catch (error) {
      console.error(error); // Zum Debuggen hinzugefügt
      res.status(400).send(error);
    }
}






app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
