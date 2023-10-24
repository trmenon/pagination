import React, {useState, useEffect} from "react";
import axios from "axios";
import { Card } from "../components/card";
import {API_BASEURL} from "../constants";
import "./styles.scss";

export const MainPage = ()=> {
    // States
    const [data, setData] = useState([]); // To store the entire chunk of data
    const [results, setResults] = useState([]); //This is the data-set that will be rendered into the page
    const [page, setPage] = useState(1); //This will determine the page number
    const [count, setCount] = useState(3); //This will determine the number of results per page

    // Effects (side effects)
    //on mounting this side effect will fire
    useEffect(()=> {
        // API Call 
        const getUsersFromApi = async()=> {
            try{
                const response_data = await axios.get(`${API_BASEURL}/users`);
                // [NOTE] See api calling logic and condition checks at the bottom of the page
                if(
                    response_data && 
                    response_data.status === 200 &&
                    response_data.data &&
                    Array.isArray(response_data.data)
                ) {
                    setData(response_data?.data);
                }
            }catch(err) {
                console.log("[ERROR] Calling api");
                console.log(err);
            }
        }
        getUsersFromApi();        
    }, []); 

    // When there is a change in data, page number , per page count
    useEffect(()=> {
        console.log(data);
        console.log(`Page number is ${page}`);
        if(Array.isArray(data) && data.length>0) {
            const start_index = (page - 1) * count;
            const end_index = start_index + count;
            const sliced_list = data.slice(start_index, end_index);
            setResults(sliced_list);
        }
    }, [data, page, count]);

    // useEffect(()=> {
    //     if(Array.isArray(data) && data.length>0) {
    //         const start_index = (page - 1) * count;
    //         const end_index = start_index + count - 1;
    //         const sliced_list = data.slice(start_index, end_index);
    //         setResults(sliced_list);
    //     }
    // }, [page, count]);

    // Event Handlers
    const handlePrevious = ()=> {
        if(page>1) {
            setPage(page-1);
        }
    }
    const handleNext = ()=> {
        // Cheking total pages
        const tot = Math.ceil(data.length/count);
        console.log(tot);
        if(page<tot) {
            setPage(page+1);
        }
    }
    const handleCountChange = (event)=> {
        const value = Number(event.target.value);
        setCount(value);
    }

    

    // Renderer
    return(
        <React.Fragment>
            <div className="wrapper">
                <div className="header">
                    <h3>Pagination Example</h3>
                </div>
                <div className="main">
                    <div className="main-container">
                        {
                            results.length === 0?
                                <h4>Loading...</h4>
                                :
                                results.map((user)=> {
                                    return(
                                        <Card 
                                            key={`card-user-id-${user.id}`}
                                            id={user.id}
                                            name={user.name}
                                            username={user.username}
                                            email={user.email}
                                            city={user.address.city}
                                            company={user.company.name}
                                        />
                                    )
                                })
                        }
                    </div>
                </div>
                <div className="footer">
                    <button 
                        onClick={handlePrevious}
                        disabled={page <= 1}
                    >
                        Previous
                    </button>   
                    <div className="controller">
                        <h6>Displaying</h6>
                        <input 
                            type="number" 
                            min="1" 
                            max={data.length}
                            value={count}
                            onChange={handleCountChange}
                        />
                        <h6>Results</h6>
                    </div> 
                    <button 
                        onClick={handleNext}
                        disabled={page >= Math.ceil(data.length/count)}
                    >
                        Next
                    </button>           
                </div>
            </div>
        </React.Fragment>
    )
}

// API
// While calling jsonplaceholder api, response follows the following structure
// config:<Object> {!important for now}
// data:<Array>=> Required data
// headers:<Object> {!important for now}
// request:<Object> {!important for now}
// status:<Number>=> Status Code of HTTP Call 
// statusText: <String> {!important for now}
// In this case im just checking for response.status and response.data to ensure data has been fetched
// While using json_server this condition check will not be required