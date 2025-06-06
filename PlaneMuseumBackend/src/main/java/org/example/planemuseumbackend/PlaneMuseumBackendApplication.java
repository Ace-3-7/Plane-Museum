package org.example.planemuseumbackend;

import org.example.planemuseumbackend.Entities.Plane;
import org.example.planemuseumbackend.Entities.Users;
import org.example.planemuseumbackend.Repo.PlaneRepo;
import org.example.planemuseumbackend.Repo.UsersRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PlaneMuseumBackendApplication {
	private static final Logger log = LoggerFactory.getLogger(PlaneMuseumBackendApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(PlaneMuseumBackendApplication.class, args);
	}
	@Bean
	CommandLineRunner init(PlaneRepo planeRepo, UsersRepo usersRepo) {

		return args -> {
			String adminPassword = "admin";
			adminPassword = String.valueOf(adminPassword.hashCode());
			String userPassword = "user";
			userPassword = String.valueOf(userPassword.hashCode());
			log.info("Preloading " + planeRepo.save(new Plane(
					"Boeing",
					"747",
					"Commercial",
					1968,
					"United States",
					"The 747 is a four-engined jet aircraft, initially powered by Pratt & Whitney JT9D turbofan engines, then General Electric CF6 and Rolls-Royce RB211 engines for the original variants.",
					"https://upload.wikimedia.org/wikipedia/commons/4/40/Pan_Am_Boeing_747-121_N732PA_Bidini.jpg")));
			log.info("Preloading " + planeRepo.save(new Plane(
					"Lockheed",
					"SR-71",
					"Reconnaissance",
					1966,
					"United States",
					"The SR-71 Blackbird is a long-range, advanced, strategic reconnaissance aircraft that was used by the United States Air Force.",
					"https://upload.wikimedia.org/wikipedia/commons/9/97/Lockheed_SR-71_Blackbird.jpg")));
			log.info("Preloading " + usersRepo.save(new Users("Ionel Doe", "admin@email.com",adminPassword, true)));
			log.info("Preloading " + usersRepo.save(new Users("Ionica Doe", "user@email.com",userPassword, false)));

		};
	}
}
