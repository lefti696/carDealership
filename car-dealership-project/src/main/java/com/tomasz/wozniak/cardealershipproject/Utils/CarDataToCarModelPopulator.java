package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarData;
import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.model.CarModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CarDataToCarModelPopulator {

    @Autowired
    private CarImageToCarPictureModelPopulator carImageToCarPictureModelPopulator;

    public CarModel convert(CarData carData) {
        CarModel carModel = new CarModel();

        carModel.setId(carData.getId());
        carModel.setMake(carData.getMake());
        carModel.setModel(carData.getModel());
        carModel.setColor(carData.getColor());
        carModel.setMfy(carData.getMfy());
        carModel.setRecommended(carData.isRecommended());

        CarImage carImage = carData.getCarImage();
        if (null != carImage) {
            carModel.setCarPictureModel(carImageToCarPictureModelPopulator.convertToCarPictureModel(carImage));
        }

        return carModel;
    }


}
