import { useMainButton, useThemeParams } from '@tma.js/sdk-react';
import Main from './components/main';

export default function App() {
  const mainButton = useMainButton();
  const themeParams = useThemeParams();

  useEffect(() => {
    mainButton
      .setText('Поиск товаров')
      .setBackgroundColor(themeParams.buttonColor || '#0000ff')
      .show();

    return () => mainButton.hide();
  }, [mainButton, themeParams]);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: themeParams.backgroundColor || '#ffffff',
      color: themeParams.textColor || '#000000',
      minHeight: '100vh'
    }}>
      <Main />
    </div>
  );
}