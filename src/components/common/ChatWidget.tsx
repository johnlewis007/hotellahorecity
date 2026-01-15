'use client';

import { useEffect } from 'react';

export default function ChatWidget() {
    useEffect(() => {
        // Inject the style link
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Inject the initialization script
        const script = document.createElement('script');
        script.type = 'module';
        script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      createChat({
        webhookUrl: 'https://n8n.srv924154.hstgr.cloud/webhook/55a75089-a945-4c66-aadb-d49cabc09285/chat'
      });
    `;
        document.body.appendChild(script);

        return () => {
            // Cleanup on unmount
            if (document.head.contains(link)) {
                document.head.removeChild(link);
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return null;
}
