import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes,setRecipe] = useState([])
  const [total,setTotal] = useState(0)
  const [loading,setLoading] = useState(true)
  const [errorMsg,setErrorMsg] = useState("")
  const [searchQuery,setSeachQuery] = useState("")

  async function fetchRecipes(skipCount,query) {
    setLoading(true)
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if(query){
       url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }

       const {data} =  await axios.get(url)
      setRecipe((prev) => 
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes])
      setTotal(data.total)
     
    } catch (error) {
      setErrorMsg("Error fetching products please try agin")
    } 
    setLoading(false)
  }

useEffect(() =>{
  fetchRecipes(0)
},[])

function handleSeach(e){
  e.preventDefault()
  const form = new FormData(e.target)
  const query = form.get("query").trim()
  console.log(query);
  
  setSeachQuery(query)

  fetchRecipes(0,query)
  
}

if(errorMsg){
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
  <p className="text-accent text-center">{errorMsg || "recipe not found"}</p>
    </main>
  )
}

//  if(loading){
//   return <p className="text-center pt-5 font-extralight text-3xl">Loading...</p>
//  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      <form onSubmit={handleSeach} className="flex gap-2 max-w-md mx-auto mb-8">
        <input
         name="query"
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button
         type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center py-6 text-muted">Loading...</p>}
       
       {!loading &&
        recipes.length === 0 && (
          <p className="text-center py-6 text-muted">{`No recipe found ${searchQuery}`}</p>
        )
       }

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {recipes.map((recipes) => (
          <RecipeCard key={recipes.id}  recipe={recipes}/>
         ))}
      </div>
         
    {recipes.length < total && (
      <div className="text-center mt-8">
        <button onClick={() => fetchRecipes(recipes.length,searchQuery)}
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
        >
          Load More
        </button>
      </div>)}

    </main>
  );
}

export default Home;