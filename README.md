# React version - 18.2.0
# Axios version - 1.1.2,
# react-dom" -  18.2.0,
# react-router-dom - 6.4.2

# Reviewed Hacker News API

* Integrated hacker news api(top stories api) using axios.
* storing top stories api data and using map function iterating the data
  sending those ids to https://hacker-news.firebaseio.com/v0/item/id.json?print=pretty api 
* First 10 records showing
*  And implemented lazy loading  after 10 new stories 
*  In lazy loading use IntersectionObserver to observe the changes in the div tag based on      that  reference wrote some call back function and called pagination.
* From API(https://hacker-news.firebaseio.com/v0/item/${ele}.json?print=pretty) response used map function to list out the story title,type and url.


# Reviewed  MealDBAPI  and analyzed apis
API using azios ( installed axios using npm install axios)
* Integrated API(https://www.themealdb.com/api/json/v1/1/categories.php) for showing category 
* stored particular api response in categories varibale .
* After that using map function iterated categories from api response.
* And also shown category list and description from that api response
* And that categories sent to filter API (https://www.themealdb.com/api/json/v1/1/filter.php?c=${ele.strCategory) for shwoing available meals in particular category.





