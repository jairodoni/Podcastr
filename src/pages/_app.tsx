import { useState } from 'react';
import { Header } from '../components/Header'
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../context/PlayerContext';

import styles from '../styles/app.module.scss'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  const [darkTheme, setDarkTheme] = useState(true);

  const typeTheme = darkTheme ? `${styles.dark}` : `${styles.white}`;

  return (
    <PlayerContextProvider>
      <div className={styles.wrapper} >
        <main className={typeTheme}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Component {...pageProps} darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp;
