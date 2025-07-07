import { useState } from 'react';
import classes from './App.module.css';

export const App = () => {
    let [count, setCount] = useState<number>(0);
    const handleIncrease = () => setCount(prev => prev + 1);
    const handleDecrease = () => setCount(prev => prev - 1);

    return (
        <div>
            {/* <h1>Platform:{__PLATFORM__}</h1> */}
            <button onClick={handleDecrease} className={classes.btn}>
                -
            </button>
            <span className={classes.value}>{count}</span>
            <button onClick={handleIncrease}>+</button>
        </div>
    );
};
