package com.tomasz.wozniak.cardealershipproject.Facade;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;

import java.util.List;

public interface CustomerFacade {

  List<CarData> getAllCars();
  List<CarData> searchCarByMakeOrModel(String str);
  CarData getCarById(Integer id);
  Integer countAllCars();

}
