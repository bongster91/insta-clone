export const apiURL = () => {
    return window.location.hostname === 'localhost'
        ? 'http://localhost:9000'
        : 'https://us-east-1.aws.data.mongodb-api.com/app/data-bmijk/endpoint/data/v1'
};