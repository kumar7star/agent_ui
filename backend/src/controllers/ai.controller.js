const axios = require('axios');

/**
 * @desc    Send messages to AI API (Anthropic or Groq)
 * @route   POST /api/ai/messages
 * @access  Private
 */
const sendMessages = async (req, res) => {
  try {
    const { messages, model = 'claude-3-opus-20240229', max_tokens = 4096, system = '' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Messages array is required and must not be empty',
      });
    }

    // Validate each message has the required structure
    for (const message of messages) {
      if (!message.role || !['user', 'assistant'].includes(message.role)) {
        return res.status(400).json({
          success: false,
          message: 'Each message must have a valid role (user or assistant)',
        });
      }

      if (!message.content || !Array.isArray(message.content) || message.content.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Each message must have a content array that is not empty',
        });
      }

      // Validate each content item
      for (const item of message.content) {
        if (!item.type || !['text', 'image'].includes(item.type)) {
          return res.status(400).json({
            success: false,
            message: 'Each content item must have a valid type (text or image)',
          });
        }

        if (item.type === 'text' && typeof item.text !== 'string') {
          return res.status(400).json({
            success: false,
            message: 'Text content must have a text property that is a string',
          });
        }

        if (item.type === 'image' && (!item.source || !item.source.type || !item.source.media_type)) {
          return res.status(400).json({
            success: false,
            message: 'Image content must have a valid source object with type and media_type',
          });
        }
      }
    }

    // Determine which API to use based on the model or configuration
    const isGroqModel = model.startsWith('llama') || model.startsWith('mixtral') || process.env.USE_GROQ_API === 'true';
    
    if (isGroqModel) {
      // Use Groq API
      if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({
          success: false,
          message: 'Groq API key is not configured',
        });
      }

      // Convert messages format for Groq if needed
      const groqMessages = messages.map(message => {
        // For Groq, we need to convert the content array to a single string for text messages
        if (message.content && Array.isArray(message.content)) {
          const textContent = message.content
            .filter(item => item.type === 'text')
            .map(item => item.text)
            .join('\n');
          
          return {
            role: message.role,
            content: textContent
          };
        }
        return message;
      });

      // Prepare the request to Groq API
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: isGroqModel ? model : 'llama3-70b-8192', // Default to llama3 if model not specified
          messages: groqMessages,
          max_tokens: max_tokens,
          temperature: 0.7,
          system: system || undefined
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          },
        }
      );

      // Transform Groq response to match Anthropic format for consistency
      const transformedResponse = {
        id: response.data.id,
        content: response.data.choices[0].message.content,
        model: response.data.model,
        role: 'assistant',
        stop_reason: response.data.choices[0].finish_reason,
        type: 'message'
      };

      // Return the transformed response
      return res.status(200).json({
        success: true,
        data: transformedResponse,
      });
    } else {
      // Use Anthropic API
      if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(500).json({
          success: false,
          message: 'Anthropic API key is not configured',
        });
      }

      // Prepare the request to Anthropic API
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model,
          messages,
          max_tokens,
          system,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
        }
      );

      // Return the response from Anthropic
      return res.status(200).json({
        success: true,
        data: response.data,
      });
    }
  } catch (error) {
    console.error('Error calling AI API:', error.response?.data || error.message);
    
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.error?.message || 'Error processing your request',
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  sendMessages,
};
