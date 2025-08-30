'use client';
import { useState, useEffect, use } from 'react';
import { useRouter, notFound } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TextField,
    Button,
    Typography
} from '@mui/material';
import { apiClient } from '@/lib/apiClient';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id }: any = use(params);
    const router = useRouter();
    const [post, setPost] = useState<{ title: string; content: string } | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await apiClient(`/blog/${id}`);
                if (!res.ok) return notFound();
                console.log('RESPONSE',res);
                
                const data = await res.data?.json();
                setPost(data);
            } catch (err) {
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        try {
            const res = await apiClient(`/blog/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: post.title, content: post.content }),
            });

            if (!res.ok) throw new Error('Failed to update post');

            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) return <Typography align="center" sx={{ py: 5 }}>Loading...</Typography>;
    if (!post) return notFound();

    return (
        // <ProtectedRoute>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Edit Post
            </Typography>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', width: '25%', bgcolor: '#f9f9f9' }}>
                                    Title
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        value={post.title}
                                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                                        required
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#f9f9f9', verticalAlign: 'top' }}>
                                    Content
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={8}
                                        value={post.content}
                                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                                        required
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => router.push('/dashboard')}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
        // </ProtectedRoute>
    );
}
