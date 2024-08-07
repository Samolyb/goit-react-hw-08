import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectNameFilter);

    const handleChange = e => {
        dispatch(setFilter(e.target.value));
    };

    return (
        <input
            type="text"
            value={filter}
            onChange={handleChange}
            placeholder="Search contacts"
        />
    );
};

export default Filter;