import React from "react";
import { useFetch } from "./getData";
export const useFront = (url, isCalled) => {
  const { loading, products } = useFetch(url, isCalled);
  console.log(loading, products);
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <article className="containerr">
          {products.articles.map((article) => {
            return (
              <div key={article.publishedAt} className="content">
                <img src={article.urlToImage} alt="Image" className="image" />
                <h1 className="font-weight-bold">{article.title}</h1>
                <p>{article.description}</p>
                <a href={article.url} target="_blank">
                  Read More
                </a>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};
