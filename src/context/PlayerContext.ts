import { createContext, ReactNode, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
};

// interface PlayerProviderProps {
//   children: ReactNode;
// }

export const PlayerContext = createContext({} as PlayerContextData);

// export function PlayerProvider({ children }: PlayerProviderProps) {
//   const [episodeList, setEpisodeList] = useState([]);
//   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

//   function player(episode) {
//     setEpisodeList([episode])
//     setCurrentEpisodeIndex(0);
//   }

//   return (
//     <PlayerContext.Provider    value={{ episodeList, currentEpisodeIndex }}>
//       {children}
//     </PlayerContext.Provider>
//   );
// }
