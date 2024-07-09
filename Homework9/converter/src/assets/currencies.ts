const fetchCurrencies = async () => {
    try {
        const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

let currencies: { [key: string]: string } | null = null;

const loadCurrencies = async () => {
    if (!currencies) {
        currencies = await fetchCurrencies();
    }
};

export { currencies, loadCurrencies };