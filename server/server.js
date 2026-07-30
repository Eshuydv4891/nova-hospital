const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Helper: Read database
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { doctors: [], blogs: [], gallery: [], appointments: [], queries: [] };
    }
    const content = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading data.json:", err);
    return { doctors: [], blogs: [], gallery: [], appointments: [], queries: [] };
  }
}

// Helper: Write database
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing data.json:", err);
  }
}

// Routes

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Nova Medicare Hospital Backend API is Live!", timestamp: new Date() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", serverTime: new Date() });
});

// Admin Authentication
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "admin123" || password === "nova2026" || password === "eshu2003") {
    return res.json({ success: true, token: "admin-auth-token-nova-2026" });
  }
  return res.status(401).json({ success: false, message: "Invalid Admin Password" });
});

// --- DOCTORS ---
app.get("/api/doctors", (req, res) => {
  const db = readData();
  res.json(db.doctors || []);
});

app.post("/api/doctors", (req, res) => {
  const db = readData();
  const newDoctor = {
    ...req.body,
    id: "doc-" + Date.now(),
  };
  db.doctors = [...(db.doctors || []), newDoctor];
  writeData(db);
  res.status(201).json(newDoctor);
});

app.delete("/api/doctors/:id", (req, res) => {
  const db = readData();
  db.doctors = (db.doctors || []).filter((d) => d.id !== req.params.id);
  writeData(db);
  res.json({ success: true, id: req.params.id });
});

// --- BLOGS ---
app.get("/api/blogs", (req, res) => {
  const db = readData();
  res.json(db.blogs || []);
});

app.post("/api/blogs", (req, res) => {
  const db = readData();
  const newPost = {
    ...req.body,
    id: "blog-" + Date.now(),
  };
  db.blogs = [newPost, ...(db.blogs || [])];
  writeData(db);
  res.status(201).json(newPost);
});

app.delete("/api/blogs/:id", (req, res) => {
  const db = readData();
  db.blogs = (db.blogs || []).filter((b) => b.id !== req.params.id);
  writeData(db);
  res.json({ success: true, id: req.params.id });
});

// --- GALLERY ---
app.get("/api/gallery", (req, res) => {
  const db = readData();
  res.json(db.gallery || []);
});

app.post("/api/gallery", (req, res) => {
  const db = readData();
  const newItem = {
    ...req.body,
    id: "gal-" + Date.now(),
  };
  db.gallery = [newItem, ...(db.gallery || [])];
  writeData(db);
  res.status(201).json(newItem);
});

app.delete("/api/gallery/:id", (req, res) => {
  const db = readData();
  db.gallery = (db.gallery || []).filter((g) => g.id !== req.params.id);
  writeData(db);
  res.json({ success: true, id: req.params.id });
});

// --- APPOINTMENTS ---
app.get("/api/appointments", (req, res) => {
  const db = readData();
  res.json(db.appointments || []);
});

app.post("/api/appointments", (req, res) => {
  const db = readData();
  const newApp = {
    ...req.body,
    id: "app-" + Date.now(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  db.appointments = [newApp, ...(db.appointments || [])];
  writeData(db);
  res.status(201).json(newApp);
});

app.patch("/api/appointments/:id", (req, res) => {
  const db = readData();
  const { status } = req.body;
  db.appointments = (db.appointments || []).map((app) =>
    app.id === req.params.id ? { ...app, status } : app
  );
  writeData(db);
  res.json({ success: true, id: req.params.id, status });
});

// --- QUERIES ---
app.get("/api/queries", (req, res) => {
  const db = readData();
  res.json(db.queries || []);
});

app.post("/api/queries", (req, res) => {
  const db = readData();
  const newQ = {
    ...req.body,
    id: "q-" + Date.now(),
    status: "Unread",
    createdAt: new Date().toISOString(),
  };
  db.queries = [newQ, ...(db.queries || [])];
  writeData(db);
  res.status(201).json(newQ);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Nova Hospital Backend Server listening on port ${PORT}`);
});
