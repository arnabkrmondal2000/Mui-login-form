import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

interface FormState {
    name: string;
    mobile: string;
    email: string;
    password: string;
}

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        mobile: '',
        email: '',
        password: ''
    });

    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validInput(formData)) {
            try {
                const loginData = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
                console.log("Login Successful", loginData);
                setFormData({
                    name: '',
                    mobile: '',
                    email: '',
                    password: ''
                });
                setIsSubmit(true);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const isEmailValid = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const mobileValidator = (mobile: string): boolean => {
        const mobileNumber = /^[0-9]{10}$/;
        return mobileNumber.test(mobile);
    };

    const validInput = (data: FormState) => {
        console.log("input data =====>", data);

        if (data.name === '') {
            alert('User name cannot be empty');
            return false;
        }

        if (!mobileValidator(data.mobile)) {
            alert('Mobile number must be 10 digits');
            return false;
        }

        if (!isEmailValid(data.email)) {
            alert('Provide a valid email address');
            return false;
        }

        if (data.password.length <= 6) {
            alert('Password must be greater than 6 characters');
            return false;
        }

        return true;
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                {isSubmit ? (
                    <Typography variant="h5" color="primary">Congrats! Form is submitted</Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4" gutterBottom>Login Form</Typography>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Submit
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
};

export default Form;


//export default Form;