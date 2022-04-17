import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Demo from '../../pages';

const Layout = props => {
    return (
        <div className='main-layout'>
            <Demo />
        </div>
    );
};

Layout.propTypes = {

};

export default Layout;