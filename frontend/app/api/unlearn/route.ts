export async function POST(request: Request) {
    try {
        const args = request.url.split('?')[1];

        const url = "http://" + process.env.BACKEND_ADDRESS + ":" + process.env.BACKEND_PORT + "/unlearn?" + args;
        const response = await fetch(url, {
            method: 'POST'
        });
        const data = await response.json();

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({error: err}), { status: 500 });
    }
}