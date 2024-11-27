import { Box, Card, CardContent, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsers } from './Reducer/UserReducer';
import axios from 'axios';

function AddPartenaires() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [category, setCategory] = useState('');
    const [picture, setPicture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPartners = { name, description, link, category,imgSrc: picture };

        try {
            const response = await axios.post('http://localhost:5000/api/partenaires', newPartners);

            if (response.status === 201) {
                const partnersResponse = await axios.get('http://localhost:5000/api/partenaires');
                dispatch(setUsers(partnersResponse.data));

                setName('');
                setDescription('');
                setLink('');
                setCategory('');
                setPicture('');

                alert(`Nouveau partenaire "${name}" ajouté avec succès !`);
                navigate('/boutique');
            } else {
                throw new Error('Erreur lors de l\'ajout du partenaire');
            }
        } catch (error) {
            if (error.response) {
                console.error("Erreur du serveur :", error.response.data); // Affiche le message d'erreur côté serveur
                setErrorMessage(error.response.data.message || "Erreur côté serveur.");
            } else if (error.request) {
                console.error("Erreur réseau :", error.request);
                setErrorMessage("Problème de connexion au serveur.");
            } else {
                console.error("Erreur :", error.message);
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundSize: 'cover', backgroundImage: 'url("https://images.unsplash.com/photo-1695812230481-219d762e7eb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            <Box>
                <Card sx={{ width: 400, padding: 2, boxShadow: 3, borderRadius: 5 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{mb:1, fontWeight: 700, letterSpacing: 1}} align="center" >
                            Partenariat
                        </Typography>
                        <Typography variant="body2" align="center" sx={{mb: 4, letterSpacing: 0.5}} color='text.secondary' gutterBottom>
                        Ce partenariat permettra de <br />renforcer nos synergies.
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    type="text"
                                    label="Nom"
                                    variant="standard"
                                    color="success"
                                    size="small"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    type="text"
                                    label="Description"
                                    variant="standard"
                                    color="success"
                                    size="small"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    type="url"
                                    label="Votre url"
                                    variant="standard"
                                    color="success"
                                    size="small"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2, justifyContent: 'center' }}>
                                <FormControl>
                                    <InputLabel color="success">Catégories</InputLabel>
                                    <Select
                                        sx={{ width: 195 }}
                                        color="success"
                                        variant="standard"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <MenuItem value="Répliques">Répliques</MenuItem>
                                        <MenuItem value="Tenues">Tenues</MenuItem>
                                        <MenuItem value="Consommables">Consommables</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    type="url"
                                    label="URL du logo de l'entreprise"
                                    variant="standard"
                                    color="success"
                                    size="small"
                                    value={picture}
                                    onChange={(e) => setPicture(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2, gap: 1.5 }}>
                                <Button variant="contained" sx={{ bgcolor: '#728996' }} type="submit">
                                    Soumettre
                                </Button>
                                <Button variant="contained" sx={{ bgcolor: '#728996' }} href="/boutique">
                                    Retour
                                </Button>
                            </Box>
                            {errorMessage && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default AddPartenaires;