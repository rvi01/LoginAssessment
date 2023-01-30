import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, [1000]);
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="center">
      <div className="text-danger text-center mt-10">
        Redirecting to Home Page in {count} seconds
      </div>
    </div>
  );
};

export default LoadingToRedirect;
