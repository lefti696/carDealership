package com.tomasz.wozniak.cardealershipproject.Service;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.CarImage;

import java.util.List;

public interface CarService {

    List<CarData> getAllCars();

    int addCar(CarData carData);

    CarData getCarByYear(int mfy);

    CarData getCarById(int id);

    void updateCar(CarData carData);

    List<CarData> searchCarByMakeOrModel(String str);

    void deleteCar(int id);

    int countAllCars();

    int addImage(CarImage carImage);

    CarImage getImageById(int id);

    /**
     * Create sample database records
     */
    void createSampleDb();

}
