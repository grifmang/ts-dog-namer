import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

type ActionType = {
    type: 'clear' | 'fetch' | 'set',
    payload?: string[]
}

type StateType = {
    dogs: string[] | undefined,
    names: string[]
}

const initialState: StateType = {
    dogs : [],
    names: ["Morgan", "Emily", "George", "Frank", "Mia", "Also Mia", "Estragan", "Nerd #3", "Cayla", "Michael"]
}

function reducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case 'clear':
            return initialState;

        case 'fetch':
            axios.get('https://dog.ceo/api/breeds/image/random/10')
            .then(response => {
                const newDogs: string[] = response.data.message;
                return { 
                    ...state,
                    dogs: newDogs 
                };
            })

        // eslint-disable-next-line no-fallthrough
        case 'set':
            return  {...state, dogs: action.payload}

        // eslint-disable-next-line no-fallthrough
        default:
            return state;
    }
}

const Dogs: React.FC = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    if (state.dogs && state.dogs.length < 2) {
        dispatch({ type: 'fetch' });
    }

    useEffect(() => {
        axios.get('https://dog.ceo/api/breeds/image/random/10')
        .then(response => {
            return dispatch({ type: 'fetch', payload: response.data.message });
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <button type='submit' onClick={() => dispatch({ type: 'set' })}>Fetch Doggos</button>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {state.dogs && state.dogs.length > 1
                ? state.dogs.map((element: any, index: number) => {
                    return <div className='box' style={{ width: '300px', height: '300px', margin: '10px' }} key={index}>
                        <img style={{ width: '90%', height: '250px' }} src={element} alt='random dog' />
                        <p>{state.names[index]}</p>
                        
                    </div>
                })
                : null}
            </div>
        </>
    );
}

export default Dogs;