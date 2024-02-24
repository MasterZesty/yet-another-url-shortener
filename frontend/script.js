// script.js

// Debounce function to delay the API call and reduce the number of requests
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkAliasAvailability() {
    const aliasInput = document.getElementById('alias');
    const aliasValue = aliasInput.value;

    // Make an AJAX request to check the alias availability
    fetch(`http://127.0.0.1:5000/api/v1/alias_available/${aliasValue}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.data.is_alias_available)
            // Handle the response to inform the user about alias availability
            const availabilityMessage = document.getElementById('aliasAvailability');
            if (data.data.is_alias_available == "false") {
                availabilityMessage.textContent = `${aliasValue} is available!`;
                availabilityMessage.classList.remove('text-red-600');
                availabilityMessage.classList.add('text-green-600');
            } else {
                availabilityMessage.textContent = `oops! ${aliasValue} not available please try another`;
                availabilityMessage.classList.remove('text-green-600');
                availabilityMessage.classList.add('text-red-600');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error scenarios if needed
        });
}

function shortenUrl() {
    const urlInput = document.getElementById('original_url');
    const urlValue = urlInput.value;
    const aliasInput = document.getElementById('alias');
    const aliasValue = aliasInput.value;
    const errorMessage = document.getElementById('error_msg')

    if (!urlValue || !aliasValue) {
        errorMessage.textContent = `Please provide both url and alias.`;
        errorMessage.classList.remove('text-green-600');
        errorMessage.classList.add('text-red-600');
        // console.error("Please provide both original_url and alias parameters.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "original_url": urlValue,
        "custom_alias": aliasValue
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/api/v1/shorten", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                // console.log(result)
                errorMessage.textContent = `Shortened URL created successfully!`;
                errorMessage.classList.remove('text-red-600');
                errorMessage.classList.add('text-green-600');
                // console.log("Shortened URL created successfully:", result.data.url);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error scenarios if needed
        });
    
}

// Attach a debounced event listener to check alias availability as the user types
document.getElementById('alias').addEventListener('input', debounce(checkAliasAvailability, 500));
document.getElementById('submit_button_yaus').addEventListener('click', shortenUrl);