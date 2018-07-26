package com.tomasz.wozniak.cardealershipproject.Controllers;

import com.tomasz.wozniak.cardealershipproject.Items.Car;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShowCarsController {

    @RequestMapping("/showCar")
    public Car greeting(@RequestParam(value="color", defaultValue="Red") String color,
                        @RequestParam(value="make", defaultValue = "Ford") String make) {

        Car firstCar = new Car(color, make);

        return firstCar;
    }
}
