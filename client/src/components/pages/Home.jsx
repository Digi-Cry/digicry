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

  const testData = [
    {
      "_id": "6769cdfeb7c828cb5a596123",
      "title": "New Orleans Jazz Festival - Weekend 1 - 4 Day Pass",
      "date": "Thu, Apr 24, 10:59 AM – 12:29 PM",
      "location": [
        "Fair Grounds Race Course & Slots, 1751 Gentilly Blvd",
        "New Orleans, LA"
      ],
      "description": "About The New Orleans Jazz & Heritage Festival The New Orleans Jazz & Heritage Festival, or as the locals call it, Jazz Fest, is the celebration of the unique culture and heritage of New Orleans...",
      "venueName": "Fair Grounds Race Course & Slots",
      "linkUrl": "https://www.neworleans.com/event/new-orleans-jazz-%26-heritage-festival/3197/",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoaeFe1WIVnxpELu4GUI9jNx8RMl2NsrfOXj6xdSkbDg8LIzOJ2c0fhx0&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWqY9dMlcwH1rKP7BAz6HjKGOwYIvotvpuyMKwrLxKhA&s=10",
      "__v": 0
    },
    {
      "_id": "6769cdfeb7c828cb5a596124",
      "title": "Up All Night Paranormal Event! Explore Inside to Ghost Hunt 2 locations!",
      "date": "Dec 22, 2024, 11 PM – Jan 6, 2025, 2 AM",
      "location": [
        "Bloody Mary's Tours, Haunted Museum & Voodoo Shop, 826 & 828 N Rampart St",
        "New Orleans, LA"
      ],
      "description": "Do you want to connect with the spirtis? Team up on a paranormal investigation; Use ghost hunting tools & communicate after hours with us!",
      "venueName": "Bloody Mary's Tours, Haunted Museum & Voodoo Shop",
      "linkUrl": "https://www.eventbrite.com/e/up-all-night-paranormal-event-explore-inside-to-ghost-hunt-2-locations-tickets-1025028687397",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevM8SGP1EiGw_MHXRdAw4yuBkMbDkqtGjRdWRgBb4TWqBveegAdCCLmU&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYrx2s-nbgEx80tfReAT9btAwrD7tdY0kSODknbQRaQ&s",
      "__v": 0
    },
    {
      "_id": "6769cdfeb7c828cb5a596125",
      "title": "French Quarter Festival",
      "date": "Apr 10, 2025, 9:30 AM – Apr 13, 2025, 6:00 PM",
      "location": [
        "Omni Royal Orleans, 621 St Louis St",
        "New Orleans, LA"
      ],
      "description": "French Quarter Fest returns April 10-13, 2025! View Our Ultimate French Quarter Fest Guide",
      "venueName": "Omni Royal Orleans",
      "linkUrl": "https://www.neworleans.com/event/french-quarter-festival/3268/",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUY2VRTJ1y7f6wJ73vX-eY3T9tWzNOMDQfvdGC0uXf5aBTMWHIgGJxMYw&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRidPMJ8I8KlpaTkq1mX36KMtJn-GNkO-_WrKLTX37nEQ&s=10",
      "__v": 0
    },
    {
      "_id": "6769cdfeb7c828cb5a596126",
      "title": "Fair Grounds Live Racing",
      "date": "Fri, Dec 27, 12:45 – 4:45 PM",
      "location": [
        "Fair Grounds Race Course & Slots, 1751 Gentilly Blvd",
        "New Orleans, LA"
      ],
      "description": "Fair Grounds Race Course & Slots, located in New Orleans, Louisiana, is set to commence its 153rd season of live thoroughbred racing on November 22, 2024. The season will feature a series of...",
      "venueName": "Fair Grounds Race Course & Slots",
      "linkUrl": "https://traveldestinations.guide/new-orleans-la-us/event/28074-fair-grounds-live-racing-friday-december-27-2024-12-45-pm",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzn40ZrJE1jRZeRooZYdeJf99ptNbX2BlOjQ8T-K5d_FtO3PO3GG-TMi8&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4OBiJYBAUsT5RleAtR6TyE35ppxby7onSmsRe5UsPg&s=10",
      "__v": 0
    },
    {
      "_id": "6769cdfeb7c828cb5a596127",
      "title": "Hogs for the Cause",
      "date": "Apr 4, 2025, 3:30 PM – Apr 5, 2025, 10:00 PM",
      "location": [
        "UNO Lakefront Arena, 6801 Franklin Ave",
        "New Orleans, LA"
      ],
      "description": "Hogs for the Cause 2025 | New Orleans Pig out for a purpose at Hogs for the Cause. This massive BBQ festival is all about BBQ, bands and of course, the cause. This two- day fest features live...",
      "venueName": "UNO Lakefront Arena",
      "linkUrl": "https://www.neworleans.com/event/hogs-for-the-cause/3264/",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8j4DZWDhnscKtFneTkOCm4M3r3XlpFIUx-TcJ43zTCEuzAXI7X9oHJwg&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqKO1yFu-Mp9FvkpykZVkv1ld9Nz8xm48kWxSxpr0eQ&s=10",
      "__v": 0
    },
    {
      "_id": "6769cdfeb7c828cb5a596128",
      "title": "EXOTIC SUPERBOWL CRUISE",
      "date": "Feb 8, 2025, 4 PM – Feb 13, 2025, 8 AM",
      "location": [
        "Port of New Orleans, 1350 Port of New Orleans Pl",
        "New Orleans, LA"
      ],
      "description": "Join us for the Ultimate Superbowl Experience on a luxurious cruise filled with exotic destinations, delicious food, and non-stop fun!",
      "venueName": "Port of New Orleans",
      "linkUrl": "https://www.eventbrite.com/e/exotic-superbowl-cruise-tickets-919501402447",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRccyUahqL2xAwJe56Ia796Ee8vpi-7nqhrXO_9FOsxLMhOZjhs2DoWZqI&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqneXlJpeC5IcVEdx3_Sr1XnIL63iZLrI5--uQTgriw&s=10",
      "__v": 0
    },
    {
      "_id": "6769cdfeb7c828cb5a596129",
      "title": "New Orleans Dental Conference & Exhibition",
      "date": "Apr 10, 2025, 9:30 AM – Apr 11, 2025, 6:00 PM",
      "location": [
        "Crowne Plaza New Orleans French Qtr - Astor, 739 Canal St. @, Bourbon St",
        "New Orleans, LA"
      ],
      "description": "The New Orleans Dental Conference is organized by NODA and will be held from Apr 10 - 11, 2025, in Louisiana, USA.",
      "venueName": "Crowne Plaza New Orleans French Qtr - Astor",
      "linkUrl": "https://www.emedevents.com/c/medical-conferences-2025/new-orleans-dental-conference-nodc-louisiana-dental-association-lda-annual-session-2025",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbKa9OlEGEvXfeAPX9TFxKh3LTYImrUNnzIQAm38&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwp_PSSn3n-BqOMnWjZ1I8asMrWIeeyHuz6a--izOeg&s=10",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3dd",
      "title": "New Orleans Jazz Festival - Weekend 1 - 4 Day Pass",
      "date": "Thu, Apr 24, 10:59 AM – 12:29 PM",
      "location": [
        "Fair Grounds Race Course & Slots, 1751 Gentilly Blvd",
        "New Orleans, LA"
      ],
      "description": "About The New Orleans Jazz & Heritage Festival The New Orleans Jazz & Heritage Festival, or as the locals call it, Jazz Fest, is the celebration of the unique culture and heritage of New Orleans...",
      "venueName": "Fair Grounds Race Course & Slots",
      "linkUrl": "https://www.neworleans.com/event/new-orleans-jazz-%26-heritage-festival/3197/",
      "ticketUrl": "https://www.unation.com/event/new-orleans-jazz-festival-weekend-1-4-day-pass-53657129/",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoaeFe1WIVnxpELu4GUI9jNx8RMl2NsrfOXj6xdSkbDg8LIzOJ2c0fhx0&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWqY9dMlcwH1rKP7BAz6HjKGOwYIvotvpuyMKwrLxKhA&s=10",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3de",
      "title": "Up All Night Paranormal Event! Explore Inside to Ghost Hunt 2 locations!",
      "date": "Dec 22, 2024, 11 PM – Jan 6, 2025, 2 AM",
      "location": [
        "Bloody Mary's Tours, Haunted Museum & Voodoo Shop, 826 & 828 N Rampart St",
        "New Orleans, LA"
      ],
      "description": "Do you want to connect with the spirtis? Team up on a paranormal investigation; Use ghost hunting tools & communicate after hours with us!",
      "venueName": "Bloody Mary's Tours, Haunted Museum & Voodoo Shop",
      "linkUrl": "https://www.eventbrite.com/e/up-all-night-paranormal-event-explore-inside-to-ghost-hunt-2-locations-tickets-1025028687397",
      "ticketUrl": "https://www.eventbrite.com/e/up-all-night-paranormal-event-explore-inside-to-ghost-hunt-2-locations-tickets-1025028687397",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevM8SGP1EiGw_MHXRdAw4yuBkMbDkqtGjRdWRgBb4TWqBveegAdCCLmU&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYrx2s-nbgEx80tfReAT9btAwrD7tdY0kSODknbQRaQ&s",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3df",
      "title": "French Quarter Festival",
      "date": "Apr 10, 2025, 9:30 AM – Apr 13, 2025, 6:00 PM",
      "location": [
        "Omni Royal Orleans, 621 St Louis St",
        "New Orleans, LA"
      ],
      "description": "French Quarter Fest returns April 10-13, 2025! View Our Ultimate French Quarter Fest Guide",
      "venueName": "Omni Royal Orleans",
      "linkUrl": "https://www.neworleans.com/event/french-quarter-festival/3268/",
      "ticketUrl": "https://www.neworleans.com/event/french-quarter-festival/3268/",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUY2VRTJ1y7f6wJ73vX-eY3T9tWzNOMDQfvdGC0uXf5aBTMWHIgGJxMYw&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRidPMJ8I8KlpaTkq1mX36KMtJn-GNkO-_WrKLTX37nEQ&s=10",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3e0",
      "title": "Fair Grounds Live Racing",
      "date": "Fri, Dec 27, 12:45 – 4:45 PM",
      "location": [
        "Fair Grounds Race Course & Slots, 1751 Gentilly Blvd",
        "New Orleans, LA"
      ],
      "description": "Fair Grounds Race Course & Slots, located in New Orleans, Louisiana, is set to commence its 153rd season of live thoroughbred racing on November 22, 2024. The season will feature a series of...",
      "venueName": "Fair Grounds Race Course & Slots",
      "linkUrl": "https://traveldestinations.guide/new-orleans-la-us/event/28074-fair-grounds-live-racing-friday-december-27-2024-12-45-pm",
      "ticketUrl": "https://www.eventticketscenter.com/fair-grounds-live-racing-new-orleans-12-27-2024/6804860/t",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzn40ZrJE1jRZeRooZYdeJf99ptNbX2BlOjQ8T-K5d_FtO3PO3GG-TMi8&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4OBiJYBAUsT5RleAtR6TyE35ppxby7onSmsRe5UsPg&s=10",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3e1",
      "title": "Hogs for the Cause",
      "date": "Apr 4, 2025, 3:30 PM – Apr 5, 2025, 10:00 PM",
      "location": [
        "UNO Lakefront Arena, 6801 Franklin Ave",
        "New Orleans, LA"
      ],
      "description": "Hogs for the Cause 2025 | New Orleans Pig out for a purpose at Hogs for the Cause. This massive BBQ festival is all about BBQ, bands and of course, the cause. This two- day fest features live...",
      "venueName": "UNO Lakefront Arena",
      "linkUrl": "https://www.neworleans.com/event/hogs-for-the-cause/3264/",
      "ticketUrl": "https://www.tixr.com/groups/hogsforthecause/events/2025-hogs-for-the-cause-barbecue-music-festival-114709",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8j4DZWDhnscKtFneTkOCm4M3r3XlpFIUx-TcJ43zTCEuzAXI7X9oHJwg&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqKO1yFu-Mp9FvkpykZVkv1ld9Nz8xm48kWxSxpr0eQ&s=10",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3e2",
      "title": "EXOTIC SUPERBOWL CRUISE",
      "date": "Feb 8, 2025, 4 PM – Feb 13, 2025, 8 AM",
      "location": [
        "Port of New Orleans, 1350 Port of New Orleans Pl",
        "New Orleans, LA"
      ],
      "description": "Join us for the Ultimate Superbowl Experience on a luxurious cruise filled with exotic destinations, delicious food, and non-stop fun!",
      "venueName": "Port of New Orleans",
      "linkUrl": "https://www.eventbrite.com/e/exotic-superbowl-cruise-tickets-919501402447",
      "ticketUrl": "https://www.eventbrite.com/e/exotic-superbowl-cruise-tickets-919501402447",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRccyUahqL2xAwJe56Ia796Ee8vpi-7nqhrXO_9FOsxLMhOZjhs2DoWZqI&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVqneXlJpeC5IcVEdx3_Sr1XnIL63iZLrI5--uQTgriw&s=10",
      "__v": 0
    },
    {
      "_id": "6769ce8ded5abf556425e3e3",
      "title": "New Orleans Dental Conference & Exhibition",
      "date": "Apr 10, 2025, 9:30 AM – Apr 11, 2025, 6:00 PM",
      "location": [
        "Crowne Plaza New Orleans French Qtr - Astor, 739 Canal St. @, Bourbon St",
        "New Orleans, LA"
      ],
      "description": "The New Orleans Dental Conference is organized by NODA and will be held from Apr 10 - 11, 2025, in Louisiana, USA.",
      "venueName": "Crowne Plaza New Orleans French Qtr - Astor",
      "linkUrl": "https://www.emedevents.com/c/medical-conferences-2025/new-orleans-dental-conference-nodc-louisiana-dental-association-lda-annual-session-2025",
      "ticketUrl": "https://www.emedevents.com/c/medical-conferences-2025/new-orleans-dental-conference-nodc-louisiana-dental-association-lda-annual-session-2025",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbKa9OlEGEvXfeAPX9TFxKh3LTYImrUNnzIQAm38&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwp_PSSn3n-BqOMnWjZ1I8asMrWIeeyHuz6a--izOeg&s=10",
      "__v": 0
    },
    {
      "_id": "6769cf28e7f91a3d6b30d661",
      "title": "New Orleans Jazz Festival - Weekend 1 - 4 Day Pass",
      "date": "Thu, Apr 24, 10:59 AM – 12:29 PM",
      "location": [
        "Fair Grounds Race Course & Slots, 1751 Gentilly Blvd",
        "New Orleans, LA"
      ],
      "description": "About The New Orleans Jazz & Heritage Festival The New Orleans Jazz & Heritage Festival, or as the locals call it, Jazz Fest, is the celebration of the unique culture and heritage of New Orleans...",
      "venueName": "Fair Grounds Race Course & Slots",
      "linkUrl": "https://www.neworleans.com/event/new-orleans-jazz-%26-heritage-festival/3197/",
      "ticketUrl": "https://www.unation.com/event/new-orleans-jazz-festival-weekend-1-4-day-pass-53657129/",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoaeFe1WIVnxpELu4GUI9jNx8RMl2NsrfOXj6xdSkbDg8LIzOJ2c0fhx0&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWqY9dMlcwH1rKP7BAz6HjKGOwYIvotvpuyMKwrLxKhA&s=10",
      "__v": 0
    },
    {
      "_id": "6769cf28e7f91a3d6b30d662",
      "title": "Up All Night Paranormal Event! Explore Inside to Ghost Hunt 2 locations!",
      "date": "Dec 22, 2024, 11 PM – Jan 6, 2025, 2 AM",
      "location": [
        "Bloody Mary's Tours, Haunted Museum & Voodoo Shop, 826 & 828 N Rampart St",
        "New Orleans, LA"
      ],
      "description": "Do you want to connect with the spirtis? Team up on a paranormal investigation; Use ghost hunting tools & communicate after hours with us!",
      "venueName": "Bloody Mary's Tours, Haunted Museum & Voodoo Shop",
      "linkUrl": "https://www.eventbrite.com/e/up-all-night-paranormal-event-explore-inside-to-ghost-hunt-2-locations-tickets-1025028687397",
      "ticketUrl": "https://www.eventbrite.com/e/up-all-night-paranormal-event-explore-inside-to-ghost-hunt-2-locations-tickets-1025028687397",
      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevM8SGP1EiGw_MHXRdAw4yuBkMbDkqtGjRdWRgBb4TWqBveegAdCCLmU&s",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYrx2s-nbgEx80tfReAT9btAwrD7tdY0kSODknbQRaQ&s",
      "__v": 0
    },
  ];


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
                testData.map((event) => {
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