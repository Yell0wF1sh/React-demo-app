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

export default function Summary({ choice }) {
    const [c, setC] = useState(choice)
    const [items, setItems] = useState(summarize(getItemsFromLocalStorage()));

    function summarize(items) {
        let summary = []

        items.forEach((item) => {
            let newSummary = {}
            if (c == 'date') {
                newSummary = {
                    amount: item.amount,
                    filter: item.date,
                }
            } else if (c == 'month') {
                newSummary = {
                    amount: item.amount,
                    filter: item.date.split('/')[0] + '/' + item.date.split('/')[2],
                }
            } else if (c == 'year') {
                newSummary = {
                    amount: item.amount,
                    filter: item.date.split('/')[2],
                }
            } else if (c == 'category') {
                newSummary = {
                    amount: item.amount,
                    filter: item.category,
                }
            }
            let index = summary.findIndex((x) => x.filter === newSummary.filter)
            if (index != -1) {
                summary[index].amount = parseInt(summary[index].amount) + parseInt(newSummary.amount)
            } else {
                summary.push(newSummary)
            }
        })

        return summary
    }

    useEffect(() => {
        setItems(summarize(getItemsFromLocalStorage()))
    }, [c])

    return (
        <div className="App container">
            <h1 className="bg-warning text-center p-2">Transaction</h1>
            <ul>
                <li><a onClick={() => setC('date')} href="#">summarize by date</a></li>
                <li><a onClick={() => setC('month')} href="#">summarize by month</a></li>
                <li><a onClick={() => setC('year')} href="#">summarize by year</a></li>
                <li><a onClick={() => setC('category')} href="#">summarize by category</a></li>
            </ul>
            <table class="table table-bordered table-striped">
                <tbody>
                    <tr className="bg-info">
                        <th>amount</th>
                        <th>{c}</th>
                    </tr>
                    {items.map((item) => (
                        <tr>
                            <td>{item.amount}</td>
                            <td>{item.filter}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}