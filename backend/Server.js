const express = require('express');
const app = express();
const port = 5000;
const User = require('./Models/User');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Florentin:Flo30092001!@neversoft.3wyok.mongodb.net/?retryWrites=true&w=majority&appName=neversoft', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté !'))
    .catch(err => console.log('Erreur lors de la connexion à MongoDB', err));

const JWT_SECRET = 'votreCléSecrèteComplèxeIci!123';

// Route d'inscription
app.post('/signup', async (req, res) => {
    try {
        const { name, number, email, replica, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            number,
            email,
            replica,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur", error);
        res.status(400).send(error);
    }
});

// Route de connexion
app.post('/connexion', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Comparaison du mot de passe saisi avec le mot de passe haché
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        if (email === 'florentinfallon7@gmail.com') {
                user.role = 'Admin'
            } else if (!user.role){
                user.role = 'Swifteur'
            }
            await user.save()
            console.log("Role mis à jour:", user.role)

        // Génération du token avec la clé secrète
        const token = jwt.sign({ userId: user._id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, role: user.role, message: "Connexion réussie" });
    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        res.status(500).send(error);
    }
});

// Route pour récupérer les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        res.status(500).send(error);
    }
});

// Route pour supprimer un utilisateur
app.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).send({ message: "Utilisateur supprimé avec succès !" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        res.status(500).send({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
});

app.listen(port, () => {
    console.log(`Serveur en route sur http://localhost:${port}`);
});
