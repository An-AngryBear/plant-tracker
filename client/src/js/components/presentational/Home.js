import React from 'react';
import createReactClass from 'create-react-class';

const Home = createReactClass({
    render: function() {
        return (
            <div className="home-container">
                <div className="site-intro">
                    <h1 className="landing-title">Plant Tracker</h1>
                    <p className="landing-desc">Track the growth of your plants through progress pictures. Compare your plants to other users. Have information on your plants. All in one place!</p>
                    <button className="get-started">Get Started</button>
                    <p>Already have an account? <a>Sign in</a></p>
                </div>
            </div>
        )
    }
});



export default Home;