import React, { useState } from "react";
import "./styles.css";
import Transaction from "./Transaction";
import About from './About';
import NavBar from './NavBar';
import Main from './Main';
import Summary from "./Summary";

export default function App() {
  let [page, setPage] = useState('Main')

  let theApp
  if (page == 'Transaction') {
    theApp = <Transaction />
  } else if (page == "About") {
    theApp = <About />
  } else if (page == "Main") {
    theApp = <Main />
  } else if (page == 'Summary') {
    theApp = <Summary choice="category" />
  }
  return (
    <>
      <NavBar setPage={setPage} />
      {theApp}
    </>

  )
}
