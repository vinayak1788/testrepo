export async function fetchData(dateRange = "3months", service = "all") {
    const response = await fetch(`http://127.0.0.1:8000/api/data?dateRange=${dateRange}&service=${service}`);
    
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
}
