import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes,setRecipe] = useState([])
  const [total,setTotal] = useState({})

  async function fetchRecipes(skipCount) {
    try {
      const data = await axios.get(`https://dummyjson.com/recipes?limit=6&skip=${skipCount}`);
      // console.log(data);
      setRecipe((prev) => [...prev, ...data.data.recipes])
      setTotal(data.data.total)
     
    } catch (error) {
    }
  }

useEffect(() =>{
  fetchRecipes(0)

},[])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button
          type="button"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {recipes.map((recipes) => (
          <RecipeCard key={recipes.id} recipe={recipes}/>
         ))}
      </div>
         
    {recipes.length < total && <div className="text-center mt-8">
        <button onClick={() => fetchRecipes(recipes.length)}
          type="button"
          className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
        >
          Load More
        </button>
      </div>}

    </main>
  );
}

export default Home;