import React, { useState } from 'react';

const EventRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: '',
        guestName: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        if (!formData.age || isNaN(formData.age) || formData.age <= 0) errors.age = 'Age must be a number greater than 0';
        if (formData.attendingWithGuest === 'Yes' && !formData.guestName) errors.guestName = 'Guest name is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(formData, null, 2));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
                {errors.age && <p>{errors.age}</p>}
            </div>
            <div>
                <label>Are you attending with a guest?</label>
                <select name="attendingWithGuest" value={formData.attendingWithGuest} onChange={handleChange}>
                    <option value="" disabled>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {errors.attendingWithGuest && <p>{errors.attendingWithGuest}</p>}
            </div>
            {formData.attendingWithGuest === 'Yes' && (
                <div>
                    <label>Guest Name:</label>
                    <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} />
                    {errors.guestName && <p>{errors.guestName}</p>}
                </div>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};

export default EventRegistrationForm;
