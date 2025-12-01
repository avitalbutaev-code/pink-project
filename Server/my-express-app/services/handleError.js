function handleServiceError(err, res) {
  console.error(err);

  if (err.code === "MISSING_REQUIRED_FIELDS") {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === "not found") {
    return res.status(404).json({ error: err.message });
  }

  return res.status(500).json({ error: "Server error" });
}

module.exports = { handleServiceError };
