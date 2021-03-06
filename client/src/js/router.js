import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//layouts
import MainLayout from './components/presentational/main-layout';

//pages
import Home from './components/presentational/Home';

export default (
    <BrowserRouter>
        <MainLayout>
        
            <Route path="/" component={Home}/>

        </MainLayout>
    </BrowserRouter>
)

