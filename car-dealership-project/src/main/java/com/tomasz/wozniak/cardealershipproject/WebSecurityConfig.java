package com.tomasz.wozniak.cardealershipproject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
//                enabling the basic authentication
                .httpBasic()
                .and()
//                 starts authorizing configurations
                .authorizeRequests()
    //                 ignoring list of urls "
                    .antMatchers("/", "/getFirstCarFromDb", "/seller/unlocked", "/logoutSuccess",
                            "/getAllCars", "/howManyCars", "/login", "/getCarById/*")
                    .permitAll()
    //                 authenticate all remaining URLS
                    .anyRequest().authenticated()
    //                .and()
    //                .formLogin()
    //                .loginPage("/login")
    //                .permitAll()
    //                 "/logout" will log the user out by invalidating the HTTP Session
                .and()
                    .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/logoutSuccess")
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                .and()
//                disabling the CSRF - Cross Site Request Forgery
                .csrf().disable();
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        UserDetails user =
                User.withDefaultPasswordEncoder()
                        .username("user")
                        .password("password")
                        .roles("USER")
                        .build();

        return new InMemoryUserDetailsManager(user);
    }
}
