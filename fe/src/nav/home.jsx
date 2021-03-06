import React from "react";
import auth from "../api/auth";

const Home = () => {
  const userName = auth.getCurrentUser();
  return (
    <React.Fragment>
      {!userName ? (
        <React.Fragment>
          <h2>Hello, Guest!</h2>
          <div className="alert alert-dark" role="alert">
            To fully explore the site, register. <br />
            If you have already registered, please login
          </div>
          <div className="alert alert-dark" role="alert">
            This is not a secure site. <br />
            Do NOT provide any sensitive or confidential data
          </div>
        </React.Fragment>
      ) : (
        <h2>Welcome back, {userName}</h2>
      )}
      <div className="alert alert-dark" role="alert">
        If you have just been introduced to the game of Bridge, you can practice
        bidding and get feedback from an AI
      </div>
      <div className="alert alert-dark" role="alert">
        This site is built with Django and React. <br />
        It is the developer's playground for experimentation. <br />
        You are welcome to access
        <a href="https://github.com/jeanmariepm/veed.git"> the source code</a>
      </div>
    </React.Fragment>
  );
};

export default Home;
