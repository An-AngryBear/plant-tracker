import React from 'react';
import { Link } from 'react-router';
import FormContainer from "../container/FormContainer";
import createReactClass from 'create-react-class';



const MainLayout = createReactClass({
    render: function() {
        return (
            <div>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
});

export default MainLayout;