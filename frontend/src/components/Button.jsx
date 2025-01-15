import PropTypes from 'prop-types';

export function Button({ children }) {
    return (
        <button className='rounded-lg border-grey border-2 p-2 items-center flex'>
            <img src="./button.svg" alt="Icon"/>
            <div className='px-4'>
            {children}
            </div>
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
};
