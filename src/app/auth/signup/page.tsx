'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Link,
    Box,
} from '@mui/material';

import { apiClient } from '@/lib/apiClient';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiClient('/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { fullName: name, email, password },
            });

            const data = await response;

            if (!response.status) throw new Error(data.message || 'Registration failed');

            router.push('/auth/login');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete='off'>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        autoComplete='off'
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        autoComplete='off'
                        inputProps={{ minLength: 6 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                Creating Account...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </Box>

                <Typography variant="body2" align="center">
                    Already have an account?{' '}
                    <Link href="/auth/login" underline="hover" color="primary">
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}
