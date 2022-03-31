import { useState } from 'react';

export default function(defaultLimit, defaultSkip){
    const [limit, setlimit] = useState(defaultLimit);
    const [skip, setskip] = useState(defaultSkip)
        return{
            limit,
            skip,
            setlimit,
            setskip
        }
}