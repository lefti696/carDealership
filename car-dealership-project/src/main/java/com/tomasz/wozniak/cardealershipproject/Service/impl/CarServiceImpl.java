package com.tomasz.wozniak.cardealershipproject.Service.impl;

import com.tomasz.wozniak.cardealershipproject.Dao.CarDao;
import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.Service.CarService;
import com.tomasz.wozniak.cardealershipproject.Utils.CarDataToCarModelPopulator;
import com.tomasz.wozniak.cardealershipproject.Utils.CarImageToCarPictureModelPopulator;
import com.tomasz.wozniak.cardealershipproject.Utils.CarModelToCarDataPopulator;
import com.tomasz.wozniak.cardealershipproject.Utils.CarPictureModelToCarImagePopulator;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    private static final Logger logger = Logger.getLogger(CarServiceImpl.class);

    @Autowired
    private CarDao carDao;

    @Autowired
    private CarModelToCarDataPopulator carModelToCarDataPopulator;

    @Autowired
    private CarDataToCarModelPopulator carDataToCarModelPopulator;

    @Autowired
    private CarPictureModelToCarImagePopulator carPictureModelToCarImagePopulator;

    @Autowired
    private CarImageToCarPictureModelPopulator carImageToCarPictureModelPopulator;

    @Override
    public List<CarData> getAllCars() {
        List<CarData> carDataList = new ArrayList<>();
        List<CarModel> carModelList = carDao.getAllCars();

        if (!CollectionUtils.isEmpty(carModelList)) {
            for (CarModel carModel : carModelList) {
                carDataList.add(carModelToCarDataPopulator.convert(carModel));
            }
        }
        return carDataList;
    }

    @Override
    public int addCar(CarData carData) {
        CarModel carModel = carDataToCarModelPopulator.convert(carData);
        CarPictureModel carPictureModel = carModel.getCarPictureModel();
        if (null != carPictureModel) {
            carDao.addImage(carPictureModel);
        }
        return carDao.addCar(carModel);
    }

    @Override
    public CarData getCarByYear(int mfy) {
        return carModelToCarDataPopulator.convert(carDao.getCarByYear(mfy));
    }

    @Override
    public CarData getCarById(int id) {
        return carModelToCarDataPopulator.convert(carDao.getCarById(id));
    }

    @Override
    public void updateCar(CarData carData) {
        carDao.updateCar(carDataToCarModelPopulator.convert(carData));
    }

    @Override
    public void deleteCar(int id) {
        carDao.deleteCar(id);
    }

    @Override
    public int countAllCars() {
        return carDao.countAllCars();
    }

    @Override
    public int addImage(CarImage carImage) {
        return carDao.addImage(carImageToCarPictureModelPopulator.convertToCarPictureModel(carImage));
    }

    @Override
    public CarImage getImageById(int id) {
        return carPictureModelToCarImagePopulator.convertToImage(carDao.getImageById(id));
    }

    @Override
    public void createSampleDb() {

        CarImage carImageToDb = new CarImage();
        carImageToDb.setFileName("test_file_name");

        int ferrariId = addCar(new CarData("red", "Ferrari", "Italia", 2018, carImageToDb));
        logger.info("Id of created car is " + ferrariId);

        CarData carData = getCarById(ferrariId);
        CarImage carImageFromDb = carData.getCarImage();
        if (null != carImageFromDb) {
            logger.error("Zdjecie ferrari: " + carImageFromDb.getFileName() + " id: " + carImageFromDb.getId());
        } else {
            logger.error("FERRARI NIE MA ZDJECIA");
        }

//        logger.info("Id of created car is " + addCar(new CarData("red", "Ferrari", "Italia", 2018)));
        logger.info("Id of created car is " + addCar(new CarData("gray", "Seat", "Ibiza", 2013)));
        logger.info("Id of created car is " + addCar(new CarData("black", "Volvo", "XC60", 2010)));
        logger.info("Id of created car is " + addCar(new CarData("silver", "Ford", "Focus", 2004)));
        logger.info("Id of created car is " + addCar(new CarData("cherry", "Toyota", "Yaris", 2014)));
        logger.info("Id of created car is " + addCar(new CarData("purple", "Nissan", "Micra", 2015)));

        logger.info(carDao.countAllCars() + " records created.");
    }
}
