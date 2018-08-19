package com.tomasz.wozniak.cardealershipproject.Dao;

import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;

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

    void updateCarImage(CarPictureModel carPictureModel);

    void deleteCar(int id);

    int countAllCars();

    int addImage(CarPictureModel carPictureModel);

    CarPictureModel getImageById(int id);
}
