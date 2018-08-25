package com.tomasz.wozniak.cardealershipproject.Facade.impl;

import com.tomasz.wozniak.cardealershipproject.Facade.SellerFacade;
import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SellerFacadeImpl implements SellerFacade {

  private CarService carService;

  @Autowired
  public void setCarService(CarService carService) {
    this.carService = carService;
  }

  @Override
  public List<CarData> getAllCars() {
    return carService.getAllCars();
  }

  @Override
  public CarData getCarById(int id) {
    return carService.getCarById(id);
  }

  @Override
  public int addCar(CarData carData) {
    return carService.addCar(carData);
  }

  @Override
  public void updateCar(CarData carData) {
    carService.updateCar(carData);
  }

  @Override
  public int countAllCars() {
    return carService.countAllCars();
  }

  @Override
  public void deleteCar(int id) {
    carService.deleteCar(id);
  }
}
