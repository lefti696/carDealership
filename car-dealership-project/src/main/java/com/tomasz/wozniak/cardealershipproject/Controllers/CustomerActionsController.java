package com.tomasz.wozniak.cardealershipproject.Controllers;

import com.tomasz.wozniak.cardealershipproject.Facade.CustomerFacade;
import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.QuestionData;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class CustomerActionsController {

    private static final Logger logger = Logger.getLogger(CustomerActionsController.class);

    private CustomerFacade customerFacade;

    @Autowired
    public void setCustomerFacade(CustomerFacade customerFacade) {
        this.customerFacade = customerFacade;
    }

    @RequestMapping("/test")
    public CarData greeting(@RequestParam(value = "color", defaultValue = "Red") String color,
                            @RequestParam(value = "make", defaultValue = "Ford") String make,
                            @RequestParam(value = "model", defaultValue = "Focus") String model,
                            @RequestParam(value = "mfy", defaultValue = "2004") String mfy) {

        CarData firstCar = new CarData(color, make, model, Integer.valueOf(mfy));

        return firstCar;
    }

    @RequestMapping("/getAllCars")
    public List<CarData> getAllCars() {
        logger.debug("Listing all cars for customer.");

        List<CarData> allCars = customerFacade.getAllCars();

        return allCars;
    }

    @RequestMapping("/searchCar/{str}")
    public List<CarData> getAllCars(@PathVariable("str") String str) {
        logger.debug("Searching cars for customer.");

        List<CarData> allCars = customerFacade.searchCarByMakeOrModel(str);

        return allCars;
    }

    @RequestMapping("/howManyCars")
    public int howManyCars() {
        logger.debug("Counting all available cars for customer.");

        return customerFacade.countAllCars();
    }

    @RequestMapping(value = "/getCarById/{id}", method = RequestMethod.GET)
    public CarData getCarById(@PathVariable("id") int id) {
        logger.debug("looking for a car with id: " + id + " for customer.");

        return customerFacade.getCarById(id);
    }

    @PostMapping("/addNewQuestion")
    public ResponseEntity<UUID> addNewQuestion(@RequestBody QuestionData questionData) {
        logger.debug("adding a new question: " + questionData.toString());

        UUID newQuestionId = customerFacade.addNewQuestion(questionData);
        logger.debug("successfully created with id: " + newQuestionId);
        return new ResponseEntity<UUID>(newQuestionId, HttpStatus.CREATED);
    }


}
