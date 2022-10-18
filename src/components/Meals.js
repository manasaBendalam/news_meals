import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Meals = () => {
  const [categories, setCategories] = useState([]);
  const [viewCategories, setviewCategories] = useState({});
  const [meals, setMeal] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        setCategories(res.data?.categories);
      });
  }, []);
  return (
    <div>
      <div>
        <ul>
          <div
            className="cursor"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to News
          </div>
          {categories?.length > 0 &&
            categories?.map((ele) => (
              <>
                <li
                  className="d-flex gap1"
                  onClick={() => {
                    axios
                      .get(
                        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ele.strCategory}`
                      )
                      .then((res) => {
                        setMeal(res.data?.meals);
                      });
                    setviewCategories({
                      [ele.idCategory]: !viewCategories[ele.idCategory],
                    });
                  }}
                >
                  <div>
                    <img src={ele.strCategoryThumb} width={40} height={40} />
                  </div>
                  <div className="cursor">
                    <span>{ele.strCategory}</span>
                    <span>{ele.strCategoryDescription}</span>
                  </div>
                </li>
                {viewCategories[ele.idCategory] && (
                  <div className="meals">
                    <ul>
                      {meals?.length > 0 &&
                        meals?.map((ele) => (
                          <li className="d-flex gap1">
                            <div>
                              <img 
                                src={ele.strMealThumb}
                                 width={40}
                                height={40}
                              />
                            </div>
                            <div className="cursor">
                              <span>{ele.strMeal}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Meals;
