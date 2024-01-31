const { useEffect } = require("react");
const { useNavigate } = require("react-router-dom");
const PropTypes = require("prop-types");
function Protected(props){
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('token');
        if(!login){
            navigate('/authentication/sign-in/cover')
        }
    });
    return(
        <div>
            <Component/>
        </div>
    )
}

Protected.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default Protected;