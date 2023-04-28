const models = require('../models');

const { Account } = models;

const gamePage = async (req, res) => res.render('app');

const updateGameInfo = async (req, res) => {
  // update the currency
  // update currency per time
  // update amount of each type
  try {
    const account = await Account.findByIdAndUpdate(
      req.session.account._id,
      { currency: req.body.flowers },
    );
    const persec = await Account.findByIdAndUpdate(
      req.session.account._id,
      { currencyPerSecond: req.body.petalpersec },
    );
    return res.json({ message: `${account} and  ${persec}: updated successfully!` });
  } catch (err) {
    return res.status(500).json({ error: 'An error occured!' });
  }
};

const updateAds = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.session.account._id,
      { hasAds: req.body.ads },
    );
    return res.json({ message: `${account}: updated successfully!` });
  } catch (err) {
    return res.status(500).json({ error: 'An error occured!' });
  }
};


const getGameData = async (req, res) => {
  // .findOne({req.session.account._id });
  try {
    const account = await Account.findById(req.session.account._id).select('currency currencyPerSecond hasAds').lean().exec();
    // await Account.findById(req.session.account._id).select('currency');
    // .select('currency perSec')
    return res.json({ info: account });
    // data: { flowers: account.currency, perSec: account.currencyPerSecond }
    // { flowers: account.currency }
  } catch (err) {
    return res.status(500).json({ error: 'An error occured!' });
  }
};

module.exports = {
  gamePage,
  updateGameInfo,
  getGameData,
  updateAds,
};
