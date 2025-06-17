import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  IconButton,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to simulate backend response
  const getResponseFromBackend = async (query) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock response - in a real app, you would call your actual backend API here
    const mockResponses = [
      "I've processed your query about file uploads. Here's what I found...",
      "The React component you requested has been generated successfully.",
      "I can help you with that. First, let's clarify your requirements...",
      "Based on your input, I recommend the following approach..."
    ];

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    setIsLoading(false);
    return randomResponse;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Get and display response
    const response = await getResponseFromBackend(input);
    const botMessage = { text: response, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);

    // Clear input
    setInput('');
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '900px',
      margin: '0 auto',
      padding: 2,
      gap: 2
    }}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        AI Assistant
      </Typography>
      <Divider />

      {/* Messages display area */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: 2,
          backgroundColor: '#f9f9f9',
          borderRadius: 2
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary'
          }}>
            <Typography>Generate Pseudo code for the uploaded LLD</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: 2,
                    backgroundColor: message.sender === 'user' ? '#e3f2fd' : '#ffffff',
                    borderRadius: message.sender === 'user'
                      ? '18px 18px 0 18px'
                      : '18px 18px 18px 0'
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign: message.sender === 'user' ? 'right' : 'left',
                    color: 'text.secondary',
                    mt: 0.5
                  }}
                >
                  {message.sender === 'user' ? 'You' : 'Assistant'}
                </Typography>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{
                alignSelf: 'flex-start',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <CircularProgress size={20} />
                <Typography variant="body2">Thinking...</Typography>
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* Input area */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <TextField
          multiline
          minRows={3}
          maxRows={6}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your query here..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#ffffff'
            }
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton onClick={handleClear} color="secondary">
            <RefreshIcon />
          </IconButton>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            disabled={!input.trim() || isLoading}
            sx={{
              borderRadius: 2,
              padding: '8px 16px'
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInterface;