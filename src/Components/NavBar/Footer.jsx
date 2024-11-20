import { Box, Typography, Divider } from '@mui/material';
import React from 'react';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'white',
            }}
        >
            <Typography variant="body2">
                Neversoft
            </Typography>
            <Divider sx={{ width: '6%', mb: 1 }} />
            <Typography variant="caption" color="text.secondary">
                Simplifiez votre expérience d’airsoft
            </Typography>
        </Box>
    );
}

export default Footer;
