export async function getBestRoute(start_suburb, end_suburb, peak, commuter_type) {
    try {
        // Define the parameters with the required structure
        const params = {
            start_suburb: start_suburb,
            end_suburb: end_suburb,
            peak: peak,
            commuter_type: commuter_type,
            // Continue to include username and password if required by the API
            username: "polyesterfoambucket@gmail.com",
            password: "Powerpuffs2024!",
            data_type: "route"
        };

        const headers = {
            "Content-Type": "application/json"
        };

        const url = 'https://ncrax06jza.execute-api.ap-southeast-2.amazonaws.com/V1/cost_optimisation';

        // Send POST request to the API endpoint with parameters
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
            const responseData = await response.json(); // Extract JSON from the response
            // Since the 'body' is a string, parse it as JSON
            const bodyData = JSON.parse(responseData.body); 
            console.log("Response Data:", bodyData); // Print the parsed body data
            return {
                message: bodyData.message,
                cheapestOption: bodyData.cheapest_option,
                cheapestPrice: bodyData.cheapest_price
            };
        } else {
            console.log("Request failed with status code:", response.status);
            const errorText = await response.text(); // Extract text from the response
            console.log("Error Text:", errorText); // Print the response body if available
            return null;
        }
    } catch (error) {
        console.log("An error occurred:", error);
        return null;
    }
}
