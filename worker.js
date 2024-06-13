addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // Read the CF-Connecting-IP and CF-IPCountry headers
    const clientIp = request.headers.get('CF-Connecting-IP')
    const clientCountry = request.headers.get('CF-IPCountry')

    // Ensure an IP is present
    if (!clientIp) {
        return new Response('IP address not found', { status: 400 })
    }

    // Return the client IP address and country
    return new Response(JSON.stringify({
            ip: clientIp,
            country_code: clientCountry,
            country_name: clientCountry
        }
    ), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Allow all origins for CORS
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    })
}
