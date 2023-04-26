const models = require('../models');

const { Account } = models;

const gamePage = async (req, res) => res.render('app');

const updateCurrency = async (req, res) => {
  // console.log('Total Currency: ', req.body.flowers);
  try {
    const account = await Account.findByIdAndUpdate(req.session.account._id, { currency: req.body.flowers });
    return res.json({ currency: account.currency });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured!' });
  }
};

const getGameData = async (req, res) => {
  console.log(Account.findById(req.session.account._id ).select.currency);
  //.findOne({req.session.account._id });
  try {
    const account = await req.session.account.findById(currency);
    return res.json({ flowers: account.currency });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured!' });
  }
};

module.exports = {
  gamePage,
  updateCurrency,
  getGameData,
};
