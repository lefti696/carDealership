package com.tomasz.wozniak.cardealershipproject.Controllers;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerActionsController {

    private static final Logger logger = Logger.getLogger(CustomerActionsController.class);

    private CarService carService;

    @Autowired
    public void setCarService(CarService carService) {
        this.carService = carService;
    }

//    root request mapping
//    @RequestMapping("/")
//    redirect cars/list

    @RequestMapping("/test")
    public CarData greeting(@RequestParam(value="color", defaultValue="Red") String color,
                            @RequestParam(value="make", defaultValue = "Ford") String make) {

        CarData firstCar = new CarData(color, make);

        return firstCar;
    }

    @RequestMapping("/listAllCars")
    public List<CarModel> listAllCars () {
        logger.debug("Listing all cars");

        List<CarModel> allCars = carService.getAllCars();

        return allCars;
    }

    @RequestMapping("/howManyCars")
    public int howManyCars () {
        logger.debug("Counting all available cars.");

        return carService.countAllCars();
    }

    @RequestMapping("/findById")
    public CarModel findCarByMfy (@RequestParam int id) {
        logger.debug("looking for a car with id: " + id);

        return carService.getCarById(id);
    }
}
