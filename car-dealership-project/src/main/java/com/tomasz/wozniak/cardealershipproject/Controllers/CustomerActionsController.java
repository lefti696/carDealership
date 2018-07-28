package com.tomasz.wozniak.cardealershipproject.Controllers;

import com.tomasz.wozniak.cardealershipproject.Dao.CarDao;
import com.tomasz.wozniak.cardealershipproject.Items.CarData;
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
    private CarDao carDao;

    @Autowired
    public void setCarDao(CarDao carDao){
        this.carDao = carDao;
    }

    @RequestMapping("/test")
    public CarData greeting(@RequestParam(value="color", defaultValue="Red") String color,
                             @RequestParam(value="make", defaultValue = "Ford") String make) {

        CarData firstCar = new CarData(color, make);

        return firstCar;
    }

    @RequestMapping("/listAllCars")
    public List<CarModel> listAllCars () {

        logger.debug("Listing all cars");

        carDao.createSampleDb();
        List<CarModel> allCars = carDao.getAllCars();

        return allCars;
    }
}
