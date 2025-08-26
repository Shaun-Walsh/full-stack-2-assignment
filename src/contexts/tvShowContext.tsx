import React, { useState, useCallback } from "react";
import { BaseTVShowProps, Review } from "../types/interfaces";

interface TVShowContextInterface {
    favourites: number[];
    addToFavourites: ((show: BaseTVShowProps) => void);
    removeFromFavourites: ((show: BaseTVShowProps) => void);
    addReview: ((show: BaseTVShowProps, review: Review) => void);
    mustWatch: number[];
    addToMustWatch: ((show: BaseTVShowProps) => void);
}

const initialContextState: TVShowContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (show, review) => { show.id, review},
    mustWatch: [],
    addToMustWatch: () => {},
};

export const TVShowContext = React.createContext<TVShowContextInterface>(initialContextState);

const TVShowContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);

    const addToFavourites = useCallback((tvshow: BaseTVShowProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(tvshow.id)) {
                return [...prevFavourites, tvshow.id];
            }
            return prevFavourites;
        });
    }, []);
 
    const removeFromFavourites = useCallback((tvshow: BaseTVShowProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== tvshow.id));
    }, []);

    const addReview = (tvshow:BaseTVShowProps, review: Review) => {
        setMyReviews( {...myReviews, [tvshow.id]: review } )
    };

    const addToMustWatch = useCallback((tvshow: BaseTVShowProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(tvshow.id)) {
                console.log("tvshow added to Must Watch:", tvshow.name);
                return [...prevMustWatch, tvshow.id];
            }
            return prevMustWatch;
        });
    }, []);

    return (
        <TVShowContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,
                mustWatch,
                addToMustWatch
            }}
        >
            {children}
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;