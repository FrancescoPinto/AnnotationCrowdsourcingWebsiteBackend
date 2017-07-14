package awt.server.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"awt.server.controller", "awt.server.security", "awt.server,service"})
public class DemoApplication {
	 
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
