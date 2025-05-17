import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import ReactGA from 'react-ga4';

const appName = import.meta.env.VITE_APP_NAME || 'Biashari | ERP';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// const SendAnalytics = () => {
//     ReactGA.send({
//       hitType: "pageview",
//       page: window.location.pathname,
//     });
//   }
  
//   if (process.env.NODE_ENV === 'production') {
//     ReactGA.initialize('G-31N7RXFEBL');
//     reportWebVitals(SendAnalytics)
//   }