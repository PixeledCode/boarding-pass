import { usePassesStore } from '../../config';
import React, { useState } from 'react';
import { checkIfFormatIsSupported } from '../../utils/helpers';
import { Card } from '../Card';
import { FileReader } from '../FileReader';
import styles from './App.module.scss';

const formats = ['aztec', 'data_matrix', 'pdf417', 'qr_code'];

function App() {
  const [supported, setSupported] = useState(false);
  const store = usePassesStore();

  React.useEffect(() => {
    if ('BarcodeDetector' in window) {
      const isSupported = checkIfFormatIsSupported(formats);
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
          <FileReader onValueChange={store.addPass} formats={formats} />
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