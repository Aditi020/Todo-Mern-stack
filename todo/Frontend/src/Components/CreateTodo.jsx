import { useState } from "react";
import axios from 'axios';

export function CreateTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <input id="title" style={{                 //Adding CSS inlined
                padding: 10,
                margin: 10
            }}
                type="text" placeholder="Title" onChange={function (e) {
                    const value = e.target.value;
                    setTitle(value);
                }}></input> <br />

            <input id="description" style={{
                padding: 10,
                margin: 10
            }}
                type="text" placeholder="Description" onChange={function (e) {
                    const value = e.target.value;
                    setDescription(value);
                }}
            ></input><br />

            <button style={{
                padding: 10,
                margin: 10
            }}
                onClick={() => {
                    if (title && description) {
                        axios.post("http://localhost:3000/todo", {
                            title: title,
                            description: description
                        })

                            // Below is an example of how to use fetch instead of axios 
                            // fetch("http://localhost:3000/todo", {
                            //     method: "POST",
                            //     body: JSON.stringify({
                            //         title: title,
                            //         description: description
                            //     }),
                            //     headers: {
                            //         "Content-Type": "application/json"
                            //     }
                            // })
                            .then(async function (res) {
                                const json = await res.json();
                                console.log(json);
                                alert("Todo created successfully");
                            })
                            .catch(error => {
                                console.error('Error creating todo:', error);
                                alert("Error creating todo");
                                console.error('Error creating todo:', error);
                            });
                    }
                    else {
                        alert("Title and Description are required");
                    }
                }}
            > Add a Todo
            </button>
        </div>
    )
}

//the function is alredy being exported at top but alternative way is 
// module.exports{CreateTodo}