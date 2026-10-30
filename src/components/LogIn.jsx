import { useState } from "react";

async function fetchToken(username, password) {

    console.log({username: username, password: password});
    
    const response = await fetch("https://blog-api-iv3t.onrender.com/log-in", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {'Content-type': 'application/json'},
    });

    let data = await response.json();

    console.log(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.username);
    console.log(localStorage);

    console.log('Bearer '+localStorage.getItem('token'));

    const response2 = await fetch("https://blog-api-iv3t.onrender.com/protected", {
        method: "GET",
        headers: {'authorization': 'Bearer '+localStorage.getItem('token'),
        'Accept': 'application/json'
        },
    });

    const data2 = await response2.json();

    console.log(data2);
    
};

function LogIn() {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setpasswordValue] = useState("");

    return(

    <div>

            <label>
                Username: {' '}
                <input
                type="text"
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}/>
            </label>

            <label>
                Password: {' '}
                <input
                type="text"
                value={passwordValue}
                onChange={(e) => setpasswordValue(e.target.value)}/>
            </label>
        
            <button 
                    type='submit'
                    onClick={() => fetchToken(usernameValue, passwordValue)}
                    >Log In
            </button>

    </div>

    )

}

export default LogIn;