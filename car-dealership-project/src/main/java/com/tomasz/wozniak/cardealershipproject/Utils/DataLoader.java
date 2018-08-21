package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private static final Logger logger = Logger.getLogger(DataLoader.class);

    private CarService carService;

    @Autowired
    public DataLoader(CarService carService) {
        this.carService = carService;
    }

    public void run(ApplicationArguments args) {
        logger.info("loading data to DB...");
        carService.createSampleDb();
        logger.info("CarDealership Started !");
    }
}
