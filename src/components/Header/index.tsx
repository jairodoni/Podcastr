import format from 'date-fns/format';

import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

import styles from './styles.module.scss';
import { FiSun } from 'react-icons/fi'
import { IoSunny } from 'react-icons/io5'
import { RiMoonClearFill } from 'react-icons/ri'

interface HeaderProps {
  darkTheme: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
}

export function Header({ darkTheme, setDarkTheme }: HeaderProps) {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })
  const typeTheme = darkTheme ? styles.dark : styles.white;
  const colorIcon = darkTheme ? "#dddddd" : "#6f48c9";

  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }
  return (
    <div className={typeTheme}>
      <header className={styles.headerContainer}>

        {darkTheme ? (
          <Link href="/" >
            <img src="/logo_for_dark.svg" alt="Podcastr" style={{ cursor: "pointer" }} />
          </Link>

        ) : (
          <Link href="/" >
            <img src="/logo.svg" alt="Podcastr" style={{ cursor: "pointer" }} />
          </Link>
        )}

        <p >
          O melhor para você ouvir, sempre
        </p>

        <button onClick={toggleTheme} >
          {darkTheme ?
            <IoSunny size={20} color={`${colorIcon}`} />
            :
            <RiMoonClearFill size={18} color={`${colorIcon}`} />
          }
        </button>
        <span>{currentDate}</span>
      </header>
    </div>
  )

}