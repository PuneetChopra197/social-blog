import React, { useEffect, useState } from "react";
import "../ComponentCSS/HeaderLower.css";
import { FaSearch } from "react-icons/fa";
// import { getSearchPost } from "../API/endpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilteredPost,
  fetchSearchByDatePost,
  getFilterPost,
} from "../Redux/actions/post";

const HeaderLower = ({ posts, setPosts }) => {
  const { postForFilter } = useSelector((state) => state.posts);
  const { blogs } = useSelector((state) => state.posts);
  console.log(postForFilter, "zxcvb");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [created_Date, setCreated_Date] = useState("");
  const [searchText, setSearchText] = useState("");
  const [hideSuggestions, setHideSuggestions] = useState(false);

  // const fetchPosts = async () => {
  //   try {
  //     const res = await getBlog();
  //     if (res.data) {
  //       setBlogs(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error, "abc");
  //   }
  // };

  //Dropdown Functionality
  const handleFilter = async () => {
    try {
      dispatch(fetchFilteredPost({ title, created_Date }));
    } catch (error) {
      console.log(error);
    }
  };

  //Date Functionality
  const handleDateChange = (date) => {
    console.log(date, "asdfg");
    setCreated_Date(date);
  };

  useEffect(() => {
    dispatch(getFilterPost());
  }, []);

  useEffect(() => {
    handleFilter();
  }, [title, created_Date]);

  //Search Bar Functionality
  const fetchSuggestions = async () => {
    // if (searchText.trim() === "") {
    //   setBlogs([]);
    //   return;
    // }
    try {
      dispatch(fetchSearchByDatePost(searchText));
      // const res = await getSearchPost(searchText);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [searchText]);

  const handleSearchTitle = (e) => {
    setSearchText(e.target.value);
    setHideSuggestions(true);
  };

  // const handleSearchBarClick = () => {
  //   setHideSuggestions(!hideSuggestions);
  // };

  return (
    <div className="container">
      <div className="middle">
        <div className="mid-left">
          Filters
          <hr id="filter-hr" />
        </div>
        <div className="mid-create">
          Created By
          <br />
          <select
            className="drp1"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value === "All" ? "" : e.target.value)
            }
          >
            <option value="All">All</option>
            {postForFilter.map((post) => {
              return (
                <option key={post._id} value={post.title}>
                  {post.title}
                </option>
              );
            })}
            {/* <option value={1}>2</option>
            <option value={2}>3</option> */}
          </select>
        </div>
        <div className="mid-publish">
          Published Date
          <br />
          <input
            type="date"
            className="drp2"
            onChange={(e) => handleDateChange(e.target.value)}
          ></input>
        </div>
        <div className="mid-search">
          <div className="search-bar">
            Search
            <br />
            <input
              type="text"
              placeholder="Type Here"
              className="txt1"
              value={searchText}
              onChange={(e) => handleSearchTitle(e)}
            />
            <FaSearch
              style={{ marginLeft: "-22px" }}
              className="fa-solid fa-magnifying-glass"
            />
          </div>
          {hideSuggestions && blogs?.length > 0 && (
            <div className="suggestions-container">
              <ul>
                {blogs.map((post) => {
                  return (
                    <li
                      key={post._id}
                      className="suggestion-item"
                      onClick={() => navigate(`/BlogInfo/${post._id}`)}
                    >
                      {post.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HeaderLower;
