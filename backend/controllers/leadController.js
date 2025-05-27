const axios = require('axios');

exports.submitLead = async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email) {
    console.warn('Validation Error: Name and email are required.'); // Added logging
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn('Validation Error: Invalid email format provided.'); // Added logging
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Log the URL and payload being sent to n8n
  console.log('Attempting to send lead data to n8n webhook.');
  console.log('N8N_WEBHOOK_URL:', process.env.N8N_WEBHOOK_URL);
  console.log('Payload:', { name, email, company, message });

  try {
    const n8nResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
      name,
      email,
      company,
      message,
    });

    console.log('Successfully sent data to n8n.'); // Added success logging
    console.log('n8n Response Status:', n8nResponse.status); // Log n8n response status
    console.log('n8n Response Data:', n8nResponse.data);     // Log n8n response data

    res.status(200).json({ message: 'Lead submitted successfully.' });
  } catch (error) {
    console.error('Failed to send data to n8n.'); // General error message
    console.error('Error Details:', error.message); // Log the error message

    // Check if the error has a response from n8n (e.g., n8n returned an error status)
    if (error.response) {
      console.error('n8n Response Error Status:', error.response.status);
      console.error('n8n Response Error Data:', error.response.data);
      console.error('n8n Response Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received (e.g., n8n is not running or network issue)
      console.error('No response received from n8n. Is n8n running and accessible?');
    } else {
      // Something else happened in setting up the request that triggered an Error
      console.error('Error setting up the request to n8n:', error.config);
    }

    res.status(500).json({ error: 'Failed to send data to n8n.' });
  }
};