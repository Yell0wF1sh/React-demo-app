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
        <body>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </symbol>
            </svg>

            <div className="App container">
                <h1 className="bg-warning text-center p-2">Transaction</h1>
                <div class="alert alert-primary d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use href="#info-fill" /></svg>
                    <div>
                        Summarized by <text style={{ fontWeight: "bold" }}>{c}</text>
                    </div>
                </div>
                <div class="btn-group text-center col-12 mb-3" role="group" aria-label="summaryControl">
                    <button type="button" class="btn btn-success" onClick={() => { setC('date') }}>summarize by date</button>
                    <button type="button" class="btn btn-info" onClick={() => { setC('month') }}>summarize by month</button>
                    <button type="button" class="btn btn-danger" onClick={() => { setC('year') }}>summarize by year</button>
                    <button type="button" class="btn btn-primary" onClick={() => { setC('category') }}>summarize by category</button>
                </div>
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
        </body>
    )
}