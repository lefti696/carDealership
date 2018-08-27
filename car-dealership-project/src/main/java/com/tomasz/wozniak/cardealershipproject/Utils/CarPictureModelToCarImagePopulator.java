package com.tomasz.wozniak.cardealershipproject.Utils;

import com.tomasz.wozniak.cardealershipproject.Items.CarImage;
import com.tomasz.wozniak.cardealershipproject.model.CarPictureModel;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class CarPictureModelToCarImagePopulator {

    private static final Logger logger = Logger.getLogger(CarModelToCarDataPopulator.class);

    public CarImage convertToImage(CarPictureModel carPictureModel) {
        logger.debug("Converting CarPictureModel => CarImage");
        CarImage carImage = new CarImage();

        carImage.setId(carPictureModel.getId());
        carImage.setData(carPictureModel.getData());
        carImage.setFileName(carPictureModel.getFileName());
        carImage.setFileType(carPictureModel.getFileType());

        return carImage;

    }
}
