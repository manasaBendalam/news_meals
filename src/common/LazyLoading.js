import React, { useEffect, useRef } from "react";

const LazyLoading = ({
  loading,
  isLastPage,
  onPagination,
  data,
}) => {
  const loader_ref = useRef();
  const callback = (entries) => {
    entries.forEach((entry) => {
      console.log(entry.isIntersecting , !loading , !isLastPage);
      if (entry.isIntersecting && !loading && !isLastPage) {
        onPagination();
      }
    });
  };

  const options = {
    threshold: 1.0,
    rootMargin: "30px",
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if (loader_ref.current) {
      observer.observe(loader_ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, data]);

  return (
    <div className="loaderSpace" ref={(ref) => (loader_ref.current = ref)}>
      {!loading && (
        <div className="loadContainer">
          <div className="mainDotContainer">
            <div className="dotContainer">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyLoading;
