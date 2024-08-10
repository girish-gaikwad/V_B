const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const os = require("os");
const { OAuth2Client } = require('google-auth-library');



dotenv.config();

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // Check if the email belongs to the college domain
    if (email.endsWith('@bitsathy.ac.in')) {
      res.status(200).json({ email, name });
    } else {
      res.status(403).json({ error: 'Invalid email domain' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const eventRoutes = require("./routes/EventRoutes");

app.use("/event-booking", eventRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: err.message });
});

app.get("/", (req, res) => {
  res.send("hi");
});

// Function to get the local IP address
const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces(); // Get network interfaces of the operating system
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName]; // Get addresses for the current interface
    for (const addressInfo of addresses) {
      // Check if the address is IPv4 and not internal
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        return addressInfo.address;
      }
    }
  }
  return "localhost"; // Default to localhost if no external IP is found
};

const PORT = process.env.PORT || 8000;
const HOST = "localhost";

app.listen(PORT, () => {
  const PROTOCOL = "http"; // Assuming you're using HTTP
  const URL = `${PROTOCOL}://${HOST}:${PORT}`;
  if (HOST === "localhost") {
    console.log(`Server is running on port ${PORT}`);
    console.log(`    ➜  Network: ${URL} to access (Ctrl+Click to open)`);
  } else {
    console.log(`Server is running on port ${HOST}:${PORT}`);
    console.log(`    ➜  Network: ${URL} to access (Ctrl+Click to open)`);
  }
});