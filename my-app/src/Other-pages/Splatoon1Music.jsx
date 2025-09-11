import { memo, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Search, Music, Play, Pause } from "lucide-react";
import { ScrollReveal } from "../App";

const songsData = [
  { id: 1, title: "Splattack!", artist: "Toru Minegishi", cover: "/img/SplatTunes.jpeg", audio: "/audio/splattack.mp3" },
  { id: 2, title: "Now or Never!", artist: "Toru Minegishi", cover: "/img/SplatTunes.jpeg", audio: "/audio/Now_or_Nvr.mp3" },
  { id: 3, title: "Seaskape", artist: "Toru Minegishi", cover: "/img/SplatTunes.jpeg", audio: "/audio/Seaskape.mp3" },
  { id: 4, title: "Calamari Inkantation", artist: "Shiho Fujii", cover: "/img/SplatTunes.jpeg", audio: "/audio/Calamari_Inkantation.mp3" },
];

const Navbar = memo(({ query, setQuery }) => {
  return (
    <div className="w-full fixed top-0 left-0 flex justify-center z-10">
      <div className="w-full items-center justify-between bg-black p-2 flex">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img src="/Splatoonfi-logos_black.png" className="w-14 h-14 rounded-md invert" />
          </Link>
          <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2">
            <Search className="text-gray-400 mr-2" size={20} />
            <input type="text" placeholder="Search Songs" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent outline-none text-white flex-1"/>
          </div>
        </div>
      </div>
    </div>
  );
});

const MusicPage = memo(() => {
  const [query, setQuery] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const filteredSongs = songsData.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

const handlePlay = (song) => {
  if (currentSong?.id === song.id) {
    // Toggle play/pause if it's the same song
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  } else {
    // New song selected
    setCurrentSong(song);
    setIsPlaying(true);

    // Wait for state update, then play
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();  // reloads the new song
        audioRef.current.play();
      }
    }, 0);
  }
};

  return (
    <Routes>
      <Route
        path="//"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
            <Navbar query={query} setQuery={setQuery} />

            <section className="min-h-screen flex flex-col items-center justify-start gap-8 px-6 py-24 w-full">
              <div className="text-center max-w-4xl mx-auto">
                <ScrollReveal>
                  <h1 className="text-4xl font-bold mb-6">Splatoon 1 Music:</h1>
                </ScrollReveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition flex flex-col items-center text-center"
                  >
                    {song.cover ? (
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-32 h-32 rounded-md object-cover mb-4"
                      />
                    ) : (
                      <div className="w-32 h-32 flex items-center justify-center bg-zinc-700 rounded-md mb-4">
                        <Music size={40} className="text-gray-400" />
                      </div>
                    )}
                    <h2 className="font-semibold">{song.title}</h2>
                    <p className="text-gray-400 text-sm mb-2">{song.artist}</p>
                    <button
                      onClick={() => handlePlay(song)}
                      className="bg-slate-600 hover:bg-slate-400 text-black px-4 py-2 rounded-full flex items-center gap-2"
                    >
                      {currentSong?.id === song.id && isPlaying ? (
                        <>
                          <Pause size={18} /> Pause
                        </>
                      ) : (
                        <>
                          <Play size={18} /> Play
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <audio
              ref={audioRef}
              src={currentSong?.audio}
              onEnded={() => setIsPlaying(false)}
              autoPlay={isPlaying}
            />

            {currentSong && (
              <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex items-center justify-between px-6 py-3 border-t border-zinc-800">
                <div className="flex items-center gap-4">
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{currentSong.title}</h2>
                    <p className="text-gray-400 text-sm">{currentSong.artist}</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePlay(currentSong)}
                  className="bg-slate-600 hover:bg-slate-400 text-black px-4 py-2 rounded-full flex items-center gap-2"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>
            )}
          </div>
        }
      />
    </Routes>
  );
});

export default MusicPage;
