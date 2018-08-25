package com.tomasz.wozniak.cardealershipproject.Controllers;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<List<CarData>> getAllCars() {
        logger.debug("Listing all cars for seller");

        List<CarData> allCars = carService.getAllCars();
        logger.debug("Found: " + allCars.size() + " cars in db.");
        return new ResponseEntity<List<CarData>>(allCars, HttpStatus.OK);
    }

    @RequestMapping("/howManyCars")
    public int howManyCars() {
        logger.debug("Counting all available cars.");

        return carService.countAllCars();
    }

    @RequestMapping(value = "/getCarById/{id}", method = RequestMethod.GET)
    public CarData getCarById(@PathVariable("id") int id) {
        logger.debug("looking for a car with id: " + id);

        return carService.getCarById(id);
    }

    @DeleteMapping("/deleteCar/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable("id") Integer id) {
        logger.debug("deleting a car with id: " + id);
        carService.deleteCar(id);

        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/addNewCar")
    public ResponseEntity<Integer> addNewCar(@RequestBody CarData carData) {
        logger.debug("adding a new car: " + carData.toString());

        int newCarId = carService.addCar(carData);
        logger.debug("successfully created with id: " + newCarId);
        return new ResponseEntity<Integer>(newCarId, HttpStatus.CREATED);
    }

    @PutMapping("/updateCar")
    public ResponseEntity<CarData> updateCar(@RequestBody CarData carData) {
        logger.debug("updating a car: " + carData.toString());

        carService.updateCar(carData);
        return new ResponseEntity<CarData>(carData, HttpStatus.OK);
    }

    @PostMapping("/upload/{carId}")
    public ResponseEntity<Integer> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("carId") int carId) {
        logger.debug("Single file upload!");
        if (file.isEmpty()) {
            logger.debug("uploaded file is empty");
        } else {
            try {
                logger.debug("Received filename: " + file.getOriginalFilename() + " of size: " + file.getSize());
                CarData car = carService.getCarById(carId);
                logger.debug("For car id: " + car.getId());

                CarImage carImage = new CarImage();
                carImage.setFileName(file.getOriginalFilename());
                carImage.setFileType(file.getContentType());
                carImage.setData(file.getBytes());

                car.setCarImage(carImage);
                carService.updateCar(car);

                int imageId = carService.getCarById(carId).getCarImage().getId();
                logger.debug("New image with id: " + imageId);

                return new ResponseEntity<>(imageId, HttpStatus.CREATED);

            } catch (IOException e) {
                logger.debug("IOException: " + e);
            }
        }
        return new ResponseEntity<>(-1, HttpStatus.METHOD_FAILURE);
    }

//    @GetMapping("/download/{carId}")
//    public ResponseEntity<?> uploadFile(@PathVariable("carId") int carId) {
//        logger.debug("Requested);
//
//    }

    /**
     * SOME OTHER METHODS FOR TESTING
     *
     * @return
     */

    @ResponseBody
    @RequestMapping("/locked")
    public CarData getFirstCarFromDb() {
        logger.debug("getting first car from DB");
        List<CarData> allCars = carService.getAllCars();

        CarData carToReturn = allCars.get(0);
        logger.debug("Found car: " + carToReturn.getColor() + " " + carToReturn.getMake());

        return carToReturn;
    }

    @ResponseBody
    @RequestMapping("/unlocked")
    public CarData getSecondCarFromDb() {
        logger.debug("getting first car from DB");
        List<CarData> allCars = carService.getAllCars();

        CarData carToReturn = allCars.get(2);
        logger.debug("Found car: " + carToReturn.getColor() + " " + carToReturn.getMake());

        return carToReturn;
    }

}
