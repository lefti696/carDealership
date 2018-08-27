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
    public List<CarData> searchCarByMakeOrModel(String str) {
        List<CarData> carDataList = new ArrayList<>();
        List<CarModel> carModelList = carDao.searchCarByMakeOrModel(str);

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

//    public CarData(String color, String make, String model, int mfy, CarImage carImage, boolean recommended,
//        int mfm, String description, String sellerNote, int basePrice, int retailPrice, double engineVolume, String engineDescription) {

        String fiatDesc = "The Fiat 126 (Type 126) is a rear-engined, small economy or city car, introduced in October 1972 at the Turin Auto Show as a replacement for the Fiat 500. The majority of 126s were produced in Bielsko-Biała, Poland, as the Polski Fiat 126p, where production continued until year 2000. In many markets Fiat stopped sales of the 126 in 1993 in favour of their new front-engined Cinquecento. At a vehicle length of 3.05 metres, the Fiat 126 is almost exactly the same size as the original British Mini, and although it came to market 14 years later, production ended in the same year (2000), and its total sales of almost 4.7 million units were in close range of the Mini's 5.4 million.";
        String ferrariDesc = "The Ferrari 458 Italia is a mid-engined sports car produced by the Italian sports car manufacturer Ferrari. The 458 replaced the Ferrari F430, and was first officially unveiled at the 2009 Frankfurt Motor Show. It was replaced by the Ferrari 488, which was unveiled at the 2015 Geneva Motor Show.";
        String ibizaDesc = "The Ibiza Mk4 (Typ 6J) was previewed at the 2008 Geneva Motor Show in the form of the Bocanegra concept car. It was styled by the Belgian car designer Luc Donckerwolke with the distinctive 'arrow design', dispensing with the basic Ibiza design language that had been in place since the 1984 original, and being the first among other Volkswagen Group models (Volkswagen Polo Mk5 and Audi A1) to use the latest Volkswagen Group PQ25 platform in the segment of supermini cars.\n" +
                "\n" +
                "The model range features a 5-door hatchback, a 3-door version and a 5-door estate, the latter was added in Q4 2010.\n" +
                "\n" +
                "The new model first went on sale in the summer of 2008, in the 5 door format, followed by a 3-door variant, marketed as the Ibiza SportCoupé or Ibiza SC. An Ibiza Ecomotive model, powered by an 80 PS (59 kW; 79 bhp), 1.4 litre diesel engine emitting 98 g/km of CO2, was launched late in 2008.";
        String vovloXc60Desc = "The Volvo XC60 is a compact luxury crossover SUV manufactured and marketed by Swedish automaker Volvo Cars since 2008. It is now in its second generation.\n" +
                "\n" +
                "The XC60 is part of Volvo's 60 Series of automobiles, along with the S60, S60 Cross Country, V60, and V60 Cross Country. The first generation model introduced a new style for the 60 Series models. Along with the rest of the lineup, the first-generation XC60 was refreshed in 2013. Similarly, the second-generation model, released in 2017, is the first in the series.";
        String fordFocusDesc = "The Ford Focus is a compact car (C-segment in Europe) manufactured by the Ford Motor Company Designed under Alex Trotman's Ford 2000 plan, which aimed to globalize model development and sell one compact vehicle worldwide, the Focus was primarily designed by Ford of Europe's German and British teams.";

        String toyotaYarisDesc = "The Toyota Yaris (Japanese: トヨタ ・ヤリス Toyota Yarisu) is a subcompact car sold by Toyota since 1999, replacing the Starlet.\n" +
                "\n" +
                "Between 1999 and 2005, some markets received the same vehicles under the Toyota Echo name. Toyota has used the \"Yaris\" and \"Echo\" names on the export version of several different Japanese-market models. From 2015, most Yaris sedan models marketed in North America are based on the Mazda2 and produced for Toyota by Mazda.";
        String nissanMicraDesc = "The Nissan Micra, known in Latin America and in most of Asia as the Nissan March (マーチ Māchi), is a supermini[1] produced by the Japanese manufacturer Nissan since 1982.\n" +
                "\n" +
                "The Nissan Micra was not sold in Korea and Southern Asia.\n" +
                "\n" +
                "In Japan, the Micra replaced the Japanese-market Nissan Cherry and was exclusive to Nissan Japanese dealership network Nissan Cherry Store until 1999, when the \"Cherry\" network was combined into Nissan Red Stage until 2003. Until Nissan began selling badge engineered superminis from other Japanese manufacturers the March was Nissan's smallest vehicle, and was not renamed and sold at other Japanese Nissan dealership networks.";

        logger.info("Id of created car is " + addCar(
                new CarData("Red", "Ferrari", "Italia", 2018, null, true, 0, "Insanely fast." + System.getProperty("line.separator") + ferrariDesc, "Perfect. Test drive not allowed", 500000, 700000, 4.5, "V8")));
        logger.info("Id of created car is " + addCar(
                new CarData("Cherry red", "Fiat", "126p", 1987, null, true, 0, "Legend." + System.getProperty("line.separator") + fiatDesc, "little rusted engine inside", 25000, 45000, 0.65, "650E")));
        logger.info("Id of created car is " + addCar(
                new CarData("Pinientos Gray", "Seat", "Ibiza", 2013, null, true, 0, "Autoemocion." + System.getProperty("line.separator") + ibizaDesc, "Some price negotiations available", 40000, 50000, 1.2, "tsi")));
        logger.info("Id of created car is " + addCar(
                new CarData("Sparking black", "Volvo", "XC60", 2010, null, false, 0, "Safe family car." + System.getProperty("line.separator") + vovloXc60Desc, "Will be frequent guest at our service", 125000, 160000, 2.4, "T5")));
        logger.info("Id of created car is " + addCar(
                new CarData("Moon silver", "Ford", "Focus", 2004, null, true, 0, "If pedal to the metal is your purpose of life this will be a perfect choice." + System.getProperty("line.separator") + fordFocusDesc, "Noone wants to buy. Sell even at lowered price.", 65000, 72000, 2.0, "Duratec")));
        logger.info("Id of created car is " + addCar(
                new CarData("Poping cherry", "Toyota", "Yaris", 2014, null, false, 0, "Japan reliable car."  + System.getProperty("line.separator") + toyotaYarisDesc, "Good car so negotiations are not possible.", 40000, 45000, 1.33, "vvti")));
        logger.info("Id of created car is " + addCar(
                new CarData("Deep purple", "Nissan", "Micra", 2015, null, false, 0, "Small city car. Easy to park." + System.getProperty("line.separator") + nissanMicraDesc, "Very long standing on a parking lot.", 32000, 39000, 1.2, "petrol")));

        logger.info(carDao.countAllCars() + " records created.");
    }
}
