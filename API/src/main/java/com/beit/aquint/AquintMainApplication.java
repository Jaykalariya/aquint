package com.beit.aquint;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Aquint API", version = "1.0", description = "Aquint In-House Applications"))
@EnableTransactionManagement
public class AquintMainApplication {

	public static void main(String[] args) {
		SpringApplication.run(AquintMainApplication.class, args);
	}

}
