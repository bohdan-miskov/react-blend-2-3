import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

const Form = ({ onHandleSubmit }) => {
  const [query, setQuery] = useState('');

  const changeQuery = event => {
    setQuery(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (!query.trim()) {
      alert('Sorry input is empty');
      return;
    }

    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        value={query}
        required
        autoFocus
        onChange={changeQuery}
      />
    </form>
  );
};

export default Form;
