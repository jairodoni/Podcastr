import { GetStaticProps } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';
import Head from 'next/head';
import { usePlayer } from '../context/PlayerContext';
import { AllEpisodes } from '../components/AllEpisodes';
import { LatestEpisodes } from '../components/LatesEpisodes';
import { useState } from 'react';

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

interface HomeProps {
  darkTheme: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
  latestEpisodes: Episodes[];
  allEpisodes: Episodes[];
}

export default function Home({ latestEpisodes, allEpisodes, darkTheme, setDarkTheme }: HomeProps) {
  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <div className={styles.homepage}>

        <LatestEpisodes
          latestEpisodes={latestEpisodes}
          episodeList={episodeList}
          darkTheme={darkTheme}
        />

        <AllEpisodes
          darkTheme={darkTheme}
          allEpisodes={allEpisodes}
          latestEpisodes={latestEpisodes}
          episodeList={episodeList}
        />

      </div>
    </>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    };
  })

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // 8 horas
  }

}