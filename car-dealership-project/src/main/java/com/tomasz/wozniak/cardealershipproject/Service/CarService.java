package com.tomasz.wozniak.cardealershipproject.Service;

import com.tomasz.wozniak.cardealershipproject.model.CarModel;

import java.util.List;

public interface CarService {

    List<CarModel> getAllCars();
    int addCar(CarModel carModel);
    CarModel getCarByYear(int mfy);
    CarModel getCarById(int id);
    void updateCar(CarModel carModel);
    void deleteCar(int id);
    int countAllCars();
    /**
     * Create sample database records
     */
    void createSampleDb();

}
