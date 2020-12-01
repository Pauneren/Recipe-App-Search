import React, {useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert';


const App = () => {
    const[query, setQuery] = useState("");
    //display the recipies
    const[recipes, setRecipes] = useState([]);

    //Insert the alert message when the input field is empty:
    const [alert, setAlert] = useState("");

    const APP_ID = "436512f9";

    const APP_KEY = "e923308e5e9f633adc29131d7bb67013";

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

  
    const getData = async() => {

        // alert message if the name is misspelled:
        if(query !== ""){

            const result = await Axios.get(url);
            //display alert message if the property is set to false:
            if(!result.data.more){
                return setAlert('No food found whith that name')
            }

            //get acces to the recipies array:
            setRecipes(result.data.hits)
    
            console.log(result);
            //Set alert to am empty string because if we find the food with the name the message will be gone
            setAlert("");
            //setQuery to an empty string to clear the search input field
            setQuery("");

        }else{
            setAlert("Please fill the form")
        }


       
    }

    const onChange = (e)=>{
        setQuery(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        getData();
    }
    
//alert componets go iside the return method
    return (
        <div className ="App">
            <h1>Food Searching App</h1>
            <form className="search-form" onSubmit={onSubmit}>

               {alert !== "" && <Alert alert={alert}/>}
              
               

                <input type ="text" 
                placeholder="Search Food" 
                autoComplete="off" 
                onChange={onChange}
                value={query}

                />
                <input type ="submit" value ="search"/>
            </form>
            <div className="recipes">
              
                {recipes !== [] && 
                recipes.map(recipe =>
                    <Recipe key={uuidv4()} recipe={recipe}/>)}
            </div>
             
             <div>
                 <li>
                     <ul>Steak</ul>
                     <ul>Pizza</ul>
                     <ul>Pasta</ul>
                     <ul>Vegetables</ul>
                     <ul>Desserts</ul>
                 </li>
             </div>

        </div>
    );
};

export default App;
