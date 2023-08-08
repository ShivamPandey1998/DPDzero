const { Data } = require('./models/Data');
const DataController = {
  storeData: async (req, res) => {
    try {
      const { key, value } = req.body;

      const existingData = await Data.findOne({ where: { key } });

      if (existingData) {
        return res.status(400).json({
          status: 'error',
          code: 'KEY_EXISTS',
          message: 'Key already exists.',
        });
      }

      await Data.create({ key, value });

      res.status(201).json({
        status: 'success',
        message: 'Data stored successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  },

  retrieveData: async (req, res) => {
    try {
      const key = req.params.key;

      const data = await Data.findOne({ where: { key } });

      if (!data) {
        return res.status(404).json({
          status: 'error',
          code: 'KEY_NOT_FOUND',
          message: 'Key not found.',
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          key: data.key,
          value: data.value,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  },

  updateData: async (req, res) => {
    try {
      const key = req.params.key;
      const { value } = req.body;

      const data = await Data.findOne({ where: { key } });

      if (!data) {
        return res.status(404).json({
          status: 'error',
          code: 'KEY_NOT_FOUND',
          message: 'Key not found.',
        });
      }

      await data.update({ value });

      res.status(200).json({
        status: 'success',
        message: 'Data updated successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  },

  deleteData: async (req, res) => {
    try {
      const key = req.params.key;

      const data = await Data.findOne({ where: { key } });

      if (!data) {
        return res.status(404).json({
          status: 'error',
          code: 'KEY_NOT_FOUND',
          message: 'Key not found.',
        });
      }

      await data.destroy();

      res.status(200).json({
        status: 'success',
        message: 'Data deleted successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred.',
      });
    }
  },
};

module.exports = DataController;
