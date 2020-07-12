import React, { useState, useEffect } from 'react';

export default function PageForm() {

    return (
        <form id='pageForm' style={{ position: 'fixed', top: '30px', right: '10px', zIndex: 2, backgroundColor: 'white' }}>
            <input id='page1' name='page' type='radio' onClick={() => window.location.href = '/cost_of_living'}></input>
            <label for="page1" style={{ fontSize: '13px' }}> Living Cost</label><br></br>
            <input id='page2' name='page' type='radio' onClick={() => window.location.href = '/purchase_power'}></input>
            <label for="page2" style={{ fontSize: '13px' }}> Purchase Power</label><br></br>
            <input id='page3' name='page' type='radio' onClick={() => window.location.href = '/rent'}></input>
            <label for="page3" style={{ fontSize: '13px' }}> Rent</label><br></br>
            <input id='page4' name='page' type='radio' onClick={() => window.location.href = '/groceries'}></input>
            <label for="page4" style={{ fontSize: '13px' }}> Groceries</label><br></br>
        </form>
    );
}