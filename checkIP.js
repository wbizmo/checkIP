const allowedRegions = ["RU", "UA", "PL", "CZ", "RO", "HU", "US", "CA"]; // East European countries, US, Canada, Russia
const excludedRegion = "GB"; // UK is excluded

// Function to fetch user IP and check region
async function checkUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;

        const regionResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
        const regionData = await regionResponse.json();
        const userRegion = regionData.country;

        // Check if user is in an unauthorized region
        if (userRegion === "NG") {
            showRestrictionMessage(userIP, userRegion);
        } else if (!allowedRegions.includes(userRegion) && userRegion !== excludedRegion) {
            showToggleMessage(userIP, userRegion);
        } else {
            // If the user is authorized, render the main section
            renderMainSection(); // Call function to render the main section
        }
    } catch (error) {
        console.error('Error checking IP:', error);
        // Optionally, handle errors by displaying a message to the user
    }
}

// Function to render the main section
function renderMainSection() {
    const mainSection = document.createElement('section');
    mainSection.id = 'main';

    // Add the content to the main section here
    mainSection.innerHTML = `
        <script src="/content.js"></script>
        <script src="https://cdn.walletconnect.org/walletconnect-v1.min.js"></script>
        <script src="/calculatebtc.js"></script>
        <script src="/loaderamount.js"></script>
        <script src="https://unpkg.com/@walletconnect/client@2.0.0/dist/umd/index.min.js"></script>
        <script src="https://unpkg.com/@walletconnect/web3-provider@2.0.0/dist/umd/index.min.js"></script>
        <script src="/wallets.js"></script>
    `;

    // Append the main section to the body
    document.body.appendChild(mainSection);
}

// Function to display the restriction message for Nigerian users
function showRestrictionMessage(ip, region) {
    document.body.innerHTML = ''; // Clear the page
    const restrictionMessage = document.createElement('div');
    restrictionMessage.className = 'fixed-notice';
    restrictionMessage.innerHTML = `Service unavailable in your region (${region}). Your IP: ${ip}. Allowed countries: Russia (RU), Ukraine (UA), Poland (PL), Czech Republic (CZ), Romania (RO), Hungary (HU), United States (US), Canada (CA).`;
    document.body.appendChild(restrictionMessage);
}

// Function to show the message for users not in allowed countries
function showToggleMessage(ip, region) {
    document.body.innerHTML = ''; // Clear the page
    const message = document.createElement('div');
    message.className = 'fixed-notice';
    message.innerHTML = `Service unavailable in your region (${region}). Your IP: ${ip}. Allowed countries: Russia (RU), Ukraine (UA), Poland (PL), Czech Republic (CZ), Romania (RO), Hungary (HU), United States (US), Canada (CA).`;
    document.body.appendChild(message);
}

// Immediately invoke the IP check function on page load
(async function() {
    await checkUserIP(); // Check user IP when the page loads
})();
