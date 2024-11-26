package com.pandemicsimulation.in;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.availability.ApplicationAvailabilityAutoConfiguration;
import org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration;
import org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration;
import org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.ssl.SslAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {
		DataSourceAutoConfiguration.class,
		FlywayAutoConfiguration.class,
		HazelcastAutoConfiguration.class,
		SslAutoConfiguration.class,
		LifecycleAutoConfiguration.class,
		PropertyPlaceholderAutoConfiguration.class,
		ApplicationAvailabilityAutoConfiguration.class,
		ProjectInfoAutoConfiguration.class
})
public class CovidDataApplication {

	public static void main(String[] args) {
		SpringApplication.run(CovidDataApplication.class, args);
	}
}
