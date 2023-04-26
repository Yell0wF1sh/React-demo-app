import React, { useState, useEffect } from "react";
import "./styles.css";

function getItemsFromLocalStorage() {
    // getting stored value
    const saved = localStorage.getItem("items");
    const initialValue = JSON.parse(saved) || [];
    // relabel the keys from 0 to length-1
    for (let i = 0; i < initialValue.length; i++) {
        initialValue[i]['key'] = i
    }
    return initialValue || [];
}

export default function Transaction() {
    let [items, setItems] = useState(getItemsFromLocalStorage);
    let [numKeys, setNumKeys] = useState(() => items.length)
    let [msg, setMsg] = useState('none');

    function add_item() {
        // add an item to the todolist
        const desc = document.getElementById("desc").value;
        const amount = document.getElementById("amount").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;
        let newItem = {
            key: numKeys,
            desc,
            amount,
            category,
            date,
        };
        document.getElementById("desc").value = ""
        document.getElementById("amount").value = ""
        document.getElementById("category").value = ""
        document.getElementById("date").value = ""
        setNumKeys(numKeys + 1)
        setItems([newItem, ...items]); // using the spread operator ...
    }

    function deleteItem(key) {
        console.log("Deleting item with key " + key)
        const newItems = items.filter((x) => x['key'] !== key)
        setItems(newItems)
        setNumKeys(numKeys - 1)
    }



    useEffect(() => {
        // storing items if items changes value
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // 👇 Get input value
            add_item();
        }
    };

    return (
        <div className="App container">
            <h1 className="bg-warning text-center p-2">Transaction</h1>
            {msg}
            <table class="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th>description</th>
                        <th>amount</th>
                        <th>category</th>
                        <th>date</th>
                        <th>delete</th>
                    </tr>
                    {items.map((item) => (
                        <tr>
                            <td>{item["desc"]}</td>
                            <td>{item["amount"]}</td>
                            <td>{item["category"]}</td>
                            <td>{item["date"]}</td>
                            <td><button onClick={() => deleteItem(item["key"])}><i class="bi bi-trash"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <h2> add new todo item </h2>
            <input type="text" onKeyDown={handleKeyDown} id="desc" placeholder="description" /><br />
            <input type="text" onKeyDown={handleKeyDown} id="amount" placeholder="amount" /><br />
            <input type="text" onKeyDown={handleKeyDown} id="category" placeholder="category" /><br />
            <input type="text" onKeyDown={handleKeyDown} id="date" placeholder="date" /><br />
            <button onClick={() => add_item()}>add Todo</button>

            <h2> DEBUGGING: list of items in JSON </h2>
            <pre>
                {JSON.stringify(items, null, 5)}
            </pre>
        </div>

    );
}