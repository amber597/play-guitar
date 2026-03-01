
export async function getSong(songUrl: string) {
    const response = await fetch(songUrl);
    return response.arrayBuffer();
}