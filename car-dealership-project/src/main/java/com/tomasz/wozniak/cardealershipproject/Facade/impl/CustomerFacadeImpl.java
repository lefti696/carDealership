package com.tomasz.wozniak.cardealershipproject.Facade.impl;

import com.tomasz.wozniak.cardealershipproject.Facade.CustomerFacade;
import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class CustomerFacadeImpl implements CustomerFacade {

  private CarService carService;

  @Autowired
  public void setCarService(CarService carService) {
    this.carService = carService;
  }

  @Override
  public List<CarData> getAllCars() {
    List<CarData> carDataList = carService.getAllCars();

    for (CarData carData : carDataList) {
      removePrivateSellerInfo(carData);
    }

    return carDataList;
  }

  @Override
  public List<CarData> searchCarByMakeOrModel(String str) {
    List<CarData> carDataList = carService.searchCarByMakeOrModel(str);

    for (CarData carData : carDataList) {
      removePrivateSellerInfo(carData);
    }

    return carDataList;
  }

  @Override
  public CarData getCarById(Integer id) {
    CarData carData = carService.getCarById(id);
    removePrivateSellerInfo(carData);
    return carData;
  }

  private void removePrivateSellerInfo(CarData carData) {
    carData.setBasePrice(0);
    carData.setSellerNote("removed");
  }

  @Override
  public Integer countAllCars() {
    return carService.countAllCars();
  }
}
