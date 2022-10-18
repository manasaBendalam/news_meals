import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LazyLoading from "../common/LazyLoading";

const News = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lazyData, setLazyData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => {
        if (res?.data?.length > 0) {
          setData(res?.data);
          let arr = res?.data?.slice(0, 10)?.map((ele) => {
            return axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${ele}.json?print=pretty`
            );
          });
          Promise.all(arr).then((res) => {
            let d = res.map((ele) => ele.data);
            setLazyData(d);
            setLoading(false);
          });
        }
      });
  }, []);

  useEffect(() => {
    if (page > 1 && !loading) {
      setLoading(true);
      let arr = data
        ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
        ?.map((ele) => {
          return axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${ele}.json?print=pretty`
          );
        });
      Promise.all(arr).then((res) => {
        let d = res.map((ele) => ele.data);
        setLazyData((dat) => [...dat, ...d]);
        setLoading(false);
      });
    }
  }, [page]);

  return (
    <div>
      <ul>
        <div
          className="cursor"
          onClick={() => {
            navigate("/meals");
          }}
        >
          Go to Meals
        </div>
        {lazyData?.length > 0 &&
          lazyData?.map((ele) => (
            <li>
              <span>{ele.type}</span>
              <span>{ele.title}</span>
              <a href={ele.url} target="_blank">
                {ele.url}
              </a>
            </li>
          ))}
      </ul>
      <LazyLoading
        isLastPage={lazyData.length === data.length}
        loading={loading}
        onPagination={() => {
          if (!loading) {
            setPage((p) => p + 1);
          }
        }}
        data={lazyData}
      />
    </div>
  );
};

export default News;
