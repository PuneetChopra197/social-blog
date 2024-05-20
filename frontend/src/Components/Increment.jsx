import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../Redux/reducers/counterSlice";

const Increment = () => {
  const { count } = useSelector((state) => state.counter);
  console.log(count);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter App</h1>

      <div>
        <button onClick={() => dispatch(increment(count))}>+</button>
        <span>Count:{count}</span>
        <button onClick={() => dispatch(decrement(count))}>-</button>
      </div>
    </div>
  );
};

export default Increment;
