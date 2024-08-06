import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contacts/operations';
import { selectContacts, selectIsLoading, selectError } from '../../redux/contacts/selectors';

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelete = contactId => {
        dispatch(deleteContact(contactId));
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        {contact.name} - {contact.number}
                        <button onClick={() => handleDelete(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;