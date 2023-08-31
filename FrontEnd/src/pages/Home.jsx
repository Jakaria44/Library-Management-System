import { useEffect, useState } from "react";
import server from "./../HTTP/httpCommonParam";
import TimeFormat from "./../utils/TimeFormat";
const Home = () => {
  return <NewsList />;
};

export default Home;

const NewsList = () => {
  const [allnews, setAllNews] = useState([]);

  const getALlNews = async () => {
    try {
      const res = await server.get("/publish-news");
      setAllNews(res.data);
    } catch (err) {
      setAllNews([]);
      console.log(err);
    }
  };

  useEffect(() => {
    getALlNews();
  }, []);

  return (
    <>
      <h1>News</h1>
      <div className="container">
        {allnews.map((news) => (
          <div className="card" key={news.NEWS_ID}>
            <div className="card-body">
              <h5 className="card-title">{TimeFormat(news.NEWS_DATE)}</h5>
              <p className="card-text">{news.NEWS_TEXT}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
