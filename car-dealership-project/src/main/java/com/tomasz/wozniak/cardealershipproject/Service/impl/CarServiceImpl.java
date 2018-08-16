package com.tomasz.wozniak.cardealershipproject.Service.impl;

import com.tomasz.wozniak.cardealershipproject.Dao.CarDao;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    private static final Logger logger = Logger.getLogger(CarServiceImpl.class);

    @Autowired
    private CarDao carDao;

    @Override
    public List<CarModel> getAllCars() {
        return carDao.getAllCars();
    }

    @Override
    public int addCar(CarModel carModel) {
        return carDao.addCar(carModel);
    }

    @Override
    public CarModel getCarByYear(int mfy) {
        return carDao.getCarByYear(mfy);
    }

    @Override
    public CarModel getCarById(int id) {
        return carDao.getCarById(id);
    }

    @Override
    public void updateCar(CarModel carModel) {
        carDao.updateCar(carModel);
    }

    @Override
    public void deleteCar(int id) {
        carDao.deleteCar(id);
    }

    @Override
    public int countAllCars() {
        return carDao.countAllCars();
    }


    @Override
    public void createSampleDb() {

        logger.info("Id of created car is " + addCar(new CarModel("red", "Ferrari", "Italia", 2018)));
        logger.info("Id of created car is " + addCar(new CarModel("gray", "Seat", "Ibiza", 2013)));
        logger.info("Id of created car is " + addCar(new CarModel("blac", "Volvo", "XC60", 2010)));
        logger.info("Id of created car is " + addCar(new CarModel("silver", "Ford", "Focus", 2004)));
        logger.info("Id of created car is " + addCar(new CarModel("cherry", "Toyota", "Yaris", 2014)));
        logger.info("Id of created car is " + addCar(new CarModel("purple", "Nissan", "Micra", 2015)));

        logger.info(carDao.countAllCars() + " records created.");
    }
}
