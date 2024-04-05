const router = require('express').Router();
const { User, Car } = require('../../models');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll({
      include: [{ model: User }],
    });
    res.json(cars);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get car by id
router.get('/:id', async (req, res) => {
  try {
    const carData = await Car.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!carData) {
      res.status(404).json({ message: 'Car not found with this id' });
      return;
    }
    res.json(carData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new car
router.post('/', async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a car by id
router.put('/:id', async (req, res) => {
  try {
    const updatedCar = await Car.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCar[0]) {
      res.status(404).json({ message: 'Car not found with this id' });
      return;
    }
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a car by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCar = await Car.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCar) {
      res.status(404).json({ message: 'Car not found with this id' });
      return;
    }
    res.json(deletedCar);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

