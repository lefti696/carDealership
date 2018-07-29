package com.tomasz.wozniak.cardealershipproject;

import org.apache.log4j.BasicConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarDealershipProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarDealershipProjectApplication.class, args);

		//configuration for log4j
        BasicConfigurator.configure();
	}
}
