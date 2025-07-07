import { useEffect, useState } from 'react';

export default function Main() {
  const [productName, setProductName] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Получаем название товара из URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProductName(params.get('product') || 'iPhone 15');
  }, []);

  // Поиск на Amazon через ScraperAPI
  const searchAmazon = async () => {
    if (!productName) return;
    
    setLoading(true);
    try {
      const apiKey = process.env.SCRAPER_API_KEY;
      const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}`;
      const apiUrl = `https://api.scraperapi.com/?api_key=${apiKey}&url=${encodeURIComponent(amazonUrl)}`;
      
      const response = await fetch(apiUrl);
      const html = await response.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const items = [];
      
      doc.querySelectorAll('.s-result-item').forEach((item, index) => {
        if (index >= 3) return;
        
        const title = item.querySelector('h2 a span')?.textContent?.trim();
        const price = item.querySelector('.a-price .a-offscreen')?.textContent;
        const url = item.querySelector('h2 a')?.href;
        
        if (title && price) {
          items.push({ title, price, url });
        }
      });
      
      setResults(items);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchAmazon();
  }, [productName]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Поиск: {productName}</h1>
      
      {loading ? (
        <p>Ищем на Amazon...</p>
      ) : (
        <div>
          {results.length > 0 ? (
            results.map((item, index) => (
              <div key={index} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
                <h3>{item.title}</h3>
                <p>Цена: {item.price}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Открыть на Amazon
                </a>
              </div>
            ))
          ) : (
            <p>Товары не найдены</p>
          )}
        </div>
      )}
    </div>
  );
}