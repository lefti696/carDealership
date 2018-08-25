package com.tomasz.wozniak.cardealershipproject.Facade;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import java.util.List;

public interface SellerFacade {

  List<CarData> getAllCars();
  CarData getCarById(int id);
  int addCar(CarData carData);
  void updateCar(CarData carData);
  int countAllCars();
  void deleteCar(int id);
}
