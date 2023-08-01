import "./SearchResultsList.css";
import { SearchResult } from "../SearchResult/SearchResult.jsx";
import {useState} from "react";

export const SearchResultsList = ({ results,setResults,content,setContent,setMusicAdded }) => {

  const playerStyle={
    maxHeight: "360px",
    // Adding media query..
    '@media (maxWidth: 720px)': {
      maxHeight: "320px",
      height:"100%"
      ,width:"50%"
    },
  }
  return (<>
        {(content==undefined) ? ""

            :
            <div className="playerbox">
              <iframe title="Spotify Embed: Recommendation Playlist "

                      src={`https://open.spotify.com/embed/`+content.type+`/`+content.url+`?utm_source=generator&theme=0`}
                      width="100%"
                      height="100%"
                      style={{ minHeight: '100px',margin:"none" }}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
              ></iframe>
              <button onClick={()=> {
                setMusicAdded(old=>[...old,{type:content.type,url:content.url,image:content.image,name:content.name,artist:content.artist}])
                setContent(undefined)
                setResults(undefined)
              }}>Select</button>

              <button onClick={()=> {
                setResults(undefined)
                setContent(undefined)
              }}>Clear</button>
            </div>}
        <div className="results-list">




          {results.map((r, id) => {
            return <SearchResult
                image={r.album.images[1].url}
                name={r.name}
                type={r.type}
                id={r.id}
                artist={r.artists[0].name}
                key={id}
                setContent={setContent}
            />;
          })}
        </div>


  </>

  );
};
