import React from 'react';

export default function About() {
  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <h1>About</h1>
      <ul>
        <li>
          <h3>Description</h3>
          <p>This is an demo React app</p>
        </li>
        <li>
          <h3>Author Info</h3>
          <p>
            Steve Wang: <a href="https://github.com/Yell0wF1sh">https://github.com/Yell0wF1sh</a>
          </p>
        </li>
      </ul>
    </div>
  )
}
