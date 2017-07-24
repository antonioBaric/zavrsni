package hr.tvz.baric.zavrsni;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ComponentScan(basePackages = {"hr.tvz.baric.zavrsni"})
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	RestUnauthorizedEntryPoint restAuthenticationEntryPoint;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	RestAccessDeniedHandler restAccessDeniedHandler;
	
	@Autowired
	RestAuthenticationSuccessHandler restAuthenticationSuccessHandler;
	
	@Autowired
	RestAuthenticationFailureHandler restAuthenticationFailureHandler;
	
	
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/");
	}
	
	protected void configure(HttpSecurity http) throws Exception {
		http.headers().disable()
		.csrf().disable()
		.authorizeRequests()
			.antMatchers("/").permitAll()
			.and()
		.exceptionHandling()
			.authenticationEntryPoint(restAuthenticationEntryPoint)
			.accessDeniedHandler(restAccessDeniedHandler)
			.and()
		.formLogin()
			.loginProcessingUrl("/authenticate")
			.successHandler(restAuthenticationSuccessHandler)
			.failureHandler(restAuthenticationFailureHandler)
			.usernameParameter("username")
			.passwordParameter("password")
			.permitAll()
			.and()
		.logout()
			.logoutUrl("/logout")
			.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
			.deleteCookies("JSESSIONID")
			.permitAll();
			
	}

}
