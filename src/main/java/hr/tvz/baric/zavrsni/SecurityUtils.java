package hr.tvz.baric.zavrsni;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.databind.ObjectMapper;

public final class SecurityUtils {
	
	private static final ObjectMapper mapper = new ObjectMapper();
	
	private SecurityUtils(){}
	
	public static String getCurrentUsername(){
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Authentication authentication = securityContext.getAuthentication();
		UserDetails springSecurityUser = null;
		String username = null;
		
		if (authentication != null) {
			if (authentication.getPrincipal() instanceof UserDetails) {
				springSecurityUser = (UserDetails) authentication.getPrincipal();
				username = springSecurityUser.getUsername();
			} else if (authentication.getPrincipal() instanceof String) {
				username = (String) authentication.getPrincipal();
			}
		}
		
		return username;		
	}
	
	public static void sendError(HttpServletResponse response, Exception exception, int status, String message) throws IOException {
		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(status);
		PrintWriter writer = response.getWriter();
		Error error = new Error("authError", exception.getMessage());
		writer.write(mapper.writeValueAsString(new Response(status, message, error)));
		writer.flush();
		writer.close();		
	}
	
	public static void sendResponse(HttpServletResponse response, int status, Object object) throws IOException {
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter writer = response.getWriter();
		writer.write(mapper.writeValueAsString(object));
		response.setStatus(status);
		writer.flush();
		writer.close();		
	}
	
	
	
	

}
