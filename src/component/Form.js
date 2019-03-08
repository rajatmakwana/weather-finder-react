import React from 'react';

const Form = props => (
            <div>
                <form onSubmit={(e)=>props.getWeather(e)}>
                    <input type="text" name="city" placeholder="City..." />
                    <input type="text" name="country" placeholder="Country..." />
                    <button >Get Weather</button>
                 </form>
            </div>
            
        );

export default Form;