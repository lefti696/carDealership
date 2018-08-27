package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CarModelToCarDataPopulator {

    private static final Logger logger = Logger.getLogger(CarModelToCarDataPopulator.class);

    @Autowired
    private CarPictureModelToCarImagePopulator carPictureModelToCarImagePopulator;

    public CarData convert(CarModel carModel) {
        logger.debug("Converting CarModel => CarData");
        CarData carData = new CarData();

        carData.setId(carModel.getId());
        carData.setColor(carModel.getColor());
        carData.setMake(carModel.getMake());
        carData.setModel(carModel.getModel());
        carData.setMfy(carModel.getMfy());
        carData.setRecommended(carModel.isRecommended());
        carData.setMfm(carModel.getMfm());
        carData.setDescription(carModel.getDescription());
        carData.setSellerNote(carModel.getSellerNote());
        carData.setBasePrice(carModel.getBasePrice());
        carData.setRetailPrice(carModel.getRetailPrice());
        carData.setEngineDescription(carModel.getEngineDescription());
        carData.setEngineVolume(carModel.getEngineVolume());

        CarPictureModel carPictureModel = carModel.getCarPictureModel();
        if (null != carPictureModel) {
            carData.setCarImage(carPictureModelToCarImagePopulator.convertToImage(carPictureModel));
        }

        return carData;
    }


}
