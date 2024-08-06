import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addContact({ name, number }));
        setName('');
        setNumber('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Number
                <input
                    type="text"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                />
            </label>
            <button type="submit">Add Contact</button>
        </form>
    );
};

export default ContactForm;