import Image from 'next/image';
import Link from 'next/link';
import { usePlayer } from '../../context/PlayerContext';
import styles from './styles.module.scss';


interface Episodes {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

interface LatestEpisodesProps {
  darkTheme: boolean;
  latestEpisodes: Episodes[];
  episodeList: Episodes[];
}


export function LatestEpisodes({ latestEpisodes, episodeList, darkTheme }: LatestEpisodesProps) {
  const { playList } = usePlayer();

  const typeTheme = darkTheme ? styles.dark : styles.white;

  return (
    <section className={styles.latesEpisodes}>
      <h2>Últimos lançamentos</h2>

      <ul>
        {latestEpisodes.map((episode, index) => {
          return (
            <li key={episode.id} className={darkTheme ? styles.dark : styles.white}>
              <Image
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />
              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>
                  <a>{episode.title}</a>
                </Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
              </div>

              <button
                type="button"
                onClick={() => playList(episodeList, index)}
                className={typeTheme}
              >
                <img src="/play-green.svg" alt="Tocar episódeo" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}