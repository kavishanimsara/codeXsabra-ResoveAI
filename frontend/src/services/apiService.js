/**
 * ResolvAI Frontend API Service
 * Adapter to connect React Frontend to FastAPI Backend (port 8000 & Vite Proxy)
 */

const BASE_URLS = [
  '',                             // Relative via Vite Proxy (/api/... or /...)
  'http://127.0.0.1:8000',        // Direct FastAPI Backend
  'http://localhost:8000'         // Localhost Backend
];

export async function fetchCustomerScenarios() {
  const pathVariants = ['/api/scenarios', '/scenarios', '/api/customers', '/customers'];
  
  for (const base of BASE_URLS) {
    for (const path of pathVariants) {
      try {
        const url = `${base}${path}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            return { success: true, data };
          }
        }
      } catch (err) {
        // try next variant
      }
    }
  }

  return {
    success: false,
    error: 'Failed to connect to backend scenarios API'
  };
}

export async function analyzeComplaintWithBackend(customerId, complaintText) {
  const pathVariants = ['/api/analyze-complaint', '/analyze-complaint'];
  const payload = JSON.stringify({
    customer_id: customerId,
    complaint_text: complaintText || ''
  });

  for (const base of BASE_URLS) {
    for (const path of pathVariants) {
      try {
        const url = `${base}${path}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload
        });
        if (response.ok) {
          const data = await response.json();
          return { success: true, data };
        }
      } catch (err) {
        // try next variant
      }
    }
  }

  return {
    success: false,
    error: 'Failed to analyze complaint via backend'
  };
}

export async function executeResolutionWithBackend(customerId, amount, resolutionType = 'REFUND', notes = '') {
  const pathVariants = ['/api/resolve', '/resolve'];
  const payload = JSON.stringify({
    customer_id: customerId,
    amount: amount || 0.0,
    resolution_type: resolutionType,
    notes: notes
  });

  for (const base of BASE_URLS) {
    for (const path of pathVariants) {
      try {
        const url = `${base}${path}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload
        });
        if (response.ok) {
          const data = await response.json();
          return { success: true, data };
        }
      } catch (err) {
        // try next variant
      }
    }
  }

  return {
    success: false,
    error: 'Failed to execute resolution via backend'
  };
}

export async function checkBackendConnection() {
  const checkUrls = [
    '/api/health',
    '/health',
    'http://127.0.0.1:8000/health',
    'http://localhost:8000/health'
  ];

  for (const url of checkUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(url, { method: 'GET', signal: controller.signal });
      clearTimeout(timeoutId);
      if (response.ok) return true;
    } catch (err) {
      // try next
    }
  }
  return false;
}
