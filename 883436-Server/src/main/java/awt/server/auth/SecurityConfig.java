package awt.server.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


//@Configuration
//@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
@EnableJpaRepositories({"awt.server.repository"})
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthEndPoint;

    @Override
    public void configure(AuthenticationManagerBuilder auth)  throws Exception {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /*http.csrf().ignoringAntMatchers("/api/user");

        String[] patterns = new String[] {
            "/api/user"
        };
        http.authorizeRequests()
                .antMatchers("/api/user")
                .permitAll()
                .antMatchers()
                .hasAuthority("ROLE_USER")
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthEndPoint);*/
        
         http.csrf().disable().authorizeRequests()
        .antMatchers("/").permitAll()
                 .antMatchers("/css/**").permitAll()
                 .antMatchers("/fonts/**").permitAll()
                 .antMatchers("/js/**").permitAll()
                 .antMatchers("/vendor/**").permitAll()
        .antMatchers(HttpMethod.POST, "/api/user").permitAll()
        .antMatchers(HttpMethod.POST, "/api/auth").permitAll()
        .antMatchers(HttpMethod.GET,"/api/campaign/*/image/*").permitAll()
        .anyRequest().authenticated()
        .and()
        // We filter the api/login requests
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling()
                .authenticationEntryPoint(jwtAuthEndPoint);
    }
    
}
