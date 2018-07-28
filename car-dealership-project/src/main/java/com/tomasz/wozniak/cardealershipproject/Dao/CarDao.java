package com.tomasz.wozniak.cardealershipproject.Dao;

import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import java.util.List;

public interface CarDao {

    /**
     * Method that returns all available cars in dealership
     *
     * @return
     */
    List<CarModel> getAllCars();

    /**
     * Add single carModel to CARS table
     *
     * @param carModel
     */
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
