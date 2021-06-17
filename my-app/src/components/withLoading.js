import React from 'react';

const DefaultLoaderComponent = () => <p>Retrieving the data...</p>

const WithLoading = (Component, LoaderComponent = DefaultLoaderComponent) => {
    return ({ isLoading, ...props }) => {
        if (!isLoading) return <Component {...props} />;
        return <LoaderComponent />;
    }
}
export default WithLoading;
