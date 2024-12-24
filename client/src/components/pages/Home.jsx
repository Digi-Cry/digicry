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
  const [userLocation, setUserLocation] = useState(null);




  
  // UPCOMING EVENTS FEATURE
  /**
   * fetchEvents() - fetches all events from db
   * getUserLoc - gets user location, returns a promise
   * fetchEventsByLoc - checks for user location before calling fetchEvents
   */

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
  };

  const getUserLoc = () => {
  return new Promise((resolve, reject) => {
    // if browser supports geolocation webextension
    if (navigator.geolocation) {
      // get user location obj
      navigator.geolocation.getCurrentPosition((position) => {
          // get access to lat and long values from GeoLocationCoordinates obj
          const { latitude, longitude } = position.coords;
          // set user location state
          setUserLocation({ latitude, longitude });
          // resolve promise
          resolve();
        },
        // error case
        (error) => {
          console.error('Failed to get user location');
          reject(error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser');
      reject(error);
    }
  });
};

  const fetchEventsByLoc = () => {
    // check if we have the user's location
    if (!userLocation) {
      // if not, request user to grant access
      getUserLoc()
        .then(() => {
          fetchEvents()
        })
        .catch((err) => {
          console.error('Error getting user location and fetching events', err);
        })
    } else {
      // if we already have the user's location
      fetchEvents()
        .catch((err) => {
          console.error('Error fetching events by location', err);
        })
    };
  };




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



  // Fetch motivational quote when the component mounts
  useEffect(() => {
    // Call the fetchQuote function
    fetchQuote();
    fetchEventsByLoc();
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


                    <div className="event-card-wrapper">


                      <div className="event-title">
                        {event.title}
                      </div>


                      <div className="event-description">
                        {event.description}
                      </div>


                      <div className="event-image-wrapper">

                      </div>


                      <div className="event-info-wrapper">
                        <div className="event-date">
                          {event.date}
                        </div>

                        <div className="event-location">
                          {event.location[0]}
                          {event.location[1]}
                          {event.venueName}
                        </div>

                      </div>

                    </div>

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


