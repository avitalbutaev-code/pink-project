function handleServiceError(error, res) {
  console.error("Service error:", error);

  if (
    error.message.includes("required") ||
    error.message.includes("must be") ||
    error.message.includes("Invalid")
  ) {
    return res.status(400).json({ error: error.message });
  }

  if (error.message.includes("not found")) {
    return res.status(404).json({ error: error.message });
  }
  return res
    .status(500)
    .json({ error: error.message || "Internal server error" });
}

module.exports = { handleServiceError };
