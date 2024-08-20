import React from 'react';
import PropTypes from 'prop-types';

function Alerts(props) {
    return (
        <>
        <div style={{height: '40px'}}>
            {props.customAlert && (
              <div className={`alert alert-${props.customAlert.type}`} role="alert">
                    {props.customAlert.message}
                </div>
            )}
            </div>
        </>
    );
}

Alerts.propTypes = {
  customAlert: PropTypes.object // Expecting the correct prop type
};

export default Alerts;
