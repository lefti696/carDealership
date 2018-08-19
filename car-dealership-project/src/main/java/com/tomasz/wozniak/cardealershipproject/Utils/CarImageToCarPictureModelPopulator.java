package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.springframework.stereotype.Component;

@Component
public class CarImageToCarPictureModelPopulator {

    public CarPictureModel convertToCarPictureModel(CarImage carImage) {

        CarPictureModel carPictureModel = new CarPictureModel();

        carPictureModel.setId(carImage.getId());
        carPictureModel.setData(carImage.getData());
        carPictureModel.setFileType(carImage.getFileType());
        carPictureModel.setFileName(carImage.getFileName());

        return carPictureModel;
    }
}
