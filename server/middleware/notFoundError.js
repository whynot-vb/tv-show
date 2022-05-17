const notFoundError = (req, res) => {
  return res.status(404).send("Route not found");
};

export default notFoundError;
