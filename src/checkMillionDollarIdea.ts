const checkMillionDollarIdea = (req: any, res: any, next: any) => {
  const numWeeks = parseFloat(req.body.numWeeks);
  const weeklyRevenue = parseFloat(req.body.weeklyRevenue);

  if (isNaN(numWeeks) || numWeeks <= 0 || isNaN(weeklyRevenue) || weeklyRevenue <= 0) {
    return res.status(400).send({ error: "Invalid inputs" });
  }
    
  const totalYield = numWeeks * weeklyRevenue;
  if (totalYield < 1000000) {
    return res.status(400).send({ error: "Idea must be worth at least 1,000,000$!"});
  }

  next();
};

module.exports = checkMillionDollarIdea;