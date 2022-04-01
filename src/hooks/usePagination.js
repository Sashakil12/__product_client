import { useState } from 'react';

export default function(defaultLimit, defaultSkip){
    const [limit, setLimit] = useState(defaultLimit);
    const [skip, setSkip] = useState(defaultSkip)
        return{
            limit,
            skip,
            setLimit,
            setSkip
        }
}