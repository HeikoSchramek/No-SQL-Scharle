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

  const commentSchema = new mongoose.Schema({
    text: String,
    authorUsername: String,
    date: { type: Date, default: Date.now }
  });
  
  const blogpostSchema = new mongoose.Schema({
    title: String,
    sections: [sectionSchema],
    author: String,
    authorId: mongoose.Schema.Types.ObjectId, // Stellen Sie sicher, dass dies übereinstimmt
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
  });
  
  
  
  const Blogpost = mongoose.model('Blogpost', blogpostSchema);

  app.post('/blogposts', async (req, res) => {
    try {
      // Korrektur: von "authorID" zu "authorId"
      const blogpost = new Blogpost({
        title: req.body.title,
        sections: req.body.sections,
        author: req.body.author, // Autor-Name
        authorId: req.body.authorId, // Autor-ID, korrigiert
        date: req.body.date
      });
      const result = await blogpost.save();
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.get('/blogposts/search', async (req, res) => {
    try {
      const { term } = req.query;
      const regex = new RegExp(term, 'i'); // 'i' für case-insensitive Suche
  
      const blogposts = await Blogpost.find({
        $or: [
          { title: { $regex: regex } },
          { author: { $regex: regex } }
        ]
      });
  
      if (!blogposts.length) {
        return res.status(404).json({ message: 'Keine Blogposts gefunden.' });
      }
  
      res.json(blogposts);
    } catch (error) {
      console.error('Suchfehler:', error);
      res.status(500).json({ message: 'Fehler bei der Suche nach Blogposts.' });
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
  


app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && req.body.password === user.password) {
    res.json({
      message: 'Erfolgreich eingeloggt',
      role: user.role,
      userId: user._id,
      name: user.name // Name des Benutzers zurückgeben
    });
  } else {
    res.status(400).json({ message: 'Anmeldung fehlgeschlagen' });
  }
});

// Benutzer aktualisieren
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Die Option { new: true } sorgt dafür, dass das aktualisierte Dokument zurückgegeben wird
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).send('Benutzer nicht gefunden.');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post('/users', (req, res) => {
  createUser(req, res, 'User');
});  
  
// Neuer Endpunkt, um Benutzerdaten abzurufen
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('Benutzer nicht gefunden.');
    }

    // Ggf. sensible Informationen entfernen
    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Passwort nicht einschließen
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route, um alle Blogposts eines spezifischen Benutzers zu finden
app.get('/blogposts/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userBlogposts = await Blogpost.find({ authorId: userId });
    if (!userBlogposts) {
      return res.status(404).send('Keine Blogbeiträge gefunden.');
    }
    res.status(200).json(userBlogposts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.put('/blogposts/:id', async (req, res) => {
  try {
    const blogpostId = req.params.id;
    const updateData = req.body;

    const updatedBlogpost = await Blogpost.findByIdAndUpdate(blogpostId, updateData, { new: true });

    if (!updatedBlogpost) {
      return res.status(404).send('Blogbeitrag nicht gefunden.');
    }

    res.status(200).json(updatedBlogpost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Like a blogpost
app.post('/blogposts/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const blogpost = await Blogpost.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    if (!blogpost) return res.status(404).send('Blogpost nicht gefunden.');
    res.status(200).json(blogpost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a comment to a blogpost
app.post('/blogposts/:id/comment', async (req, res) => {
  const { id } = req.params;
  const { text, authorUsername } = req.body; // Überprüfe, ob diese Werte wie erwartet empfangen werden
  try {
    const blogpost = await Blogpost.findById(id);
    if (!blogpost) return res.status(404).send('Blogpost nicht gefunden.');
    blogpost.comments.unshift({ text, authorUsername }); // Füge neuen Kommentar hinzu
    await blogpost.save();
    res.status(200).json(blogpost);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
