/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";

function Home() {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState([]);

  // Function to fetch quote from the API
  const fetchQuote = () => {
    // Log to the console to indicate that quote fetching has started
    console.log("Fetching motivational quote...");

    // Set is loading to true before starting the fetch
    setIsLoading(true);
    setError(null); // Reset any previous errors

    // Make a GET request to the Stoicism Quote API
    axios
      .get("/api/stoic-quote")
      .then((response) => {
        // Log the successful response
        console.log("Quote fetched successfully:", response.data);

        // Extract quote data from the response
        const fetchedQuote = response.data.data;

        // Update the 'quote' state with the fetched data
        setQuote(fetchedQuote);

        // Set loading to false as the data has been fetched
        setIsLoading(false);
      })
      .catch((err) => {
        // Log the error
        console.error("Error fetching quote:", err);

        // Update the 'error' state with the error message
        setError("Failed to fetch quote. Please try again later.");

        // Set loading to false as the fetch attempt has concluded
        setIsLoading(false);
      });
  };

  // Axios GET request to retrieve upcoming events from DB
  /** NOTE: This will be refactored many times. */
  // const fetchEvents = () => {
  //   axios.get('/api/events/all', {
  //     params: {
  //       limit: 8,
  //     }
  //   })
  //     .then((response) => {
  //       const eventData = response.data;
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching events from DB', err);
  //     })
  // }

  const fetchEvents = () => {
    axios.get('/api/events/all')
      .then((response) => {
        // assign variable to response data - eventData is used to map over data in render
        const eventData = response.data;
        // update state
        setEventData(eventData);
      })
      .catch((err) => {
        console.error('Error fetching events from DB', err);
      })
  }

  // Fetch motivational quote when the component mounts
  useEffect(() => {
    // Call the fetchQuote function
    fetchQuote();
    fetchEvents();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Helper function to render quote content based on that state
  const renderQuoteContent = () => {
    if (isLoading) {
      // Display a loading spinner while fetching the quote
      return <CircularProgress />;
    }
    if (error) {
      return (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      );
    }
    if (quote) {
      // Display the fetched quote and author
      return (
        <Box mt={2}>
          <Typography variant="body1" className="motivational-quote">
            "{quote.quote}"
          </Typography>
          <Typography variant="body2" className="quote-author">
            - {quote.author}
          </Typography>
        </Box>
      );
    }
    // In case quote is null but not loading or error
    return null;
  };

  // Wrapped all content in a single Box
  return (
    <Box className="main-container">
      <Box>
        {/* Daily Inspiration Section */}
        <Box className="glass-panel quote-panel" sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" className="section-title">
              Daily Inspiration
            </Typography>
            <IconButton onClick={fetchQuote} disabled={isLoading}>
              <RefreshIcon />
            </IconButton>
          </Box>
          {renderQuoteContent()}
        </Box>

        <Box className="glass-panel voice-panel" sx={{ mb: 4 }}>
          <Typography variant="h4" className="section-title">
            Mood Analytics
          </Typography>
          <Box className="voice-analytics-container">
            <Box className="voice-visualization-placeholder">
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                Share how you're feeling...
              </Typography>
            </Box>
          </Box>
        </Box>

        <Stack spacing={4} className="content-stack">
          <Box className="glass-panel mood-panel">
            <Typography variant="h4" className="section-title">
              Track Your Mood
            </Typography>
            <Typography variant="body1" className="section-description">
              Document your emotional journey and gain insights into your
              well-being
            </Typography>
            <Box className="mood-preview">
              <div className="mood-graph-placeholder" />
            </Box>
          </Box>

          <Box className="glass-panel events-panel">
            <Typography variant="h4" className="section-title">
              Local Events
            </Typography>
            <Typography variant="body1" className="section-description">
              Connect with your community
            </Typography>
            <Box className="events-preview">

              {
                eventData.map((event) => {
                  return <div className="event-card-placeholder" key={event._id}>
                    <p>Title: {event.title}</p>
                    <p>Date: {event.date}</p>
                    <p>Location: {event.location[0]}</p>
                    <p>City: {event.location[1]}</p>
                    <p>Description: {event.description}</p>
                    <p>Venue: {event.venueName}</p>

                  </div>
                })
              }
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;


/**
 * {
 *       "_id": "6769cdfeb7c828cb5a596123",
 *       "title": "New Orleans Jazz Festival - Weekend 1 - 4 Day Pass",
 *       "date": "Thu, Apr 24, 10:59 AM – 12:29 PM",
 *       "location": [
 *         "Fair Grounds Race Course & Slots, 1751 Gentilly Blvd",
 *         "New Orleans, LA"
 *       ],
 *       "description": "About The New Orleans Jazz & Heritage Festival The New Orleans Jazz & Heritage Festival, or as the locals call it, Jazz Fest, is the celebration of the unique culture and heritage of New Orleans...",
 *       "venueName": "Fair Grounds Race Course & Slots",
 *       "linkUrl": "https://www.neworleans.com/event/new-orleans-jazz-%26-heritage-festival/3197/",
 *       "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoaeFe1WIVnxpELu4GUI9jNx8RMl2NsrfOXj6xdSkbDg8LIzOJ2c0fhx0&s",
 *       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWqY9dMlcwH1rKP7BAz6HjKGOwYIvotvpuyMKwrLxKhA&s=10",
 *       "__v": 0
 *     },
 */