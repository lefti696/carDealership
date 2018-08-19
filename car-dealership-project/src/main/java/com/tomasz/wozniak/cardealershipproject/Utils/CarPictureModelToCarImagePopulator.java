package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.springframework.stereotype.Component;

@Component
public class CarPictureModelToCarImagePopulator {

    public CarImage convertToImage(CarPictureModel carPictureModel) {

        CarImage carImage = new CarImage();

        carImage.setId(carPictureModel.getId());
        carImage.setData(carPictureModel.getData());
        carImage.setFileName(carPictureModel.getFileName());
        carImage.setFileType(carPictureModel.getFileType());

        return carImage;

    }
}
