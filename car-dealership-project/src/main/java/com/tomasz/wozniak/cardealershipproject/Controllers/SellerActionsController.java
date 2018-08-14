package com.tomasz.wozniak.cardealershipproject.Controllers;

import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seller")
public class SellerActionsController {
    private static final Logger logger = Logger.getLogger(SellerActionsController.class);

    private CarService carService;

    @Autowired
    public void setCarService(CarService carService) {
        this.carService = carService;
    }

    @RequestMapping("/getAllCars")
    public List<CarModel> getAllCars () {
        logger.debug("Listing all cars for seller");

        List<CarModel> allCars = carService.getAllCars();

        return allCars;
    }

    @RequestMapping("/howManyCars")
    public int howManyCars () {
        logger.debug("Counting all available cars.");

        return carService.countAllCars();
    }

    @RequestMapping(value = "/getCarById/{id}", method = RequestMethod.GET)
    public CarModel getCarById (@PathVariable("id") int id) {
        logger.debug("looking for a car with id: " + id);

        return carService.getCarById(id);
    }

    @ResponseBody
    @RequestMapping("/locked")
    public CarModel getFirstCarFromDb() {
        logger.debug("getting first car from DB");
        List<CarModel> allCars = carService.getAllCars();

        CarModel carToReturn = allCars.get(0);
        logger.debug("Found car: " + carToReturn.getColor() + " " + carToReturn.getMake());

        return carToReturn;
    }

    @ResponseBody
    @RequestMapping("/unlocked")
    public CarModel getSecondCarFromDb() {
        logger.debug("getting first car from DB");
        List<CarModel> allCars = carService.getAllCars();

        CarModel carToReturn = allCars.get(2);
        logger.debug("Found car: " + carToReturn.getColor() + " " + carToReturn.getMake());

        return carToReturn;
    }

}
