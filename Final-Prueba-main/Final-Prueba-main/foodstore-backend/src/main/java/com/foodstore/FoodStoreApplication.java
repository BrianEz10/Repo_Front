package com.foodstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EnableJpaRepositories(basePackages = "com.foodstore.repository")
@EntityScan(basePackages = "com.foodstore.entity")
@SpringBootApplication
public class FoodStoreApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodStoreApplication.class, args);
    }
}