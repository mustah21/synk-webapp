package com.synk.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
@EnableAsync
public class Main {

	public static void main(String[] args) {
		System.out.println("google client id: " + System.getenv("GOOGLE_CLIENT_ID"));
		SpringApplication.run(Main.class, args);
	}

}
