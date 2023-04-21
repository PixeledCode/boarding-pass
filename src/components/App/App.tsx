import React, { useState } from 'react';
import { barcodeFormats } from '../../config/constants';
import { usePassesStore } from '../../config/store';
import { checkIfFormatIsSupported } from '../../utils/helpers';
import { Card } from '../Card';
import { FileReader } from '../FileReader';
import styles from './App.module.scss';

function App() {
  const [supported, setSupported] = useState(false);
  const store = usePassesStore();

  React.useEffect(() => {
    if ('BarcodeDetector' in window) {
      const isSupported = checkIfFormatIsSupported(barcodeFormats);
      isSupported.then((res) => {
        setSupported(res);
        return;
      });
    }
    setSupported(false);
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <h1>Passes</h1>
        {supported && (
          <FileReader onValueChange={store.addPass} formats={barcodeFormats} />
        )}
      </header>

      <Card
        value={store.passes}
        update={store.updatePass}
        supported={supported}
      />
    </div>
  );
}

export { App };
