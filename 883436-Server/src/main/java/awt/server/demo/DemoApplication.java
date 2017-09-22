package awt.server.demo;

import awt.server.service.ImageStorageService;
import java.util.Locale;
import javax.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@SpringBootApplication
@RestController
@EnableAutoConfiguration
@ComponentScan({"awt.server"})
@EntityScan("awt.server.model")
@EnableJpaRepositories({"awt.server.repository"})
@EnableTransactionManagement
public class DemoApplication implements CommandLineRunner{


    @Resource
    ImageStorageService iss;
    
    
	/*@RequestMapping("/")
	String hello() {
		return "forward:/index.html";
	}*/

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
        
        @Bean
        public LocaleResolver localeResolver(){
            SessionLocaleResolver slr = new SessionLocaleResolver();
            slr.setDefaultLocale(Locale.US);
            return slr;
        }
        
        
        
        @Bean
        public ReloadableResourceBundleMessageSource messageSource(){
            ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
            messageSource.setBasename("classpath:messages");
            messageSource.setCacheSeconds(3600);//refresh cache once per hour 
            return messageSource;
        }
        
        @Override
	public void run(String... args) throws Exception {
		iss.init();
	}
        
        @Bean
        public MultipartResolver multipartResolver() {
            return new StandardServletMultipartResolver();
        }
       /*  @Bean
    public HibernateTransactionManager transactionManager() {
        HibernateTransactionManager manager = new HibernateTransactionManager();
        manager.setSessionFactory(new LocalSessionFactoryBean().getObject());
        return manager;
    }*/

}       

