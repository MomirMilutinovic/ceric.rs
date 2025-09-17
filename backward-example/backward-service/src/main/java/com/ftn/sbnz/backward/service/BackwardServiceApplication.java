package com.ftn.sbnz.backward.service;

import org.kie.api.KieServices;
import org.kie.api.builder.KieScanner;
import org.kie.api.runtime.KieContainer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@ComponentScan(basePackages = {"com.ftn.sbnz.backward.service.controllers", "com.ftn.sbnz.backward.service.services"})
@SpringBootApplication(scanBasePackages = { "com.ftn.sbnz.backward.model", "com.ftn.sbnz.backward.kjar" })
@EnableScheduling
@EnableJpaRepositories("com.ftn.sbnz.backward.*")
@EntityScan("com.ftn.sbnz.backward.*")
public class BackwardServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackwardServiceApplication.class, args);
	}
	@Bean
	public KieContainer kieContainer() {
		KieServices ks = KieServices.Factory.get();
		KieContainer kContainer = ks
				.newKieContainer(ks.newReleaseId("com.ftn.sbnz", "backward-kjar", "0.0.1-SNAPSHOT"));
		KieScanner kScanner = ks.newKieScanner(kContainer);
		kScanner.start(1000);
		return kContainer;
	}
}

