import { useEffect, useState } from 'react';
import styles from '../styles/home.module.scss';
import { FiShare, FiClipboard } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import axios from 'axios';

export default function Home() {
  const todayDate = format(new Date(), 'k:mm EEEE d MMMM  ', {
    locale: ptBr,
  });

  const [quote, setQuote] = useState();

  useEffect(() => {
    handleNovaFrase();
  }, []);

  const handleNovaFrase = () => {
    axios
      .get('https://favqs.com/api/qotd')
      .then((response) => {
        const { author, body } = response.data?.quote;
        setQuote({ author, body });
      })
      .catch((err) => {
        alert('Erro no servidor!');
      });
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Quotes App</h1>
        <h2>{todayDate}</h2>
      </div>
      <div className={styles.container}>
        <p>{quote?.body}</p>
        <h2>{quote?.author}</h2>
      </div>
      <div className={styles.actionsContainer}>
        <span>
          <FiClipboard title='Copiar' size={24} />
        </span>
        <span>
          <FiShare title='Partilhar' size={24} />
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleNovaFrase} type='button'>
          Nova Frase
        </button>
      </div>
    </div>
  );
}
