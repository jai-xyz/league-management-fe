import React, { useState } from 'react';
import ApiService from '../../../services/api-service';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const AddDivision = () => {
    const [form, setForm] = useState({
        name: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.post('/divisions', {
                name: form.name,
            });
            if (response.status === 200) {
            
                navigate('/admin/division');
            }
        } catch (error) {
            console.error('Error adding division:', error);
        }
        setForm('');
    }

    return (
        <div>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4'>
                    <TextField
                        id="standard-basic"
                        label="Division Name"
                        variant="standard"
                        value={form.name}
                        onChange={(e) =>setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <Button type="submit" variant="contained">
                        Add Division
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddDivision;
