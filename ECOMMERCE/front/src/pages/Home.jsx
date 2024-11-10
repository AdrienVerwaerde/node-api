import { Box, Container, Typography } from '@mui/material'
import React from 'react'

export default function
    Home() {
    return (
        <Container maxWidth="xl">
            <Box>
                <Typography variant="h3" sx={{textAlign: 'center'}}>Welcome to the admin dashboard !</Typography>
            </Box>
        </Container>
    )
}
