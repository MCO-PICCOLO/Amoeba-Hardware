import { useState, useRef, useEffect } from 'react';
import './App.css';
import SystemMonitor from './pages/SystemMonitor';

const App = () => {
  const [resetKey, setResetKey] = useState<number>(0);
  const resetTimerRef = useRef<number | null>(null);

  // const startResetTimer = () => {
  //   if (resetTimerRef.current) {
  //     clearTimeout(resetTimerRef.current);
  //   }
  //   resetTimerRef.current = setTimeout(() => {
  //     handleReset();
  //   }, 30 * 60 * 1000);
  //   // }, 60 * 1000);
  // };

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    console.log('Reset triggered', resetKey);

    // startResetTimer();
  };

  useEffect(() => {
    // startResetTimer();

    setInterval(() => {
      const measures = performance.getEntriesByType('measure');
      if (measures.length > 0) {
        console.log(`Clearing ${measures.length} measures`);
        performance.clearMeasures();
        performance.clearMarks();
      }
    }, 30000); // 30초마다

    return () => {
      // if (resetTimerRef.current) {
      //   clearTimeout(resetTimerRef.current);
      // }
    };
  }, []);

  return (
    <div>
      <SystemMonitor key={resetKey} />
      <div
        className="hidden-reset-key"
        style={{
          position: 'absolute',
          left: '1880px',
          top: '1040px',
          width: '40px',
          height: '40px',
        }}
        onClick={() => {
          handleReset();
        }}
      ></div>
    </div>
  );
};

export default App;
