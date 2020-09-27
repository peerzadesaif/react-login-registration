import React from 'react'
import { EdtLoop32 } from '@carbon/icons-react';

const LeftComponent = () => {
    return (
        <React.Fragment>
            <div style={{ padding: 40 }}>
                <p style={{ fontSize: 26, fontWeight: 'bold' }}>
                    Risk-centered</p>
                <h4>Vulnerability Management</h4>
            </div>
            <div style={{ padding: 40, position: 'absolute', bottom: 0, maxWidth: '25%' }}>
                <div>
                    <EdtLoop32 />
                    <p style={{ fontSize: 16, fontWeight: 400 }}>Security WorkFlows</p>
                    <br />
                    <p style={{ fontSize: 12 }}>Create and run playbooks to integrate security into your CI/CD pipeline</p>
                </div>
                <ul style={{ marginTop: 30 }}>
                    <li style={{ height: 6, width: 6, borderRadius: '50%', border: '1px solid #FFFFFF', display: 'inline-block', marginLeft: 3 }}></li>
                    <li style={{ height: 6, width: 6, borderRadius: '50%', border: '1px solid #FFFFFF', display: 'inline-block', marginLeft: 3 }}></li>
                    <li style={{ height: 6, width: 6, borderRadius: '50%', background: '#FFFFFF', display: 'inline-block', marginLeft: 3 }}></li>
                </ul>
            </div>
        </React.Fragment>
    )
}

export default LeftComponent
