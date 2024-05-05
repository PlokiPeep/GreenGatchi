export async function getLatestTrip(username, password) {
    try {
        // Define the parameters
        const params = {
            username: username,
            password: password,
            data_type: "trip"
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const url = 'https://ncrax06jza.execute-api.ap-southeast-2.amazonaws.com/V1/opaler';

        // Send POST request to the API endpoint with parameters
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
            console.log("Request was successful!");
            const responseData = await response.json(); // Extract JSON from the response
            const latestTrip = responseData[1];
            console.log("Response:");
            console.log(latestTrip); // Print the response body
            return latestTrip;
        } else {
            console.log("Request failed with status code:", response.status);
            console.log("Response:");
            const errorText = await response.text(); // Extract text from the response
            console.log(errorText); // Print the response body if available
            return false;
        }
    } catch (error) {
        console.log("An error occurred:", error);
    }
}


export async function getAccountData(username, password) {
    try {
        // Define the parameters
        const params = {
            username: username,
            password: password,
            data_type: "account"
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const url = 'https://ncrax06jza.execute-api.ap-southeast-2.amazonaws.com/V1/opaler';

        // Send POST request to the API endpoint with parameters
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
            console.log("Request was successful!");
            const responseData = await response.json(); // Extract JSON from the response
            console.log("Response:");
            console.log(responseData); // Print the response body
            return responseData;
        } else {
            console.log("Request failed with status code:", response.status);
            console.log("Response:");
            const errorText = await response.text(); // Extract text from the response
            console.log(errorText); // Print the response body if available
            return false;
        }
    } catch (error) {
        console.log("An error occurred:", error);
    }
}


export async function getCardData(username, password) {
    try {
        // Define the parameters
        const params = {
            username: username,
            password: password,
            data_type: "card"
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const url = 'https://ncrax06jza.execute-api.ap-southeast-2.amazonaws.com/V1/opaler';

        // Send POST request to the API endpoint with parameters
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
            console.log("Request was successful!");
            const responseData = await response.json(); // Extract JSON from the response
            console.log("Response:");
            console.log(responseData); // Print the response body
            return responseData;
        } else {
            console.log("Request failed with status code:", response.status);
            console.log("Response:");
            const errorText = await response.text(); // Extract text from the response
            console.log(errorText); // Print the response body if available
            return false;
        }
    } catch (error) {
        console.log("An error occurred:", error);
    }
}



export async function getInitialData(username, password) {
    try {
        // Define the parameters
        const cardParams = {
            username: username,
            password: password,
            data_type: "card"
        };

        const cardHeaders = {
            "Content-Type": "application/json"
        };

        const url = 'https://ncrax06jza.execute-api.ap-southeast-2.amazonaws.com/V1/opaler';

        // Send POST request to the API endpoint with parameters
        const cardResponse = await fetch(url, {
            method: 'POST',
            headers: cardHeaders,
            body: JSON.stringify(cardParams)
        });

        const cardResponseData = await cardResponse.json(); // Extract JSON from the response


        ////////////////////////////
        // Define the parameters
        const accountParams = {
            username: username,
            password: password,
            data_type: "account"
        };

        const accountHeaders = {
            "Content-Type": "application/json"
        };

        // Send POST request to the API endpoint with parameters
        const accountResponse = await fetch(url, {
            method: 'POST',
            headers: accountHeaders,
            body: JSON.stringify(accountParams)
        })

        // Check if the request was successful (status code 200)
        const accountResponseData = await accountResponse.json(); // Extract JSON from the response

        const initialData = {
            "firstName": accountResponseData.firstName,
            "lastName": accountResponseData.lastName,
            "cardNumber": cardResponseData[2].cardNumber,
            "email": accountResponseData.emailAddress,
            "confirmedTrips":[],
            "totalCO2": 0,
            "currentCredit": 348,
            "totalSaved": 0,
            "treeLevel": 3,
            "treePercentage": 0
        }

        console.log("Response:");
        console.log(initialData); // Print the response body
        return initialData;
    } catch (error) {
        console.log("An error occurred:", error);
    }
}



export async function greenGotchiAPI(cardNumber, initialData, tripData, getData) {
    try {
        // Define the parameters
        const params = {
            card_number: cardNumber,
            initial_data: initialData,
            trip_data: tripData,
            get_data: getData
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const url = 'https://ncrax06jza.execute-api.ap-southeast-2.amazonaws.com/V1/GreenGotchi_user_data';

        // Send POST request to the API endpoint with parameters
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
            console.log("Request was successful!");
            const responseData = await response.json(); // Extract JSON from the response
            console.log("Response:");
            console.log(responseData); // Print the response body
            return responseData;
        } else {
            console.log("Request failed with status code:", response.status);
            console.log("Response!!:");
            const errorText = await response.text(); // Extract text from the response
            console.log(errorText); // Print the response body if available
            return false;
        }
    } catch (error) {
        console.log("An error occurred:", error);
    }
}