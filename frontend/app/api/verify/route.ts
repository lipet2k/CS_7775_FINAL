export async function GET(request: Request) {
    try {
        const args = request.url.split('?')[1];
        const url = "http://" + process.env.BACKEND_ADDRESS + ":" + process.env.BACKEND_PORT + "/verify?" + args;
        const response = await fetch(url);
        const data = await response.json();

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({error: err}), { status: 200 });
    }
}