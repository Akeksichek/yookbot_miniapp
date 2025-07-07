import { useEffect } from 'react';
import { MainButton, ThemeParams } from '@tma.js/sdk';

export default function App() {
  useEffect(() => {
    const mainButton = new MainButton();
    mainButton
      .setText('Тестовая кнопка')
      .setBackgroundColor(ThemeParams.backgroundColor || '#0000ff')
      .show();

    return () => mainButton.hide();
  }, []);

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: ThemeParams.backgroundColor || '#ffffff',
      color: ThemeParams.textColor || '#000000',
      minHeight: '100vh'
    }}>
      <h1>Тестовый мини апп</h1>
      <p>Работай уже</p>
    </div>
  );
}