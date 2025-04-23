import { useEffect } from 'react';

const CHANNEL_NAME = 'nuevos_comprobantes';

export const useBroadcastChannel = (onMessageCallback) => {
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);

    const handleMessage = (event) => {
      if (event.data && event.data.local) {
        onMessageCallback(event.data.local);
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.close();
    };
  }, [onMessageCallback]);
};

export const enviarMensajeNuevoComprobante = (local) => {
  try {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ local });
    channel.close();
  } catch (error) {
    console.error('Error al enviar mensaje por BroadcastChannel:', error);
  }
};