package hr.tvz.baric.zavrsni;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import hr.tvz.baric.zavrsni.model.UserInfo;
import hr.tvz.baric.zavrsni.repo.UserInfoJpaRepo;

@Component
public class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	@Autowired
	UserInfoJpaRepo userInfoJpaRepo;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO Auto-generated method stub
		//super.onAuthenticationSuccess(request, response, authentication);
		UserInfo userInfo = userInfoJpaRepo.findByUsername(authentication.getName());
		SecurityUtils.sendResponse(response, HttpServletResponse.SC_OK, userInfo);
	}

}
