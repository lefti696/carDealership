package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CarModelToCarDataPopulator {

    @Autowired
    private CarPictureModelToCarImagePopulator carPictureModelToCarImagePopulator;

    public CarData convert(CarModel carModel) {
        CarData carData = new CarData();

        carData.setId(carModel.getId());
        carData.setColor(carModel.getColor());
        carData.setMake(carModel.getMake());
        carData.setModel(carModel.getModel());
        carData.setMfy(carModel.getMfy());
        carData.setRecommended(carModel.isRecommended());

        CarPictureModel carPictureModel = carModel.getCarPictureModel();
        if (null != carPictureModel) {
            carData.setCarImage(carPictureModelToCarImagePopulator.convertToImage(carPictureModel));
        }

        return carData;
    }


}
