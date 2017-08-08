package awt.server.demo;

import java.util.Locale;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate3.HibernateTransactionManager;
import org.springframework.orm.hibernate3.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@SpringBootApplication
@RestController
@EnableAutoConfiguration
@ComponentScan({"awt.server.service","awt.server.controller","awt.server.auth"})
@EntityScan("awt.server.model")
@EnableJpaRepositories({"awt.server.repository"})
@EnableTransactionManagement
public class DemoApplication {

	@RequestMapping("/")
	String hello() {
		return "hello world";
	}

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
        
         @Bean
    public HibernateTransactionManager transactionManager() {
        HibernateTransactionManager manager = new HibernateTransactionManager();
        manager.setSessionFactory(new LocalSessionFactoryBean().getObject());
        return manager;
    }

}       

