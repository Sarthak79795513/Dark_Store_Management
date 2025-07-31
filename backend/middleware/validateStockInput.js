module.exports = (req, res, next) => {
  const { sales_volume, orders, date } = req.body;

  if (
    sales_volume === undefined ||
    orders === undefined ||
    !date ||
    isNaN(Number(sales_volume)) ||
    isNaN(Number(orders))
  ) {
    return res.status(400).json({ error: 'Invalid input: sales_volume, orders, and date are required and must be valid.' });
  }

  next();
};
