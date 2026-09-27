/**
 * ResolvAI Frontend API Service
 * Pluggable adapter to connect to Member 4's FastAPI Backend
 * Endpoint: POST /analyze-complaint (proxied via Vite /api/analyze-complaint)
 */

export async function analyzeComplaintWithBackend(customerId, complaintText) {
  try {
    const response = await fetch('/api/analyze-complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customerId,
        complaint_text: complaintText
      })
    });

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.warn('Backend API call failed, falling back to local reasoning:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function checkBackendConnection() {
  try {
    // Attempt a light OPTIONS or test call to backend
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch('/api/docs', {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    return response.ok || response.status === 200 || response.status === 404;
  } catch (err) {
    return false;
  }
}
