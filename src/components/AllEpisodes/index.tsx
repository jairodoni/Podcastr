import Image from 'next/image'
import Link from 'next/link'
import { usePlayer } from '../../context/PlayerContext';
import styles from './styles.module.scss'


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

interface AllEpisodesProps {
  darkTheme: boolean;
  latestEpisodes: Episodes[];
  allEpisodes: Episodes[];
  episodeList: Episodes[];
}

export function AllEpisodes({ allEpisodes, latestEpisodes, episodeList, darkTheme }: AllEpisodesProps) {
  const { playList } = usePlayer();

  const typeTheme = darkTheme ? styles.dark : styles.white;

  return (
    <section className={styles.allEpisodes}>
      <h2>Todos episodeos</h2>
      <table cellSpacing={0} className={typeTheme}>
        <thead>
          <tr>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allEpisodes.map((episode, index) => {
            return (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    width={120}
                    height={120}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>
                <td>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>
                      {episode.title}
                    </a>
                  </Link>
                </td>
                <td>{episode.members}</td>
                <td style={{ width: 120 }}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => playList(episodeList, index + latestEpisodes.length)}
                  >
                    <img src="/play-green.svg" alt="Tocar episódio" /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}