import type { NextPage } from "next";
import Player from "../components/Player";
import data from "../data.json";

const Home: NextPage = () => {
  return (
    <div>
      {data.tracks.map((track) => (
        <Player
          key={track.src}
          src={track.src}
          intro={track.intro}
          data={track.data}
          loopEnd={track.loopEnd}
          bpm={track.bpm}
        />
      ))}
    </div>
  );
};

export default Home;
