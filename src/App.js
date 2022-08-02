import { useState, useEffect } from "react";
import "./App.css";
import { useFront } from "./component/front";

const searchUrl = (val, pageSize) => {
  const url = `
https://newsapi.org/v2/everything?q=${val}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=7596bc9345c64fd4a847b8c812e82ae9`;
  return url;
};
const frontPageUrl = (pageSize) => {
  const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=${pageSize}&category=business&apiKey=7596bc9345c64fd4a847b8c812e82ae9`;
  return url;
};
const App = () => {
  const [pageSize, setPageSize] = useState(9);
  console.log(pageSize);
  const [val, setVal] = useState("");
  const [category, setCategory] = useState("");
  const [isCalled, setIsCalled] = useState(false);
  const [search, setSearch] = useState(frontPageUrl(9));
  const handleSubmit = () => {
    setPageSize(9);
    setIsCalled(true);
    const newUrl = searchUrl(val, pageSize);
    if (val) {
      setSearch(newUrl);
    }
  };
  const handleValueChange = (e) => {
    setVal(e.target.value);
    setIsCalled(true);
    // setSearch(searchUrl(val, pageSize));
  };
  const handleLoadMore = () => {
    setPageSize(pageSize + 9);
  };

  useEffect(() => {
    if (!val) {
      const newUrl = frontPageUrl(pageSize);
      setSearch(newUrl);
    } else {
      const newUrl = searchUrl(val, pageSize);
      setSearch(newUrl);
    }
  }, [pageSize]);

  useEffect(() => {
    if (category) {
      setVal(category);
      setPageSize(9);
      setIsCalled(true);
      const newUrl = searchUrl(category, pageSize);
      console.log(newUrl);
      setSearch(newUrl); //doubt
    }
  }, [category]);

  return (
    <>
      <h1 className="heading">News Planet</h1>
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={val}
            onChange={handleValueChange}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="input-group-append btn-secondary"
          >
            Search
          </button>
          <div>
            <select
              className="custom-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option selected>Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Bussiness">Bussiness</option>
              <option value="Food">Food</option>
              <option value="Economics">Economics</option>
              <option value="Health">Health</option>
              <option value="Geo Politics">Geo Politics</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>
      </div>

      {useFront(search, isCalled)}
      <div className="load" onClick={handleLoadMore}>
        <button className="btn btn-primary btn-lg">LoadMore</button>
      </div>
    </>
  );
};

export default App;
