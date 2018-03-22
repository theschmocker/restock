import styled from 'styled-components';

const Loader = styled.div`
    height: 3rem;
    width: 3rem;
    border-left: 3px solid green;
    border-radius: 100%;
    margin: 1rem auto;
    animation: 0.6s spin ease-in-out infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;


export default Loader;
